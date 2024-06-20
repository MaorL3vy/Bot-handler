const chalk = require("chalk");

module.exports = {
  name: "interactionCreate",

  execute(interaction, client) {
    try {
      if (interaction.isCommand()) {
        const { commandName } = interaction;
        const command = client.slashcommands.get(commandName);

        if (!command) {
          console.error(chalk.red(`❌ Command '${commandName}' not found.`));
          return interaction.reply({
            content: "❌ Command not found.",
            ephemeral: true,
          });
        }

        command.execute(interaction);
        console.log(chalk.green(`✅ Slash command executed: ${commandName}`));
      } else {
        console.log(
          chalk.yellow("⚠️ Unhandled interaction type:", interaction.type)
        );
      }
    } catch (error) {
      console.error(chalk.red("❗ Interaction handling error:"), error);
      return interaction.reply({
        content: "❗ There was an error while executing the command.",
        ephemeral: true,
      });
    }
  },
};
