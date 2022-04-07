const Discord = require("discord.js");

module.exports = {
    name: "beg",
    aliases: ["pls", "implore", "adjure"],
    usage: "<@user> optional",
    cooldown: 45,
    description:
        "Beg for money",
    async execute(message, args) {
        const amount = Math.floor(Math.random() * 49 + 1);
        message.client.currency.add(message.author.id, amount);
        message.channel.send(new Discord.MessageEmbed().setTitle("Beg").setDescription(`Received $${amount}`).setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true })));
    },
};
