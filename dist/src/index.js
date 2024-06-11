"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const buffers_1 = require("./buffers");
const ed25519_1 = require("@noble/curves/ed25519");
const utils_1 = require("@noble/hashes/utils");
// Generate private and public keys
const privateKey = ed25519_1.ed25519ph.utils.randomPrivateKey();
const publicKey = ed25519_1.ed25519ph.getPublicKey(privateKey);
const user = {
    rid: BigInt(1),
    publicKey: publicKey
};
// Generate message body
const createChannelMessageBody = {
    uri: "fakeCidString"
};
// Generate messageData
const exampleCreateChannelMessageData = {
    rid: user.rid,
    timestamp: BigInt(12239013248234),
    type: types_1.MessageTypes.CHANNEL_CREATE,
    body: createChannelMessageBody
};
// Generate messageData hash
const exampleCreateChannelMessageDataHash = (0, buffers_1.messageDataToCid)(exampleCreateChannelMessageData);
// Generate messageData message
const exampleCreateChannelMessage = {
    signer: (0, utils_1.bytesToHex)(user.publicKey),
    messageData: exampleCreateChannelMessageData,
    sigType: types_1.SignatureTypes.ED25519,
    sig: ed25519_1.ed25519ph.sign(exampleCreateChannelMessageDataHash, // pre hashed
    privateKey),
    hashType: types_1.HashTypes.BLAKE_3,
    hash: exampleCreateChannelMessageDataHash
};
// Verify message authenticity
let result = false;
try {
    result = ed25519_1.ed25519ph.verify(exampleCreateChannelMessage.sig, exampleCreateChannelMessage.hash, exampleCreateChannelMessage.signer);
}
catch (e) {
    console.log("error veirfying sig: ", e);
}
console.log(result);
