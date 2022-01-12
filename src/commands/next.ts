import { SlashCommandBuilder } from '@discordjs/builders';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('next')
		.setDescription('Moves to the next song in the queue.'),
	async execute(interaction) {
        const subscriptions = require('../bot');
		let subscription = subscriptions.get(interaction.guildId);

        if (subscription) {
            subscription.player.stop();

            await interaction.reply('Moving to next song!');
        } else await interaction.reply('Not playing anything right now!');
	},
};
