module.exports = {
	name: 'ping',
	description: 'Measure ping (latency) of the bot.',
	execute(message, args) {
		message.channel.send('Pinging...').then(sent => {
            sent.edit(`Pong! Roundtrip latency: ${sent.createdTimestamp - message.createdTimestamp}ms`);
        });
	},
};