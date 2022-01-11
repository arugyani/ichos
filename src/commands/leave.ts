import { SlashCommandBuilder } from '@discordjs/builders';
import { joinVoiceChannel } from '@discordjs/voice';
import { GuildMember } from 'discord.js';

import { MusicSubscription } from '../music/subscription';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Leave ichos\'s current voice channel.'),
	async execute(interaction) {
        const subscriptions = require('../bot');
		let subscription = subscriptions.get(interaction.guildId);

        if (!subscription) { // no subscription exists
            await interaction.reply('ichos is not in a voice channel');
        } else { // move to current user voice channel
            subscription.connection.destroy();
			subscriptions.delete(interaction.guildId);
			await interaction.reply({ content: `ichos left its channel!`, ephemeral: true });
        }
	},
};
