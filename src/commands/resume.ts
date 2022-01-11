import { SlashCommandBuilder } from '@discordjs/builders';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Resumes playing the current song.'),
	async execute(interaction) {
        const subscriptions = require('../bot');
		let subscription = subscriptions.get(interaction.guildId);

        if (subscription) {
            subscription.player.unpause();

            await interaction.reply('Resumed playing!');
        } else await interaction.reply('Not playing anything right now!');
	},
};
