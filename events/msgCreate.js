const chalk = require("chalk");
const settings = require("../settings/settings");

module.exports = {
  name: "messageCreate",

  execute(message, client) {
    if (
      message.author.bot ||
      !message.content.startsWith(settings.prefix) ||
      message.channel.type === "DM"
    ) {
      return;
    }

    const args = message.content
      .slice(settings.prefix.length)
      .trim()
      .split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.prefixcommands.get(commandName);

    if (!command) {
      return;
    }

    try {
      command.execute(message, args);
      console.log(
        chalk.green(
          `Command executed: ${commandName} by ${message.author.tag} in ${message.guild.name}`
        )
      );
    } catch (error) {
      console.error(chalk.red("Command execution error:"), error);
      message.reply({ content: `There was an error executing that command.` });
    }
  },
};
