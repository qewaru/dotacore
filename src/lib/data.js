import { ApplicationCommandOptionType } from 'discord.js'

export const heroPos = {
  1: [
    'Alchemist', 'Anti Mage', 'Bloodseeker', 'Chaos Knight', 'Drow Ranger', 'Faceless Void', 'Gyrocopter', 'Juggernaut', 'Lifestealer', 'Luna', 'Medusa', 'Monkey King', 'Morphling', 'Muerta', 'Naga Siren', 'Phantom Assassin', 'Phantom Lancer', 'Riki', 'Slark', 'Spectre', 'Sven', 'Templar Assassin', 'Terrorblade', 'Troll Warlord', 'Ursa', 'Weaver'
  ], 

  2: [
    'Alchemist', 'Arc Warden', 'Batrider', 'Broodmother', 'Clinkz', 'Death Prophet', 'Ember Spirit', 'Gyrocopter', 'Huskar', 'Invoker', 'Leshrac', 'Lina', 'Lone Druid', 'Medusa', 'Meepo', 'Necrophos', 'Outworld Destroyer', 'Pangolier', 'Puck', 'Queen of Pain', 'Razor', 'Shadow Fiend', 'Sniper', 'Storm Spirit', 'Templar Assassin', 'Tinker', 'Viper', 'Visage', 'Void Spirit', 'Windranger', 'Zeus'
  ],

  3: [
    'Abaddon', 'Axe', 'Beastmaster', 'Brewmaster', 'Bristleback', 'Centaur Warrunner', 'Chaos Knight', 'Dark Seer', 'Dawnbreaker', 'Doom', 'Dragon Knight', 'Earthshaker', 'Elder Titan', 'Kunkka', 'Legion Commander', 'Lycan', 'Magnus', 'Mars', 'Necrophos', 'Night Stalker', 'Omniknight', 'Primal Beast', 'Razor', 'Sand King', 'Slardar', 'Spirit Breaker', 'Tidehunter', 'Timbersaw', 'Tiny', 'Underlord', 'Viper', 'Wraith King'
  ],

  4: [
    'Ancient Apparition', 'Bane', 'Bounty Hunter', 'Clinkz', 'Clockwerk', 'Dark Seer', 'Dark Willow', 'Disruptor', 'Earth Spirit', 'Earthshaker', 'Enchantress', 'Enigma', 'Grimstroke', 'Hoodwink', 'Jakiro', 'Keeper of the Light', 'Lich', 'Lion', 'Mars', 'Mirana', "Nature's Prophet", 'Nyx Assassin', 'Ogre Magi', 'Phoenix', 'Pudge', 'Pugna', 'Rubick', 'Shadow Demon', 'Shadow Shaman', 'Silencer', 'Skywrath Mage', 'Snapfire', 'Spirit Breaker', 'Techies', 'Treant Protector', 'Tusk', 'Undying', 'Vengeful Spirit', 'Venomancer', 'Warlock', 'Winter Wyvern', 'Witch Doctor'
  ],

  5: [
    'Ancient Apparition', 'Bane', 'Chen', 'Crystal Maiden', 'Dark Willow', 'Dazzle', 'Disruptor', 'Enchantress', 'Enigma', 'Grimstroke', 'Hoodwink', 'Io', 'Jakiro', 'Keeper of the Light', 'Lich', 'Lion', "Nature's Prophet", 'Ogre Magi', 'Oracle', 'Phoenix', 'Pugna', 'Rubick', 'Shadow Demon', 'Shadow Shaman', 'Silencer', 'Skywrath Mage', 'Snapfire', 'Techies', 'Treant Protector', 'Undying', 'Vengeful Spirit', 'Venomancer', 'Warlock', 'Winter Wyvern', 'Witch Doctor'
  ]
}

export const commands = [
  {
    name: 'lastmatch',
    description: 'Sends users last match',
    options: [
      {
        name: 'user-id',
        description: 'User ID',
        type: ApplicationCommandOptionType.Number,
        required: true
      }
    ]
  },
  {
    name: 'randomdraft',
    description: 'Randomly advice you a hero to play',
    options: [
      {
        name: 'attribute',
        description: 'Random hero based on attribute',
        type: ApplicationCommandOptionType.String
      },
      {
        name: 'position',
        description: 'Random hero based on position',  
        type: ApplicationCommandOptionType.Number
      }
    ]
  },
  {
    name: 'topheroes',
    description: 'List of top-5 player heroes',
    options: [
      {
        name: 'user-id',
        description: 'User ID',
        type: ApplicationCommandOptionType.Number,
        required: true
      }
    ]
  }
]

// export const commands = [
//   {
//     name: 'test',
//     description: 'Replies with poshel ti!'
//   },
//   {
//     name: 'mmr',
//     description: 'Checks MMR of some user',
//     options: [
//       {
//         name: 'user-id',
//         description: 'User ID',
//         type: ApplicationCommandOptionType.Number,
//         required: true
//       }
//     ]
//   },
//   {
//     name: 'lastmatch',
//     description: 'Sends users last match',
//     options: [
//       {
//         name: 'user-id',
//         description: 'User ID',
//         type: ApplicationCommandOptionType.Number,
//         required: true
//       }
//     ]
//   },
//   {
//     name: 'bet',
//     description: 'Opens betting for upcoming match'
//   },
//   {
//     name: 'randomdraft',
//     description: 'Randomly advice you a hero to play',
//     options: [
//       {
//         name: 'attribute',
//         description: 'Random hero based on attribute',
//         type: ApplicationCommandOptionType.String
//       },
//       {
//         name: 'position',
//         description: 'Random hero based on position',
//         type: ApplicationCommandOptionType.Number
//       }
//     ]
//   }
// ]