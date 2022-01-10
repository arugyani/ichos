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
const subscription_1 = require("../music/subscription");
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName('join')
        .setDescription('Join voice channel.'),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscriptions = require('../bot');
            let subscription = subscriptions.get(interaction.guildId);
            if (!subscription) { // no subscription exists
                if (interaction.member instanceof discord_js_1.GuildMember && interaction.member.voice.channel !== null) {
                    const channel = interaction.member.voice.channel;
                    subscription = new subscription_1.MusicSubscription((0, voice_1.joinVoiceChannel)({
                        channelId: channel.id,
                        guildId: channel.guild.id,
                        adapterCreator: channel.guild.voiceAdapterCreator,
                    }));
                    subscription.connection.on('error', console.warn);
                    subscriptions.set(interaction.guildId, subscription);
                    yield interaction.reply(`Joining ${channel.name}`);
                }
                else
                    yield interaction.reply('You need to join a voice channel first!');
            }
            else { // move to current user voice channel
                if (interaction.member instanceof discord_js_1.GuildMember && interaction.member.voice.channel !== null) {
                    const channel = interaction.member.voice.channel;
                    subscription.connection.destroy();
                    subscriptions.delete(interaction.guildId);
                    subscription = new subscription_1.MusicSubscription((0, voice_1.joinVoiceChannel)({
                        channelId: channel.id,
                        guildId: channel.guild.id,
                        adapterCreator: channel.guild.voiceAdapterCreator,
                    }));
                    subscription.connection.on('error', console.warn);
                    subscriptions.set(interaction.guildId, subscription);
                    yield interaction.reply(`Joining ${channel.name}`);
                }
                else
                    yield interaction.reply('You need to join a voice channel first!');
            }
        });
    },
};
//# sourceMappingURL=join.js.map