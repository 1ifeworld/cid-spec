import base64url from "base64url";
import { MessageData } from "./types";

import * as Block from 'multiformats/block'
import * as raw from 'multiformats/codecs/raw'
import * as json from './codecs/json'
import { blake3 } from './hashers/blake3'
import { CID } from "multiformats";



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

export async function messageToBlock(message: MessageData) {
  // The block type has both the bytes array and the CID instnace
  return await Block.encode({ value: message, codec: json, hasher: blake3 })
}


export async function binaryToBlock(input: Uint8Array) {
  // The block type has both the bytes array and the CID instnace
  return await Block.encode({ value: input, codec: raw, hasher: blake3 })
}



/**
 * @dev Deserialize Uint8Array into MessageData object
 */
export function uint8ArrayToMessageData(bytes: Uint8Array): MessageData {
  Block.decode({ bytes, codec: json, hasher: blake3 })
}

////////////////////////////////////////////////////////////////
// HASHING
////////////////////////////////////////////////////////////////

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
    // This creates a new Uint8Array with a length equal to length of prefix and blake3hash lengths. The array is initialized with zeros.
    const combinedBytes = new Uint8Array(RIVER_CID_PREFIX.length + hash.length);
    // This copies the values from prefix into combined, starting at index 0. After this operation, the first four bytes of combined will be [0x01, 0x55, 0x1e, 0x20].
    combinedBytes.set(RIVER_CID_PREFIX);
    // This appends the hash bytes immediately after the prefix bytes.
    combinedBytes.set(hash, RIVER_CID_PREFIX.length);
    // Convert bytes to base64Url and prepend with 'u'
    return "u" + base64url(combinedBytes);
  }