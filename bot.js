const Discord = require('discord.js');
const rn = require('random-number');
const config = require('./config.json');

const client = new Discord.Client();

const prefix = "//";

client.on("message", (message) => {
  if(message.author.bot) {
    return;
  }
  if(!message.content.startsWith(prefix)) {
    return;
  }

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    message.reply(`Hello, thanks for using RollerBot!`);
  }
  if (command === "roll") {
    if(!args.length) {
      return message.reply(`Please provide the number of dice you want to use!`)
    } else {
      let numberOfDice = args[0];
      message.reply(`You are going to roll ${numberOfDice} dice!`);
      const diceOptions = {
        min: 1,
        max: 6,
        integer: true
      }
      let dice = [];
      dice.length = numberOfDice;
      message.reply(`Rolling dice...`);

      for (let i = 0; i < numberOfDice; i++) {
        dice.push(rn(diceOptions));
      }
      let diceMessage = `You rolled `;
      dice.forEach((die) => {
       diceMessage += die + ", ";
      })
      diceMessage = diceMessage.replace(/,(\s+)?$/, '');
      setTimeout(() => {
        message.reply(diceMessage + "!");
      }, 2000);
      
    }
  }
})

client.login(config.BOT_TOKEN);