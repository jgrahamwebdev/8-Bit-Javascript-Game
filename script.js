
//Creates the Canvas for the Map
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

//console.log(collisions);

canvas.width = 1024
canvas.height = 576
context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);


const collisionsMap = []
//FOR Loop that is going to loop through the Array that contains our collision points, and for our iteration we want it to loop every 70 items because our game map is 70 tiles wide therefore we want to create our separate Arrays every 70 tiles
for(let i = 0; i < collisions.length; i += 70) {
    //Here we called our empty Array 'collisionsMap' and we will use the Push Method to Push our Slice Method that is slicing out separate Array portions from every 0 position(i) to every 70 position into our empty Array
    collisionsMap.push(collisions.slice(i, 70 + i))
}


//Map Position coordinates
const offset = {
    x: -1050,
    y: -915
}

//Here is how we created our Boundaries, basically
const boundaries = []

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol === 1025)
        boundaries.push(new Boundary({
            position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y
            }
        }))
    })
})


//Calls image of our Map into the Canvas
const image = new Image()
image.src = './img/Pokemon Style Game Map.png'

//Calls image of our Map into the Canvas
const foregroundImage = new Image()
foregroundImage.src = './img/foregroundObjects.png'

//Calls image(s) of character
const playerDownImage = new Image()
playerDownImage.src = './img/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = './img/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './img/playerRight.png'


//Player Sprite
const player = new Sprite({
    position: {
        x: canvas.width / 2,
        y: canvas.height / 2
    },
    image: playerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage
    }
})

//Map Sprite
const background = new Sprite({
    //Set position to our starting coordinates
    position: {
        x: offset.x,
        y: offset.y,
    },
    //Our image Parameter in our Constuctor is equal to the 'image' Variable we created to put our background image on the canvas
    image: image
})

//Foreground Sprite
const foreground = new Sprite({
    //Set position to our starting coordinates
    position: {
        x: offset.x,
        y: offset.y,
    },
    //Our image Parameter in our Constuctor is equal to the 'image' Variable we created to put our background image on the canvas
    image: foregroundImage
})


//Player Movements

//Object for our Keys that are all set to false so our character wont automatically be moving around, it will wait til user presses key.
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const moveables = [
    background,
    ...boundaries,
    foreground,
]

//Function that will detect if any of the four sides of our boundary and any of the four sides of our character meet.
function rectangularCollision ({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && rectangle1.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

//Animation Loop 
function animate() {
    window.requestAnimationFrame(animate);

    //Here we called our background Variable which contains 'position' and 'image' then called our Draw Method to position our Map at its specfied starting point.
    background.draw()

    //Adds in Collision Boundaries into map
    boundaries.forEach(boundary => {
        boundary.draw()
      
    })

    //Renders out Player
    player.draw()

    //Renders out Foreground
    foreground.draw()

    let moving = true
    player.moving = false
    //Here we created an IF Statement that will listen for a specific key being pressed and this will be how the "player is moved around" by calling the x or y position coordinates we specified in our 'background' Variable' and then adding or subtracting a number from those coordinates so as the user holds the key that number is gradually subtracted from or added to the specified x or y coordinate moving the background image giving the illusion our player is moving about the map.
    //Adding in the 'lastKey' makes it so if the user is holding down multiple keys whatever the last key pressed was is what direction the character will move (see 'lastKey' Variable and 'keydown' listener for setup).
    if(keys.w.pressed && lastKey === 'w') {
        player.moving = true
        player.image = player.sprites.up
        //This all will stop our charcter when it runs into one of the boundaries
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            //IF Statement that detects when our character is colliding with one of our boundaries on all four sides of our character
            if(rectangularCollision ({
                rectangle1: player, 
                rectangle2: {...boundary, 
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }
                }
            })) {
                moving = false
                break
            }
        }
        if(moving)
        //Moves charcter 3 pixels when pressed
        moveables.forEach((moveable) => {
            moveable.position.y += 3
        })
    } else if(keys.a.pressed && lastKey === 'a') {
        player.moving = true
        player.image = player.sprites.left
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(rectangularCollision ({
                rectangle1: player, 
                rectangle2: {...boundary, 
                    position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }
                }
            })) {
                moving = false
                break
            }
        }
        if(moving)
        moveables.forEach((moveable) => {
            moveable.position.x += 3
        })
    } else if(keys.s.pressed && lastKey === 's') {
        player.moving = true
        player.image = player.sprites.down
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(rectangularCollision ({
                rectangle1: player, 
                rectangle2: {...boundary, 
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }
                }
            })) {
                moving = false
                break
            }
        }
        if(moving)
        moveables.forEach((moveable) => {
            moveable.position.y -= 3
        })
    } else if(keys.d.pressed && lastKey === 'd') {
        player.moving = true
        player.image = player.sprites.right
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(rectangularCollision ({
                rectangle1: player, 
                rectangle2: {...boundary, 
                    position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }
                }
            })) {
                moving = false
                break
            }
        }
        if(moving)
        moveables.forEach((moveable) => {
            moveable.position.x -= 3
        })
    }
  
}
animate();

// let lastKey = ''
// //Event Listener that listens for the W,A,S,D keys to be pressed which will control the charcters movement direction.
// //We called our 'Keys' Object and now when the specifed key is pressed it is switched from default False to True.
// window.addEventListener('keydown', (e) => {
//    switch (e.key) {
//     case 'w':
//         keys.w.pressed = true
//         lastKey = 'w'
//     break
//     case 'a':
//         keys.a.pressed = true
//         lastKey = 'a'
//     break 
//     case 's':
//         keys.s.pressed = true
//         lastKey = 's'
//     break
//     case 'd':
//         keys.d.pressed = true
//         lastKey = 'd'
//     break   
//    }
// })
// //Here we called the same Event Listener for our keys but this time we listen for a Key and we set our key pressed back to false so essentially this creates a toggling effect for our keys when the user is moving the character around.
// window.addEventListener('keyup', (e) => {
//     switch (e.key) {
//      case 'w':
//          keys.w.pressed = false
//      break
//      case 'a':
//          keys.a.pressed = false
//      break 
//      case 's':
//          keys.s.pressed = false
//      break
//      case 'd':
//          keys.d.pressed = false
//      break   
//     }
//  })

// //Plays music
// let clicked = false
// addEventListener('click', () => {
//     if(!clicked) {
//         audio.Map.play()
//         clicked = true
//     } else {
//         audio.Map.pause()
//     }
// })

// //Hide Start Button when clicked (creates fadeout animation)
// function fadeOutEffect() {
//     let fadeTarget = document.querySelector('.startBtn');
//     let fadeEffect = setInterval(function () {
//         if (!fadeTarget.style.opacity) {
//             fadeTarget.style.opacity = 1;
//         }
//         if (fadeTarget.style.opacity > 0) {
//             fadeTarget.style.opacity -= 0.1;
//         } else {
//             clearInterval(fadeEffect);
//         }
//     }, 50);
// }

// document.querySelector('.startBtn').addEventListener('click', fadeOutEffect);


// //Mute Button
// let on = document.querySelector('.on')
// let off = document.querySelector('.off')
// let soundBox = document.querySelector('.soundBox')

// let click = false

// off.classList.add('hidden');

// function mute () {
//     if(!click) {
//         off.classList.remove('hidden');
//         on.classList.add('hidden');
//     }
// }
// on.addEventListener('click', mute);
