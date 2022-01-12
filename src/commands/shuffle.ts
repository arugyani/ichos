import { SlashCommandBuilder } from '@discordjs/builders';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shuffle')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
        const subscriptions = require('../bot');
		let subscription = subscriptions.get(interaction.guildId);

        if(subscription){
            if(subscription.queue.length == 0){
                await interaction.reply('Queue is empty!');
                return;
            }
    
    
            subscription.shuffle();
            await interaction.reply('Shuffled Queue!');
        }
        else{
            interaction.reply('Not playing anything right now!');
        }

	},
};


