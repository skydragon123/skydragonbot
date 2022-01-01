const Discord = require('discord.js');
const auth = require('./auth.json');
const prefix = "s!"
const db = require("quick.db");
const Bb = require("quick.db");
const { Client, Intents } = require('discord.js');
const client = new Client({
  intents: [
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS
]
})

client.on('ready', () => {
  console.log(`${client.user.tag}準備好啦!`);
});

client.on('messageCreate', message=>{

  if(message.author.bot) return;
  if(message.content.startsWith(prefix+"setnick")){

      let nick = message.content.slice((prefix+"setnick").length)
      if(!nick) return message.channel.send("pls enter a nick to add for all members").then(r=>r.delete(5000))

      message.guild.members.cache.forEach(r=>r.setNickname(nick + r.user.username))

      message.channel.send("Changing Nicknames");
    }
  });

client.login(auth.key);

client.on('messageCreate' , message => {
     if(message.content === `s!myinfo`) {
     let embed = new Discord.MessageEmbed()
     .setTitle(message.member.user.username + " 的大頭貼")
     .setImage(message.author.avatarURL({format: "png",dynamic: true,size: 2048}) )
     message.channel.send({ embeds: [embed] });
}
});

client.on('messageCreate' , message => {
   if(message.content.startsWith('s!dn')) {
    let remdnrole = message.guild.roles.cache.find(r => r.id === "920970570462556190");
    let dnrole = message.guild.roles.cache.find(r => r.id === "919839757645783091");
     message.member.roles.add(dnrole);
     message.member.roles.remove(remdnrole);
     let dnname = message.content.replace('s!dn', "")
    if(dnname === null) return;
    message.member.setNickname('【空龍】' + message.member.user.username +'|' + dnname);
    let embed = new Discord.MessageEmbed()
    .setTitle(message.member.user.username + "已通過申請")
    .setImage(message.author.avatarURL({format: "png",dynamic: true,size: 2048}) )
    message.channel.send({ embeds: [embed] });
    }});
