//Prerequisites
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
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

var cron = require("cron");

//Create list of banned words
var banned = [];

//Reset list every 24 hours
//idk if this actually works
let reset = new cron.CronJob('0 0 * * *', () => {
    banned = [];
    console.log("List successfully reset");
});

//TODO: Add a configuration command that will allow the user to change percentage, print off the list of banned words, or clear the list of banned words.

//Get message
client.on('messageCreate', (message) => {


    //Split message into array of words stored as strings
    var words = message.content.split(" ");
    
    //Iterate through message, if banned word is found, delete message
    for(var i = 0; i<words.length; i++){
        if(banned.includes(words[i])){

            //message.reply("Nuh uh");
            //TODO: Add "nuh uh" response. May not be possible as those must be replies
            message.delete();

            //Break here or else it may try to delete an already deleted message
            break;
        }
    }

    //5% chance that word gets banned
    if((Math.floor(Math.random() * 20)) >= 10){

        //Choose word to ban
        var tmpWord = words[Math.floor(Math.random() * words.length)];

        //Make sure that the word is not already in the list, then add the word to list of banned words
        if(banned.includes(tmpWord) == false){
            banned.push(tmpWord);
        }

        //Print out banned list
        for (var i=0; i< banned.length; i++){
            process.stdout.write(banned[i] + ", ");
        }
        process.stdout.write("\n")
    }
});

client.on(Events.ClientReady, async () => {
	
    //login notif
    console.log(`Logged in as ${client.user.tag}!`);

    //Start reset thing
    reset.start();

});

client.login(token);
