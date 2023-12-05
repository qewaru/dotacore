import express from 'express'
import { REST, Routes, Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
import { getUserRaiting, getLastMatch, getHeroByAttribute, getHeroByPosition, getTopHeroes } from './requests/requestHandler.js'
import { commands } from './lib/data.js'
import { createMatchEmbed, createTopEmbed } from './utils/embeds.js'
import 'dotenv/config'

const app = express()
const port = process.env.PORT

// CONNECTION
const rest = new REST({ version: '10' }).setToken(`${process.env.REST}`)

try {
  console.log('Started refreshing application (/) commands.')

  await rest.put(Routes.applicationCommands('1178972847826280498'), { body: commands })

  console.log('Successfully reloaded application (/) commands.')
} catch (error) {
  console.error(error)
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

// COMMAND REPLIES

client.on('interactionCreate', async interaction => {
  if (interaction.commandName) return

  if (interaction.isButton()) {
    const channel = client.channels.cache.get('1180252520954724384')
    await channel.send('test')
  }
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return

  switch (interaction.commandName) {
    case 'test':
      await interaction.reply('Kakoj test durik')
      break
    
    case 'mmr': {
      const userId = interaction.options.get('user-id')
      const userData = await getUserRaiting(userId.value)
      if (userData !== 0) {
        const replyTemplate = '**' + userData.name + '**' + ' has ' + userData.mmr + ' mmr'
        await interaction.reply(replyTemplate)
      } else {
        await interaction.reply('No data about user mmr :(')
      }

      break
    }
    
    case 'lastmatch': {
      const userId = interaction.options.get('user-id')
      const matchData = await getLastMatch(userId.value)
      if (matchData !== 0) {
        await interaction.deferReply()
        const embed = await createMatchEmbed(matchData)
        await interaction.editReply({ embeds: [embed] })
      } else {
        await interaction.reply('No data :(')
      }

      break
    }

    case 'randomdraft': {
      const attr = interaction.options.get('attribute')
      const position = interaction.options.get('position')

      if (attr) {
        const hero = await getHeroByAttribute(attr.value)
        if (hero !== 0) { 
          await interaction.reply(`Random hero by attribute: **${hero}**`)
        } else {
          await interaction.reply(`Incorrect attribute`)
        }

      } else {
        const hero = await getHeroByPosition(position.value)
        if (hero !== 0) {
          await interaction.reply(`Random hero by position: **${hero}**`)
        } else {
          await interaction.reply(`Incorrect position value`)
        }
      }

      break
    }

    case 'topheroes': {
      const userId = interaction.options.get('user-id')
      const topHeroes = await getTopHeroes(userId.value)
      if (topHeroes !== 0) {
        await interaction.deferReply()
        const embed = await createTopEmbed(topHeroes)
        await interaction.editReply({ embeds: [embed] })
      } else {
        await interaction.reply('No data about user heroes :(')
      }

      break
    }
  }
})

// RUNNING THE BOT/SERVER

client.login(`${process.env.CLIENT_TOKEN}`)

app.listen(port, () => {
    console.log('Server is running on port', port)
})