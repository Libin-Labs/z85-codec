import { encodeZ85, decodeZ85 } from '@lp-labs/z85-codec';
const bytes = new Uint8Array([134, 79, 210, 111, 181, 89, 247, 91]);
if (decodeZ85(encodeZ85(bytes))[0] !== bytes[0]) throw new Error('Codec');
// @ts-expect-error invalid argument must be rejected by declarations
encodeZ85([1]);
