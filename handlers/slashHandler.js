const { REST } = require("@discordjs/rest");
const { Routes } = reuqire("discord-api-types");
const settings = require("settings");
const { clientId, guildId } = require("../settings/settings");
const chalk = require("chalk");

const commands = [
  {
    name: "test",
    description: "a test command",
  },
];

const res = new REST({ version: "9" }).setToken(settings.token);

module.exports = {
  async registerSlashCommands() {
    try {
      console.log(chalk.green("(/) Are Loading..."));

      await rest.put(Routes.applicationGuildCommands(clientId, guildId)),
        { body: commands };
      console.log(chalk.green("Sucessfully loaded (/) Commands."));
    } catch (err) {
      console.error(err);
    }
  },
};
