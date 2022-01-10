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
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName('leave')
        .setDescription('Leaves voice channel.'),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscriptions = require('../bot');
            let subscription = subscriptions.get(interaction.guildId);
            if (subscription) {
                subscription.connection.destroy();
                subscriptions.delete(interaction.guildId);
                yield interaction.reply(`Left voice channel!`);
            }
            else
                yield interaction.reply('Not in a voice channel!');
        });
    },
};
//# sourceMappingURL=leave.js.map