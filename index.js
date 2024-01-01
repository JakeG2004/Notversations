//Prerequisites
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const { token, guildId, channelId } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

//Libraries
var moment = require('moment-timezone');
var cron = require("cron");

function sendMessage(){
	//Get date
	let add = Math.floor(Math.random() * 2);
	let day = parseInt(moment().tz("America/Los_Angeles").format().slice(8,10));
	if(day + add <= 31){
		day = day + add;
	}
	let month = parseInt(moment().tz("America/Los_Angeles").format().slice(5,7));

	//Get discord channel
	let channel = client.guilds.cache.get(guildId).channels.cache.get(channelId);
	
	//If its November
	if(month == 11){
		channel.send("RRAAAHHHH THE BONEZONE SHALL DEPART. BONE YOU ALL NEXT YEAR :skull-1:");
		throw new Error();
	}

	//If its halloween
	if(day == 31){
		let wizzer = new AttachmentBuilder('pics/halloween.jpg', { name: 'halloween.png'})
		channel.send({files: [wizzer] });
	}

	//Choose and send file
	let pic = new AttachmentBuilder(`pics/output${day}.jpg`, { name: `output${day}.jpg` })
	channel.send({ files: [pic] });

	//Send message at random time
	let min = 90 * 60;
	let max = 720 * 60;
	let rand = Math.floor(Math.random() * (max - min + 1) + min);
	console.log('waiting ' + rand / 60 + ' minutes');
	setTimeout(sendMessage, rand * 1000);
}

client.on(Events.ClientReady, async () => {
	
  //login notif
  let channel = client.guilds.cache.get(guildId).channels.cache.get(channelId);
  console.log(`Logged in as ${client.user.tag}!`);

  //channel.send("I'm sorry. It will happen again.");
  sendMessage();
});

client.login(token);
