const express = require("express");
const insults = require('./insults.json');
const {  token  } = require("./config.json")
const { PermissionsBitField } = require('discord.js');
const app = express()
const compliments = ["cool","awesome","intelligent","handsome","amazing","wonderful","talented"]
const curses = ["fuck","bitch","hell","sex","porn"," ass ","shit","wtf","wth","stfu","idgaf","lmao","lmfao","sthu","tf","nigga","nigger"]
let i = 0
let filter = false
let counting = false
let ncount = 0
let channelid = 0
let oldid = 0
let nicks = {}
let nicked = false
let nerdmode = false
let warns = {
  key: "test",
  value: 0
}
const smembers= []
const replies = ["obviously","hell no","u really think so?","ask ur mom","slyer1 could ask a question better than that garbage","no 🗿","probably","stop asking stupid questions and get a life","I don't answer to morons like u","u thought u could ask such a dumb question? fuck off","affirmative","non-affirmative","yesn't","maybe...? 🤷‍♂️","why u asking me","ofc","DEF NOT","I would say yes but actually it's a no","I would say no but actually it's a yes"]
function random(list) {
    return list[Math.floor(Math.random() * list.length)]
}
function randomnum(max) {
    return (Math.floor(Math.random() * max)+1)
}
app.listen(3000, () => {
  console.log("Project is running.")
})
app.get("/",(req,res) => {
  res.send("Hello World!");
})
const Discord = require("discord.js");
const client = new Discord.Client({intents: ["Guilds","GuildMessages","MessageContent","GuildEmojisAndStickers","GuildMembers","GuildMessageReactions"]})
client.on("interactionCreate", async int => {
  if (int.isCommand()) {
    if (int.commandName === "rdate") {
      let currentT = new Date();
      const oldT = new Date("Wed May 15 2024 00:00:00 GMT-0700 (Pacific Daylight Time)")
      const startT = new Date("1901-4-26")
      let a = null
      let h = currentT.getHours()+17;
      if (h>=24) {
        h=h-24
      }
      if ((h >= 8 && h <= 22)) {
        a = Math.trunc(h/2-4)
      } else if (h < 8) {
        a = -1
        currentT = new Date(currentT.getTime())
      } else if (h > 22) {
        a = 6
      }
      const T = new Date(startT.getTime()+7*(currentT.getTime()-oldT.getTime()-h*60*60*1000)+a*24*60*60*1000);
      const d = T.toLocaleDateString();
      int.reply({ content: ("The Rathnorian date is "+d), ephemeral: true });
    } else if (int.commandName === "praise") {
      int.reply("slyer1 is so "+random(compliments)+"!")
    } else if (int.commandName === "echo") {
      let msg = int.options.getString("message");
      msg = msg.replace("@","")
      msg = msg.replace("<","<@")
      d = new Date()
      console.log(d+"\nEcho used by "+int.user.tag)
      int.reply({ content: "Message sent!", ephemeral: true });
      int.channel.send(msg);
    } else if (int.commandName === "warn") {
      let user = int.options.getUser('user')
      let userS = String(user)
      if (userS in warns) {
        warns[userS] = warns[userS] + 1
      } else {
        warns[userS] = 1
      }
      // int.reply({ content: "Warn sent!", ephemeral: true });
      int.reply("<@"+user+"> \nWarning " + warns[userS] + "/3 \n" + int.options.getString('reason'))
    } else if (int.commandName === "warnlist") {
      let user = int.options.getUser('user')
      let userS = String(user)
      if (! (userS in warns)) {
        warns[userS] = 0
      }
      int.reply(userS+" has "+warns[userS]+" warns.")
    } else if (int.commandName === "warnset") {
      let user = int.options.getUser('user')
      let userS = String(user)
      let num = int.options.getNumber('number')
      if (num < 0) {
        num = 0
      }
      warns[userS] = int.options.getNumber('number')
      int.reply(userS+"'s warn count is now "+num)
    } else if (int.commandName === "8ball") {
        int.reply("(Prompt: "+int.options.getString('prompt')+")\n"+random(replies))
    } else if (int.commandName === "randping") {
        int.guild.members.fetch().then(members => {
        })
        int.guild.members.cache.forEach(member => smembers.push(member))
        int.reply("<@"+random(smembers)+"> you got randomly pinged lol have a nice day")
    } else if (int.commandName === "insult") {
        if (int.options.getUser('user') == "816099107545940008") {
            int.reply("You really thought you could insult my creator??? \n Nah just kidding lol \n <@816099107545940008> "+random(insults))
        } else if (int.options.getUser('user').id === "1244853392942170143") {
            int.reply("bro really thought he could insult ME the SUPREME RULER")
          int.channel.send("As revenge, <@"+int.user.id+"> "+random(insults))
    } else {
          console.log(int.options.getUser('user'))
          int.reply("<@"+int.options.getUser('user')+"> "+random(insults))
        }
    } else if (int.commandName === "flipcoin") {
        if (randomnum(2) == 1) {
            int.reply("🗣️ It's heads 🗣️")
        } else {
            int.reply("🪙 It's tails 🪙")
        }
    } else if (int.commandName === "rolldice") {
        let rolltxt = ""
        if (int.options.getNumber("size") == undefined) {
            rolltxt = "(Size: d6)"
        } else {
      rolltxt = "(Size: d"+int.options.getNumber("size")+")"
        }
        if ((int.options.getNumber("count") == undefined) || (int.options.getNumber("count") < 0)) {
            let count = 1
            if ((int.options.getNumber("size") == undefined) || (int.options.getNumber("size") < 3)) {
        int.reply("(Size: d6)\n🎲 You rolled a "+randomnum(6)+" 🎲")
            } else {
                int.reply("(Size: d"+int.options.getNumber("size")+")\n🎲 You rolled a "+randomnum(int.options.getNumber("size"))+" 🎲")
                }
        } else {
            let count = int.options.getNumber("count")
            for (let x = 0; x < int.options.getNumber("count"); x++) {
                if ((int.options.getNumber("size") == undefined) || (int.options.getNumber("size") < 3)) {
                    rolltxt = rolltxt + "\n🎲 You rolled a "+randomnum(6)+" 🎲"
                } else {
                    rolltxt = rolltxt + "\n🎲 You rolled a "+randomnum(int.options.getNumber("size"))+" 🎲"
              }
          }
            int.reply(rolltxt)
        }
    } else if (int.commandName === "filter") {
        if (filter == false) {
            filter = true
            int.reply("Filter toggled on!")
        } else {
            filter = false
            int.reply("Filter toggled off!")
        }
    } else if (int.commandName === "counting") {
        counting = true
        channelid = int.channel.id
        oldid = 0
        ncount = 0
        int.reply("Counting channel set to <#channelid>! Count has also reset to 0.")
    } else if (int.commandName === "collatz") {
        let collatz = int.options.getNumber("number")
        let colcount = 0
        let colnums = []
        while (true) {
            if (collatz % 2 == 0) {
                collatz = collatz/2
            } else {
                collatz = (collatz*3)+1
            }
            colnums.push(collatz)
            colcount++
            if (collatz == 1) {
                break
            }
        }
        const colmax = colnums.reduce((a,b) => Math.max(a,b), -Infinity)
        int.reply(int.options.getNumber("number")+" works and became 1 after "+colcount+" iterations.\n"+"Peak value: "+colmax+"\nList: "+colnums)
     } else if (int.commandName === "unnick") {
        if (nicked == false) {
          const server = int.guild
          const members = await server.members.fetch()
          let nick = null
          members.forEach(member => {
              if (member.nickname == null) {
                  nick = member.displayName
              } else {
                  nick = member.nickname
              }
              nicks[member.user.id] = nick
              console.log(nick)
          })
          console.log(nicks)
          members.forEach(memb => {
              if (! memb.permissions.has(PermissionsBitField.Flags.Administrator))
                  memb.setNickname(memb.user.tag)
          })
          int.reply("Unnicked all non-admins >:)")
          nicked = true
        } else {
          int.reply({ content: "You already used /unnick, use /renick to use it again", ephemeral: true });
        }
     } else if (int.commandName === "renick") {
        let server = int.guild
        let members = await server.members.fetch()
        if (nicked == true) {
            console.log(nicks)
            members.forEach(member => {
                console.log(nicks[member.user.id])
                if (! member.permissions.has(PermissionsBitField.Flags.Administrator))
                    member.setNickname(nicks[member.user.id])
            })
            int.reply("Re-nicked all non-admins :)")
            nicked = false
            nicks = {}
        } else {
            int.reply({ content: "You didn't use /unnick", ephemeral: true });
        }
     } else if (int.commandName === "nerdmode") {
        if (nerdmode == false) {
          nerdmode = true
          int.reply("Nerd reactions toggled on!")
        } else {
          nerdmode = false
          int.reply("Nerd reactions toggled off!")
        }
     } else if (int.commandName === "owner") {
        const owner = await int.guild.fetchOwner()
        int.reply({ content:"The owner of the server is <@"+owner+">", ephemeral: true })
     } else if (int.commandName === "ping") {
        int.reply("Pong!\n🏓")
     } else if (int.commandName === "info") {
        int.reply("Creation date: May 28th 2024"+"\nCreator: slyer1\nGender: Male\nHeight: undefined\nWeight: 32 MB\nSexuality: Straight\nStatus: Single 😏")
     }
  }
});
client.on("messageCreate", async msg => {
    if ((counting == true) && (msg.channel.id == channelid) && (msg.author.id != "1244853392942170143")) {
        ncount = ncount+1
        if ((msg.content == ncount) && (msg.author.id != oldid)) {
            console.log("count success")
            msg.react("✅")
        } else {
            console.log(ncount)
            console.log("count fail")
            msg.react("😡")
            msg.react("❌")
            msg.reply("<@"+msg.author.id+"> MESSED UP DA COUNT AT "+ncount+"!!! Counting game turned off.")
            ncount = 0
        }
        oldid = msg.author.id
    }
    if (filter == true) {
        for (x of curses) {
            if (msg.content.includes(x)) {
                msg.reply("that's a no-no word! 😡👎")
            }
        }
    }
    if ((nerdmode == true) && (randomnum(10) == 1) && (msg.author.id != "816099107545940008")) {
      msg.react("🤓")
      msg.react("👆")
    }
    if (msg.channel.id != "1253010049199243398")
      if ((msg.content.includes("love")) || (msg.content.includes("💗")) || (msg.content.includes("<3")) || (msg.content.includes("princess")) || (msg.content.includes("bodyguard")) || (msg.content.includes("NESTEROVICH")))
        msg.reply("<#1253010049199243398> <:cringe:1227877222430281759>")
})
client.login(token)
