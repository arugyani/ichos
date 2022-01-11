import { SlashCommandBuilder } from '@discordjs/builders';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skips the current song.'),
	async execute(interaction) {
        const subscriptions = require('../bot');
		let subscription = subscriptions.get(interaction.guildId);

        if (subscription) {
            subscription.player.stop();

            await interaction.reply('Skipped!');
        } else await interaction.reply('Not playing anything right now!');
	},
};
