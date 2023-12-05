import { EmbedBuilder } from 'discord.js'

export async function createMatchEmbed(data) {
  const embed = new EmbedBuilder()
    .setTitle(`**${data.user_name}** last match statistics`)
    .setDescription(`Match id - ${data.match_id}`)
    .addFields(
      { 
        name: 'Match stats', 
        value: 
        `Duration: ${data.duration}
         Kill score: ${data.radiant_score} / ${data.dire_score}
        ` 
      },
      {
        name: `${data.user_name} stats`,
        value:
        `Hero: ${data.hero_name}
        KDA: ${data.user.kills}/${data.user.deaths}/${data.user.assists}
        Items: ${data.items.join(', ')}
        `
      }
      )
    .setColor('Random')

  return embed
}

export async function createTopEmbed(data) {
  const embed = new EmbedBuilder()
    .setTitle(`**${data.name}** top-7 heroes`)
    .setDescription(`List of heroes from best to worst`)
    .addFields(
      ...data.heroes.map(hero => ({
        name: hero.name,
        value: `Matches: ${hero.matches}, Winrate: ${hero.winrate}%`
      }))
      )
    .setColor('Random')

  return embed
}