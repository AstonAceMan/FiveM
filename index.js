const Discord = require('discord.js');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var FormData = require('form-data');
const express = require('express');
const app = express();
const bot = new Discord.Client();
var version = "0.1.4 (DEVWIP)";
var channelNames = ["bot-text"]; //All the channels where the bot will respond. Include your bot channel names (without the #)
var serverID = "zobp74";
const PORT = process.env.PORT || 3000;
const token = process.env.FIVEMTOKEN;

function embedInfo(data){
    var thumbnail = 'https://servers-live.fivem.net/servers/icon/'+serverID+'/'+data['Data']['iconVersion']+'.png';
    var players = data['Data']['clients'];
    var aop = data['Data']['mapname'];
    var embedReturn = new Discord.MessageEmbed();
    embedReturn.setColor('#f78235');
    embedReturn.setTitle('TXDPS-RP');
    embedReturn.setThumbnail(thumbnail);

    var playerListString = ">>> ";
    for(var player in data['Data']['players']){
        if(player in data['Data']['players']){
            playerListString += data['Data']['players'][player]['id'] + " `" + data['Data']['players'][player]['name'] + "`\n";
        }
    }

    playerListString = playerListString.substring(0,playerListString.length()-1);

    embedReturn.addFields(
		{ name: 'Players ('+players+')', value: playerListString, inline: true },
		{ name: 'Information', value: '>>> **Name:** `Server 1`\n**Status:** `Online`\n**Port:** `30120`\n**Players:** `'+players+'/75`\n**AOP:** `'+aop+'`\n ', inline: true }
    );
    //embedReturn.setTimestamp();
	embedReturn.setFooter('[Connect](fivem://connect/zobp74) or see the [playerlist](http://serverinfo.unaux.com?endpoint='+serverID+') of TXDPS-RP');
    return embedReturn;
}

async function getDiscord(userid){
    var useridgrab = await bot.users.fetch(userid);
    return useridgrab.avatarURL();
}

bot.login(token);-

bot.on("ready", () => {
    console.log("FiveM bot online.");
});

app.use(express.json());

app.get("/", function(req, res) {
    //when we get an http get request to the root/homepage
    getDiscord("111642388417478656")
        .then(user => {
            res.send(req+" == "+user);
        });
});

bot.on("message", msg => {
    if(channelNames.includes(msg.channel.name)){
        if(msg.content == "-help"){
            msg.reply("Here are some commands:\n`-help` - Shows possible commands\n`-status` - Shows player count, AOP, discord of TXDPS-RP\n`-link` - Displays useful links such as a connect link and a monotoring link.\n\n*FiveM Advanced Status Bot (5MASB) V"+version+" created by Aston Bolwell.*");
        }

        if(msg.content == "-status"){
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

app.listen(PORT, function() {
    console.log(`Listening on Port ${PORT}`);
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