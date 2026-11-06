import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('wire fixture', () => {
  assert.equal(api.encodeZ85(new Uint8Array([134, 79, 210, 111, 181, 89, 247, 91])), 'HelloWorld');
});
test('decode fixture', () => {
  assert.deepEqual([...api.decodeZ85('HelloWorld')], [134, 79, 210, 111, 181, 89, 247, 91]);
});
test('byte roundtrips', () => {
  for (let n = 0; n < 100; n += 4) {
    const v = Uint8Array.from({ length: n }, (_, i) => (i * 37 + n) % 256);
    assert.deepEqual(api.decodeZ85(api.encodeZ85(v)), v);
  }
});
test('invalid grammar', () => {
  assert.throws(() => api.decodeZ85('abc'));
});
test('extra convention', () => {
  assert.throws(() => api.encodeZ85(new Uint8Array([1])));
  assert.throws(() => api.decodeZ85('#####'));
});
test('type contract', () => {
  assert.throws(() => api.encodeZ85([]));
  assert.throws(() => api.decodeZ85(1));
});
