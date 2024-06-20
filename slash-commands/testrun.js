const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const settings = require("../settings/settings");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Check if the bot is functioning properly"),

  async execute(interaction) {
    switch (interaction.commandName) {
      case "test":
        return await handleTestCommand(interaction);
      default:
        return await interaction.reply({
          content: "❌ Unknown command!",
          ephemeral: true,
        });
    }
  },
};

async function handleTestCommand(interaction) {
  const embed = new EmbedBuilder()
    .setTitle("Testing Command")
    .setDescription("This command is for testing purposes!")
    .setColor(settings.color)
    .build();

  return await interaction.reply({ embeds: [embed] });
}
