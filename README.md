# ichos

ichos is a Discord Music bot which plays music in a voice channel according to user definined commands. This `node.js` application is powered by DiscordJS to interface with the Discord API and utilizes the YouTube API to search for songs. ichos is fully written in Typescript and was deployed for personal use using [This is an external link to genome.gov] (https://www.genome.gov/)[Heroku] 
(). 

Developed by [Aru Gyani](https://elements.heroku.com/buildpacks/synicalsyntax/discord.js-heroku)

![Alt text](https://github.com/AruGyani/ichos/blob/master/pfp.jpg?raw=true)

Functionality includes:

* Voice Connection
* Synchronous Audio/Music Player
* Over 20 Custom made discord commands including Play, Pause, Stop, Queue, Swap, Shuffle, and Search


## Setup

First, clone the **master** branch of this repository on your local machine, and run `npm install` to install all dependencies.


Next, on the Discord Developers dashboard, create a *new Application* and assign a bot to it. Create an O-Auth invitation link for the bot with `bot` and `application.commands` permissions checked off. Below, select `send messages`, `connect`, and `speak` permissions.

Invite the bot to your Discord server of choice.


Configure `config.json` to match your bot's token, client ID, and guild ID (the ID of the server the bot is in) as well as your YouTube API key.


```
{
    "clientId": "CLIENT_ID_HERE",
    "guildId": "GUILD_ID_HERE",
    "token": "BOT_TOKEN_HERE",
    "yt": "YOUTUBE_API_KEY_HERE"
}
```


To register the commands to your server run: `npm run deploy`

Now the bot can be started using: `npm start`

## Usage

Here are a couple commonly used commands and there usage. ichos features over 20 Custom made discord commands
`/play <term>` : This command takes either a YouTube video url or a search term for a YouTube video.

`/search <term>` : To search for a YouTube video, simply pass in a search term or phrase.

`/pause` : Pauses any currently playing audio

`/resume` : Resumes any paused audio

`/stop` : Stops and currently playing audio and clears the queue

`/join` : Joins a user's voice call

`/leave` : Leaves a voice call if inside one.

### Developed by [Aru Gyani](http://github.com/AruGyani) and [Eralp Orkun](http://github.com/eaorkun)
### Graphic Design by [Pranav Abbaraju](http://linkedin.com/in/pranavabbaraju)


