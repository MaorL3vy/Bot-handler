const chalk = require("chalk");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(chalk.bold.cyan("Bot is online and ready!"));
    console.log(chalk.yellow(`Logged in as: ${client.user.tag}`));

    try {
      const guilds = client.guilds.cache.array();

      for (const guild of guilds) {
        const slashCommands = client.slashCommands.map((command) =>
          command.data.toJSON()
        );
        await guild.commands.set(slashCommands);
        console.log(
          chalk.green(
            `Guild: ${guild.name} - Slash commands refreshed (${slashCommands.length} commands)`
          )
        );
      }

      console.log(chalk.bgGreen.black("Initialization complete."));
    } catch (error) {
      console.error(chalk.red("Initialization error:"), error);
    }
  },
};
