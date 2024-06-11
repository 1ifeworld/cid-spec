"use strict";
/*
*
*   MESSAGE TYPES
*
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureTypes = exports.HashTypes = exports.MessageTypes = void 0;
var MessageTypes;
(function (MessageTypes) {
    MessageTypes[MessageTypes["NONE"] = 0] = "NONE";
    MessageTypes[MessageTypes["CHANNEL_CREATE"] = 1] = "CHANNEL_CREATE";
    MessageTypes[MessageTypes["CHANNEL_EDIT_MEMBERS"] = 2] = "CHANNEL_EDIT_MEMBERS";
    MessageTypes[MessageTypes["CHANNEL_EDIT_URI"] = 3] = "CHANNEL_EDIT_URI";
    MessageTypes[MessageTypes["CHANNEL_TRANSFER_OWNER"] = 4] = "CHANNEL_TRANSFER_OWNER";
    MessageTypes[MessageTypes["ITEM_CREATE"] = 5] = "ITEM_CREATE";
    MessageTypes[MessageTypes["ITEM_EDIT"] = 6] = "ITEM_EDIT";
    MessageTypes[MessageTypes["ITEM_DELETE"] = 7] = "ITEM_DELETE";
    MessageTypes[MessageTypes["ITEM_SUBMIT"] = 8] = "ITEM_SUBMIT";
    MessageTypes[MessageTypes["ITEM_ACC_REJ"] = 9] = "ITEM_ACC_REJ";
    MessageTypes[MessageTypes["ITEM_REMOVE"] = 10] = "ITEM_REMOVE";
    MessageTypes[MessageTypes["COMMENT_CREATE"] = 11] = "COMMENT_CREATE";
    MessageTypes[MessageTypes["COMMENT_EDIT"] = 12] = "COMMENT_EDIT";
    MessageTypes[MessageTypes["COMMENT_DELETE"] = 13] = "COMMENT_DELETE";
    MessageTypes[MessageTypes["USER_SET_NAME"] = 14] = "USER_SET_NAME";
    MessageTypes[MessageTypes["USER_SET_URI"] = 15] = "USER_SET_URI";
})(MessageTypes || (exports.MessageTypes = MessageTypes = {}));
var HashTypes;
(function (HashTypes) {
    HashTypes[HashTypes["NONE"] = 0] = "NONE";
    HashTypes[HashTypes["BLAKE_3"] = 1] = "BLAKE_3";
})(HashTypes || (exports.HashTypes = HashTypes = {}));
var SignatureTypes;
(function (SignatureTypes) {
    SignatureTypes[SignatureTypes["NONE"] = 0] = "NONE";
    SignatureTypes[SignatureTypes["ED25519"] = 1] = "ED25519";
    SignatureTypes[SignatureTypes["EIP712"] = 2] = "EIP712";
})(SignatureTypes || (exports.SignatureTypes = SignatureTypes = {}));
