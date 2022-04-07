const Discord = require("discord.js");

module.exports = {
    name: "transfer",
    aliases: ["trans"],
    usage: "amount <@user>",
    description: "Transfers money to a mentioned user",
    args: true,
    execute(message, args) {
        const target = message.mentions.users.first();
        const transferAmount = parseInt(args[0]);
        if (!target) return message.reply("You did not specify who to transfer to!");
        if (isNaN(transferAmount)) return message.reply("Invalid amount!");
        message.client.currency.add(message.author.id, -transferAmount);
        message.client.currency.add(target.id, transferAmount);

        return message.channel.send(new Discord.MessageEmbed().setTitle("Transfer").setDescription(`Transferred $${transferAmount} to ${target.tag}. You now have ${message.client.currency.getBalance(message.author.id)}.`).setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true })));

    },
};
