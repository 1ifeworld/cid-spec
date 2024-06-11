"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64UrlMulticodecToCid = exports.cidAsBase64UrlMulticodec = exports.messageDataToCid = exports.uint8ArrayToMessageData = exports.messageDataToUint8Array = void 0;
const blake3_1 = require("@noble/hashes/blake3");
const base64url_1 = __importDefault(require("base64url"));
/**
 * @dev Serialize MessageData object into a Uint8Array
 */
function messageDataToUint8Array(message) {
    const jsonString = JSON.stringify(message, (key, value) => typeof value === "bigint" ? value.toString() : value);
    const encoder = new TextEncoder();
    return encoder.encode(jsonString);
}
exports.messageDataToUint8Array = messageDataToUint8Array;
/**
 * @dev Deserialize Uint8Array into MessageData object
 */
function uint8ArrayToMessageData(uint8Array) {
    const decoder = new TextDecoder();
    const jsonString = decoder.decode(uint8Array);
    return JSON.parse(jsonString, (key, value) => key === "rid" || key === "timestamp" ? BigInt(value) : value);
}
exports.uint8ArrayToMessageData = uint8ArrayToMessageData;
/**
 * @dev Calculate cid hash from serialized messageData object
 * @notice blake3 default length is 32 bytes but hardcoded for readability
 */
function messageDataToCid(messageData) {
    const serializedMessageData = messageDataToUint8Array(messageData);
    return (0, blake3_1.blake3)(serializedMessageData, { dkLen: 32 });
}
exports.messageDataToCid = messageDataToCid;
/**
 * @dev Convert cid to base64Url multicodec for ipfs CIDv1 compatability (???)
 */
function cidAsBase64UrlMulticodec(cid) {
    // raw inner data: cid version 1, raw multicodec 0x55, blake3 multihash 0x1e, len of 32
    const prefixBytes = new Uint8Array([0x01, 0x55, 0x1e, 0x20]);
    // This creates a new Uint8Array with a length equal to length of prefix and cid lengths. The array is initialized with zeros.
    const combinedBytes = new Uint8Array(prefixBytes.length + cid.length);
    // This copies the values from prefix into combined, starting at index 0. After this operation, the first four bytes of combined will be [0x01, 0x55, 0x1e, 0x20].
    combinedBytes.set(prefixBytes);
    // This appends the cid bytes immediately after the prefix bytes.
    combinedBytes.set(cid, prefixBytes.length);
    // Convert bytes to base64Url and prepend with 'u'
    return "u" + (0, base64url_1.default)(combinedBytes);
}
exports.cidAsBase64UrlMulticodec = cidAsBase64UrlMulticodec;
/**
 * @dev Convert base64Url multicodec back to cid hash
 */
function base64UrlMulticodecToCid(base64Url) {
    // Remove the 'u' prefix
    const base64UrlWithoutPrefix = base64Url.slice(1);
    // Decode the Base64URL string to a Uint8Array
    const combinedBytes = base64url_1.default.toBuffer(base64UrlWithoutPrefix);
    // Return extracted CID bytes by removing the prefix
    return combinedBytes.slice(4);
}
exports.base64UrlMulticodecToCid = base64UrlMulticodecToCid;
/*
    // NOTE: removed multiformats block encoding for now after swapping in blake3
    import * as Block from "multiformats/block";
    import * as dagCbor from "@ipld/dag-cbor";
    import { sha256 } from "multiformats/hashes/sha2";

    // @dev Use this to turn unstructured data in multiformats blocks Cids. Useful for large files + objects
    // @dev To then get the CID, you can call {block}.cid.toString()
    // @example const messageCid = (await encodeBlock()).cid.toString()
    export async function encodeBlock(value: unknown) {
        return await Block.encode({ value, codec: dagCbor, hasher: sha256 });
    }
*/ 
