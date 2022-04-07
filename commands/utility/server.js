module.exports = {
    name: "server",
    description: "Lists the server name and region",
    aliases: ["guild", "svr"],
    execute(message, args) {
        message.channel.send(`Server: ${message.guild.name}\nRegion: ${message.guild.region}`);
    },
};