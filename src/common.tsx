import { defineComponent, computed, watch, useTemplateRef } from 'vue';
import { NButton, NScrollbar, NButtonGroup } from 'naive-ui';
import type { ScrollbarInst } from 'naive-ui';
import { useAppStore } from '@/store';
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
