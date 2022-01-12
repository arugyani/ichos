import { SlashCommandBuilder } from '@discordjs/builders';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('next_up')
		.setDescription('Displays the next song in the queue.'),
	async execute(interaction) {
        const subscriptions = require('../bot');
		let subscription = subscriptions.get(interaction.guildId);
        if (subscription) {
            if (subscription.queue.length == 0){
                await interaction.reply('No songs in queue');
                return;
            }

            let track = subscription.queue[0];
            await interaction.reply('**Up Next: __' + track.title + '__**');
        } else await interaction.reply('Not playing anything right now!');
	},
};
