import { HashTypes, Message, MessageData, SignatureTypes, MessageTypes, MessageDataBodyTypes, ChannelCreateBody } from './types';
import { messageDataToCid } from './buffers';
import { ed25519ph } from "@noble/curves/ed25519";
import { bytesToHex } from '@noble/hashes/utils';

// Generate private and public keys
const privateKey = ed25519ph.utils.randomPrivateKey();
const publicKey = ed25519ph.getPublicKey(privateKey);
const user = {
    rid: BigInt(1),
    publicKey: publicKey
}
// Generate message body
const createChannelMessageBody: ChannelCreateBody = {
    uri: "fakeCidString"
}
// Generate messageData
const exampleCreateChannelMessageData: MessageData = {
    rid: user.rid,
    timestamp: BigInt(12239013248234),
    type: MessageTypes.CHANNEL_CREATE,
    body: createChannelMessageBody
}
// Generate messageData hash
const exampleCreateChannelMessageDataHash: Uint8Array = messageDataToCid(exampleCreateChannelMessageData)
// Generate messageData message
const exampleCreateChannelMessage: Message = {
    signer: bytesToHex(user.publicKey),
    messageData: exampleCreateChannelMessageData,
    sigType: SignatureTypes.ED25519,
    sig: ed25519ph.sign(
        exampleCreateChannelMessageDataHash, // pre hashed
        privateKey
    ),
    hashType: HashTypes.BLAKE_3,
    hash: exampleCreateChannelMessageDataHash
}
// Verify message authenticity
let result: boolean = false
try {
    result = ed25519ph.verify(
        exampleCreateChannelMessage.sig, 
        exampleCreateChannelMessage.hash, 
        exampleCreateChannelMessage.signer
    )
} catch (e) {
    console.log("error veirfying sig: ", e)
}

console.log(result);
