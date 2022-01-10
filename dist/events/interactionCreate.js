var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!interaction.isCommand())
                return;
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command)
                return;
            try {
                yield command.execute(interaction);
            }
            catch (error) {
                console.error(error);
                yield interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        });
    },
};
//# sourceMappingURL=interactionCreate.js.map