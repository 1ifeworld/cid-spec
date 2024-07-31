import type { ArrayBufferView, ByteView } from './interface.js'

const textEncoder = new TextEncoder()
const textDecoder = new TextDecoder()

export const name = 'json'
export const code = 0x0200

export function encode<T>(node: T): ByteView<T> {
  return textEncoder.encode(JSON.stringify(node, bigintReplacer))
}

export function decode<T>(data: ByteView<T> | ArrayBufferView<T>): T {
  return JSON.parse(textDecoder.decode(data), bigintReviver)
}

function bigintReviver(_: string, value: unknown) {
  return value !== null &&
    typeof value === 'object' &&
    '$bigint' in value &&
    typeof value.$bigint === 'string'
    ? BigInt(value.$bigint)
    : value
}

function bigintReplacer(_, value: unknown) {
  return typeof value === 'bigint' ? { $bigint: value.toString() } : value
}
