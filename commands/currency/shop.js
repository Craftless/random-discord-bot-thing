const Discord = require("discord.js");
const { CurrencyShop } = require("../../dbObjects");


module.exports = {
    name: "shop",
    aliases: ["shp"],
    description: "Displays all items in the shop",
    async execute(message, args) {
        const items = await CurrencyShop.findAll();
        const embed = new Discord.MessageEmbed()
            .setTitle("Shop")
            .setDescription("**Items:**");

        items.map(i => embed.addField(`${i.name} - $${i.cost}`, `${i.description}`));
        
        return message.channel.send(embed);
        /*
        return message.channel.send(`**Items:**
${items.map(i => `${i.name}: ${i.cost}`).join('\n')}`, { code: true });
        */
    },
};
