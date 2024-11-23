export { makingChess } from './making-chess';
export { initMap } from './data';

import pkg from '../../package.json';

const { version, name } = pkg;
export const version_key = `${name}_${version}`;
