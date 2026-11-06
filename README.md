# @lp-labs/z85-codec

ZeroMQ-style Z85 fixed-four-byte block encoding.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/z85-codec
```

## Working example

```js
import { encodeZ85, decodeZ85 } from '@lp-labs/z85-codec';
const bytes = new Uint8Array([134, 79, 210, 111, 181, 89, 247, 91]);
if (decodeZ85(encodeZ85(bytes))[0] !== bytes[0]) throw new Error('Codec');
```

CommonJS: `const api = require('@lp-labs/z85-codec')`.

## Behavior, customization and limits

encodeZ85 requires byte length divisible by4,max1048576; decodeZ85 requires text length divisible by5,max1310720. Exact published85character alphabet,32bit big-endian block packed in5 digits; rejects block overflow. Empty allowed,no padding or checksum. O(n)time/storage. Outputs are fresh and original input is not mutated. Encoding is NOT encryption,authentication or file-format auto-detection.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export declare function encodeZ85(input: Uint8Array): string;
export declare function decodeZ85(text: string): Uint8Array;
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
