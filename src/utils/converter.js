import { readFile } from 'fs/promises';

export async function convertItems(items) {
    const raw = await readFile('./src/lib/items.json', 'utf-8')
    const itemsJson = JSON.parse(raw)
    let itemDetails = []

    items.map((id) => {
        const item = Object.values(itemsJson).find(item => item.id === parseInt(id))
        itemDetails.push(item.dname)
    })

    return itemDetails
}

export async function convertHeroes(heroId) {
    const raw = await readFile('./src/lib/hero_names.json', 'utf-8')
    const heroesJson = JSON.parse(raw)
    const heroData = Object.values(heroesJson).find(hero => hero.id === heroId)

    return heroData.localized_name
}

export async function convertAttribute(attr) {
    const raw = await readFile('./src/lib/hero_names.json', 'utf-8')
    const heroesJson = JSON.parse(raw)
    const heroes = Object.values(heroesJson).filter(hero => hero.primary_attr === attr)

    const returnData = heroes.map(hero => hero.localized_name)
    returnData.sort()

    return returnData
}

export async function convertTopHeroes(json) {
    const sortedByGames = json.sort((hero1, hero2) => hero2.games - hero1.games)
    const sliced = sortedByGames.slice(0, 10)
    const sortedByWinrate = sliced.sort((a, b) => (b.win / b.games * 100) - (a.win / a.games * 100))
    const heroesList = sortedByWinrate.slice(0, 7)

    const returnData = [];

    for (const hero of heroesList) {
        const heroName = await convertHeroes(hero.hero_id);
        returnData.push({
            name: heroName,
            matches: hero.games,
            winrate: Math.floor(hero.win / hero.games * 100)
        });
    }
    
    return returnData
}