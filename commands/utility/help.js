const Discord = require("discord.js");
const { prefix } = require("../../config.json");
const { MessageButton } = require("discord-buttons");

module.exports = {
  name: "help",
  description: "Lists all possible commands or info about a specified command",
  aliases: ["commands", "?"],
  execute(message, args) {
    const { commands } = message.client;
    const data = [];

    if (!args.length) {
      
      data.push(commands.map((cmd) => cmd.name));
      const reply = `Here's a list of all commands: ${data}. To get more detailed info on a specific command, send ${prefix}<help> <command>.`;
      
      const embed = new Discord.MessageEmbed()
        .setTitle("Help Commands")
        .setColor("#0099ff")
        .setDescription("This is a list of all possible commands");

      commands.first(5).map((cmd) => {
        embed.addField(cmd.name, cmd.description);
      });

      const nextBtn = new MessageButton().setLabel("→").setStyle("gray").setID('next-help');
      const backBtn = new MessageButton().setLabel("←").setStyle("gray").setID('back-help');

      message.client.commandsCopy.splice(0, 5);

      return message.channel.send("Hi", {
        embed: embed,
        buttons: [backBtn, nextBtn],
      });

      // return message.channel.send(embed);
      /*  .then(() => {
          if (message.channel.type === "dm") return;
          message.channel.send("I've sent you a DM.");
        })
        .catch((error) => {
          console.error(
            `Could not help send DM to ${message.author.name}`, error);
          message.reply("Could not send DM.");
        });
        */
     }
    const cmdName = args[0].toLowerCase();
    console.log("OEFAKJFPAODF");
    console.log(`Commands.get ${commands.get(cmdName)}`);
    // console.log(`ARray.find: ${/*command.find(cmd => cmd.name.length > 2)*/cmdName}`);

    const command = commands.get(cmdName) || commands.find(c => c.aliases && c.aliases.includes(cmdName));
    if (!command) return message.reply("You did not enter a valid command!");

    data.push(`**Name**: ${command.name}`);
    if (command.description) data.push(`**Description**: ${command.description}`);
    if (command.aliases) data.push(`**Aliases**: ${command.aliases.join(`, `)}`);
    if (command.usage) data.push(`**Usage**: ${prefix}${command.name} ${command.usage}`);
    if (command.args) data.push(`**Requires Arguments**`);
    data.push(`**Cooldown**: ${command.cooldown || 0} second(s)`);
    message.channel.send(data, { split: true });
    
  },
  buttonFunctions: {
    index: 0,
    nextBtn(button) {

      if (!button.client.commandsCopy.length) return button.reply.defer();


      // const commandsCopyCopy = button.client.commandsCopy.splice(0, 5);

      // console.log(commandsCopyCopy);

      const embed = new Discord.MessageEmbed()
        .setTitle("Help Commands")
        .setColor("#0099ff")
        .setDescription("This is a list of all possible commands");


      button.client.commandPages[this.index].map((cmd) => {
        embed.addField(cmd.name, cmd.description);
      });

      return button.message.edit({
        embed: embed,
      });
    },
    backBtn(button) {

      if (!button.client.commandsCopy.length) return button.reply.defer();
      console.log(button.client.commandsCopy);

      const commandsCopyCopy = button.client.commandsCopy.splice(0, 5);

      console.log(commandsCopyCopy);

      const embed = new Discord.MessageEmbed()
        .setTitle("Help Commands")
        .setColor("#0099ff")
        .setDescription("This is a list of all possible commands");

      commandsCopyCopy.map((cmd) => {
        embed.addField(cmd.name, cmd.description);
      });

      return button.message.edit({
        embed: embed,
      });
    },
  },
};
