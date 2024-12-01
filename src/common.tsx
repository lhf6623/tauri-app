import { defineComponent, computed, watch, useTemplateRef } from 'vue';
import { NButton, NScrollbar, NButtonGroup } from 'naive-ui';
import type { ScrollbarInst } from 'naive-ui';
import { useAppStore } from '@/store';
import { RED } from '@/utils/data';
import { type MaybeElement, useElementSize } from '@vueuse/core';

export function Rivers() {
  const list = ['楚', '河', '汉', '界'];
  return (
    <>
      <div class='absolute w-full flex justify-evenly h-36px z-10 top-50% mt--18px'>
        {list.map((text, index) => {
          return (
            <span key={index} class='inline-block h-36px leading-36px'>
              {text}
            </span>
          );
        })}
      </div>
    </>
  );
}

export function NumberList({ list = [] }: { list: (string | number)[] }) {
  return (
    <ul class='relative flex !h-20px w-324px text-12px'>
      {list.map((item, index) => {
        return (
          <li key={index} class='text-center w-36px h-full leading-20px'>
            {item}
          </li>
        );
      })}
    </ul>
  );
}

export const Control = defineComponent({
  setup() {
    const store = useAppStore();

    const nextRecord = (index: number) => {
      store.readRecord(store.record_index + index);
    };
    const isLast = computed(() => {
      return store.record_index === store.record.length - 1;
    });
    const isFirst = computed(() => {
      return store.record_index < 0;
    });

    function deduction() {
      store.is_run = !store.is_run;
      store.active = [];
    }

    return () => (
      <footer class='relative flex-between h-22px text-12px w-full'>
        <NButton
          size='tiny'
          type='info'
          class='shadow'
          onClick={store.refreshGame}
        >
          重新开始
        </NButton>
        {/* <NButton size='tiny' type='info' class='shadow' onClick={deduction}>
          {!store.is_run ? '继续' : '推演'}
        </NButton> */}
        <NButtonGroup size='tiny'>
          <NButton
            disabled={isFirst.value}
            type='info'
            round
            onClick={() => nextRecord(-1)}
          >
            上一步
          </NButton>
          <NButton
            disabled={isLast.value}
            type='info'
            round
            onClick={() => nextRecord(1)}
          >
            下一步
          </NButton>
        </NButtonGroup>
      </footer>
    );
  },
});

export const RecordList = defineComponent({
  setup() {
    const recordListRef = useTemplateRef<MaybeElement>('recordRef');
    const scrollbarRef = useTemplateRef<ScrollbarInst | null>('scrollbarRef');

    const store = useAppStore();

    const { height } = useElementSize(recordListRef);
    watch(
      () => height,
      () => {
        console.log(1);

        scrollbarRef.value?.scrollBy({
          top: height.value,
          behavior: 'smooth',
        });
      },
      { deep: true }
    );
    const list = computed(() => {
      // 列表中的两个项为一项
      return store.record.reduce((acc, cur, index) => {
        const last_arr = acc.at(-1);
        if (Array.isArray(last_arr) && last_arr.length < 2) {
          last_arr.push(cur);
        } else {
          acc.push([cur]);
        }
        return acc;
      }, [] as RecordItem[][]);
    });

    function readRecord(index: number, type: 0 | 1) {
      const i = index * 2 + type;

      store.readRecord(i);
    }

    function getAcrive(index: number, type: 0 | 1) {
      const i = index * 2 + type;
      return store.record_index === i;
    }

    return () => (
      <div class='shadow flex flex-col bg-white text-12px overflow-hidden w-172px z-50 flex-1'>
        <header class='bg-#99ddff px-6px h-18px flex-shrink-0'>
          棋谱序列
          {!store.is_run && <span class='scale-75 inline-block'>[历史]</span>}
        </header>
        <NScrollbar ref='scrollbarRef' class='flex-1 h-full'>
          <ul ref='recordRef' class='text-center'>
            <li
              class={`${
                store.record_index === -1 ? `text-white bg-#0062ff99` : ''
              }`}
              onClick={() => store.readRecord(-1)}
            >
              ===棋局开始===
            </li>
            {list.value.map(([item1, item2], index) => {
              return (
                <li class={`flex-center `} key='index'>
                  <p>{`${index + 1}.`}</p>
                  <p class='flex-between min-w-109px flex-between'>
                    <span
                      onClick={() => readRecord(index, 0)}
                      class={`hover:bg-#0062ff33 ${
                        getAcrive(index, 0)
                          ? 'bg-#0062ff99 text-white hover:text-black'
                          : ''
                      }`}
                    >
                      {item1.name}
                    </span>
                    <span
                      onClick={() => readRecord(index, 1)}
                      class={`hover:bg-#0062ff33 ${
                        getAcrive(index, 1)
                          ? 'bg-#0062ff99 text-white hover:text-black'
                          : ''
                      }`}
                    >
                      {item2?.name}
                    </span>
                  </p>
                </li>
              );
            })}
          </ul>
        </NScrollbar>
        <footer class='bg-#99ddff px-6px h-18px flex-shrink-0'></footer>
      </div>
    );
  },
});

export function Active({ color }: { color: string }) {
  return (
    <ul class='absolute top-0 left-0 z-5 w-36px h-36px'>
      <li
        style={`border-color: ${color}`}
        class='absolute w-7px h-7px top-1px left-1px b-none b-t b-l b-t-solid b-l-solid'
      ></li>
      <li
        style={`border-color: ${color}`}
        class='absolute w-7px h-7px top-1px right-1px b-none b-t b-r b-t-solid b-r-solid'
      ></li>
      <li
        style={`border-color: ${color}`}
        class='absolute w-7px h-7px bottom-1px left-1px b-none b-b b-l b-b-solid b-l-solid'
      ></li>
      <li
        style={`border-color: ${color}`}
        class='absolute w-7px h-7px bottom-1px right-1px b-none b-b b-r b-b-solid b-r-solid'
      ></li>
    </ul>
  );
}
