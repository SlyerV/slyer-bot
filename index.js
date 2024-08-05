// Requirements
const express = require("express");
const mysql = require('mysql');
const fs = require("fs");
const warns = require('./warns.json')
let nicks = require('./nicks.json')
let status = require('./status.json')
const xp = require('./xp.json')
let data = require("./data.json")
const { token } = require('./config.json')
const insults = require('./insults.json');
const questions = require('./trivia.json')
const { PermissionsBitField } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const app = express()
// Random global vars
const compliments = ["cool","awesome","intelligent","amazing","talented"]
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
let hangplayer = ""
let hangid = ""
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
// Tic Tac Toe
let tic = false
let ticai = false
let ticid = ""
let tp1 = ""
let tp2 = ""
const pos = {}
const usyms = {
  "1":"__X__",
  "2":"__O__"
}
const dsyms = {
  "1":"X",
  "2":"O"
}
pos[1] ="\\_"
pos[2] ="\\_"
pos[3] ="\\_"
pos[4] ="\\_"
pos[5] ="\\_"
pos[6] ="\\_"
pos[7]="  "
pos[8]="  "
pos[9] = "  "
let p1 = ""
let p2 = ""
let p3 = ""
let p4 = ""
let p5 = ""
let p6 = ""
let p7 = ""
let p8 = ""
let p9 = ""
let board = ""
let n = "\n"
let b = "\\|"
let player = tp1
let playerid = ""
let usym = usyms[player]
let dsym = dsyms[player]
let stop = false
let tie = false
const inps = ["1","2","3","4","5","6","7","8","9"]
let avinps = ["1","2","3","4","5","6","7","8","9"]
function update() {
  board = pos[1]+b+pos[2]+b+pos[3]+n+pos[4]+b+pos[5]+b+pos[6]+n+pos[7]+b+pos[8]+b+pos[9]
  if (player == tp1) {
	  usym = usyms["1"]
	  dsym = dsyms["1"]
  } else {
	  usym = usyms["2"]
	  dsym = dsyms["2"]
  }
  p1=pos[1]
  p2=pos[2]
  p3=pos[3]
  p4=pos[4]
  p5=pos[5]
  p6=pos[6]
  p7=pos[7]
  p8=pos[8]
  p9=pos[9]
  if (((p1==usym)&&(p2==usym)&&(p3==usym)) ||
     ((p4==usym)&&(p5==usym)&&p6==usym) ||
     ((p7==dsym)&&(p8==dsym)&&(p9==dsym)) ||
     ((p1==usym)&&(p4==usym)&&(p7==dsym)) ||
     ((p2==usym)&&(p5==usym)&&(p8==dsym)) ||
     ((p3==usym)&&(p6==usym)&&(p9==dsym)) ||
     ((p1==usym)&&(p5==usym)&&(p9==dsym)) ||
     ((p3==usym)&&(p5==usym)&&(p7==dsym))) {
    stop = true
  } else if ((Object.values(usyms).includes(pos[1])) && 
	     (Object.values(usyms).includes(pos[2])) && 
	     (Object.values(usyms).includes(pos[3])) && 
	     (Object.values(usyms).includes(pos[4])) && 
	     (Object.values(usyms).includes(pos[5])) && 
	     (Object.values(usyms).includes(pos[6])) && 
	     (Object.values(dsyms).includes(pos[7])) && 
	     (Object.values(dsyms).includes(pos[8])) && 
	     (Object.values(dsyms).includes(pos[9]))) {
	  tie = true
  }
  if (! ticai) {
	  if (player == tp1) {
	    	player = tp2
	  } else {
	    	player = tp1
	  }
	  playerid = player.replace("<@","").replace(">","")
  }
}
// Trivia
let trivchannel
let trivid
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
function fetchKey(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function level(xp) {
	if (xp < 5) {
		return 0
	} else if (xp < 25) {
		return 1
	} else if (xp < 100) {
		return 2
	} else if (xp < 250) {
		return 3
	} else if (xp < 500) {
		return 4
	} else if (xp < 1000) {
		return 5
	} else if (xp < 2000) {
		return 6
	} else if (xp < 5000) {
		return 7
	} else if (xp < 7500) {
		return 8
	} else if (xp < 10000) {
		return 9
	} else {
		return 10
	}
}
const maxxp = {
	0:5,
	1:25,
	2:100,
	3:250,
	4:500,
	5:1000,
	6:2000,
	7:5000,
	8:7500,
	9:10000
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
function writestatus() {
  fs.writeFile(
    "status.json",
    JSON.stringify(status),
    err => {
    // Checking for errors 
    if (err) throw err;
    // Success 
    console.log("Wrote status");
  });
}
function writexp() {
  fs.writeFile(
    "xp.json",
    JSON.stringify(xp),
    err => {
    // Checking for errors 
    if (err) throw err;
    // Success 
    console.log("Wrote xp");
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
let alpha = data.alpha
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
// Starting the Bot
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
// Interaction Event Listener
client.on("interactionCreate", async int => {
    try {
	  // Int Funcs
	  function ephreply(msg) {
		  int.reply({content:msg,ephemeral:true})
	  }
	  function silreply(msg) {
		  int.reply({content:msg, allowedMentions: { parse: [] }})
	  }
	  function nocompreply(msg) {
		  int.reply({content:msg, components:[]})
	  }
	  function nocompeditReply(msg) {
		  int.editReply({content:msg, components:[]})
	  }
	  client.user.setActivity('/hangman');
	  // Commands
	  if (int.isCommand()) {
	    const oldrank = level(xp[int.user.id])
	    if (xp[int.user.id]) {
		  console.log(int.user.id)
		  xp[int.user.id] = xp[int.user.id] + 5
		  writexp()
		  const newrank = level(xp[int.user.id])
	          if (newrank > oldrank) {
		  int.channel.send("# <@"+int.user.id+"> LEVEL UP! "+oldrank+" => "+newrank)
	          }
	    } else {
		  xp[int.user.id] = 5
		  writexp()
		  int.channel.send("# <@"+int.user.id+"> LEVEL UP! 0 => 1")
	    }
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
		    channelid = ""
	            data["counting"] = false
		    data["channel"] = channelid
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
		const eph = int.options.getBoolean("ephemeral")
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
	          int.reply({content:"Unnicked all non-admins >:)",ephemeral: eph})
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
		const eph = int.options.getBoolean("ephemeral")
	        if (nerdmode == false) {
	          nerdmode = true
	          int.reply({content:"Reactions toggled **on**!", ephemeral: eph})
	          data["nerdmode"] = true
	          writedata()
	        } else {
	          nerdmode = false
	          int.reply({content:"Reactions toggled **off**!",ephemeral:false})
	          data["nerdmode"] = false
	          writedata()
	        }
	     } else if (int.commandName === "owner") {
	        const owner = await int.guild.fetchOwner()
	        silreply("The owner of the server is <@"+owner+">")
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
		xp[int.user.id] = xp[int.user.id] + 5
	        if ((hangman == false) && (int.channel.id != channelid)) {
	            hangman = true
		    hangid = int.channel.id
		    hangplayer = int.user.id
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
		} else if (int.channel.id === channelid) {
		    int.reply({ content:"You can't start a hangman game in the counting channel!", ephemeral: true })
	        } else {
	            int.reply({ content: "A game has already started!", ephemeral: true })
	        }
	     } else if (int.commandName === "reply") {
	        const id = int.options.getString("receiver")
	        let caught = false
	        try {
	            const remsg = int.channel.messages.cache.get(id)
	            remsg.reply(int.options.getString("message"))
	        } catch {
	            caught = true
	            int.reply({ content:"Receiving-message ID is either invalid or in a different channel", ephemeral: true })
	        }
	        if (! caught) {
	            int.reply({ content:"Message replied to!", ephemeral: true })
	        }
	     } else if (int.commandName === "preview") {
	        int.reply("**FUTURE COMMANDS:**\n/trivia [user] [number] [category]: Challenge a user to a game of trivia with a specific category and number of questions!\n\nIf you want to suggest a possible new command or feature, too bad so sad u can't :wompwomp: :skillissue:")
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
			    let n = int.options.getString("number")
			    let p = (n.length)-1
			    let caught = false
			    let r = 0
			    let v = 0
			    const nums = ["1","2","3","4","5","6","7","8","9","0"]
			    try {
				for (x of n) {
					if (! nums.includes(x)) {
						v = lowbase[x.toUpperCase()]
					} else {
						v = Number(x)
					}
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
				    await int.channel.messages.cache.get(int.options.getString("message")).react(emoji)
			    } else {
				    await rmsg.react(emoji)
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
	     } else if (int.commandName === "getid") {
		    const subint = int.options.getSubcommand()
		    if (subint === "message") {
			    let caught = false
			    const link = int.options.getString("link")
			    let id = ""
			    let stringid = ""
			    try {
				    const parts = link.split("/")
				    console.log(parts)
				    stringid = parts[parts.length-1]
				    id = Number(stringid)
				    console.log(id)
				    if (isNaN(id)) {
					    throw "err"
				    }
			    } catch {
				    int.reply({content:"Invalid link",ephemeral:true})
				    caught = true
			    }
			    if (! caught) {
				    int.reply({content:stringid,ephemeral:true})
			    }
	    	    } else if (subint === "user") {
			    int.reply({content:String(int.options.getUser("user").id), ephemeral: true})
		    } else if (subint === "channel") {
			    if (int.options.getChannel("channel")) {
				    int.reply({content:String(int.options.getChannel("channel").id), ephemeral: true})
			    } else {
				    int.reply({content:String(int.channel.id), ephemeral: true})
			    }
		    } else if (subint === "role") {
			    int.reply({content:String(int.options.getRole("role").id), ephemeral: true})
		    } else if (subint === "guild") {
			    int.reply({content:String(int.guild.id), ephemeral: true})
		    }
	     } else if (int.commandName === "tictactoe") {
		        tp1 = "<@"+int.user.id+">"
			if (tic == true) {
				ephreply("Another tic-tac-toe game is already going on!")
			} else if (int.options.getUser("user")) {
				tp2 = "<@"+int.options.getUser("user").id+">"
				if (tp1 == tp2) {
					ephreply("You can't play against yourself")
				} else if (int.channel.id == channelid) {
					ephreply("You can't start a tic-tac-toe game in the counting channel!")
				} else {
					tic = true
					ticid = int.channel.id
				    	const accept = new ButtonBuilder()
					.setCustomId("a")
					.setLabel('✅ Accept')
					.setStyle(ButtonStyle.Success);
					const cancel = new ButtonBuilder()
					.setCustomId("c")
					.setLabel('❌ Cancel')
					.setStyle(ButtonStyle.Danger);
					const row = new ActionRowBuilder()
					.addComponents(accept, cancel);
					const resp = await int.reply({ content:"<@"+int.options.getUser("user")+"> do you accept a game of Tic Tac Toe with <@"+int.user.id+">?", components: [row]})
					const collectorFilter = i => i.user.id === int.options.getUser("user").id;
					console.log(i)
					player = tp1
					pos[1] ="\\_"
					pos[2] ="\\_"
					pos[3] ="\\_"
					pos[4] ="\\_"
					pos[5] ="\\_"
					pos[6] ="\\_"
					pos[7]="  "
					pos[8]="  "
					pos[9] = "  "
					avinps = ["1","2","3","4","5","6","7","8","9"]
					update()
					try {
						confirmation = await resp.awaitMessageComponent({ filter: collectorFilter, time: 20_000 })
						if (confirmation.customId === "a") {
				  			int.editReply({content:`${board}\n${player}'s turn! Type a number between 1-9 (1-3 first row, 4-6 second, 7-9 third)`, components: []})
						} else if (confirmation.customId === "c") {
							tic = false
							int.editReply({content:"Game cancelled", components: []})
						}
					} catch {
						tic = false
						int.editReply({content:"Confirmation not received within 20 seconds, cancelling", components: []})
					}
				}
	    		} else if (int.options.getBoolean("ai")) {
				ticai = true
				tic = true
				ticid = int.channel.id
				player = tp1
				playerid = int.user.id
				pos[1] ="\\_"
				pos[2] ="\\_"
				pos[3] ="\\_"
				pos[4] ="\\_"
				pos[5] ="\\_"
				pos[6] ="\\_"
				pos[7]="  "
				pos[8]="  "
				pos[9] = "  "
				avinps = ["1","2","3","4","5","6","7","8","9"]
				update()
				int.reply(`${board}\n<@${playerid}>'s turn! Type a number between 1-9 (1-3 first row, 4-6 second, 7-9 third)`)
			} else {
				ephreply("Please choose one of the options")
			}
	     } else if (int.commandName === "afk") {
		    const subint = int.options.getSubcommand()
		    if (subint === "set") {
			    if (! status[int.user.id]) {
				    status[int.user.id] = int.options.getString("message")
				    writestatus()
				    int.reply(`<@${int.user.id}> Set your AFK status: ${int.options.getString("message")}`)
			    } else {
				    ephreply("You already have an AFK status; run /afk edit to change your status message")
			    }
		    } else if (subint === "list") {
			    let l = "List:\n"
			    Object.values(status).forEach((msg, index) => {
	        		const memb = Object.keys(status)[index];
				const tag = int.guild.members.cache.get(memb).user.tag
	        		l+=`**${tag}** is AFK: ${msg}\n`
	    		    });
			    if (l == "List:\n") {
				    l+="No one is AFK"
			    }
			    int.reply(l)
		    } else if (subint === "clear") {
			    if (int.options.getUser("user")) {
				    const id = int.options.getUser("user").id
				    delete status[id]
				    writestatus()
				    int.reply(`Cleared <@${id}>'s AFK status`)
			    } else {
				    status = {}
				    writestatus()
				    int.reply("All AFK statuses have been cleared")
			    }
		    } else if (subint === "remove") {
			    if (status[int.user.id]) {
				    delete status[int.user.id]
			    	    writestatus()
				    const id = int.user.id
			    	    int.reply(`<@${id}> Removed your AFK status`)
			    } else {
				    ephreply("You don't have an AFK status")
			    }
		    } else if (subint === "edit") {
			    if (status[int.user.id]) {
				    status[int.user.id] = int.options.getString("message")
				    writestatus()
				    int.reply(`<@${int.user.id}> Status changed: ${int.options.getString("message")}`)
			    } else {
				    ephreply("You don't have an AFK status")
			    }
		    }
	     } else if (int.commandName === "genalpha") {
			const eph = int.options.getBoolean("ephemeral")
		        if (alpha == false) {
		          alpha = true
		          int.reply({content:"Gen Alpha mode toggled **on**! 🤫🧏", ephemeral: eph})
		          data["alpha"] = true
		          writedata()
		        } else {
			  alpha = false
			  console.log(alpha)
		          int.reply({content:"Gen Alpha mode toggled **off**! 🤫❌",ephemeral:false})
		          data["alpha"] = false
		          writedata()
		        }
	     } else if (int.commandName === "level") {
		    const subint = int.options.getSubcommand()
		    if (subint === "view") {
			    if (! int.options.getUser("user")) {
				    rank = level(xp[int.user.id])
				    if (rank == 10) {
					    int.reply("You are Level **10** which is the MAX level. Good job! You have "+xp[int.user.id]+" XP.")
				    } else {
				    	int.reply("You are Level **"+rank+"** and have **"+xp[int.user.id]+"**/"+maxxp[rank]+" XP until you reach the next level.")
				    }
			    } else {
				    if (xp[int.options.getUser("user").id]) {
					    int.reply(`${int.options.getUser("user")} is Level **${level(xp[int.options.getUser("user").id])}** with **${xp[int.options.getUser("user").id]}** XP.`)
				    } else {
					    int.reply(`${int.options.getUser("user")} is Level **0** with **0** XP 😑`)
				    }
			    }
		    } else if (subint === "leaderboard") {
			    const sorted = Object.fromEntries(
	   		   	    Object.entries(xp).sort(([,a],[,b]) => b-a)
			    );
			    let l = "Rank:\n"
			    let r = 0
			    let rank = ""
			    for (let key in sorted) {
				    r++
				    l+=("#"+r+": <@!"+key+"> with **"+xp[key]+"** XP (Level **"+level(xp[key])+"**)\n")
				    if (key==int.user.id) {
					    rank = r
				    }
			    }
			    l+=("You are Rank **#"+rank+"**")
			    silreply(l)
		    } else if (subint === "info") {
			    int.reply(`Level up by using any slyer-bot commands. Every command will give you 5 XP, and winning a slyer-bot game will give you an additional 10 XP. After you reach a certain amount of XP, you will level up!\nHere is the list of XP requirements for each level:
	Level 1: **5** XP
	Level 2: **25** XP
	Level 3: **100** XP
	Level 4: **250** XP:
	Level 5: **500** XP
	Level 6: **1000** XP
	Level 7: **2000** XP
	Level 8: **5000** XP
	Level 9: **7500** XP
	Level 10: **10000** XP
	Once you reach Level 10, you have reached the max level! You will continue to gain XP but will not level up anymore.`)
		    } else if (subint === "next") {
			    if (! (level(xp[int.user.id]) == 10)) {
			    	int.reply("You need **"+(maxxp[level(xp[int.user.id])]-xp[int.user.id])+"** more XP until you reach Level **"+(level(xp[int.user.id])+1)+"**.")
			    } else {
				    int.reply("You're Level 10, so you don't need any more XP to level up! You have **"+xp[int.user.id]+"** XP.")
			    }
		    }
	     } else if (int.commandName === "help") {
		    let str
		    const commandFiles = fs.readdirSync('./slash.js').filter(file => file.endsWith('.js'))
		    for (const file of commandFiles) {
			const command = require(`./${file}`);
			str += `Name: ${command.data.name}, Description: ${command.data.description} \n`;
		    }
		    ephreply(str)
	     } else if (int.commandName === "trivia") {
		    const A = new ButtonBuilder()
				.setCustomId("A")
				.setLabel('A')
				.setStyle(ButtonStyle.Primary)
		    const B = new ButtonBuilder()
				.setCustomId("B")
				.setLabel('B')
				.setStyle(ButtonStyle.Primary)
		    const C = new ButtonBuilder()
				.setCustomId("C")
				.setLabel('C')
				.setStyle(ButtonStyle.Primary)
		    const D = new ButtonBuilder()
				.setCustomId("D")
				.setLabel('D')
				.setStyle(ButtonStyle.Primary)
		    const row = new ActionRowBuilder()
				.addComponents(A,B,C,D);
		    if (int.options.getUser("user")) {
			    ephreply("WIP")
		    } else {
			    const tquestion = random(questions)
			    const resp = await int.reply({ content:(tquestion["question"]+"\nA) "+tquestion["A"]+"\nB) "+tquestion["B"]+"\nC) "+tquestion["C"]+"\nD) "+tquestion["D"]), components: [row]})
			    const collectorFilter = i => i.user.id === int.user.id;
			    try {
				    confirmation = await resp.awaitMessageComponent({ filter: collectorFilter, time: 15_000 })
				    if (tquestion["answer"]==confirmation.customId) {
					    nocompeditReply(tquestion["question"]+"\n\n**"+confirmation.customId+"** is the correct answer, good job!\n+10 XP")
				    } else {
					    nocompeditReply(tquestion["question"]+"\n\nYou got it wrong, the correct answer is **"+tquestion["answer"]+"** :(")
				    }
			    } catch {
				    int.editReply("You didn't answer the question within 15 seconds! You lose :(")
			    }
		    }
	     } else {
		    ephreply("WIP (command hasn't been added yet)")
	     }
	  }
     } catch (e) {
	    int.reply("An unexpected error occured.\n<@816099107545940008> "+e)
     }
});
// Message Event Listener
client.on("messageCreate", async msg => {
    rmsg = msg
    // Counting Game
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
    // Hangman Game
    } else if ((hangman == true) && (alphabet.includes(msg.content)) && (msg.channel.id == hangid) && (msg.author.id == hangplayer)) {
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
	        msg.reply("You won! :)\n+10 XP")
		const oldrank = level(xp[hangplayer])
		xp[hangplayer] = xp[hangplayer] + 10
		writexp()
		const newrank = level(xp[hangplayer])
	        if (newrank > oldrank) {
		    msg.channel.send("# <@"+hangplayer+"> LEVEL UP! "+oldrank+" => "+newrank)
	        }
	        hangman = false
	      }
    // Tic Tac Toe Game
    } else if ((tic == true)&&(inps.includes(msg.content))&&(msg.author.id==playerid)&&(msg.channel.id == ticid)) {
	    if ((pos[msg.content] == "\\_") || (pos[msg.content] == "  ")) {
		      let x = ""
		      if (msg.content < 7) {
			      if (player == tp1) {
				  x = usyms["1"]
			      } else {
				  x = usyms["2"]
			      }
			      pos[msg.content]= x
		      } else {
			      if (player == tp1) {
				  x = dsyms["1"]
			      } else {
				  x = dsyms["2"]
			      }
			      pos[msg.content]= x
		      }
		      update()
		      if (! ticai) {
			      if (stop) {
				      if (player == tp1) {
		    			    player = tp2
		  		      } else {
		    			    player = tp1
		  		      }
				      msg.reply(board+"\n"+player+" wins!!!\n+10 XP")
				      const oldrank = xp[player.replace("<@","").replace(">","")]
				      xp[player.replace("<@","").replace(">","")] = xp[player.replace("<@","").replace(">","")] + 10
				      writexp()
				      const newrank = level(xp[player.replace("<@","").replace(">","")])
				      if (newrank > oldrank) {
						  msg.channel.send("# <@"+player.replace("<@","").replace(">","")+"> LEVEL UP! "+oldrank+" => "+newrank)
				      }
				      stop = false
				      tic = false
			      } else if (tie) {
				      msg.reply(board+"\nTie!")
				      tie = false
				      tic = false
			      } else {
				      msg.reply(`${board}\n${player}'s turn! Type a number between 1-9 (1-3 first row, 4-6 second, 7-9 third)`)
			      }
		      } else {
			      avinps.splice(avinps.indexOf(msg.content), 1)
			      if (stop) {
				      msg.reply(board+"\n<@"+playerid+"> wins!!!\n+10 XP")
				      const oldrank = xp[playerid]
				      xp[playerid] = xp[playerid] + 10
				      writexp()
				      const newrank = level(xp[playerid])
				      if (newrank > oldrank) {
						  msg.channel.send("# <@"+playerid+"> LEVEL UP! "+oldrank+" => "+newrank)
				      }
				      stop = false
				      tic = false
				      ticai = false
			      } else if (tie) {
				      msg.reply(board+"\nTie!")
				      tie = false
				      tic = false
				      ticai = false
			      } else {
				      console.log(avinps)
				      await msg.reply(`${board}\nAI is thinking of move...`)
				      player = tp2
				      usym = usyms["2"]
				      dsym = dsyms["2"]
				      let move = ""
				      if ((((p2 == usym) && (p3 == usym)) ||
					 ((p4 == usym) && (p7 == dsym)) ||
					 ((p5 == usym) && (p9 == dsym))) && (avinps.includes("1"))) {
					      move = "1"
					      console.log("win")
				      } else if ((((p1 == usym) && (p3 == usym)) ||
					 ((p5 == usym) && (p8 == dsym))) && (avinps.includes("2"))) {
					      move = "2"
					      console.log("win")
				      } else if ((((p1 == usym) && (p2 == usym)) ||
					 ((p6 == usym) && (p9 == dsym)) ||
					 ((p5 == usym) && (p7 == dsym))) && (avinps.includes("3"))) {
				      		move = "3"
					        console.log("win")
				      } else if ((((p1 == usym) && (p7 == dsym)) ||
					 ((p5 == usym) && (p6 == usym))) && (avinps.includes("4"))) {
					      move = "4"
					      console.log("win")
				      } else if ((((p2 == usym) && (p8 == dsym)) ||
					 ((p4 == usym) && (p6 == usym)) ||
					 ((p1 == usym) && (p9 == dsym)) ||
					 ((p3 == usym) && (p7 == dsym))) && (avinps.includes("5"))) {
					      move = "5"
					      console.log("win")
				      } else if ((((p3 == usym) && (p9 == dsym)) ||
					 ((p4 == usym) && (p5 == usym))) && (avinps.includes("6"))) {
					      move = "6"
					      console.log("win")
				      } else if ((((p1 == usym) && (p4 == usym)) ||
					 ((p8 == dsym) && (p9 == dsym)) ||
					 ((p3 == usym) && (p5 == usym))) && (avinps.includes("7"))) {
				      		move = "7"
					        console.log("win")
				      } else if ((((p2 == usym) && (p5 == usym)) ||
					 ((p7 == dsym) && (p9 == dsym))) && (avinps.includes("8"))) {
					      move = "8"
					      console.log("win")
				      } else if ((((p3 == usym) && (p6 == usym)) ||
					 ((p7 == dsym) && (p8 == dsym)) ||
					 ((p1 == usym) && (p5 == usym))) && (avinps.includes("9"))) {
				      		move = "9"
					        console.log("win")
				      } else {
					      usym = usyms["1"]
					      dsym = dsyms["1"]
					      // Incredibly long Tic Tac Toe AI code
					      if ((((p2 == usym) && (p3 == usym)) ||
						 ((p4 == usym) && (p7 == dsym)) ||
						 ((p5 == usym) && (p9 == dsym))) && (avinps.includes("1"))) {
						      move = "1"
						      console.log("smart")
					      } else if ((((p1 == usym) && (p3 == usym)) ||
						 ((p5 == usym) && (p8 == dsym))) && (avinps.includes("2"))) {
						      move = "2"
						      console.log("smart")
					      } else if ((((p1 == usym) && (p2 == usym)) ||
						 ((p6 == usym) && (p9 == dsym)) ||
						 ((p5 == usym) && (p7 == dsym))) && (avinps.includes("3"))) {
					      		move = "3"
						        console.log("smart")
					      } else if ((((p1 == usym) && (p7 == dsym)) ||
						 ((p5 == usym) && (p6 == usym))) && (avinps.includes("4"))) {
						      move = "4"
						      console.log("smart")
					      } else if ((((p2 == usym) && (p8 == dsym)) ||
						 ((p4 == usym) && (p6 == usym)) ||
						 ((p1 == usym) && (p9 == dsym)) ||
						 ((p3 == usym) && (p7 == dsym))) && (avinps.includes("5"))) {
						      move = "5"
						      console.log("smart")
					      } else if ((((p3 == usym) && (p9 == dsym)) ||
						 ((p4 == usym) && (p5 == usym))) && (avinps.includes("6"))) {
						      move = "6"
						      console.log("smart")
					      } else if ((((p1 == usym) && (p4 == usym)) ||
						 ((p8 == dsym) && (p9 == dsym)) ||
						 ((p3 == usym) && (p5 == usym))) && (avinps.includes("7"))) {
					      		move = "7"
						        console.log("smart")
					      } else if ((((p2 == usym) && (p5 == usym)) ||
						 ((p7 == dsym) && (p9 == dsym))) && (avinps.includes("8"))) {
						      move = "8"
						      console.log("smart")
					      } else if ((((p3 == usym) && (p6 == usym)) ||
						 ((p7 == dsym) && (p8 == dsym)) ||
						 ((p1 == usym) && (p5 == usym))) && (avinps.includes("9"))) {
					      		move = "9"
						        console.log("smart")
					      } else {
					      	      move = random(avinps)
						      console.log("random")
					      }
				      }
				      avinps.splice(avinps.indexOf(move),1)
				      console.log(move)
				      let x = ""
				      if (move < 7) {
					      x = usyms["2"]
					      pos[move]= x
				      } else {
					      x = dsyms["2"]
					      pos[move]= x
				      }
				      update()
				      if (stop) {
					      msg.reply(board+"\nThe AI wins!!!")
					      stop = false
					      tic = false
					      ticai = false
				      } else if (tie) {
					      msg.reply(board+"\nTie!")
					      tie = false
					      tic = false
					      ticai = false
				      } else {
					      player = tp1
					      msg.reply(`${board}\n<@${playerid}>'s turn! Type a number between 1-9 (1-3 first row, 4-6 second, 7-9 third)`)
				      }
			      }
		      }
	    } else {
		    msg.reply("Space is already taken!")
	    }
    // Random Reactions
    } else if (((nerdmode == true) && (randomnum(20) == 1) && (! msg.author.bot)) || ((alpha == true) && (randomnum(30) == 1) && (! msg.author.bot))) {
	    if (nerdmode == true) {
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
	    if (alpha == true) {
		    try {
		          const r = randomnum(3)
		          if (r == 1) {
		            msg.reply("erm what da sigma 🤓☝️")
		          } else if (r == 2) {
		            msg.channel.send("🤫🧏")
		          } else {
		            msg.reply("only in ohio if fanum tax causes skibdi rizz with a looksmaxxed level 10 gyatt")
		          }
		      } catch(err) {
		        console.log(err)
		      }
	    }
    }
    // AFK Ping Listener
    if (status != {}) {
    	Object.keys(status).forEach((id) => {
		const user = msg.mentions.users.first()
		if (user) {
			mentid = user.id
		} else {
			mentid = ""
		}
        	if ((mentid == id) && (! (msg.author.id == "1244853392942170143"))) {
			const tag = msg.guild.members.cache.get(id).user.tag
			msg.reply(`**${tag}** is AFK: ${status[id]}`)
		}
    	});
    }
    // Love Talk Listener (for 2 specific people)
    if (msg.channel.id != "1253010049199243398") {
      if ((msg.author.id == "947534567781331024") || (msg.author.id == "1025868793068658718")) {
        if ((msg.content.includes("love")) || (msg.content.includes("💗")) || (msg.content.includes("<3")) || (msg.content.includes("princess")) || (msg.content.includes("NESTEROVICH")) || msg.content.includes("Love") || msg.content.includes("🩷")) {
          msg.reply("<#1253010049199243398> <:cringe:1227877222430281759>")
        }
      }
    }
})
// Deleted Messages Listener
client.on("messageDelete", async dmsg => {
    const d = new Date()
    // Quoting deleted messages by 2 specific people
    if (quoting == true) {
        if ((dmsg.author.id == "947534567781331024") || (dmsg.author.id == "1025868793068658718")) {
            client.channels.cache.get("1179602392367517766").send({content:'"'+dmsg.content+'" - <@'+dmsg.author.id+'> in <#'+dmsg.channel.id+">",allowedMentions: { parse: [] }})
        }
    }
})
// Logging in with token that you will never see :)
client.login(token)





// Damn you made it this far here's a cookie for your troubles 🍪
