const DiscordButtons = require("discord-buttons");

module.exports = {
    name: "invite",
    description: "Use the command to generate an invite link",
    execute(message, args) {
        const button = new DiscordButtons.MessageButton().setStyle('url').setLabel("Invite").setURL("https://discord.com/oauth2/authorize?client_id=866529815828889651&scope=bot+applications.commands");   
        message.channel.send(`Please click the button to send invite this bot to your server`, button);
    },
};