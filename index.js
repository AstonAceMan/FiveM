const Discord = require('discord.js');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var http = require('http');
var FormData = require('form-data');
const bot = new Discord.Client();
var version = "0.1.4 (DEVWIP)";
var channelNames = ["bot-text"]; //All the channels where the bot will respond. Include your bot channel names (without the #)
var serverID = "zobp74";

const token = process.env.FIVEMTOKEN;

function embedInfo(data){
    var embedReturn = new Discord.MessageEmbed();
        
    return embedReturn;
}

async function getDiscord(userid){
    var useridgrab = await bot.users.fetch(userid);
    return useridgrab.avatarURL();
}

bot.login(token);

bot.on("ready", () => {
    console.log("FiveM bot online.");
    getDiscord("111642388417478656")
        .then(user => {
            console.log(user);
        });
});

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello Worldn');
}).listen(1337, 'fivem-discordbot.herokuapp.com');
console.log('Server running at http://fivem-discordbot.herokuapp.com:1337/');

bot.on("message", msg => {
    if(channelNames.includes(msg.channel.name)){
        if(msg.content == "-help"){
            msg.reply("Here are some commands:\n`-help` - Shows possible commands\n`-all` - Shows all the useful information (includes player list).\n`-status` - Shows player count, AOP, discord of TXDPS-RP\n`-players` - Diplays a list of online players on TXDPS-RP\n`-connect` - Get a link to directly connect you to TXDPS-RP\n\n*FiveM Advanced Status Bot (5MASB) V"+version+" created by Aston Bolwell.*");
        }

        if(msg.content == "-all"){
            var data;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    data = xhttp.responseText;
                    data = JSON.parse(data);

                    msg.reply("here is all the information regarding the TXDPS-RP server:");
                    msg.channel.send(embedInfo(data));
                }
            }
            xhttp.open("GET", "https://servers-frontend.fivem.net/api/servers/single/"+serverID, true);
            xhttp.send();
        }
    }
});
//  fivem://connect/zobp74
/*[
    {
        "endpoint":"127.0.0.1:1234",
        "id":11,"identifiers":[
            "steam:11000013fe05dc7",
            "license:4d5d594635a59e329e127ee461fcc6db023e782a",
            "xbl:2535447862017264",
            "live:914798096236197",
            "discord:262810021149147136"
        ],
        "name":"[2V-61] Liam C",
        "ping":225
    }
]*/