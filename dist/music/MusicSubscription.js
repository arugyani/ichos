"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicSubscription = void 0;
const voice_1 = require("@discordjs/voice");
const node_util_1 = require("node:util");
const wait = (0, node_util_1.promisify)(setTimeout);
class MusicSubscription {
    constructor(connection) {
        this.connection = connection;
        this.connection.on('stateChange', (_, newState) => __awaiter(this, void 0, void 0, function* () {
            if (newState.status === voice_1.VoiceConnectionStatus.Disconnected) {
            }
        }));
    }
}
exports.MusicSubscription = MusicSubscription;
//# sourceMappingURL=MusicSubscription.js.map