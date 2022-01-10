import {
    VoiceConnection,
    VoiceConnectionDisconnectReason,
    VoiceConnectionStatus,
} from '@discordjs/voice';

import { promisify } from 'node:util';

const wait = promisify(setTimeout);

export class MusicSubscription {
    public readonly connection: VoiceConnection;
    
    public constructor(connection: VoiceConnection) {
        this.connection = connection;
    }
}