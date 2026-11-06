function strictText(value: string, max = 16384): void {
  if (typeof value !== 'string') throw new TypeError('Expected string');
  if (value.length > max) throw new RangeError('Text length budget exceeded');
}
function bytes(v: Uint8Array, max = 1048576): void {
  if (!(v instanceof Uint8Array)) throw new TypeError('Expected Uint8Array');
  if (v.length > max) throw new RangeError('Byte budget exceeded');
}
const alphabet =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#';
export function encodeZ85(input: Uint8Array): string {
  bytes(input);
  if (input.length % 4) throw new RangeError('Four-byte blocks required');
  let out = '';
  for (let i = 0; i < input.length; i += 4) {
    let n = input[i]! * 16777216 + input[i + 1]! * 65536 + input[i + 2]! * 256 + input[i + 3]!;
    const chars = Array<string>(5);
    for (let j = 4; j >= 0; j--) {
      chars[j] = alphabet[n % 85]!;
      n = Math.floor(n / 85);
    }
    out += chars.join('');
  }
  return out;
}
export function decodeZ85(text: string): Uint8Array {
  strictText(text, 1310720);
  if (text.length % 5) throw new RangeError('Five-character blocks required');
  const out = new Uint8Array((text.length / 5) * 4);
  for (let i = 0; i < text.length; i += 5) {
    let n = 0;
    for (let j = 0; j < 5; j++) {
      const d = alphabet.indexOf(text[i + j]!);
      if (d < 0) throw new RangeError('Invalid Z85 digit');
      n = n * 85 + d;
    }
    if (n > 4294967295) throw new RangeError('Block overflow');
    for (let j = 3; j >= 0; j--) {
      out[(i / 5) * 4 + j] = n % 256;
      n = Math.floor(n / 256);
    }
  }
  return out;
}
