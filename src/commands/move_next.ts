import { SlashCommandBuilder } from '@discordjs/builders';
import { AudioPlayerStatus, AudioResource } from '@discordjs/voice';
import { Track } from '../music/track';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('move_next')
		.setDescription('Moves a song to the next in line position in queue')
        .addIntegerOption(option =>
            option.setName('move_from')
                .setDescription('Track position of the song you wish to move')
                .setRequired(true)),
	async execute(interaction) {
        const subscriptions = require('../bot');
		let subscription = subscriptions.get(interaction.guildId);

        if (subscription) {
            let length = subscription.queue.length;

            let move_from = interaction.options.get('move_from')!.value! - 1;

            if (move_from >= 0 && move_from < subscription.queue.length) {
                    if (move_from != 0) {
                        let temp = subscription.queue[move_from];
                        subscription.queue.splice(move_from, 1);
                        subscription.queue.splice(0, 0, temp)
                        const queue = subscription.queue
                            .slice(0, 5)
                            .map((track, index) => `${index + 1} - ${track.title}`)
                            .join('\n');

                        await interaction.reply(`Move song at position ${move_from + 1} to ${0 + 1}.\n\n${queue}`);
                    } else await interaction.reply('This is the same song.');
            } else await interaction.reply('Error. move_from position is not within queue size.');
        } else await interaction.reply('Not playing anything right now!');
	},
};
