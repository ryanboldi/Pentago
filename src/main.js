const WIDTH = 800;
const HEIGHT = 800;

let p = new Pentago(0, 0, 800, 800);

function setup() {
    console.log("nice");
    createCanvas(WIDTH, HEIGHT);
}
function draw() {
    background(200, 200, 200);
    p.show();
}

function transpose(a) {
    return Object.keys(a[0]).map(function (c) {
        return a.map(function (r) { return r[c]; });
    });
}
