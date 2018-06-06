var colorable = require('colorable');

let colortext = document.createElement('div');
colortext.setAttribute('id', 'mycolortext');

console.log("This is colorable");
let body = document.body; 
body.appendChild(colortext);
let d1 = document.createElement('div');
d1.classList.add('rect');
let d2 = document.createElement('div');
d2.classList.add('rect2');
body.appendChild(d1);
body.appendChild(d2);

function getRandomColor(){
    let letters = "0123456789ABCDEF";
    let color = "#";
    for(let i = 0 ; i < 6 ; i++){
        color+= letters[Math.floor(Math.random() * 16)] 
    }
    return color;
}


let randomColorNumber = 500;
let rc = getRandomColor();
console.log(rc);

let randomColorSet = {};

for(let i = 0; i < randomColorNumber; i++){
    randomColorSet['color'+i] = getRandomColor();
}

var result = colorable(randomColorSet, {compact: true, threshold: 0})
console.log('result[1].combinations[1]', result[1].combinations[1]);

let pair = [];

for(let i = 0; i < result.length; i++){
    for(let j = 0; j < result[i].combinations.length; j++){
        let current = result[i].combinations[j] ;
       if(current && current.contrast > 4) {
            pair.push([result[i].hex, current.hex]) 
       }
    }
}

d1.style.backgroundColor = pair[0][0] ;
d2.style.backgroundColor = pair[0][1] ;
console.log(pair);
console.log(result);


