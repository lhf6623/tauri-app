import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  transformerAttributifyJsx,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      cdn: 'https://esm.sh/',
    }),
  ],
  shortcuts: {
    'flex-around': 'flex justify-around items-center',
    'flex-end': 'flex justify-end items-center',
    'flex-between': 'flex justify-between items-center',
    'flex-center': 'flex justify-center items-center',
    'after-absolute': "after:content-[''] after:absolute",
    'before-absolute': "before:(content-[''] absolute)",
    'pseudo-absolute': 'after-absolute before-absolute',

    // 横线
    'horizontal-line': 'after:(w-36px h-1px bg-#000)',

    // 竖线
    'vertical-line': 'before:(w-1px h-36px bg-#000)',

    // 棋子
    'piece-box':
      'relative flex-center w-36px h-36px pseudo-absolute vertical-line horizontal-line',

    // 斜线
    'bias-common':
      'absolute bg-#000 h-1px w-50.91px left-10.3px top-35.3px origin-center z-100',
    'bias-45': 'bias-common rotate-45',
    'bias--45': 'bias-common rotate--45',

    // 星位 比如 兵，炮的位置
    'star-after': 'after-absolute after:(b-none b-solid b-#000 w-7px h-7px)',
    'star-before': 'before-absolute before:(b-none b-solid b-#000 w-7px h-7px)',
    'star-common':
      'star-after star-before absolute w-full h-full left-18px top-18px',
    'star-after-l-b': 'star-common after:(b-l b-b left-3px bottom-3px)',
    'star-after-r-b': 'star-common after:(b-r b-b right-3px bottom-3px)',
    'star-before-r-t': 'star-common before:(b-r b-t right-3px top-3px)',
    'star-before-l-t': 'star-common before:(b-l b-t left-3px top-3px)',
  },
  transformers: [transformerAttributifyJsx(), transformerVariantGroup()],
});
