//Prerequisites
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
    intents: [
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ]
  });

client.commands = new Collection();

//Create list of banned words
var banned = [];

//TODO: Add a configuration command that will allow the user to change percentage, print off the list of banned words, or clear the list of banned words.

//Get message
client.on('messageCreate', (message) => {
    //TODO: Make it so that the bot wont ban its own commands

    //Split message into array of words stored as strings
    var words = message.content.split(" ");
    
    //Iterate through message, if banned word is found, delete message
    for(var i = 0; i<words.length; i++){
        if(banned.includes(words[i])){
            //message.reply({content: 'Nuh uh', ephemeral: 'true'});
            //TODO: Add "nuh uh" response
            message.delete();
        }
    }

    //5% chance that word gets banned
    if((Math.floor(Math.random() * 20)) >= 10){

        //Choose word to ban
        //TODO: Modify this so that it doesn't catch repeat words
        var tmpWord = words[Math.floor(Math.random() * words.length)];

        console.log("banned", tmpWord);

        //Make sure that item is not already in the list, then add item to list of banned words
        if(banned.includes(tmpWord) == false){
            banned.push(tmpWord);
        }

        //Print out banned list
        for (var i=0; i< banned.length; i++){
            console.log(banned[i]);
        }
    }
});

client.on(Events.ClientReady, async () => {
	
  //login notif
  console.log(`Logged in as ${client.user.tag}!`);

});

client.login(token);
