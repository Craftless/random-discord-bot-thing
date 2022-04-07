const Discord = require("discord.js");


module.exports = {
    name: "daily",
    aliases: ["d"],
    description: "Use to claim your daily kit",
    cooldown: 86400,
    async execute(message, args) {
        message.client.currency.add(message.author.id, 300);
        return message.channel.send(new Discord.MessageEmbed().setTitle("Daily Kit").setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true })).addField("Received:", "$300"));
    },
};
