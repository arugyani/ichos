import { SlashCommandBuilder } from '@discordjs/builders';
import { joinVoiceChannel } from '@discordjs/voice';
import { GuildMember } from 'discord.js';

import { MusicSubscription } from '../music/subscription';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Joins your current voice channel.'),
	async execute(interaction) {
        const subscriptions = require('../bot');
		let subscription = subscriptions.get(interaction.guildId);

        if (!subscription) { // no subscription exists
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

                await interaction.reply(`Joining ${channel.name}`);
            } else await interaction.reply('You need to join a voice channel first!');
        } else { // move to current user voice channel
            if (interaction.member instanceof GuildMember && interaction.member.voice.channel !== null) {
                const channel = interaction.member.voice.channel;

                subscription.connection.destroy();
                subscriptions.delete(interaction.guildId);

                subscription = new MusicSubscription(
                    joinVoiceChannel({
                        channelId: channel.id,
                        guildId: channel.guild.id,
                        adapterCreator: channel.guild.voiceAdapterCreator,
                    })
                );

                subscription.connection.on('error', console.warn);
                subscriptions.set(interaction.guildId, subscription);

                await interaction.reply(`Joining ${channel.name}`);
            } else await interaction.reply('You need to join a voice channel first!');
        }
	},
};
