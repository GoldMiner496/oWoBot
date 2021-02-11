const fs = require('fs');
const Discord = require('discord.js');
const random = require('random');
const owoify = require('owoifyx');
const config = require('./config.json')

const hasEmoteRegex = /<a?:.+:\d+>/gm
const emoteRegex = /<:(\w+):(\d+)>/gm
const animatedEmoteRegex = /<a:.+:(\d+)>/gm
const linkRegex = new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+");

const client = new Discord.Client();
client.login(config.token);
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//Print to log when ready
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
    console.log(config.chance)
});

//"Indexes" all commands
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}



//Debug log -- Prints all messages to console
client.on('message', message => {
    console.log(message.content);
});

//Executes when a message is sent with the prefix
client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

    try {
	    client.commands.get(command).execute(message, args);
    } catch (error) {
	    console.error(error);
	    message.reply('there was an error trying to execute that command!');
}
});

//actual owoify
client.on('message', msg => {
    if ((random.int(min = 0, max = config.chance)) == 1) {     //RNG Element (random.int(min = 0, max = 1))
        if (!msg.author.bot) {                                 //Check if a user (not bot) sent the message
            if (owoify(msg.content) === msg.content) return;   //If the message would be the same owo'd, leave it.
            else if (emoji = emoteRegex.exec(msg)) {           //Check for emoji
                console.log("Emoji detected " + emoji);        //LOG
                console.log(`Emoji URL = https://cdn.discordapp.com/emojis/${emoji[1]}.png?v=1`) //LOG
                msg.channel.send(`<:${emoji[1]}:${emoji[2]}>`) //WIP -- just replies the emoji for now
                return
            }
            else if (linkRegex.test(msg.content)) {
                console.log("Link Detected");
                return
            }
            else {
                console.log("Nothing Detected");
                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setAuthor(msg.author.username, msg.author.avatarURL())
                    .setDescription(owoify(msg.content))
                msg.delete();
                msg.reply(exampleEmbed);
            }
        }
    }
});

