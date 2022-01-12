import { SlashCommandBuilder } from '@discordjs/builders';
import { joinVoiceChannel } from '@discordjs/voice';
import { GuildMember } from 'discord.js';

import { MusicSubscription } from '../music/subscription';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Resumes the currently playing song.'),
	async execute(interaction) {
        const subscriptions = require('../bot');
		let subscription = subscriptions.get(interaction.guildId);

        if (!subscription) { // no subscription exists
            await interaction.reply('ichos is not in a voice channel');
        } else { // connection exists
    
            if (subscription) {
                subscription.player.unpause();
    
                await interaction.reply('Resuming play!');
            } else await interaction.reply('No track is currently paused!');
        }
	},
};
