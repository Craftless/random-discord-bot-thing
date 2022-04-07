module.exports = {
    name: "user",
    description: "States the username of the first user mentioned",
    args: true,
    aliases: ["username", "usr"],
    execute(message, args) {
        if (!message.mentions.users.size) return message.reply("You need to tag a user");
            message.channel.send(`Username: ${message.mentions.users.first().username}`);
    },
};