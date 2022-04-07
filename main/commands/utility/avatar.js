module.exports = {
    name: "avatar",
    description: "Displays user avatars. If no user is mentioned, displays your avatar",
    usage: "<user>...",
    aliases: ["icon", "pfp", "avtr"],
    execute(message, args) {
        if (!message.mentions.users.size) return message.channel.send(`Your avatar: ${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`);

            const avatarList = message.mentions.users.map(user => {
                return `${user.username}'s avatar: ${user.displayAvatarURL({ format: 'png', dynamic: true })}`;
            });

            message.channel.send(avatarList);
    },
};