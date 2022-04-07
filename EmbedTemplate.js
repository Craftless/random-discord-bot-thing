const Discord = require("discord.js");

module.exports = {
    embed(author) {
        return new Discord.MessageEmbed().setThumbnail(author.displayAvatarURL({ format: "png", dynamic: true })).setColor("#0099ff");
    },
    
};