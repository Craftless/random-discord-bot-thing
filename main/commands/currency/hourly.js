const Discord = require("discord.js");


module.exports = {
    name: "hourly",
    aliases: ["h"],
    description: "Use to claim your hourly kit",
    cooldown: 3600,
    async execute(message, args) {
        message.client.currency.add(message.author.id, 30);
        return message.channel.send(new Discord.MessageEmbed().setTitle("Hourly Kit").setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true })).addField("Received:", "$30"));
    },
};
