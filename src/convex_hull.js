
const m = {
    t : [
        [0, 0, 0],
        [0, 1, 0],
        [1, 1, 1],
    ]
}

function getPoints(matrix, offset){
    let points = new Set();
    for(let y = 0; y < matrix.length; y++){
        for(let x = 0; x < matrix[y].length; x++){
            if(matrix[y][x] > 0){
                points.add([x, y]);
                points.add([x, y+offset]);
                points.add([x+offset, y]);
                points.add([x+offset, y+offset]);
            }
        } 
    }
    return points;
}



// const coordinator = [];
// function dm(matrix, offset){
//     matrix.forEach((row, y) => {
//         row.forEach((val, x)=>{
//             if( val !== 0){
//                 // coordinator.push([x, y]);
//                 ctx2.fillStyle = 'black' ;
//                 ctx2.fillRect(x, y, 1, 1);
//             }
//         });
//     });
// }
// var cx1 = document.createElement('canvas');
// cx1.setAttribute('id', "tris");

// var main = document.getElementById('main');
// main.appendChild(cx1);

// var ctx2 = cx1.getContext('2d');
// ctx2.scale(30, 30);
// ctx2.fillStyle = "white";
// ctx2.fillRect(0, 0, cx1.width, cx1.height);
// dm(m["t"], 0);

function isPointsEqual(p1, p2){
    if(p1.length !== p2.length)  return false; 
    for(let i = 0; i < p1.length; i++){
        if(p1[i] !== p2[i]){
            return false; 
        }
    }
    return true;
}

function getVector(p1, p2){
    return  {x: p1[0] - p2[0], y: p1[1] - p2[1]};
}

function crossProduct(startPoint, p1, p2){
    // if > 0, means c is on left side
    let line1 = getVector(startPoint, p1),
        line2 = getVector(startPoint, p2);
    return ( line1.x * line2.y ) - (line1.y * line2.x);
}

function getLineLength(p1, p2){
    return Math.sqrt( Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2)); 
}

function distance(startPoint, p1, p2){
    //  return true is p1 is closer to startPoint compared to p2;
    return getLineLength(startPoint, p1) < getLineLength(startPoint, p2);
}

function sort2DMatrix(matrix){
    return matrix.sort((a, b) => {
        if(a[0] === b[0] ){
            return a[1]  - b[1];
        }else{
            return a[0] - b[0];
        }
    });
}


function filterSamePoints(points){
    points = sort2DMatrix(points);
    for(let i = 1; i < points.length; i++){
        if(isPointsEqual(points[i], points[i-1])) {
            points.splice(i, 1);
            i-=1;
        }
    }
    return points;
}

function slope(p1, p2){
    if(isPointsEqual(p1, p2)){
        return 0; 
    }else{
        return (p1[0] - p2[0]) / (p1[1] - p2[1]);
    }
}

function checkSlope(p1, p2){
    let s = slope(p1, p2);
    return s === 0 || s === 1;
}

let points = Array.from(getPoints(m["t"], 1));
points.sort((a, b) => a[0] > b[0]);
points = filterSamePoints(points);

function getResult(points){
    let result = new Set(), startPoint = current = points[0];
    let collinearPoints = [];

    while(true){
        let nextPoint = points[0];
        for(let i = 1; i < points.length; i++){
            if(isPointsEqual(current, [3, 2])){
                console.log(current, nextPoint, points[i]); 
            }
            if(isPointsEqual(points[i], current)){
                continue;
            }
            let xProduct = crossProduct(current, nextPoint, points[i]);
            if(xProduct > 0){
                nextPoint = points[i];
            }else if(xProduct === 0){
                console.log("=0  ", points[i]);
                if(distance(current, nextPoint, points[i])){
                // if(distance(current, nextPoint, points[i]) && checkSlope(current, points[i])){
                    // true if current to nextPoint is closer than current to points[i];
                    console.log("xPorduct == 0, points[i]", points[i]);
                    collinearPoints.push(nextPoint);
                    nextPoint = points[i];
                }else{
                    console.log("xProduct == 0 else, points[i]", points[i]);
                    collinearPoints.push(points[i]);
                }
            }
        }
        for(let i = 0; i < collinearPoints.length; i++){
            result.add(collinearPoints[i]);
        } 
        if(isPointsEqual(nextPoint, startPoint)) {
            break; 
        }
        result.add(nextPoint);
        current = nextPoint;

    }
    return result;
}

console.log("result", getResult(points));
// result.add(startPoint);
// let collinearPoints = new Set();
// console.log(points);
// let j = 50;
// while(true && j > 50){

//     let nextTarget = points[0];
//     for(let i = 0; i < points.length; i++){
//         if(isPointsEqual(points[i], current )) {
//             continue; 
//         }

//         let xproduct = crossProduct(current, nextTarget, points[i]);

//         if(xproduct > 0){
//             current = points[i] ;
//             collinearPoints = new Set();
//         } else if( xproduct === 0){

//             if(distance(current, nextTarget, points[i]) === true){
//                 collinearPoints.add(nextTarget);
//                 nextTarget = points[i];
//             }else{
//                 collinearPoints.add(points[i]);
//             }
//         }

//         for(let i = 0; i < collinearPoints.length ; i++){
//             result.add(collinearPoints[i]);
//         } 

//         if(isPointsEqual(nextTarget, current)){
//             break; 
//         }
//         j++;
//     }
// }


// console.log("result", result);

