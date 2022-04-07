module.exports = {
    name: "test",
    description: "A test command",
    aliases: ["debug"],
    permissions: "ADMINISTRATOR",
    execute(message, args) {
        message.channel.send("No");
    },
};