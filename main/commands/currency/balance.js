const Discord = require("discord.js");

module.exports = {
    name: "balance",
    aliases: ["bal"],
    usage: "<@user> optional",
    description:
        "Shows your balance. You may mention a user to show their balance",
    execute(message, args) {
        const target = message.mentions.users.first() || message.author;
        return message.channel.send(new Discord.MessageEmbed().setTitle("**Balance**").setDescription(`${target.tag} has $${message.client.currency.getBalance(target.id)}.`).setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true })));
    },
};
