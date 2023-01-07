import { ref, computed, reactive, Ref, onMounted, watch } from "vue";
import { WebviewWindow } from "@tauri-apps/api/window";

// TODO: 判断是否有摄像头
export const useVideo = (
  mirrorRef: Ref<HTMLVideoElement | null>,
  isInitPlay = false
) => {
  let mediaStreamTrack: MediaStream | null = null;
  const plays = reactive({
    is_play: false,
    loading: false,
  });
  const turn = ref(true);
  /** 是否关闭摄像头 true：关闭中，false开启中 */
  const closes = reactive({
    is_close: true,
    loading: false,
  });
  const turnStyle = computed(() => {
    const _deg = turn.value ? 180 : 0;
    return `rotateY(${_deg}deg)`;
  });

  function play(videoDom: HTMLVideoElement) {
    plays.loading = true;
    videoDom.play().then(() => {
      plays.is_play = true;
      plays.loading = false;
      closes.is_close = false;
    });
  }

  /** 初始化 video */
  function initPlay() {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: { ideal: 200 },
          height: { ideal: 200 },
        },
        audio: false,
      })
      .then((stream) => {
        mediaStreamTrack = stream;
        if (mirrorRef.value !== null) {
          mirrorRef.value.srcObject = stream;
          play(mirrorRef.value);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  isInitPlay && onMounted(initPlay);
  // 开始摄像 暂停摄像
  function playOrPause() {
    if (mirrorRef.value) {
      if (plays.is_play) {
        mirrorRef.value.pause();
        plays.is_play = !plays.is_play;
      } else {
        if (mediaStreamTrack === null) {
          initPlay();
        } else {
          play(mirrorRef.value);
        }
      }
    } else {
      console.error("video 标签还没初始化");
    }
  }
  /** 关闭摄像头 */
  function close() {
    if (mediaStreamTrack === null) return;
    closes.loading = true;
    mediaStreamTrack?.getVideoTracks().forEach((track) => {
      track.stop();
      plays.is_play = false;
      closes.is_close = true;
      closes.loading = false;
    });
    mediaStreamTrack = null;
  }

  return {
    playOrPause,
    close,
    turnStyle,
    plays,
    turn,
    closes,
  };
};

export const useMirror = () => {
  console.log(WebviewWindow.getByLabel("mirror"));
  /* 判断 mirror 是否存在 */
  const mirrorWindow = ref<WebviewWindow | null | "created" | "error">(
    WebviewWindow.getByLabel("mirror")
  );
  const mirrorIsOpen = ref(mirrorWindow.value !== null);

  watch(
    () => mirrorWindow,
    (newValue) => {
      if (newValue.value === null) {
        mirrorIsOpen.value = false;
      } else {
        mirrorIsOpen.value = true;
      }
    },
    { deep: true }
  );
  function openMirror() {
    console.log(`🚀 ~ mirrorIsOpen.value`, mirrorIsOpen.value);
    if (mirrorIsOpen.value !== false) {
      WebviewWindow.getByLabel("mirror")?.close();
      mirrorWindow.value = null;
      return;
    }
    const webview = new WebviewWindow("mirror", {
      url: "mirror/index.html",
      center: true,
      width: 200,
      height: 228,
      resizable: false,
      title: "镜子",
    });
    // since the webview window is created asynchronously,
    // Tauri emits the `tauri://created` and `tauri://error` to notify you of the creation response
    webview.once("tauri://created", function () {
      console.log(`🚀 ~ "tauri://created"`, "tauri://created");
      // webview window successfully created
      mirrorWindow.value = "created";
    });
    webview.once("tauri://error", function () {
      console.log(`🚀 ~ "tauri://error"`, "tauri://error");
      // an error happened creating the webview window
      mirrorWindow.value = "error";
    });
  }

  return {
    mirrorIsOpen,
    openMirror,
  };
};
