import { SlashCommandBuilder } from '@discordjs/builders';
import { Track } from '../music/track';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops playing the current song and clears the queue.'),
	async execute(interaction) {
        const subscriptions = require('../bot');
		let subscription = subscriptions.get(interaction.guildId);

        if (subscription) {
            subscription.player.stop();
            subscription.queue = [];

            await interaction.reply('Resumed playing!');
        } else await interaction.reply('Not playing anything right now!');
	},
};
