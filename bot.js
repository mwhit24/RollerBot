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
      let diceMessage = 'You rolled ';
      dice.forEach((die) => {
        diceMessage += die + ', ';
      })
      message.reply(diceMessage);
    }

    // const firstDiceOptions = {
    //   min: 0,
    //   max: 6,
    //   integer: true
    // }
    // const secondDiceOptions = {
    //   min: 0,
    //   max: 6,
    //   integer: true
    // }
    
    // let firstDice = rn(firstDiceOptions);
    // let secondDice = rn(secondDiceOptions);
    // message.reply("Rolling dice...")
    // setTimeout(() => {
    //   message.reply(`You rolled ${firstDice} and ${secondDice}!`);
    // }, 2000);
  }
})

client.login(config.BOT_TOKEN);