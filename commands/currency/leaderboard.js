const Discord = require('discord.js');

module.exports = {
    name: "leaderboard",
    aliases: ["lb"],
    description: "Displays the leaderboard",
    execute(message, args) {

        const array = message.client.currency.sort((a, b) => a.balance - b.balance).filter(user => message.client.users.cache.has(user.user_id)).first(10);


        const embed = new Discord.MessageEmbed()
            .addField("Leaderboard", array.map((user, pos) => `${pos + 1}: **$${user.balance}** - ${message.client.users.cache.get(user.user_id).tag}`));

        return message.channel.send(embed);
        // return message.channel.send(message.client.currency.sort((a, b) => a.balance - b.balance).filter(user => message.client.users.cache.has(user.user_id)).first(10).map((user, pos) => `${pos + 1}: ${message.client.users.cache.get(user.user_id).tag}: ${user.balance}`), { code: true }).catch(error => console.log(error));
    },
};
