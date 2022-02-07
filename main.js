const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(fieldArray){
    this._fieldArray=fieldArray;
    this.a=0;
    this.b=0;
    this._fieldArray[0][0]=pathCharacter;
  }

  runGame() {
    let playing=true
    while (playing) {
        this.printField();
        this.askQuestion();
        if (this._fieldArray[this.a][this.b]===fieldCharacter) {
            this.updateCharacterPath()
        } else if (this._fieldArray[this.a][this.b]===hat) {
            console.log('You win!')
        playing=false
        } else if (this._fieldArray[this.a][this.b]===hole||this._fieldArray[this.a][this.b]===undefined){
            console.log('You fell out. Game over.')
            playing=false
        }
        else {
            console.log('Enter: u, d, l, or r')
            this.updateCharacterPath()
        }
    }
    
  }

  printField(){
    for (let i=0;i<this._fieldArray.length;i++)
    console.log(this._fieldArray[i].join(''));
  }

  askQuestion(){
    let move = prompt("Which way?")
    if (move==='r'||move==='R') {
       this.b=this.b+1  
    }
    else if (move==='d'||move==='D') {
        this.a=this.a+1  
    }
    else if (move==='l'||move==='L') {
        this.b=this.b-1  
    }
    else if (move==='u'||move==='U') {
        this.a=this.a-1  
    }

  }

  updateCharacterPath(){
    this._fieldArray[this.a][this.b]="*" 
  }

  static generateRandomField(rows,columns,percentage){
    let randomArray = new Array(rows).fill(0).map(el => new Array(columns))
    for (let i=0;i<rows;i++) {
        for (let j=0;j<columns;j++) {
            const prob = Math.random();
            randomArray[i][j] = prob > percentage ? fieldCharacter : hole;
        }
    }

    let i= Math.floor(Math.random()*rows)
    let j= Math.floor(Math.random()*columns)

    while (i===0 && j===0){
    i= Math.floor(Math.random()*rows)
    j= Math.floor(Math.random()*columns)
    }

    randomArray[i][j]= hat
    
    return randomArray
   
  }
  
}

const newField = new Field(Field.generateRandomField(10,15,.2))

newField.runGame()



//Test Preset Field Array
/*
const testField = new Field([ 
    ['*', '░', 'O','O'],
    ['░', 'O', '░','O'],
    ['░', '^', '░','O'],
]);

testField.runGame()
*/


/* My logic notes:
input: u d r l
u=[0][b-1][c]
[0][0][0]
[0][1][0]
d=[0][b+1][c]
[0][0][0]
[0][0][1]
r=[0][b][c+1]
l=[0][b][c-1]

[0][1][0]
[0][1][-1] returns undefined
[0][0][0]
[0][-1][0] returns undefined
[0][0][2]
[0][0][3] returns undefined
[0][2][0]
[0][3][0] returns undefined

if element of calculated index is fieldCharacter
console.log prompt and change the fieldCharacter to pathCharacter

if element of calculated indes is hat
stop prompt and console.log "you won", force exit?

if element of calculated indes is undefined or hole
stop prompt and console.log you lose, force exit?

starting index is [0][0][0]
current index is starting index + input index and starting index is " "
*/

/* This Field Generation Logic Didn't Work

let rowArray = [];
    let columnArray=[];
    for (let i=0;i<rows;i++) {x
        rowArray[i]=columnArray
        for (let j=0;j<columns;j++) {
            columnArray[j]=fieldCharacter
            console.log(rowArray)
            console.log("-")
        }
    }

    rowArray[0][0]=hat

    return rowArray
    
*/

/* Next Solution: 
Fix issue if the holes block at least one route to the hat. 
Less of an issue when using lower percentage, but still bug-prone.
*/