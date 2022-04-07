const fs = require("fs");
const Discord = require("discord.js");
const { token, prefix } = require("./config.json");
const { Users, CurrencyShop } = require("./dbObjects");

const client = new Discord.Client();
client.currency = new Discord.Collection();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();


const DiscordButtons = require("discord-buttons")(client);

const commandFolders = fs.readdirSync("./commands");

for (const folder of commandFolders) {
    const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith("js"));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.commandsCopy = client.commands.array();
client.commandPages = [];


Reflect.defineProperty(client.currency, "add", {
    value: async function add(id, amount) {
        const user = client.currency.get(id);
        if (user) {
            user.balance += Number(amount);
            return user.save();
        }
        const newUser = await Users.create({ user_id: id, balance: amount });
        client.currency.set(id, newUser);
        return newUser;
    },
});

Reflect.defineProperty(client.currency, "getBalance", {
    value: function getBalance(id) {
        const user = client.currency.get(id);
        return user ? user.balance : 0;
    },
});


// Events
//
//
//
//
// 

client.once("ready", async () => {
    const storedBalances = await Users.findAll();
    storedBalances.forEach(b => client.currency.set(b.user_id, b));
    console.log("Ready!");
    client.user.setActivity(`${prefix}help on ${client.guilds.cache.size} servers`, {
        type: "WATCHING",
    });

    const commandsCopy = client.commands.array();
    while (commandsCopy.length > 0) {
        client.commandPages.push(commandsCopy.splice(0, 5));
    }
   
});

client.on("clickButton", async (button) => {
    try {
        switch(button.id) {
            case "next-help":
                client.commands.get('help').buttonFunctions.nextBtn(button).catch(e => console.log(e));
                break;
            case "back-help":
                break;
        }
    }
    catch(error) {
        console.log(error);
        button.channel.send("Error!");
    }

    button.reply.defer();
});


client.on("message", async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmdName = args.shift().toLowerCase();

    const command = client.commands.get(cmdName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(cmdName));

    if (!command) return;

    if (command.guildOnly && message.channel.type === "dm") {
        return message.reply("I can't do this in DMs");
    }

    if (command.args && !args.length) {
        let reply = "You did not provide any arguments!";
        if (command.usage) {
            reply += `\nUsage: ${prefix}${cmdName} ${command.usage}`;
        }

        return message.reply(reply);
    }

    if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) return message.reply("You do not have permission to do this!");
    }

    if (!client.cooldowns.has(command.name)) {
        client.cooldowns.set(command.name, new Discord.Collection());
    }

    const timestamps = client.cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 0) * 1000;
    const now = Date.now();

    if (timestamps.has(message.author.id)) {
        const expirationTime =
            timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            if (expirationTime - now > 3600 * 1000) return message.reply(`Command on cooldown. Please wait for ${((expirationTime - now) / 3600 / 1000).toFixed()} hours.`);
            else if (expirationTime - now > 60 * 1000) return message.reply(`Command on cooldown. Please wait for ${((expirationTime - now) / 60 / 1000).toFixed()} minutes.`);
            return message.reply(`Command on cooldown. Please wait for ${(expirationTime - now).toFixed()} seconds.`);
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args);
    } 
    catch (error) {
        console.error(error);
        message.channel.send("Error");
    }
});

client.login(token);
