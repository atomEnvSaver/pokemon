const fs = require('fs');
const PokemonDataValidator = require('./lib/pokemon_data_validator');

const dataFilePath = 'data/pokemon_data.json';

const validator = new PokemonDataValidator();
const jsonStr = fs.readFileSync(dataFilePath);
const json = JSON.parse(jsonStr);

const test =[{ no: 75,
  name: 'ゴローン',
  form: 'アローラのすがた',
  isMegaEvolution: false,
  evolutions: [ 76 ],
  types: [ 'いわ', 'でんき' ],
  abilities: [ 'じりょく', 'がんじょう' ],
  hiddenAbilities: [ 'エレキスキン' ],
  stats: 
   { hp: 40,
     attack: 80,
     defence: 100,
     spAttack: 30,
     spDefence: 30,
     speed: 20 
    } 
},
{ no: 79,
  name: 'ヤドン',
  form: 'アローラのすがた',
  isMegaEvolution: false,
  evolutions: [ 80, 199 ],
  types: [ 'みず', 'エスパー' ],
  abilities: [ 'どんかん', 'マイペース' ],
  hiddenAbilities: [ 'さいせいりょく' ],
  stats: 
   { hp: 90,
     attack: 65,
     defence: 65,
     spAttack: 40,
     spDefence: 40,
     speed: 15 } }
]
const validationResult = validator.validate(test);

if(validationResult.isFine) {
  console.log('正常です。エラーはありませんでした。');
} else {
  const errors = validationResult.errorMessages;
  console.error(`${errors.length}件のエラー。`);
  errors.forEach((e) => console.error(e));
}

console.log(`正常なポケモンデータ：${validationResult.passedPokemons.length}件`);
console.log(`異常のあったポケモンデータ：${validationResult.errorPokemons.length}件`);

process.exit(0);