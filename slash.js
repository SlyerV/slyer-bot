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
          })
          .addBooleanOption(option => {
            return option
            .setName("best")
            .setDescription("Use the best insults handpicked from the list of nearly 200!")
            .setRequired(false)
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
          .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
          .addBooleanOption(option => {
            return option
            .setName("ephemeral")
            .setDescription("Makes the message ephemeral if set to true >:)")
            .setRequired(false)
          }),
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
          .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)
          .addBooleanOption(option => {
            return option
            .setName("ephemeral")
            .setDescription("Makes the TOGGLE ON message ephemeral if set to true >:)")
            .setRequired(false)
          }),
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
          .setName("math")
          .setDescription("Use many useful math commands without switching tabs!")
          .addSubcommand(sub => {
            return sub
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
          })
          .addSubcommand(sub => {
            return sub
            .setName("base")
            .setDescription("Converts a decimal (base 10) number to any base from 2-36.")
            .addNumberOption(option => {
              return option
              .setName("number")
              .setDescription("Choose the decimal number you want to convert.")
              .setRequired(true)
            })
            .addIntegerOption(option => {
              return option
              .setName("base")
              .setDescription("Choose the base you want to convert to (from 2-36).")
              .setRequired(true)
              .setMaxValue(36)
              .setMinValue(2)
            })
          })
          .addSubcommand(sub => {
            return sub
            .setName("base36")
            .setDescription("Converts a base 36 number to base 10. Use funny words! ('A' = 10, 'B' = 11, 'C' = 12, etc.)")
            .addStringOption(option => {
              return option
              .setName("number")
              .setDescription("Choose the base 36 number you want to convert.")
              .setRequired(true)
            })
          })
          .addSubcommand(sub => {
            return sub
            .setName("calc")
            .setDescription("Calculate any mathematical expression!")
            .addStringOption(option => {
              return option
              .setName("expression")
              .setDescription("Choose the expression you want to calculate.")
              .setRequired(true)
            })
          }),
          new SlashCommandBuilder()
          .setName("react")
          .setDescription("React with a specific emoji!")
          .addStringOption(option => {
            return option
            .setName("emoji")
            .setDescription("Choose the emoji you want to react with.")
            .setRequired(true)
          })
          .addStringOption(option => {
            return option
            .setName("message")
            .setDescription("Input message ID of the message you want to react to (leave blank for most recent channel message).")
            .setRequired(false)
          }),
          new SlashCommandBuilder()
          .setName("test")
          .setDescription("Tests if the bot is online/functional."),
          new SlashCommandBuilder()
          .setName("date")
          .setDescription("Get the current date in LA, California (PST)"),
          new SlashCommandBuilder()
          .setName("getid")
          .setDescription("Fetch the ID of messages, users, channels, etc.")
          .addSubcommand(sub => {
            return sub
            .setName("message")
            .setDescription("Fetch the ID of a message using message link, or leave blank for most recent channel message.")
            .addStringOption(option => {
              return option
              .setName("link")
              .setDescription("Input the message link you want to get the ID of (leave blank for most recent msg)")
              .setRequired(false)
            })
          })
          .addSubcommand(sub => {
            return sub
            .setName("user")
            .setDescription("Fetch the ID of a user.")
            .addUserOption(option => {
              return option
              .setName("user")
              .setDescription("Input the user you want to get the ID of.")
              .setRequired(true)
            })
          })
          .addSubcommand(sub => {
            return sub
            .setName("channel")
            .setDescription("Fetch the ID of a specific channel, or leave blank for the channel command is ran in.")
            .addChannelOption(option => {
              return option
              .setName("channel")
              .setDescription("Input the channel you want to get the ID of (leave blank for current channel)")
              .setRequired(false)
            })
          })
          .addSubcommand(sub => {
            return sub
            .setName("role")
            .setDescription("Fetch the ID of a role.")
            .addRoleOption(option => {
              return option
              .setName("role")
              .setDescription("Input the role you want to get the ID of.")
              .setRequired(true)
            })
          })
          .addSubcommand(sub => {
            return sub
            .setName("guild")
            .setDescription("Fetch the id of the server/guild command is ran in.")
          }),
          new SlashCommandBuilder()
          .setName("tictactoe")
          .setDescription("Play tic-tac-toe with another user or the AI!")
          .addUserOption(option => {
            return option
            .setName("user")
            .setDescription("Choose a user")
            .setRequired(false)
          })
          .addBooleanOption(option => {
            return option
            .setName("ai")
            .setDescription("If you have no friends, play against the AI! (random moves)")
            .setRequired(false)
          }),
          new SlashCommandBuilder()
          .setName("afk")
          .setDescription("Set, change and remove AFK status.")
          .addSubcommand(sub => {
            return sub
            .setName("set")
            .setDescription("Set your AFK status. Your nickname will also be changed to [AFK] + your nickname.")
            .addStringOption(option => {
              return option
              .setName("message")
              .setDescription("Whenever you are pinged, this AFK message will be sent.")
              .setRequired(true)
            })
          })
          .addSubcommand(sub => {
            return sub
            .setName("list")
            .setDescription("List all AFK users.")
            
          })
          .addSubcommand(sub => {
            return sub
            .setName("clear")
            .setDescription("Clear someone's AFK status, or clear all AFK statuses.")
            .addUserOption(option => {
              return option
              .setName("user")
              .setDescription("Choose a user to clear their AFK status (leave blank to clear all)")
              .setRequired(false)
            })
          })
          .addSubcommand(sub => {
            return sub
            .setName("remove")
            .setDescription("Remove your AFK status if you have one.")
          })
          .addSubcommand(sub => {
            return sub
            .setName("edit")
            .setDescription("Edit your AFK status.")
            .addStringOption(option => {
              return option
              .setName("message")
              .setDescription("Write the message you want to change your AFK status message to.")
              .setRequired(true)
            })
          })
          .addSubcommand(sub => {
            return sub
            .setName("schedule")
            .setDescription("Schedule times that you will be AFK. MUST DO /afk set BEFORE THIS")
            .addIntegerOption(option => {
              return option
              .setName("starthour")
              .setDescription("Set the starting hour that you will be AFK (LA, California, PST, 24-hour clock)")
              .setRequired(true)
              .setMaxValue(24)
              .setMinValue(0)
            })
            .addIntegerOption(option => {
              return option
              .setName("startminute")
              .setDescription("Set the starting minute that you will be AFK (LA, California, PST, 24-hour clock)")
              .setRequired(true)
              .setMaxValue(59)
              .setMinValue(0)
            })
            .addIntegerOption(option => {
              return option
              .setName("endhour")
              .setDescription("Set the ending hour that you will be AFK (LA, California, PST, 24-hour clock)")
              .setRequired(true)
              .setMaxValue(24)
              .setMinValue(0)
            })
            .addIntegerOption(option => {
              return option
              .setName("endminute")
              .setDescription("Set the ending minute that you will be AFK (LA, California, PST, 24-hour clock)")
              .setRequired(true)
              .setMaxValue(59)
              .setMinValue(0)
            })
            .addStringOption(option => {
              return option
              .setName("days")
              .setDescription("Choose the days that you will be AFK.")
              .setRequired(true)
              .addChoices(
                {name:"Weekdays",value:"wkd"},
                {name:"Weekends",value:"wkn"},
                {name:"Everyday",value:"evd"}
              )
            })
          }),
          new SlashCommandBuilder()
          .setName("genalpha")
          .setDescription("Make the bot randomly talk using Gen Alpha slang 🤫🧏‍♂️")
          .addBooleanOption(option => {
            return option
            .setName("ephemeral")
            .setDescription("Makes the TOGGLE ON message ephemeral if set to true >:)")
            .setRequired(false)
          }),
          new SlashCommandBuilder()
          .setName("level")
          .setDescription("Level system")
          .addSubcommand(sub => {
            return sub
            .setName("view")
            .setDescription("Check your or someone else's slyer-bot level! Level up by using slyer-bot commands.")
            .addUserOption(option => {
              return option
              .setName("user")
              .setDescription("View someone else's level rank.")
              .setRequired(false)
            })
          })
          .addSubcommand(sub => {
            return sub
            .setName("leaderboard")
            .setDescription("View the slyer-bot level leaderboard!")
          })
          .addSubcommand(sub => {
            return sub
            .setName("info")
            .setDescription("View info on how to level up.")
          })
          .addSubcommand(sub => {
            return sub
            .setName("next")
            .setDescription("View how much XP you need to reach the next level.")
          }),
          new SlashCommandBuilder()
          .setName("trivia")
          .setDescription("Answer a random trivia question correctly against someone else first!")
          .addUserOption(option => {
            return option
            .setName("user")
            .setDescription("Choose a user to play against.")
            .setRequired(true)
          })
        ]
      }
    );
  } catch (error) {
    console.error(error);
  }
};
slashRegister();
