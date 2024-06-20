const settings = require("../settings/settings");
const { EmbedBuilder } = require("./utils/embedBuilder");

module.exports = {
  name: "test",
  description: "Check if the bot is functioning properly",

  async execute(message, args) {
    const embed = new EmbedBuilder()
      .setColor(settings.color)
      .setTitle("Bot Test")
      .setDescription("The bot is operational!")
      .setTimestamp()
      .build();

    try {
      await message.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Failed to execute 'test' command:", error);
      await message.reply(
        "❌ Failed to execute 'test' command. Please try again later."
      );
    }
  },
};
