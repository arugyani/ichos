# ichos

ichos is a Discord Music bot which plays music in discord voice channels. 

This `node.js` application is powered by DiscordJS to interface with the Discord API and utilizes the YouTube API to search for songs. 

ichos is fully written in Typescript and was deployed 24/7 for personal use using [Heroku](https://elements.heroku.com/buildpacks/synicalsyntax/discord.js-heroku).


![Alt text](https://github.com/AruGyani/ichos/blob/eaorkun-patch-1/ichos_small.png?raw=true)

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

## Example Usage

#### These are some of the most commonly used commands

`/play <term>` : This command takes either a YouTube video url or a search term for a YouTube video.

`/queue` : Displays the current queue.

`/shuffle` : Shuffles the current queue.

`/skip` : Skips the currently playing song.

`/move <move_from> <move_to>` : Move a song to a specified location in queue

`/remove <pos>` : Removes a song at the specified location from queue

`/pause` : Pauses any currently playing audio.

`/resume` : Resumes any paused audio.

`/stop` : Stops and currently playing audio and clears the queue.

`/leave` : Leaves a voice call if inside one.

### Developed by [Aru Gyani](http://github.com/AruGyani) and [Eralp Orkun](http://github.com/eaorkun)
### Graphic Design by [Pranav Abbaraju](http://linkedin.com/in/pranavabbaraju)


