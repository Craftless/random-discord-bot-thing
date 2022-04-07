const EmbedTemplate = require("../../EmbedTemplate");
const { Op } = require("sequelize");
const { Users, CurrencyShop } = require("../../dbObjects");


module.exports = {
    name: "search",
    aliases: ["find"],
    description: "Searches places for money",
    async execute(message, args) {
        const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: args[0] } } });
        const userBalance = message.client.currency.getBalance(message.author.id);
        if (!item) return message.reply("That item does not exist");
        if (item.cost > userBalance) return message.reply(`This item costs ${item.cost} but you only have ${userBalance}`);

        const user = await Users.findOne({ where: { user_id: message.author.id } });
        message.client.currency.add(message.author.id, -item.cost);
        user.addItem(item);
        
        return message.channel.send(EmbedTemplate.embed(message.author).setTitle("Buy").setDescription(`Bought **${item.name}**`));
    },
};
