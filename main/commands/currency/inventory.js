const { Users, UserItems } = require("../../dbObjects");
const Discord = require("discord.js");
const EmbedTemplate = require("../../EmbedTemplate");

module.exports = {
    name: "inventory",
    aliases: ["inv"],
    usage: "<@user> optional",
    description:
        "Shows your inventory. You may mention a user to show their inventory",
    async execute(message, args) {

        const target = message.mentions.users.first() || message.author;
        console.log(`Is this null? ${await UserItems.findOne({ where: { user_id: target.id } })}`);

        const user = await Users.findOne({ where: { user_id: target.id } });

        if (!user) return message.reply(EmbedTemplate.embed(message.author).setTitle("Inventory").setDescription(`${target.tag} has nothing!`));

        const items = await user.getItems();

        const embed = new Discord.MessageEmbed()
            .setTitle(`${target.username}'s inventory:`)
            .setDescription(`Owned items`)
            .setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true }));

        items.map(i => embed.addField(`${i.item.name} - ${i.amount}`, `${i.item.description}`));

        if (!items.length) return message.channel.send(`${target.tag} has nothing!`);
        console.log(`${items} JEAWFOIJPL, ${items.map(i => i.name)}`);

        return message.channel.send(embed);

        // return message.channel.send(`${target.tag} has ${items.map(i => `${i.amount} ${i.item.name}`).join("\n")}.`);
    },
};
