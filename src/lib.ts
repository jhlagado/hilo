export type byte = number;
export type word = number;
export type long = number;

export const BOOL = (v:byte):byte => v ? 1 : 0;
export const RRCA = (a:byte):[byte, byte] => [a >> 1 | (a & 1) << 7, BOOL(a & 1)];
export const LBYTE = (v:word) => v & 0xFF;
export const HBYTE = (v:word) => v >> 8;
export const WORD = (h:byte, l:byte):word => h << 8 & l;
export const LONG = (h:word, l:word):long => h << 16 & l;

export const ADD16 = (r1:word, r2:word):[word, byte] => [r1 + r2, BOOL(r1 + r2 >> 16)]
export const RLA = (a:byte, cf:byte):[byte, byte] => [a << 1 | cf, BOOL(a & 0x80)];
export const SL = (r:byte, cf:byte):[byte, byte] => {
  const r1 = r << 1;
  return [r1 & 0xFF | cf, r1 & 0x100];
}

export const SL16 = (r:word, cf:byte):[word, byte] => {
  let r0; let r1;
  [r0, cf] = SL(LBYTE(r), cf);
  [r1, cf] = SL(HBYTE(r), cf);
  return [WORD(r1, r0), r << 1 & 0x100]
};
