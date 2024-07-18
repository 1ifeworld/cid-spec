import { blake3 } from "@noble/hashes/blake3";
import base64url from "base64url";
import { MessageData } from "./types";

////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////

/**
 * @dev Raw inner data: cid version 1, raw multicodec 0x55, blake3 multihash 0x1e, len of 32
 */
const RIVER_CID_PREFIX = new Uint8Array([0x01, 0x55, 0x1e, 0x20]);

////////////////////////////////////////////////////////////////
// SERIALIZATION
////////////////////////////////////////////////////////////////

/**
 * @dev Serialize MessageData object into a Uint8Array
 */
export function messageDataToUint8Array(message: MessageData): Uint8Array {
  const jsonString = JSON.stringify(message, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
  const encoder = new TextEncoder();
  return encoder.encode(jsonString);
}

/**
 * @dev Deserialize Uint8Array into MessageData object
 */
export function uint8ArrayToMessageData(uint8Array: Uint8Array): MessageData {
  const decoder = new TextDecoder();
  const jsonString = decoder.decode(uint8Array);
  return JSON.parse(jsonString, (key, value) =>
    key === "rid" || key === "timestamp" ? BigInt(value) : value
  );
}

////////////////////////////////////////////////////////////////
// HASHING
////////////////////////////////////////////////////////////////

/**
 * @dev Calculate blake3 hash from serialized messageData object
 * @notice blake3 default length is 32 bytes but hardcoded for readability
 */
export function messageDataToBlake3Hash(messageData: MessageData): Uint8Array {
  const serializedMessageData = messageDataToUint8Array(messageData);
  return blake3(serializedMessageData, { dkLen: 32 });
}

/**
 * @dev Calculate blake3 hash from Blob type. We use this for media files
 * @notice blake3 default length is 32 bytes but hardcoded for readability
 */
export function blobToBlake3Hash(blob: Blob): Uint8Array {
    return blake3(blob, {dkLen: 32})
}

////////////////////////////////////////////////////////////////
// ENCODING
////////////////////////////////////////////////////////////////

/**
 * @dev Transform messageDataObject to base64Url multicodec for ipfs CIDv1 compatability
 */
export function messageDataToBase64UrlMulticodec(
  messageData: MessageData
): string {
  // calculate blake3 hash of messageData object
  const hash = messageDataToBlake3Hash(messageData);
  // This creates a new Uint8Array with a length equal to length of prefix and cid lengths. The array is initialized with zeros.
  const combinedBytes = new Uint8Array(RIVER_CID_PREFIX.length + hash.length);
  // This copies the values from prefix into combined, starting at index 0. After this operation, the first four bytes of combined will be [0x01, 0x55, 0x1e, 0x20].
  combinedBytes.set(RIVER_CID_PREFIX);
  // This appends the hash bytes immediately after the prefix bytes.
  combinedBytes.set(hash, RIVER_CID_PREFIX.length);
  // Convert bytes to base64Url and prepend with 'u'
  return "u" + base64url(combinedBytes);
}

/**
 * @dev Transform blob to base64Url multicodec for ipfs CIDv1 compatability
 */
export function blobToBase64UrlMulticodec(
    blob: Blob
  ): string {
    // calculate blake3 hash of messageData object
    const hash = blobToBlake3Hash(blob);
    // This creates a new Uint8Array with a length equal to length of prefix and cid lengths. The array is initialized with zeros.
    const combinedBytes = new Uint8Array(RIVER_CID_PREFIX.length + hash.length);
    // This copies the values from prefix into combined, starting at index 0. After this operation, the first four bytes of combined will be [0x01, 0x55, 0x1e, 0x20].
    combinedBytes.set(RIVER_CID_PREFIX);
    // This appends the hash bytes immediately after the prefix bytes.
    combinedBytes.set(hash, RIVER_CID_PREFIX.length);
    // Convert bytes to base64Url and prepend with 'u'
    return "u" + base64url(combinedBytes);
  }