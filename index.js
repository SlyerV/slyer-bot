const express = require("express");
const mysql = require('mysql');
const fs = require("fs");
const warns = require('./warns.json')
let nicks = require('./nicks.json')
let data = require("./data.json")
const { token } = require('./config.json')
const insults = require('./insults.json');
const { PermissionsBitField } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const app = express()
const compliments = ["cool","awesome","intelligent","handsome","amazing","wonderful","talented"]
const smembers= []
const highbase = {
	"10":"A",
	"11":"B",
	"12":"C",
	"13":"D",
	"14":"E",
	"15":"F",
	"16":"G",
	"17":"H",
	"18":"I",
	"19":"J",
	"20":"K",
	"21":"L",
	"22":"M",
	"23":"N",
	"24":"O",
	"25":"P",
	"26":"Q",
	"27":"R",
	"28":"S",
	"29":"T",
	"30":"U",
	"31":"V",
	"32":"W",
	"33":"X",
	"34":"Y",
	"35":"Z"
}
const lowbase = {
	"A":"10",
	"B":"11",
	"C":"12",
	"D":"13",
	"E":"14",
	"F":"15",
	"G":"16",
	"H":"17",
	"I":"18",
	"J":"19",
	"K":"20",
	"L":"21",
	"M":"22",
	"N":"23",
	"O":"24",
	"P":"25",
	"Q":"26",
	"R":"27",
	"S":"28",
	"T":"29",
	"U":"30",
	"V":"31",
	"W":"32",
	"X":"33",
	"Y":"34",
	"Z":"35"
}
let rmsg = ""
const replies = ["obviously","hell no","u really think so?","ask ur mom","slyer1 could ask a question better than that garbage","no 🗿","probably","stop asking stupid questions and get a life","I don't answer to morons like u","u thought u could ask such a dumb question? fuck off","affirmative","non-affirmative","yesn't","maybe...? 🤷‍♂️","why u asking me","ofc","DEF NOT","I would say yes but actually it's a no","I would say no but actually it's a yes","unaffirmative","hell yes","fuck no"]
// Hangman
const words = fs.readFileSync("./words.txt").toString('utf-8');
const list = words.split("\n")
let word = ""
let r = ""
let c = []
let i =  []
let s = 0
let l = 0
let g = ""
let gtxt = ""
const alphabet=["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
s1 = 
`|‾‾‾‾‾‾‾‾‾‾‾‾‾|
|             
|
|
|
|
|
|`
s2 =
`|‾‾‾‾‾‾‾‾‾‾‾‾‾|
|                         O
|
|
|
|
|
|`

s3 =
`|‾‾‾‾‾‾‾‾‾‾‾‾‾|
|                         O
|                          |
|                          |
|
|
|
|`
s4 =
`|‾‾‾‾‾‾‾‾‾‾‾‾‾|
|                         O
|                        \\\\|
|                          |
|
|
|
|`
s5 =
`|‾‾‾‾‾‾‾‾‾‾‾‾‾|
|                         O
|                        \\\\|/
|                          |
|
|
|
|`
s6 =
`|‾‾‾‾‾‾‾‾‾‾‾‾‾|
|                         O
|                        \\\\|/
|                          |
|                        /
|
|
|`
s7 =
`|‾‾‾‾‾‾‾‾‾‾‾‾‾|
|                         O
|                        \\\\|/
|                          |
|                        / \\
|
|
|`
let stages = [s1,s2,s3,s4,s5,s6,s7]
// RPS
let c1 = ""
let c2 = ""
// Funcs
function random(list) {
    return list[Math.floor(Math.random() * list.length)]
}
function randomnum(max) {
    return (Math.floor(Math.random() * max)+1)
}
function reverse(str) {
	return str.split('').reverse().join('')
}
function writewarns() {
  fs.writeFile(
    "warns.json",
    JSON.stringify(warns),
    err => {
    // Checking for errors 
    if (err) throw err;
    // Success 
    console.log("Wrote warns");
  }); 
}
function writenicks() {
  fs.writeFile(
    "nicks.json",
    JSON.stringify(nicks),
    err => {
    // Checking for errors 
    if (err) throw err;
    // Success 
    console.log("Wrote nicks");
  }); 
}
function writedata() {
  fs.writeFile(
    "data.json",
    JSON.stringify(data),
    err => {
    // Checking for errors 
    if (err) throw err;
    // Success 
    console.log("Wrote data");
  }); 
}
// Stored data
let counting = data.counting
let ncount = data.count
let channelid = data.channel
let oldid = data.countid
let nicked = data.nicked
let nerdmode = data.nerdmode
let quoting = data.quoting
let hangman = false
const con = mysql.createConnection({
  host: "mysql.db.bot-hosting.net",
  user: "u83224_f02owgaM5N",
  password: "7I.5A0!^TFBKHb9rH3SYmr1K"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL!");
  // con.query("CREATE DATABASE mydb", function (err, result) {
  //   if (err) throw err;
  //   console.log("Database created");
  // });
});
app.listen(3000, () => {
  const d = new Date()
  const t = d.toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
  console.log("Project is running.\n"+t)
})
app.get("/",(req,res) => {
  res.send("Hello World!");
})
const Discord = require("discord.js");
const client = new Discord.Client({intents: ["Guilds","GuildMessages","MessageContent","GuildEmojisAndStickers","GuildMembers","GuildMessageReactions"]})
client.on("interactionCreate", async int => {
  client.user.setActivity('/hangman');
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
      int.reply({ content: ("The Rathnorian date is **"+d+"**"), ephemeral: false });
    } else if (int.commandName === "praise") {
      int.reply("slyer1 is so "+random(compliments)+"!")
    } else if (int.commandName === "echo") {
      let emsg = int.options.getString("message");
      emsg = emsg.replace("@","")
      emsg = emsg.replace("<","<@")
      d = new Date()
      console.log(d+"\nEcho used by "+int.user.tag)
      int.reply({ content: "Message sent!", ephemeral: true });
      int.channel.send(emsg);
    } else if (int.commandName === "warn") {
      let user = int.options.getUser('user')
      let userS = String(user)
      if (userS in warns) {
        warns[userS] = warns[userS] + 1
      } else {
        warns[userS] = 1
      }
      // int.reply({ content: "Warn sent!", ephemeral: true });
      int.reply("<@"+user+"> \nWarning **" + warns[userS] + "**/3 \n" + int.options.getString('reason'))
      writewarns()
    } else if (int.commandName === "warnlist") {
      let user = int.options.getUser('user')
      let userS = String(user)
      if (! (userS in warns)) {
        warns[userS] = 0
      }
      int.reply(userS+" has **"+warns[userS]+"** warns.")
    } else if (int.commandName === "warnset") {
      let user = int.options.getUser('user')
      let userS = String(user)
      let num = int.options.getNumber('number')
      if (num < 0) {
        num = 0
      }
      warns[userS] = int.options.getNumber('number')
      int.reply(userS+"'s warn count is now **"+num+"**")
      writewarns()
    } else if (int.commandName === "8ball") {
        int.reply("(Prompt: "+int.options.getString('prompt')+")\n"+random(replies))
    } else if (int.commandName === "randping") {
        int.guild.members.fetch().then(members => {
        })
        int.guild.members.cache.forEach(member => smembers.push(member))
        int.reply("<@"+random(smembers)+"> you got randomly pinged lol have a nice day")
    } else if (int.commandName === "insult") {
        if (int.options.getUser('user') == "816099107545940008") {
            int.reply("You really thought you could insult my **creator**??? \n Nah just kidding lol \n <@816099107545940008> "+random(insults))
        } else if (int.options.getUser('user').id === "1244853392942170143") {
            int.reply("bro really thought he could insult **ME** the **SUPREME RULER**\nAs revenge, <@"+int.user.id+"> "+random(insults))
        } else {
          console.log(int.options.getUser('user'))
          int.reply("<@"+int.options.getUser('user')+"> "+random(insults))
        }
    } else if (int.commandName === "flipcoin") {
        if (randomnum(2) == 1) {
            int.reply("🗣️ It's **heads** 🗣️")
        } else {
            int.reply("🪙 It's **tails** 🪙")
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
        int.reply("(Size: d6)\n🎲 You rolled a **"+randomnum(6)+"** 🎲")
            } else {
                int.reply("(Size: d"+int.options.getNumber("size")+")\n🎲 You rolled a **"+randomnum(int.options.getNumber("size"))+"** 🎲")
                }
        } else {
            let count = int.options.getNumber("count")
            for (let x = 0; x < int.options.getNumber("count"); x++) {
                if ((int.options.getNumber("size") == undefined) || (int.options.getNumber("size") < 3)) {
                    rolltxt = rolltxt + "\n🎲 You rolled a **"+randomnum(6)+"** 🎲"
                } else {
                    rolltxt = rolltxt + "\n🎲 You rolled a **"+randomnum(int.options.getNumber("size"))+"** 🎲"
              }
          }
            int.reply(rolltxt)
        }
    } else if (int.commandName === "counting") {
        if (int.options.getString("off") === "true") {
            counting = false
            data["counting"] = false
            int.reply("Counting game turned **off**.")
            writedata()
        } else {
            counting = true
            channelid = int.channel.id
            oldid = 0
            ncount = 0
            int.reply("Counting game channel set to <#"+channelid+">! **Count has also reset to 0.**")
            data["counting"] = true
            data["channel"] = channelid
            writedata()
        }
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
        let collist = ""
        colnums.forEach(x => {
            if (x == 1) {
                collist+=String(x)
            } else if (x == colmax) {
                collist+="**"+String(x)+"**, "
            } else {
                collist+=String(x)+", "
            }
        })
        int.reply(int.options.getNumber("number")+" works and became 1 after **"+colcount+"** iterations.\n"+"Peak value: **"+colmax+"**\nList: "+collist)
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
          })
          writenicks()
          members.forEach(memb => {
              if (! memb.permissions.has(PermissionsBitField.Flags.Administrator))
                  memb.setNickname(memb.user.tag)
          })
          int.reply("Unnicked all non-admins >:)")
          nicked = true
          data["nicked"] = true
          writedata()
        } else {
          int.reply({ content: "You already used /unnick, use **/renick** to use it again", ephemeral: true });
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
            data["nicked"] = false
            nicks = {}
            writedata()
            writenicks()
        } else {
            int.reply({ content: "You didn't use **/unnick**", ephemeral: true });
        }
     } else if (int.commandName === "reactions") {
        if (nerdmode == false) {
          nerdmode = true
          int.reply("Reactions toggled **on**!")
          data["nerdmode"] = true
          writedata()
        } else {
          nerdmode = false
          int.reply("Reactions toggled **off**!")
          data["nerdmode"] = false
          writedata()
        }
     } else if (int.commandName === "owner") {
        const owner = await int.guild.fetchOwner()
        int.reply({ content:"The owner of the server is <@"+owner+">", ephemeral: true })
     } else if (int.commandName === "ping") {
        int.reply("Pong!\n🏓")
     } else if (int.commandName === "info") {
        int.reply("Creation date: **May 28th 2024**"+"\nCreator: **slyer1**\nGender: **Male**\nHeight: **undefined**\nWeight: **472.45 MB**\nSexuality: **Straight**\nStatus: **Single 😏**")
     } else if (int.commandName === "kill") {
        if (int.user.id == "816099107545940008") {
            int.reply("Bot successfully terminated 💀🫡")
            .then(() => {
                process.exit()  
            })
        } else {
            int.reply({ content: "You're not my creator...", ephemeral: true })
        }
     } else if (int.commandName === "quoting") {
        if (quoting == false) {
          quoting = true
          int.reply("Quoting toggled **on**!")
          data["quoting"] = true
          writedata()
        } else {
          quoting = false
          int.reply("Quoting toggled **off**!")
          data["quoting"] = false
          writedata()
        }
     } else if (int.commandName === "hangman") {
        if (hangman == false) {
            hangman = true
            word = list[Math.floor(Math.random() * list.length)]
            r = ""
            for (let x=0;x<word.length;x++) {
              r+="\\_ "
            }
            console.log(r)
            console.log(word)
            c = []
            i =  []
            s = 0
            l = 0
            g = ""
            gtxt = stages[s]+"\n"+r+"\n"
            console.log(r)
            int.reply(gtxt+"Hangman game started! Type any letter to guess.")
        } else {
            int.reply({ content: "A game has already started!", ephemeral: true })
        }
     } else if (int.commandName === "reply") {
        const id = int.options.getString("receiver")
        let caught = false
        try {
            const rmsg = int.channel.messages.cache.get(id)
            rmsg.reply(int.options.getString("message"))
        } catch {
            caught = true
            int.reply({ content:"Receiving-message ID is either invalid or in a different channel", ephemeral: true })
        }
        if (! caught) {
            int.reply({ content:"Message replied to!", ephemeral: true })
        }
     } else if (int.commandName === "preview") {
        int.reply("**FUTURE COMMANDS:**\n/tictactoe [user]: Challenge a user to a game of tic-tac-toe!\n/trivia [user] [number] [category]: Challenge a user to a game of trivia with a specific category and number of questions!\n\nIf you want to suggest a possible new command or feature, too bad so sad u can't :wompwomp: :skillissue:")
     } else if (int.commandName === "rps") {
        c1 = int.options.getString("choice")
	const p1 = "<@"+int.user.id+">"
        if (int.options.getUser("user")) {
	    const p2 = "<@"+int.options.getUser("user")+">"
            const rock = new ButtonBuilder()
			.setCustomId("r")
			.setLabel('🪨 Rock')
			.setStyle(ButtonStyle.Primary);
            const paper = new ButtonBuilder()
			.setCustomId("p")
			.setLabel('📃 Paper')
			.setStyle(ButtonStyle.Primary);
            const scissors = new ButtonBuilder()
			.setCustomId("s")
			.setLabel('✂️ Scissors')
			.setStyle(ButtonStyle.Primary);
            const cancel = new ButtonBuilder()
			.setCustomId("c")
			.setLabel('❌ Cancel')
			.setStyle(ButtonStyle.Danger);
    	    const row = new ActionRowBuilder()
			.addComponents(rock, paper, scissors, cancel);
            		const resp = await int.reply({ content:"<@"+int.options.getUser("user")+"> choose your move!", components: [row]})
			const collectorFilter = i => i.user.id === int.options.getUser("user").id;
			console.log(i)
			try {
				confirmation = await resp.awaitMessageComponent({ filter: collectorFilter, time: 20_000 })
				if ((confirmation.customId == "r") || (confirmation.customId == "p") || (confirmation.customId == "s")) {
					  c2 = confirmation.customId
					  if ((c1 == 'r') && (c2 == 'r')) {
					      int.editReply({ content: p1+" vs "+p2+"\n🤜  🤛\nTie!", components: []})
					  } else if ((c1 == 'p') && (c2 == 'p')) {
					      int.editReply({ content: p1+" vs "+p2+"\n🫱  🫲\nTie!", components: []})
					  } else if ((c1 == 's') && (c2 == 's')) {
					      int.editReply({ content: p1+" vs "+p2+"\n✌️  ✌️\nTie!", components: []})
					  } else if ((c1 == 'r') && (c2 == 'p')) {
					      int.editReply({ content: p1+" vs "+p2+"\n🤜  🫲\n"+p2+" wins!", components: []})
					  } else if ((c1 == 'r') && (c2 == 's')) {
					      int.editReply({ content: p1+" vs "+p2+"\n🤜  ✌️\n"+p1+" wins!", components: []})
					  } else if ((c1 == 'p') && (c2 == 'r')) {
					      int.editReply({ content: p1+" vs "+p2+"\n🫱  🤛\n"+p1+" wins!", components: []})
					  } else if ((c1 == 'p') && (c2 == 's')) {
					      int.editReply({ content: p1+" vs "+p2+"\n🫱  ✌️\n"+p2+" wins!", components: []})
					  } else if ((c1 == 's') && (c2 == 'r')) {
					      int.editReply({ content: p1+" vs "+p2+"\n✌️  🤛\n"+p2+" wins!", components: []})
					  } else if ((c1 == 's') && (c2 == 'p')) {
					      int.editReply({ content: p1+" vs "+p2+"\n✌️  🫲\n"+p1+" wins!", components: []})
					  }
				} else if (confirmation.customId === "c") {
					int.editReply({ content: "Action cancelled", components: []})
				}
			} catch (e) {
				int.editReply({ content: 'Confirmation not received within 20 seconds, cancelling', components: [] })
			}
        } else {
            const l = ["r","p","s"]
	    c2 = random(l)
	    const p2 = "<@1244853392942170143>"
	    if ((c1 == 'r') && (c2 == 'r')) {
	      int.reply({ content: p1+" vs "+p2+"\n🤜  🤛\nTie!", components: []})
	    } else if ((c1 == 'p') && (c2 == 'p')) {
	      int.reply({ content: p1+" vs "+p2+"\n🫱  🫲\nTie!", components: []})
	    } else if ((c1 == 's') && (c2 == 's')) {
	      int.reply({ content: p1+" vs "+p2+"\n✌️  ✌️\nTie!", components: []})
	    } else if ((c1 == 'r') && (c2 == 'p')) {
	      int.reply({ content: p1+" vs "+p2+"\n🤜  🫲\n"+p2+" wins!", components: []})
	    } else if ((c1 == 'r') && (c2 == 's')) {
	      int.reply({ content: p1+" vs "+p2+"\n🤜  ✌️\n"+p1+" wins!", components: []})
	    } else if ((c1 == 'p') && (c2 == 'r')) {
	      int.reply({ content: p1+" vs "+p2+"\n🫱  🤛\n"+p1+" wins!", components: []})
	    } else if ((c1 == 'p') && (c2 == 's')) {
	      int.reply({ content: p1+" vs "+p2+"\n🫱  ✌️\n"+p2+" wins!", components: []})
	    } else if ((c1 == 's') && (c2 == 'r')) {
	      int.reply({ content: p1+" vs "+p2+"\n✌️  🤛\n"+p2+" wins!", components: []})
	    } else if ((c1 == 's') && (c2 == 'p')) {
	      int.reply({ content: p1+" vs "+p2+"\n✌️  🫲\n"+p1+" wins!", components: []})
	    }
        }
     } else if (int.commandName === "math") {
	    if (int.options.getSubcommand() === "average") {
	        if (int.options.getNumber("5")) {
	            if ((! (int.options.getNumber(4))) || (! (int.options.getNumber(3)))) {
	                int.reply({ content: "Invalid input(s)", ephemeral: true })
	            } else {
	                const n1 = int.options.getNumber("1")
	                const n2 = int.options.getNumber("2")
	                const n3 = int.options.getNumber("3")
	                const n4 = int.options.getNumber("4")
	                const n5 = int.options.getNumber("5")
	                int.reply(String((n1+n2+n3+n4+n5)/5))
	            }
	        } else if (int.options.getNumber("4")) {
	            if (! (int.options.getNumber(3))) {
	                int.reply({ content: "Invalid input(s)", ephemeral: true })
	            } else {
	                const n1 = int.options.getNumber("1")
	                const n2 = int.options.getNumber("2")
	                const n3 = int.options.getNumber("3")
	                const n4 = int.options.getNumber("4")
	                int.reply(String((n1+n2+n3+n4)/4))
	            }
	        } else if (int.options.getNumber("3")) {
	            const n1 = int.options.getNumber("1")
	            const n2 = int.options.getNumber("2")
	            const n3 = int.options.getNumber("3")
	            int.reply(String((n1+n2+n3)/3))
	        } else {
	            const n1 = int.options.getNumber("1")
	            const n2 = int.options.getNumber("2")
	            int.reply(String((n1+n2)/2))
	        }
	    } else if (int.options.getSubcommand() === "base") {
		    let n = int.options.getNumber("number")
		    const b = int.options.getInteger("base")
		    let a = ""
		    let r = ""
		    while (true) {
			    r = Math.floor(n % b)
			    if (r >= 10) {
				    r = highbase[r]
			    }
			    a+=r
			    console.log(r)
			    n = n/b
			    if (n < 1) {
				    break
			    }
		    }
		    int.reply(`${int.options.getNumber("number")} converted to Base ${b} is **${reverse(a)}**`)
	    } else if (int.options.getSubcommand() === "calc") {
		    let caught = false
		    let expr = ""
		    let ans = ""
		    try {
			    expr = int.options.getString("expression")
			    ans = eval(expr)
		    } catch {
			    int.reply({content:"Invalid expression",ephemeral: true})
			    caught = true
		    }
		    if (! caught) {
			    int.reply(`The answer to ${expr} is **${ans}**`)
		    }
	    } else if (int.options.getSubcommand() === "base36") {
		    let n = int.options.getNumber("number")
		    let p = (n.length)-1
		    let caught = false
		    let r = 0
		    let v = 0
		    try {
			for (x of n) {
				v = lowbase[x]
				r+=(v*(36**p))
				p--
			}    
		    } catch {
			    int.reply("Invalid number, or number was too big")
			    caught = true
		    }
		    if (! caught) {
			    int.reply(`${n} converted to Base 10 is ${r}`)
		    }
	    }
     } else if (int.commandName === "react") {
	    let caught = false
	    try {
		    const emoji = int.options.getString("emoji")
		    if (int.options.getString("message")) {
			    int.channel.messages.cache.get(int.options.getString("message")).react(emoji)
		    } else {
			    rmsg.react(emoji)
		    }
	    } catch {
		    int.reply({content:"Invalid message or emoji",ephemeral: true})
		    caught = true
	    }
	    if (! caught) {
		    int.reply({content:"Message reacted to!",ephemeral: true})
	    }
     } else if (int.commandName === "test") {
	    int.reply({content:"Bot is fully functional",ephemeral: true})
     } else if (int.commandName === "date") {
	    let d = new Date()
	    d = d.toLocaleString("en-US", {timeZone: "America/Los_Angeles"})
	    int.reply("The date is "+d)
     }
   }
});
// MESSAGES
client.on("messageCreate", async msg => {
    rmsg = msg
    if ((counting == true) && (msg.channel.id == channelid) && (! msg.author.bot)) {
        ncount = ncount+1
        if ((msg.content == ncount) && (msg.author.id != oldid)) {
            console.log("count success")
            msg.react("✅")
            oldid = msg.author.id
        } else if (! isNaN(msg.content)) {
            x = Number(msg.content)
            console.log(x)
            console.log(ncount)
            console.log("count fail")
            msg.react("😡")
            msg.react("❌")
            msg.reply("<@"+msg.author.id+"> MESSED UP DA COUNT AT **"+ncount+"**!!! Count reset to 0.")
            ncount = 0
            oldid = 0
        } else {
            ncount = ncount-1
        }
        data["count"] = ncount
        data["countid"] = oldid 
        writedata()
    }
    if ((nerdmode == true) && (randomnum(10) == 1) && (! msg.author.bot)) {
      try {
          const r = randomnum(3)
          if (r == 1) {
            msg.react("🤓")
            msg.react("☝️")
          } else if (r == 2) {
            msg.react("<:womp:1255197707040194652>")
          } else {
            msg.react('🏳️‍🌈')
          }
      } catch(err) {
        console.log(err)
      }
    }
    if (msg.channel.id != "1253010049199243398") {
      if ((msg.author.id == "947534567781331024") || (msg.author.id == "1025868793068658718")) {
        if ((msg.content.includes("love")) || (msg.content.includes("💗")) || (msg.content.includes("<3")) || (msg.content.includes("princess")) || (msg.content.includes("NESTEROVICH")) || msg.content.includes("Love") || msg.content.includes("🩷")) {
          msg.reply("<#1253010049199243398> <:cringe:1227877222430281759>")
        }
      }
    }
    if ((hangman == true) && (alphabet.includes(msg.content))) {
      function writetxt() {
          r = ""
          l = 0
          for (y of word) {
            let added = false
            for (x of c) {
              if (x == y) {
                r+=(x+" ")
                added = true
                l+=1
              }
            }
            if (! added) {
              r+="\\_ "  
            }
          }
          gtxt = stages[s]+"\n"+r+"\n"
      }
      g = msg.content.toLowerCase()
      if (c.includes(g)) {
        msg.reply("Already said that letter.")
      } else if (word.includes(g)) {
        c.push(g)
        writetxt()
        msg.reply(gtxt+"Correct letter!")
      } else {
        s+=1
        i.push(g)
        writetxt()
        msg.reply(gtxt+"Incorrect letter.")
      }
      if (s == 6) {
        msg.reply("You lost! :(\n\nThe word was **"+word+"**")
        hangman = false
      } else if (l == word.length) {
        msg.reply("You won! :)")
        hangman = false
      }
    }
    if ((msg.author.id == "947534567781331024") && (randomnum(20) == 1)) {
        try {
            msg.react("🇸")
            msg.react("🇹")
            msg.react("🇫")
            msg.react("🇺")
            msg.react("🐒")
        } catch(err) {
            console.log(err)
        }
    }
})
client.on("messageDelete", async dmsg => {
    const d = new Date()
    if (quoting == true) {
        if ((dmsg.author.id == "947534567781331024") || (dmsg.author.id == "1025868793068658718")) {
            client.channels.cache.get("1179602392367517766").send('"'+dmsg.content+'" - <@'+dmsg.author.id+'> in <#'+dmsg.channel.id+">")
        }
    }
})
client.login(token)
