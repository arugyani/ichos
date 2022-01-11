"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const { yt } = require('../../config.json');
const YouTube = require("discord-youtube-api");
const youtube = new YouTube(yt);
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName('search')
        .setDescription('Searches YouTube for a song.')
        .addStringOption(option => option.setName('term')
        .setDescription('The search term or phrase you wish to find')
        .setRequired(true)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const term = interaction.options.get('term').value;
            const video = yield youtube.searchVideos(term);
            console.log(video);
            yield interaction.reply(`| ${video.title} |\n\t${video.url}`);
        });
    },
};
//# sourceMappingURL=search.js.map