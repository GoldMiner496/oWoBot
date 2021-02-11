const Discord = require('discord.js');
const random = require('random');
const owoify = require('owoifyx');
const config = require('./config.json')

const hasEmoteRegex = /<a?:.+:\d+>/gm
const emoteRegex = /<:(\w+):(\d+)>/gm
const animatedEmoteRegex = /<a:.+:(\d+)>/gm
const linkRegex = new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+");

const client = new Discord.Client();

//Print to log when ready
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

//Debug log -- Prints all messages to console
client.on('message', message => {
    console.log(message.content);
});

//actual owoify
client.on('message', msg => {
    if (1 == 1) {                                              //RNG Element (random.int(min = 0, max = 1))
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

client.login(config.token);