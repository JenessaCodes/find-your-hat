const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(fieldArray){
    this._fieldArray=fieldArray;
  }

  printField(){
    for (let i=0;i<this._fieldArray.length;i++)
    console.log(this._fieldArray[i].join(''));
  }
}

const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);

  myField.printField()
