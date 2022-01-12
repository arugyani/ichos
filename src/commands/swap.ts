import { SlashCommandBuilder } from '@discordjs/builders';
import { AudioPlayerStatus, AudioResource } from '@discordjs/voice';
import { Track } from '../music/track';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('swap')
		.setDescription('Swap song locations in queue')
        .addIntegerOption(option =>
            option.setName('first')
                .setDescription('Track position of 1st song you wish to swap')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('second')
                .setDescription('Track position of 2nd song you wish to swap')
                .setRequired(true)),
	async execute(interaction) {
        const subscriptions = require('../bot');
		let subscription = subscriptions.get(interaction.guildId);

        if (subscription) {
            let length = subscription.queue.length;

            let first = interaction.options.get('first')!.value! - 1;
            let second = interaction.options.get('second')!.value! - 1;

            if (first >= 0 && first < subscription.queue.length) {
                if (second >= 0 && second < subscription.queue.length) {
                    if (first != second) {
                        let temp = subscription.queue[first];

                        subscription.queue[first] = subscription.queue[second];
                        subscription.queue[second] = temp;

                        const queue = subscription.queue
                            .slice(0, 5)
                            .map((track, index) => `${index + 1} - ${track.title}`)
                            .join('\n');

                        await interaction.reply(`Swapped songs at positions ${first + 1} and ${second + 1}.\n\n${queue}`);
                    } else await interaction.reply('This is the same song.');
                } else await interaction.reply('Error. Second position is not within queue size.');
            } else await interaction.reply('Error. First position is not within queue size.');
        } else await interaction.reply('Not playing anything right now!');
	},
};
