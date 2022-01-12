import { SlashCommandBuilder } from '@discordjs/builders';
import { AudioPlayerStatus, AudioResource } from '@discordjs/voice';
import { Track } from '../music/track';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('up')
		.setDescription('Displays the upcoming queue.'),
	async execute(interaction) {
        const subscriptions = require('../bot');
		let subscription = subscriptions.get(interaction.guildId);

        if (subscription) {
            let status = subscription.player._state.status;
            let resource = subscription.player._state.resource;

            const current = (status === AudioPlayerStatus.Idle)
                ? `Nothing is currently playing!`
                : `**Playing | __${(resource as AudioResource<Track>).metadata.title}__**`;

            const queue = subscription.queue
                .slice(0, 5)
                .map((track, index) => `${index + 1} - ${track.title}`)
                .join('\n');

            await interaction.reply(`${current}\n\n${queue}`);
        } else await interaction.reply('Not playing anything right now!');
	},
};
