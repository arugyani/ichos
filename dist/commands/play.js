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
const voice_1 = require("@discordjs/voice");
const discord_js_1 = require("discord.js");
const track_1 = require("../music/track");
const subscription_1 = require("../music/subscription");
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song.')
        .addStringOption(option => option.setName('url')
        .setDescription('YouTube url for the song')
        .setRequired(true)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscriptions = require('../bot');
            let subscription = subscriptions.get(interaction.guildId);
            if (!subscription) { // no subscription exists && user is in voice channel
                if (interaction.member instanceof discord_js_1.GuildMember && interaction.member.voice.channel !== null) {
                    const channel = interaction.member.voice.channel;
                    subscription = new subscription_1.MusicSubscription((0, voice_1.joinVoiceChannel)({
                        channelId: channel.id,
                        guildId: channel.guild.id,
                        adapterCreator: channel.guild.voiceAdapterCreator,
                    }));
                    subscription.connection.on('error', console.warn);
                    subscriptions.set(interaction.guildId, subscription);
                }
                else
                    yield interaction.reply('You need to join a voice channel first!');
            }
            // check that connection is ready before processing request
            try {
                yield (0, voice_1.entersState)(subscription.connection, voice_1.VoiceConnectionStatus.Ready, 10e3);
            }
            catch (err) {
                console.warn(err);
                yield interaction.reply('Failed to join voice channel within 10 seconds, please try again later!');
                return;
            }
            // create track
            const url = interaction.options.get('url').value;
            try {
                const track = yield track_1.Track.from(url, {
                    onStart() {
                        interaction.followUp("Now playing!");
                    },
                    onFinish() {
                        interaction.followUp("Now finished!");
                    },
                    onError(error) {
                        console.warn(error);
                        interaction.followUp(`Error: ${error.message}`);
                    },
                });
                subscription.enqueue(track);
                yield interaction.reply(`Queued ${track.title}`);
            }
            catch (err) {
                console.warn(err);
                yield interaction.followUp('Failed to play track.');
            }
        });
    },
};
//# sourceMappingURL=play.js.map