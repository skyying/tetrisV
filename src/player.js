
let tetris = document.getElementById('tetris');
let ctx = tetris.getContext('2d');


// get unique points

const matrix = {
    t : [
        [0, 0, 0],
        [0, 1, 0],
        [1, 1, 1],
    ],
    j : [
        [0, 0, 0],
        [2, 0, 0],
        [2, 2, 2],
    ],
    l : [
        [0, 0, 0],
        [0, 0, 3],
        [3, 3, 3],
    ],
    i : [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [4, 4, 4, 4],
        [0, 0, 0, 0],
    ],
    o : [
        [5, 5 ],
        [5, 5 ]
    ],
    s : [
        [0, 0, 0],
        [0, 6, 6],
        [6, 6, 0],
    ],
    z : [
        [0, 0, 0],
        [7, 7, 0],
        [0, 7, 7],
    ]
}

var Point = function(x, y) {
    this.x = x,
    this.y = y
}

function compareXY(a, b) {
    return a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1];
}

function isExist(points, p) {
    return Boolean(points.filter((point) => point[0] === p[0] && point[1] === p[1]).length);

}

function getPermuation(arr1, arr2) {
    let permutation = [];
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            permutation.push([arr1[i], arr2[j]]);
        }
    }
    return permutation;
}

function getPoints(matrix) {
    let points = [];
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[0].length; x++) {
            if (matrix[y][x] > 0) {
                let permutation = getPermuation([x, x + 1], [y, y + 1]);
                for (let i = 0; i < permutation.length; i++) {
                    if (!isExist(points, permutation[i])) {
                        points.push(permutation[i]);
                    }
                }
            }
        }
    }
    points.sort((a, b) => compareXY(a, b));
    return points;
}



function getClockwisePoints(points) {
    let copyPoints = points;
    let x = 0,
        y = 0;
    for (let i = 0; i < points.length; i++) {
        x += points[i][0];
        y += points[i][1];
    }
    let x_avg = x / points.length,
        y_avg = y / points.length;
    copyPoints = copyPoints.filter((p) => p[0] !== x_avg && p[1] !== y_avg);
    for (let i = 0; i < copyPoints.length; i++) {
        copyPoints[i][0] -= x_avg;
        copyPoints[i][1] -= y_avg;
    }

    let polar = copyPoints.map((cor, i) => {
        return {
            p: Math.atan2(cor[1], cor[0]),
            xy: [cor[0] + x_avg, cor[1] + y_avg]
        }
    });
    
    polar.sort((a, b) => a.p - b.p);
    let p2 = polar.map((p) => p.xy)
    p2.push(p2[0]);
    return p2; 

}

function draw(points, scaler, canvas) {
    let len = points.length;
    canvas.beginPath();
    canvas.lineWidth = 2;
    canvas.strokeStyle = 'black';
    canvas.lineJoin="round";
    canvas.moveTo(points[0][0] * scaler, points[0][1] * scaler);
    for (let i = 1; i < len; i++) {
        canvas.lineTo(points[i][0] * scaler, points[i][1] * scaler);
        canvas.stroke();
    }
}

function drawOutline(matrix, offset, canvas){
    let u_points = getPoints(matrix);
    let sortedPoints = getClockwisePoints(u_points);
    let p = sortedPoints.map((p) => [p[0] + offset.x, p[1] + offset.y]); 
    draw(p, 30, canvas);
}

export {drawOutline};


drawOutline(matrix['t'], {x: 4, y: 5}, ctx);
