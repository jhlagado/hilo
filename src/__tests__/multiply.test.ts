import { mult } from "../multiply";

describe('testing multiply and divide', () => {

  test('naive 8 bit mult', () => {
    for (let j = 0; j < 256; j++) {
      for (let i = 0; i < 256; i++) {
        const expected = i * j;
        const actual = mult(i, j);
        // console.log({ i, j, expected });
        expect(actual).toEqual(expected);
      }
    }
  });

  test('overflow naive 8 bit mult', () => {
    const i = 256;
    const j = 257;
    const expected = (256 * 257) & 0xFFFF;
    const actual = mult(i, j);
    // console.log({ i, j, expected });
    expect(actual).toEqual(expected);
  });
})
