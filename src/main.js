const WIDTH = 800;
const HEIGHT = 800;

let player = 1;
let played = false;
let quadrantSelected = -1;

let p = new Pentago(0, 0, 800, 800);

let zero_cwb, zero_awb, one_cwb, one_awb, two_cwb, two_awb, three_cwb, three_awb;

function swapPlayer() {
    if (player == 1) {
        player = 2
    }
    if (player == 2) {
        player = 1
    }
}

function setup() {
    zero_cwb = createButton(">");
    zero_cwb.style('font-size', "25px");
    zero_cwb.position(50, 10);
    zero_cwb.mousePressed(function() {
        p.rotateQuadrant(0, true);
        swapPlayer();
    });
    zero_awb = createButton("v");
    zero_awb.position(10, 50);
    zero_awb.mousePressed(function() {
        p.rotateQuadrant(0, false);
        swapPlayer();
    });

    console.log("nice");
    let canv = createCanvas(WIDTH, HEIGHT);
    canv.position(50, 50);
    // function() {
    //     p.rotateQuadrant(quadrantSelected, true)
    //     played = false;
    //     quadrantSelected = -1;
    //     if (player == 1) { player = 2; } else if (player == 2) {
    //         player = 1;
    //     }
    // }



}

function draw() {
    background(200, 200, 200);
    p.show();
    //check for clicks
}

function mouseClicked() {
    if (played == false) {
        let location = p.getCircle(mouseX, mouseY);
        p.makeMove(location.row, location.col, player);
    }
}

function transpose(a) {
    if (a instanceof Array) {
        return Object.keys(a[0]).map(function(c) {
            return a.map(function(r) { return r[c]; });
        });
    }
}