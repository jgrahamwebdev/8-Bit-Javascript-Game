
//Creates the Collision squares that we want to have drawn onto our map
class Boundary {

    static width = 48
    static height = 48

    constructor({position}) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    //Creates the square boundary
    draw() {
        context.fillStyle = 'rgba(255, 0, 0, 0)'
        context.fillRect(
            this.position.x, this.position.y,
            this.width, this.height
        )
    }
}


//Class for our Sprite Images that contains Constructor Method that hold the 
//**Putting the Constructor Parameters in curly braces makes it so the order which the are used in does NOT matter**
class Sprite {
    constructor({ position, velocity, image, frames = { max: 1 }, sprites }) {
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0}

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }

        this.moving = false

        this.sprites = sprites
    }

    draw() {
        //Calls and Positions the Player Image at starting point.
        //First call 'this.image', then 4 arguments that crop Img Sprite, then 2 arguments that position character, then 2 arguments that declare actually width and height our Img needs to be rendered at.
        context.drawImage(
            this.image, 
            this.frames.val * this.width, 
            0, 
            this.image.width / this.frames.max, 
            this.image.height, 
            this.position.x, 
            this.position.y,
            this.image.width / this.frames.max, 
            this.image.height,
        )

        if(!this.moving) return
            if(this.frames.max > 1) {
                this.frames.elapsed++
            }
    
            if(this.frames.elapsed % 10 === 0) {
                if(this.frames.val < this.frames.max - 1) {
                    this.frames.val++
                } else {
                    this.frames.val = 0
                }
            }
        


    }
}



