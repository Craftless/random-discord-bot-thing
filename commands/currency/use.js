const { CurrencyShop, UserItems, Users } = require('../../dbObjects');
const { Op } = require('sequelize');
const EmbedTemplate = require("../../EmbedTemplate");

module.exports = {
    name: "use",
    aliases: ["utilize", "utilise"],
    usage: "item",
    description: "Uses an item",
    args: true,
    async execute(message, args) {
        const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: args[0] } } });
        // const user = await Users.findOne({ where: { user_id: message.author.id } });
        if (!item) return message.reply("That item does not exist!");


        const items = await UserItems.findOne({
            where: { user_id: message.author.id, item_id: item.id },
        });


        if (!items || items.amount == 0) return message.reply("You do not have that item!");

        items.amount -= 1;
        items.save();

        const newFunction = new Function("message", "userid", item.effect);

        const returnedString = newFunction(message, message.author.id);
        return message.channel.send(EmbedTemplate.embed(message.author).setTitle("Use").setDescription(`You used ${item.name} ${returnedString}`));
        
        // if (!items.include(item)) return message.reply("You do not have that item!");
        // items.item_id.effect();
       

        // return message.reply(`Items: ${items.map(i => `${i.item.name}`)}`);
        
        // if (!item) return message.reply("That item does not exist!");
        // console.log(item.effect);
        // if (item.effect != null) return item.effect(message, message.author.id);
        // return message.reply("You cannot use that");
    },
};
