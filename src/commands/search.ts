import { SlashCommandBuilder } from '@discordjs/builders';

const { yt } = require('../../config.json');

const YouTube = require("discord-youtube-api");
const youtube = new YouTube(yt);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('search')
		.setDescription('Searches YouTube for a song.')
        .addStringOption(option =>
            option.setName('term')
                .setDescription('The search term or phrase you wish to find')
                .setRequired(true)),
	async execute(interaction) {
        const term = interaction.options.get('term')!.value! as string;

		const video = await youtube.searchVideos(term);

		await interaction.reply(`**__${video.title}__**\n${video.url}`);
	},
};
