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
        this.queueLock = false;
        this.connection = connection;
        this.player = (0, voice_1.createAudioPlayer)();
        this.queue = [];
        this.player.on('stateChange', (oldState, newState) => {
            if (newState.status === voice_1.AudioPlayerStatus.Idle && oldState.status !== voice_1.AudioPlayerStatus.Idle) {
                // If the Idle state is entered from a non-Idle state, it means that an audio resource has finished playing.
                // The queue is then processed to start playing the next track, if one is available.
                oldState.resource.metadata.onFinish();
                void this.processQueue();
            }
            else if (newState.status === voice_1.AudioPlayerStatus.Playing) {
                // If the Playing state has been entered, then a new track has started playback.
                newState.resource.metadata.onStart();
            }
        });
        this.player.on('error', (error) => error.resource.metadata.onError(error));
        connection.subscribe(this.player);
    }
    stop() {
        this.queueLock = true;
        this.queue = [];
        this.player.stop(true);
    }
    enqueue(track) {
        this.queue.push(track);
        void this.processQueue();
    }
    processQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.queueLock || this.player.state.status !== voice_1.AudioPlayerStatus.Idle || this.queue.length === 0) {
                return;
            }
            // Lock the queue to guarantee safe access
            this.queueLock = true;
            // Take the first item from the queue. This is guaranteed to exist due to the non-empty check above.
            const nextTrack = this.queue.shift();
            try {
                // Attempt to convert the Track into an AudioResource (i.e. start streaming the video)
                const resource = yield nextTrack.createAudioResource();
                this.player.play(resource);
                this.queueLock = false;
            }
            catch (error) {
                // If an error occurred, try the next item of the queue instead
                nextTrack.onError(error);
                this.queueLock = false;
                return this.processQueue();
            }
        });
    }
}
exports.MusicSubscription = MusicSubscription;
//# sourceMappingURL=subscription.js.map