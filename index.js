const { Client, Collection, Structures, DiscordAPIError } = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs');
const mongoose = require('mongoose');
const guild = require('./commands/Moderation/guild');
const client = new Client();
client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync('./commands/');

['command'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        console.log(`Loaded event '${evtName}'`);
        client.on(evtName, evt.bind(null, client));
    });
});
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

const x = '/';
client.on('message', message => {
if(message.content === "/play"){
    const ytdl = require('ytdl-core');
    const streamOptions = { seek: 0, volume: 1 }
    const MusicToPlay = [
        "https://www.youtube.com/watch?v=PalpNZO4wiQ",
        ""
    ]
    var voiceChannel = message.member.voice.channel.join()
            voiceChannel.then(connection => {
                console.log("joined channel");
                const stream = ytdl('https://www.youtube.com/watch?v=PalpNZO4wiQ', { filter : 'audioonly' });
                const dispatcher = connection.play(stream, streamOptions)
                dispatcher.on("end", end => {
                    console.log("left channel");
                    voiceChannel.leave();
                });
            }).catch(err => console.log(err))
};
if(!message.content.startsWith(x) || message.author.bot) return;

const args = message.content.slice(x.length).split(/ +/);
const command = args.shift().toLowerCase();



if(command === 'kick'){
    client.commands.get('kick').execute(message, args)
};
if(command === 'ban'){
    client.commands.get('ban').execute(message, args)
};
if(command === 'exemple'){
client.commands.get('exemple').execute(message, args)
};

if(command === 'report'){
client.commands.get('report').execute(message, args)
};
if(command === 'lock'){
client.commands.get('lock').execute(message, args)
};
if(command === 'announce'){
client.commands.get('announce').execute(message, args)
};
if(command === 'avatar'){
client.commands.get('avatar').execute(message, args)
};

if(command === 'say'){
client.commands.get('say').execute(message, args)
};
if(command === 'invite'){
client.commands.get('invite').execute(message, args)
};
if(command === 'guild'){
client.commands.get('guild').execute(message, args)
};
if(command === 'rank'){
client.commands.get('rank').execute(message, args)
};
if(command === 'help'){
client.commands.get('help').execute(message, args)
};
if(command === 'support'){
client.commands.get('support').execute(message, args)
};



});


client.login(process.env.token);