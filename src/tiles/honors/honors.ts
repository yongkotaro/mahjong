import bai from './bai.png';
import bei from './bei.png';
import dong from './dong.png';
import hong from './hong.png';
import nan from './nan.png';
import qing from './qing.png';
import xi from './xi.png';
import { Tile } from '../../utils';

export const honorTiles: Tile[] = [
  { src: dong, suit: 'dong', number: 0, maxCount: 3, isSpecial: true },
  { src: nan, suit: 'nan', number: 0, maxCount: 3, isSpecial: true },
  { src: xi, suit: 'xi', number: 0, maxCount: 3, isSpecial: true },
  { src: bei, suit: 'bei', number: 0, maxCount: 3, isSpecial: true },
  { src: hong, suit: 'hong', number: 0, maxCount: 3, isSpecial: true },
  { src: qing, suit: 'qing', number: 0, maxCount: 3, isSpecial: true },
  { src: bai, suit: 'bai', number: 0, maxCount: 3, isSpecial: true },
];