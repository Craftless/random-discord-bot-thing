const Sequelize = require("sequelize");
const { Users } = require("./dbObjects");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

const CurrencyShop = require("./models/CurrencyShop")(sequelize, Sequelize.DataTypes);

require("./models/Users")(sequelize, Sequelize.DataTypes);
require("./models/UserItems")(sequelize, Sequelize.DataTypes);

const force = process.argv.includes("--force") || process.argv.includes("-f");

sequelize.sync({ force }).then(async () => {
    const shop = [
      CurrencyShop.upsert({ name: "Tea", cost: 1, description: "Drinking it will give you $1", effect: "message.client.currency.add(userid, 1); return `and received $1`" }),
      CurrencyShop.upsert({ name: "Coffee", cost: 1, description: "Nothing special, just some coffee", effect: null }),
      CurrencyShop.upsert({ name: "Cake", cost: 1, description: "Has a 50% chance of giving you $2 when consumed", effect: "const random = Math.random(); if (random < 0.5) {message.client.currency.add(userid, 2);} return random < 0.5 ? `and received $2` : `and did not receive anything`" }),
    ];
    await Promise.all(shop);
    console.log("db synced");
    sequelize.close();
  })
  .catch(console.error);
