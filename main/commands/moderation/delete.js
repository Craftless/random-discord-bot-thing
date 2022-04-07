module.exports = {
    name: "delete",
    description: "Deletes a specified number of messages",
    args: true,
    usage: "<count>",
    execute(message, args) {
        const amount = parseInt(args[0]);

            if (isNaN(amount)) return message.reply(`${args[0]} is not a valid number.`);
            if (amount < 2 || amount > 100) return message.reply("You can only delete between 2 and 100 messages.");

            message.channel.bulkDelete(amount, true).catch(error => {
                console.log(error);
                message.channel.send("There was an error trying to delete messages in this channel.");
            });
    },
};