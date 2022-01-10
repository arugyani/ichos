const { prefix } = require('../../config.json');

module.exports = {
	name: 'messageCreate',
	async execute(message) {
        if (!message.guild) return;
        if (message.author.bot) return;

        if (message.content[0] == prefix) {
            let content = message.content.slice(1);
            
            /* const command = interaction.client.commands.get(interaction.commandName); */
         
            let commands = message.client.commands;
            console.log(commands[0].name);
        }
    },
};