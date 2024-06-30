const { REST } = require('discord.js');
const { Routes } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const botID = "1244853392942170143";
const botToken = process.env.token
const restv = new REST({ version: '10' }).setToken(botToken);
const slashRegister = async () => {
  try {
    await restv.put(
      Routes.applicationCommands(botID),
      {
        body: [
          new SlashCommandBuilder()
            .setName("rdate")
            .setDescription("Lists the Rathnorian date."),
          new SlashCommandBuilder()
            .setName("praise")
            .setDescription("Praise slyer1 for the hours of work he put into this bot! (totally not narcissistic)"),
          new SlashCommandBuilder()
          .setName("echo")
          .setDescription("Send a specified message!")
          .addStringOption(option => {
            return option
            .setName("message")
            .setDescription("Type the message here.")
            .setRequired(true)
          }),
          new SlashCommandBuilder()
          .setName("warn")
          .setDescription("Warns a user")
          .addUserOption(option => {
            return option
            .setName("user")
            .setDescription("List the user.")
            .setRequired(true)
          })
          .addStringOption(option => {
            return option
            .setName("reason")
            .setDescription("List the reason.")
            .setRequired(true)
          }),
          new SlashCommandBuilder()
          .setName("warnlist")
          .setDescription("Lists the warns of a specified user.")
          .addUserOption(option => {
            return option
            .setName("user")
            .setDescription("List the user.")
            .setRequired(true)
          }),
          new SlashCommandBuilder()
          .setName("warnset")
          .setDescription("Set the warn count of a specified user.")
          .addUserOption(option => {
            return option
            .setName("user")
            .setDescription("List the user.")
            .setRequired(true)
          })
          .addNumberOption(option => {
            return option
            .setName("number")
            .setDescription("Set the number.")
            .setRequired(true)
          }),
          new SlashCommandBuilder()
          .setName("8ball")
          .setDescription("Ask the magic 8ball.")
          .addStringOption(option => {
            return option
            .setName("prompt")
            .setDescription("List the prompt.")
            .setRequired(true)
          }),
          new SlashCommandBuilder()
          .setName("randping")
          .setDescription("Ping a random person!"),
          new SlashCommandBuilder()
          .setName("insult")
          .setDescription("Insult a specified user! (credit: @Twentysix26 on GitHub")
          .addUserOption(option => {
            return option
            .setName("user")
            .setDescription("List the user.")
            .setRequired(true)
          }),
          new SlashCommandBuilder()
          .setName("flipcoin")
          .setDescription("Flip a coin."),
          new SlashCommandBuilder()
          .setName("rolldice")
          .setDescription("Roll dice!")
          .addNumberOption(option => {
            return option
            .setName("size")
            .setDescription("Set size of dice (optional).")
            .setRequired(false)
          })
          .addNumberOption(option => {
            return option
            .setName("count")
            .setDescription("Set the number of times the dice rolls.")
            .setRequired(false)
            .setMaxValue(100)
          }),
          new SlashCommandBuilder()
          .setName("filter")
          .setDescription("Toggles the no-no word filter on or off."),
          new SlashCommandBuilder()
          .setName("counting")
          .setDescription("Starts a counting game in the channel the command is ran in."),
          new SlashCommandBuilder()
          .setName("collatz")
          .setDescription("Tests a given number against the Collatz Conjecture")
          .addNumberOption(option => {
            return option
            .setName("number")
            .setDescription("List the number.")
            .setRequired(true)
          }),
          new SlashCommandBuilder()
          .setName("unnick")
          .setDescription("Sets the nickname of everyone in this server to their username!"),
          new SlashCommandBuilder()
          .setName("renick")
          .setDescription("Re-nicknames everyone after using the /unnick command.")
        ]
      }
    );
  } catch (error) {
    console.error(error);
  }
};
slashRegister();