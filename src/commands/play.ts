import { SlashCommandBuilder } from '@discordjs/builders';
import {
    joinVoiceChannel,
    AudioPlayerStatus,
    AudioResource,
    entersState,
    VoiceConnectionStatus,
} from '@discordjs/voice';
import { GuildMember, IntegrationApplication } from 'discord.js';
import { Track } from '../music/track';

import { MusicSubscription } from '../music/subscription';

import { raw as ytdl } from 'youtube-dl-exec';
import { validateURL } from 'ytdl-core';
const { yt } = require('../../config.json');
const YouTube = require("discord-youtube-api");
const youtube = new YouTube(yt);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play a song.')
        .addStringOption(option =>
            option.setName('term')
                .setDescription('YouTube search term for the song')
                .setRequired(true)),
	async execute(interaction) {
        const subscriptions = require('../bot');
		let subscription = subscriptions.get(interaction.guildId);

        if (!subscription) { // no subscription exists && user is in voice channel
            if (interaction.member instanceof GuildMember && interaction.member.voice.channel !== null) {
                const channel = interaction.member.voice.channel;
                subscription = new MusicSubscription(
                    joinVoiceChannel({
                        channelId: channel.id,
                        guildId: channel.guild.id,
                        adapterCreator: channel.guild.voiceAdapterCreator,
                    })
                );

                subscription.connection.on('error', console.warn);
                subscriptions.set(interaction.guildId, subscription);
            } else await interaction.reply('You need to join a voice channel first!');
        }

        // check that connection is ready before processing request
        try {
            await entersState(subscription.connection, VoiceConnectionStatus.Ready, 10e3);
        } catch (err) {
            console.warn(err);
            await interaction.reply('Failed to join voice channel within 10 seconds, please try again later!');
            return;
        }

        // create track
        let url = interaction.options.get('term')!.value! as string;

        if (validateURL(url) == false) {
            const video = await youtube.searchVideos(url);

            url = video.url;
        }

        try {
            const track = await Track.from(url, {
                onStart() {
                    interaction.followUp(`**Now playing** | __${track.title}__ |`);
                },

                onFinish() {
                    interaction.followUp(`**Finished playing** | __${track.title}__ |`);
                },

                onError(error) {
                    console.warn(error);
                    interaction.followUp(`**Error**: ${error.message}`);
                },
            });

            subscription.enqueue(track);
            await interaction.reply(`**Queued** | __${track.title}__ |`);
        } catch (err) {
            console.warn(err);
            await interaction.reply('Failed to play track.');
        }
	},
};
