const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const chalk = require("chalk");
const settings = require("./settings/settings");

const client = new Client({
  intents: Object.keys(GatewayIntentBits),
});

client.prefixCommands = new Collection();
client.slashCommands = new Collection();

const loadCommands = (commands, directory) => {
  const commandFiles = fs
    .readdirSync(`./${directory}`)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`./${directory}/${file}`);
    commands.set(command.name, command);
    console.log(chalk.green(`✔️ Loaded prefix command: ${command.name}`));
  }
};

const loadEvents = (client, directory) => {
  const eventFiles = fs
    .readdirSync(`./${directory}`)
    .filter((file) => file.endsWith(".js"));

  for (const file of eventFiles) {
    const event = require(`./${directory}/${file}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
      console.log(chalk.blue(`🔹 Loaded once event: ${event.name}`));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
      console.log(chalk.blue(`🔷 Loaded event: ${event.name}`));
    }
  }
};

client.on("ready", () => {
  console.log(chalk.yellow(`🟡 Bot is ready as ${client.user.tag}`));
});

client.on("error", (err) => {
  console.error(chalk.red(`❌ Error occurred: ${err.message}`));
});

loadCommands(client.prefixCommands, "prefix-commands");
loadCommands(client.slashCommands, "slash-commands");
loadEvents(client, "events");

process.on("unhandledRejection", (err) => {
  console.error(chalk.red(`⚠️ Unhandled promise rejection: ${err}`));
  if (client) {
    client
      .destroy()
      .then(() => client.login(settings.token))
      .catch((relogin) =>
        console.error(chalk.red(`❌ Failed to re-login: ${relogin}`))
      );
  } else {
    process.exit(1);
  }
});

client.on("disconnect", (event) => {
  switch (event.code) {
    case 4004:
      console.log(
        chalk.yellow(
          `⚠️ Disconnected: Authentication failure (${event.reason})`
        )
      );
      break;
    case 4010:
      console.log(
        chalk.yellow(`⚠️ Disconnected: Invalid shard (${event.reason})`)
      );
      break;
    default:
      console.log(
        chalk.yellow(`⚠️ Disconnected: ${event.reason} (Code: ${event.code})`)
      );
      break;
  }
});

client.login(settings.token);
