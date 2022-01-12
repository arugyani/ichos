import {
    AudioPlayer,
    AudioPlayerStatus,
    AudioResource,
    createAudioPlayer,
    VoiceConnection,
    VoiceConnectionDisconnectReason,
    VoiceConnectionStatus,
} from '@discordjs/voice';

import { promisify } from 'node:util';
import { Track } from './track';

const wait = promisify(setTimeout);

export class MusicSubscription {
    public readonly connection: VoiceConnection;
    public readonly player: AudioPlayer;

    public queue: Track[];
    public queueLock = false;
    
    public constructor(connection: VoiceConnection) {
        this.connection = connection;
        this.player = createAudioPlayer();
        
        this.queue = [];

        this.player.on('stateChange', (oldState: { status: any; resource: any; }, newState: { status: any; resource: any; }) => {
			if (newState.status === AudioPlayerStatus.Idle && oldState.status !== AudioPlayerStatus.Idle) {
				// If the Idle state is entered from a non-Idle state, it means that an audio resource has finished playing.
				// The queue is then processed to start playing the next track, if one is available.
				(oldState.resource as AudioResource<Track>).metadata.onFinish();
				void this.processQueue();
			} else if (newState.status === AudioPlayerStatus.Playing) {
				// If the Playing state has been entered, then a new track has started playback.
				(newState.resource as AudioResource<Track>).metadata.onStart();
			}
		});

		this.player.on('error', (error: { name: any; message: any; resource: any; }) => (error.resource as AudioResource<Track>).metadata.onError(error));
		connection.subscribe(this.player);
    }

    public stop() {
        this.queueLock = true;
        this.queue = [];
        this.player.stop(true);
    }

    public enqueue(track: Track) {
        this.queue.push(track);

        void this.processQueue();
    }

    public queueNext(track: Track) {
        this.queue.unshift(track);

        void this.processQueue();
    }

    private async processQueue(): Promise<void> {
        if (this.queueLock || this.player.state.status !== AudioPlayerStatus.Idle || this.queue.length === 0) {
			return;
		}
		// Lock the queue to guarantee safe access
		this.queueLock = true;

		// Take the first item from the queue. This is guaranteed to exist due to the non-empty check above.
		const nextTrack = this.queue.shift()!;
		try {
			// Attempt to convert the Track into an AudioResource (i.e. start streaming the video)
			const resource = await nextTrack.createAudioResource();
			this.player.play(resource);
			this.queueLock = false;
		} catch (error) {
			// If an error occurred, try the next item of the queue instead
			nextTrack.onError(error as Error);
			this.queueLock = false;
			return this.processQueue();
		}
    }
}