const { REST } = require('discord.js');
const { Routes } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { PermissionsBitField } = require('discord.js');
const token = process.env.token
const botID = "1244853392942170143";
const botToken = token
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
          })
          .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),
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
            .setMaxValue(4294967296)
          })
          .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),
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
          .setDescription("Insult a specified user! (credit: @Twentysix26 on GitHub)")
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
            .setMaxValue(4294967296)
          })
          .addNumberOption(option => {
            return option
            .setName("count")
            .setDescription("Set the number of times the dice rolls.")
            .setRequired(false)
            .setMaxValue(100)
          }),
          new SlashCommandBuilder()
          .setName("counting")
          .setDescription("Starts a counting game in the channel the command is ran in.")
          .addStringOption(option => {
            return option
            .setName("off")
            .setDescription("Turns off the counting game (select 'true' choice)")
            .setRequired(false)
            .addChoices(
              { name: "true", value: "true" },
            )
          }),
          new SlashCommandBuilder()
          .setName("collatz")
          .setDescription("Tests a given number against the Collatz Conjecture")
          .addIntegerOption(option => {
            return option
            .setName("number")
            .setDescription("List the number.")
            .setRequired(true)
            .setMaxValue(4294967296)
          }),
          new SlashCommandBuilder()
          .setName("unnick")
          .setDescription("Sets the nickname of everyone in this server to their username!")
          .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
          new SlashCommandBuilder()
          .setName("renick")
          .setDescription("Re-nicknames everyone after using the /unnick command.")
          .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),
          new SlashCommandBuilder()
          .setName("owner")
          .setDescription("Displays the owner of the server"),
          new SlashCommandBuilder()
          .setName("reactions")
          .setDescription("Toggles random reactions on/off.")
          .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),
          new SlashCommandBuilder()
          .setName("info")
          .setDescription("Displays bot info"),
          new SlashCommandBuilder()
          .setName("ping")
          .setDescription("Pong!"),
          new SlashCommandBuilder()
          .setName("help")
          .setDescription("Displays the help menu."),
          new SlashCommandBuilder()
          .setName("kill")
          .setDescription("Kills the bot. Can only be used by the creator."),
          new SlashCommandBuilder()
          .setName("quoting")
          .setDescription("Toggles quoting on/off.")
          .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),
          new SlashCommandBuilder()
          .setName("hangman")
          .setDescription("Start a game of hangman!"),
          new SlashCommandBuilder()
          .setName("reply")
          .setDescription("Reply to a message using the ID! Message must be in the channel the command is ran in.")
          .addStringOption(option => {
            return option
            .setName("receiver")
            .setDescription("Input the receiving-message ID.")
            .setRequired(true)
          })
          .addStringOption(option => {
            return option
            .setName("message")
            .setDescription("Input the message you want to send.")
            .setRequired(true)
          }),
          new SlashCommandBuilder()
          .setName("preview")
          .setDescription("Preview commands that will be added in the future!."),
          new SlashCommandBuilder()
          .setName("rps")
          .setDescription("Play RPS against the bot or another user!")
          .addStringOption(option => {
            return option
            .setName("choice")
            .setDescription("Choose whether you want to go rock, papers, or scissors")
            .addChoices(
              { name: 'rock', value: 'r' },
              { name: 'paper', value: 'p' },
              { name: 'scissors', value: 's' },
            )
            .setRequired(true)
          })
          .addUserOption(option => {
            return option
            .setName("user")
            .setDescription("Play against a user (leave empty to play against bot)")
            .setRequired(false)
          }),
          new SlashCommandBuilder()
          .setName("average")
          .setDescription("Calculates the average of up to 5 numbers.")
          .addNumberOption(option => {
            return option
            .setName("1")
            .setDescription("First number")
            .setRequired(true)
          })
          .addNumberOption(option => {
            return option
            .setName("2")
            .setDescription("Second number")
            .setRequired(true)
          })
          .addNumberOption(option => {
            return option
            .setName("3")
            .setDescription("Third number")
          })
          .addNumberOption(option => {
            return option
            .setName("4")
            .setDescription("Fourth number")
          })
          .addNumberOption(option => {
            return option
            .setName("5")
            .setDescription("Fifth number")
          })
        ]
      }
    );
  } catch (error) {
    console.error(error);
  }
};
slashRegister();
