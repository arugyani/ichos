import { SlashCommandBuilder } from '@discordjs/builders';
import { AudioPlayerStatus, AudioResource } from '@discordjs/voice';
import { Track } from '../music/track';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('move')
		.setDescription('move song locatoins in queue')
        .addIntegerOption(option =>
            option.setName('start')
                .setDescription('index of song you wish to move')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('end')
                .setDescription('index you wish to move the song to')
                .setRequired(true)),
	async execute(interaction) {
        const subscriptions = require('../bot');
		let subscription = subscriptions.get(interaction.guildId);

        if (subscription) {
            let length = subscription.queue.length;

            let start = interaction.options.get('start')!.value! - 1;
            let end = interaction.options.get('end')!.value! - 1;

            if (start >= 0 && start < subscription.queue.length) {
                if (end >= 0 && end < subscription.queue.length) {
                    if (start != end) {
                        let temp = subscription.queue[start];

                        subscription.queue[start] = subscription.queue[end];
                        subscription.queue[end] = temp;

                        const queue = subscription.queue
                            .slice(0, 5)
                            .map((track, index) => `${index + 1} - ${track.title}`)
                            .join('\n');

                        await interaction.reply(`Moved song at position ${start + 1} to ${end + 1}.\n\n${queue}`);
                    } else await interaction.reply('This is the same song.');
                } else await interaction.reply('Error. End position is not within queue size.');
            } else await interaction.reply('Error. Start position is not within queue size.');
        } else await interaction.reply('Not playing anything right now!');
	},
};
