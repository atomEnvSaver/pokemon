const fs = require('fs');
const PokemonDataValidator = require('./lib/pokemon_data_validator');

const dataFilePath = 'data/pokemon_data.json';

const validator = new PokemonDataValidator();
const jsonStr = fs.readFileSync(dataFilePath);
const json = JSON.parse(jsonStr);

const validationResult = validator.validate(json);

if(validationResult.isFine) {
  console.log('正常です。エラーはありませんでした。');
} else {
  const errors = validationResult.errorMessages;
  console.error(`${errors.length}件のエラー。`);
  errors.forEach((e) => console.error(e));
}

console.log(`正常なポケモンデータ：${validationResult.passedPokemons.length}件`);
console.log(`異常のあったポケモンデータ：${validationResult.errorPokemons.length}件`);

/** カタカナをひらがなに変換する比較関数
 * @param {String} src - カタカナ
 * @returns {String} - ひらがな
 */
const katakanaToHiragana = (src) => {
  return src.replace(/[\u30a1-\u30f6]/g, function(match) {
      var chr = match.charCodeAt(0) - 0x60;
      return String.fromCharCode(chr);
  });
}

validator.nameList.sort(function(a, b){
  a = katakanaToHiragana(a.toString());
  b = katakanaToHiragana(b.toString());
  if(a < b){
      return -1;
  }else if(a > b){
      return 1;
  }
  return 0;
});

console.log(`名前リスト：${validator.nameList}`);

process.exit(0);