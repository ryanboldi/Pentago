class Pentago {
    /**
     * 
     * @param {number} x x value of top left of board
     * @param {number} y y value of top left of board
     * @param {number} width width of board
     */
    constructor(x, y, width) {
        this.x = x;
        this.y = y;
        this.width = width;

        let rows = 6;
        let cols = 6;

        this.circleRad = 100 / 2;
        this.circleGap = this.width / 6;

        //initialise empty board
        this.board = [...Array(rows)].map(e => Array(cols).fill(0)); //3D array, first array is quadrants, which each has rows, which each has columns.
        /**
         * Quadrants v
         *  ___________
         * |  0  |  1  |    
         * |_____|_____|
         * |  2  |  3  |    
         * |_____|_____|
         * 
         */

        //ROW, COL
        // this.board[1][0] = 1;
        // this.board[0][0] = 1;
        // this.board[4][2] = 2;
        console.log(this.board);
    }


    show() {
        fill(0, 0, 0);
        stroke(0, 0, 0);
        strokeWeight(1);

        noFill();
        rect(0, 0, this.width - 1, this.width - 1); //draws outer rectangle , subtracting stroke weight
        line(0, this.width / 2, this.width, this.width / 2); //horizontal line
        line(this.width / 2, 0, this.width / 2, this.width); //vetical line

        //draw circles
        ellipseMode(CENTER);
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                let circleCenterX = i * this.circleGap + this.circleGap / 2;
                let circleCenterY = j * this.circleGap + this.circleGap / 2;


                strokeWeight(1);
                stroke(0, 0, 0);
                if (this.board[j][i] == 1) {
                    fill(255, 255, 255);
                } else if (this.board[j][i] == 2) {
                    fill(0, 0, 0);
                } else if (played == false && Math.sqrt((mouseY - circleCenterY) ** 2 + (mouseX - circleCenterX) ** 2) < this.circleRad) {
                    noFill();
                    if (player == 1) {
                        stroke(255, 255, 255);
                    } else if (player == 2) {
                        stroke(0, 0, 0);
                    }
                    strokeWeight(5);
                    if (played == false) {
                        ellipse(circleCenterX, circleCenterY, 2 * this.circleRad - 5 - 2, 2 * this.circleRad - 5 - 2);
                    }
                } else {
                    noFill();
                }
                stroke(0, 0, 0);
                strokeWeight(1);
                ellipse(circleCenterX, circleCenterY, 2 * this.circleRad, 2 * this.circleRad);
            }
        }
        let quadrant = quadrantSelected;
        //if no quadrant selceted
        //white is one, black is two
        if (mouseX >= this.width / 2 && mouseY < this.width / 2) {
            quadrant = 1;
        } else if (mouseX < this.width / 2 && mouseY >= this.width / 2) {
            quadrant = 2;
        } else if (mouseX >= this.width / 2 && mouseY >= this.width / 2) {
            quadrant = 3;
        } else if (mouseX < this.width / 2 && mouseY < this.width / 2) {
            quadrant = 0;
        }


        if (played == true && quadrant !== -1) {
            noFill();
            if (player == 1) {
                stroke(255, 255, 255);
            } else if (player == 2) {
                stroke(0, 0, 0);
            }
            strokeWeight(5);
            if (quadrant == 0) {
                rect(0, 0, this.width / 2, this.width / 2);
                if (mouseIsPressed) {
                    quadrantSelected = 0
                }
            }
            if (quadrant == 1) {
                rect(this.width / 2, 0, this.width / 2, this.width / 2);
                if (mouseIsPressed) {
                    quadrantSelected = 1
                }
            }
            if (quadrant == 2) {
                rect(0, this.width / 2, this.width / 2, this.width / 2);
                if (mouseIsPressed) {
                    quadrantSelected = 2
                }
            }
            if (quadrant == 3) {
                rect(this.width / 2, this.width / 2, this.width / 2, this.width / 2);
                if (mouseIsPressed) {
                    quadrantSelected = 3
                }
            }
        }

    }

    /**
     * 
     * @param {number} quad 0,1,2,3 depending on quadrant
     * @param {boolean} clockwise whether the rotation is clockwise or anti-clockwise
     */
    rotateQuadrant(quad, clockwise) {
        //select quadrant in question
        let quadrant = []
        if (quad == 0) {
            let rows = this.board.slice(0, 3);
            rows.forEach(col => {
                quadrant.push(col.slice(0, 3));
            });
        }
        if (quad == 1) {
            let rows = this.board.slice(0, 3);
            rows.forEach(col => {
                quadrant.push(col.slice(3, 6));
            });
        }
        if (quad == 2) {
            let rows = this.board.slice(3, 6);
            rows.forEach(col => {
                quadrant.push(col.slice(0, 3));
            });
        }
        if (quad == 3) {
            let rows = this.board.slice(3, 6);
            rows.forEach(col => {
                quadrant.push(col.slice(3, 6));
            });
        }
        console.log(quadrant);

        //if clockwise, transpose then reverse each row
        //if anti-clockwise, reverse each row then transpose

        if (clockwise) {
            quadrant = transpose(quadrant);
            quadrant.forEach(array => {
                array = array.reverse()
            });
            console.log(quadrant);
            this.setQuadrant(quad, quadrant);
        } else if (clockwise !== true) {
            quadrant.forEach(array => {
                array = array.reverse()
            });
            quadrant = transpose(quadrant);
            console.log(quadrant);
            this.setQuadrant(quad, quadrant);
        }
    }

    //sets a given quadrant to a 2d array
    setQuadrant(quad, array) {
        if (quad == 0) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    this.board[i][j] = array[i][j];
                }
            }
        }
        if (quad == 2) {
            for (let i = 3; i < 6; i++) {
                for (let j = 0; j < 3; j++) {
                    this.board[i][j] = array[i - 3][j];
                }
            }
        }
        if (quad == 1) {
            for (let i = 0; i < 3; i++) {
                for (let j = 3; j < 6; j++) {
                    this.board[i][j] = array[i][j - 3];
                }
            }
        }
        if (quad == 3) {
            for (let i = 3; i < 6; i++) {
                for (let j = 3; j < 6; j++) {
                    this.board[i][j] = array[i - 3][j - 3];
                }
            }
        }
    }

    //gets which cirlce is at x,y, returns row, columnn OR -1
    getCircle(x, y) {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                let circleCenterX = i * this.circleGap + this.circleGap / 2;
                let circleCenterY = j * this.circleGap + this.circleGap / 2;
                if (Math.sqrt((y - circleCenterY) ** 2 + (x - circleCenterX) ** 2) < this.circleRad) {
                    return { row: j, col: i };
                }
            }
        }
        return { row: -1, col: -1 };
    }

    makeMove(row, col, player) {
        if (row !== -1 && col !== -1) {
            if (this.board[row][col] == 0) {
                this.board[row][col] = player;
                played = true;
            }
        }
    }
}