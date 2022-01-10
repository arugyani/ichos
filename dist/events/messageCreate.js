var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { prefix } = require('../../config.json');
module.exports = {
    name: 'messageCreate',
    execute(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!message.guild)
                return;
            if (message.author.bot)
                return;
            if (message.content[0] == prefix) {
                let content = message.content.slice(1);
                /* const command = interaction.client.commands.get(interaction.commandName); */
                let commands = message.client.commands;
                console.log(commands[0].name);
            }
        });
    },
};
//# sourceMappingURL=messageCreate.js.map