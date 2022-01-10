import { SlashCommandBuilder } from '@discordjs/builders';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Leaves voice channel.'),
	async execute(interaction) {
        const subscriptions = require('../bot');
		let subscription = subscriptions.get(interaction.guildId);

        if (subscription) {
            subscription.connection.destroy();
            subscriptions.delete(interaction.guildId);

            await interaction.reply(`Left voice channel!`);
        } else await interaction.reply('Not in a voice channel!');
	},
};
