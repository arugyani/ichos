import { Snowflake } from "discord-api-types";
import { MusicSubscription } from "./music/MusicSubscription";

const fs = require('fs');

const { Client, Collection, Intents } = require('discord.js');
const { token } = require('../config.json');

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] });

client.commands = new Collection();

const commandFiles = fs.readdirSync('./dist/commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./dist/events').filter(file => file.endsWith('.js'));

const subscriptions = new Map<Snowflake, MusicSubscription>();

module.exports = subscriptions;

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.data.name, command);
}

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token);