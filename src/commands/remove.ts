import { SlashCommandBuilder } from '@discordjs/builders';
import { AudioPlayerStatus, AudioResource } from '@discordjs/voice';
import { Track } from '../music/track';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove')
		.setDescription('Remove song at specified location in queue.')
        .addIntegerOption(option =>
            option.setName('position')
                .setDescription('Track position of song you wish to remove')
                .setRequired(true)),
	async execute(interaction) {
        const subscriptions = require('../bot');
		let subscription = subscriptions.get(interaction.guildId);

        if (subscription) {
            let length = subscription.queue.length;

            let position = interaction.options.get('position')!.value! - 1;

            if (subscription.queue.length == 0) {
                await interaction.reply('Queue is empty.');
                return;
            }

            if (position >= 0 && position < subscription.queue.length) {
                let title = subscription.queue[position].title;

                subscription.queue.splice(position, 1);

                await interaction.reply(`**Removed** | __${title}__ | from the queue.`);
            } else await interaction.reply('Error. Position not within queue.');
        } else await interaction.reply('Not playing anything right now!');
	},
};
