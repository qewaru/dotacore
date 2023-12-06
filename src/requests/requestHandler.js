import { convertHeroes, convertItems, convertAttribute, convertTopHeroes, convertId } from '../utils/converter.js'
import { heroPos } from '../lib/data.js'
import { readFile } from 'fs/promises';

export async function getLastMatch(userId) {
  const id32 = await convertId(userId)  
  
  const recentMatches = await fetch(`https://api.opendota.com/api/players/${id32}/recentMatches`, {
    method: 'GET'
  })
  const userJson = await recentMatches.json()

  if (userJson) {
    const matchDetails = await fetch(`https://api.opendota.com/api/matches/${userJson[0].match_id}`, {
      method: 'GET'
    })
    const matchJson = await matchDetails.json()
    
  
    const durationMinutes = Math.floor(matchJson.duration / 60)
    let durationSeconds = matchJson.duration % 60
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`
    }

    const userData = matchJson.players.find((player) => player.account_id === id32)
    if (userData) {
      const items = await convertItems([userData.item_0, userData.item_1, userData.item_2, userData.item_3, userData.item_4, userData.item_5])
      const heroName = await convertHeroes(userData.hero_id)
  
      const returnData = {
        match_id: matchJson.match_id,
        user_name: userData.personaname,
        hero_name: heroName,
        dire_score: matchJson.dire_score,
        radiant_score: matchJson.radiant_score,
        duration: `${durationMinutes}:${durationSeconds}`,
        user: {
          kills: userData.kills,
          deaths: userData.deaths,
          assists: userData.assists
        },
        items: items
      }
    
      return returnData
    } else {
      return 0
    }
  } else {
    return 0
  }
}

export async function getHeroByAttribute(attr) {
  let slicedAttr = attr.toLowerCase().slice(0, 3)
  if (slicedAttr === 'str' || slicedAttr === 'agi' || slicedAttr === 'int') {
    const convertedAttribute = await convertAttribute(slicedAttr)
    const i = Math.floor(Math.random() * convertedAttribute.length)

    return convertedAttribute[i]
  } else if (slicedAttr === 'uni' || slicedAttr === 'all') {
    slicedAttr = 'all'
    const convertedAttribute = await convertAttribute(slicedAttr)
    const i = Math.floor(Math.random() * convertedAttribute.length)

    return convertedAttribute[i]
  } else {
    return 0
  }
}

export async function getHeroByPosition(pos) {
  if (pos >= 1 && pos <= 5) {
    const positionArray = heroPos[pos]
    const i = Math.floor(Math.random() * positionArray.length)
    const hero = positionArray[i]

    return hero
  } else {
    return 0
  }
}

export async function getRandomHero() {
  const raw = await readFile('./src/lib/hero_names.json', 'utf-8')
  const heroesJson = JSON.parse(raw)
  const wtf = Object.values(heroesJson).map(hero => hero.id)
  const heroId = Math.floor(Math.random() * wtf.length)
  const heroName = await convertHeroes(heroId)

  return heroName
}

export async function getTopHeroes(id) {
  const id32 = await convertId(id)
  try {
    const userData = await fetch(`https://api.opendota.com/api/players/${id32}`, {
        method: 'GET'
    })
    const userJson = await userData.json()

    const heroesData = await fetch(`https://api.opendota.com/api/players/${id32}/heroes`, {
      method: 'GET'
    })
    const json = await heroesData.json()

    if (json) {
      const topHeroes = await convertTopHeroes(json)
      return {name: userJson.profile.personaname, heroes: topHeroes}
    } else {
      return 0
    }
  } catch (error) {
    return 0
  }
}