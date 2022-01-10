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
exports.Track = void 0;
const ytdl_core_1 = require("ytdl-core");
const voice_1 = require("@discordjs/voice");
const youtube_dl_exec_1 = require("youtube-dl-exec");
const noop = () => { };
class Track {
    constructor({ url, title, onStart, onFinish, onError }) {
        this.url = url;
        this.title = title;
        this.onStart = onStart;
        this.onFinish = onFinish;
        this.onError = onError;
    }
    createAudioResource() {
        return new Promise((resolve, reject) => {
            const process = (0, youtube_dl_exec_1.raw)(this.url, {
                o: '-',
                q: '',
                f: 'bestaudio[ext=webm+acodec=opus+asr=48000]/bestaudio',
                r: '100k',
            }, { stdio: ['ignore', 'pipe', 'ignore'] });
            if (!process.stdout) {
                reject(new Error('No stdout'));
                return;
            }
            const stream = process.stdout;
            const onError = (error) => {
                if (!process.killed)
                    process.kill();
                stream.resume();
                reject(error);
            };
            process
                .once('spawn', () => {
                (0, voice_1.demuxProbe)(stream)
                    .then((probe) => resolve((0, voice_1.createAudioResource)(probe.stream, { metadata: this, inputType: probe.type })))
                    .catch(onError);
            }).catch(onError);
        });
    }
    static from(url, methods) {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield (0, ytdl_core_1.getInfo)(url);
            const wrappedMethods = {
                onStart() {
                    wrappedMethods.onStart = noop;
                    methods.onStart();
                },
                onFinish() {
                    wrappedMethods.onStart = noop;
                    methods.onFinish();
                },
                onError(error) {
                    wrappedMethods.onStart = noop;
                    methods.onError(error);
                }
            };
            return new Track(Object.assign({ title: info.videoDetails.title, url: url }, wrappedMethods));
        });
    }
}
exports.Track = Track;
//# sourceMappingURL=track.js.map