<br></br>
<p align="center">
  <img src="https://github.com/ForgoneReality/invictus/blob/master/images/logo3.png" />
</p>
<br></br>

## Introduction

A spaceship shooting game built with Javascript, HTML, and CSS

## How To Play

 ### [Click Here to Play](https://forgonereality.github.io/invictus/)

- __WASD:__ Move spaceship
- Mouse Move: Change aiming location
- Mouse Click or SPACE: Shoot
- Numbers [1,2,3,4,5]: Use Special Abilities
- P: Pause Game

| Key | Control |
| ------ | ------ |
| Arrow Keys or WASD | Move your spaceship |
| Cursor Movement | Change targeting location for firing weapon |
| Mouse Click | Fire default Weapon |
| Numbers [1-5] | Use special weapons (or change weapon?)|
| P | Pause Game |

For best experience, use a mouse, wear headphones, and enter full-screen mode


## Features

### Smooth Movement and Rotation
- Created fluid spaceship movement using velocity and acceleration
- Spaceship rotates responsively to mouse movement by manipulating trignometric identities
- Utilizes DRY code in the form of helper functions to rotate X/Y offsets via rotational matrix transformations

![rotate1final](https://user-images.githubusercontent.com/46094706/189086539-a4cfe111-aa0a-4da3-b9a1-e9c5e9d234cd.gif)

```javascript
//src/background.js
    constructor(...)
    {
       ...
       this.mouse_x = this.width / 2;
       this.mouse_y = 0;
       let handleMousemove = (event) => {
           this.mouse_x = event.offsetX;
           this.mouse_y = event.offsetY;
       };
       document.addEventListener('mousemove', handleMousemove);
       ...
    }
```

```javascript
//src/player.js
    updateAngleAndNormalizedVector(mouse_x, mouse_y)
    {
        let distX = mouse_x - this.realX();
        let distY = mouse_y - this.realY();
        if(distX === 0)
            this.realY() > mouse_y ? this.degrees = 180; : this.degrees = 0;
        else if (distY === 0)
            distX > 0 ? this.degrees = 90; : this.degrees = 270;
        else //NOTE: y increasing goes from top to bottom, not bottom to top!!
        {
            distX > 0 ? this.degrees = 90 + ((Math.atan(distY / distX)) * 180.0 / Math.PI); : this.degrees = 270 + ((Math.atan(distY / distX)) * 180.0 / Math.PI);
        }
        
        length = Math.sqrt(distX * distX + distY * distY); //basic distance calculation d = sqrt((x1 - x2)^2 + (y1 - y2)^2)
        // this.normalVector = [Math.abs(distX) / length, Math.abs(distY) / length]; <- seems like absolute values dont matter
        this.normalVector = [distX / length, distY / length]; //calculate normal vector for use (scaled via speed constant to get x-velocity and y-velocity
    }
    
    //#offset returns the new (x,y) relative to center after rotating to this.degrees
    offset(x, y, deg = 0) //x,y relative to center, which should be realX() and real(Y), prior to rotation
    {
        //apply matrix transformation of form 
        //R = |cos θ  - sin θ |
        //    | sin θ   cos θ |
        //to apply rotational transformation by changing basis vectors 

        let degrees = this.degrees + deg; //setup
        //usually -90 but because y is going positive going down, don't have to

        let c = Math.cos(degrees * Math.PI / 180.0);
        let s = Math.sin(degrees * Math.PI / 180.0);

        return [x * c - y * s, x * s + y * c];
    }
    
    //Now putting all these helper functions together, we integrate them to get accurate projectile shooting. Example code for basic double lasers
    //which is the default weapon of the Level 1 ship
    shootProjectile(mouse_x, mouse_y)
    {
    
       this.updateAngleAndNormalizedVector(mouse_x, mouse_y);

       switch(this.projectileType)
       {
       ...
          case 1: //basic lasers double  
             speed = 12;
             cooldown = 12;
             if(this.shootTimer <= 0)
             {
                 let projs = [];
                 this.shootTimer = cooldown;
                 let offset_x = 17;
                 let offset_y = -40;// defaults for level === 1
                 let rotate_scaler = this.offset(offset_x, offset_y);
                 let rotate_scaler2 = this.offset(offset_x * -1, offset_y);
                 projs.push(new LaserDamageProjectile([this.realX() + rotate_scaler[0], this.realY() + rotate_scaler[1]], [speed * this.normalVector[0], speed*this.normalVector[1]], this.degrees, 20, 1, 0, this.basedamage, 4));
                 projs.push(new LaserDamageProjectile([this.realX() + rotate_scaler2[0], this.realY() + rotate_scaler2[1]], [speed* this.normalVector[0], speed*this.normalVector[1]], this.degrees, 20, 1, 0, this.basedamage, 4));
                 return projs;
             }
             else
             {
                 this.shootTimer -= 1;
                 return undefined;
             }
             break;
       }
       ...
    }
```

### Levels, Enemies, and Power-Ups
- Variety of enemies with distinct behaviors and a chance to drop power-ups or other bonuses
- Levels get progressively more difficult as new, stronger enemies are introduced and earlier, basic ones are phased out

![](https://github.com/ForgoneReality/gif_dump/blob/master/fighting.gif)

### Unique Bosses 
- Multifaceted bosses with unique styles and different boss themes

![](https://github.com/ForgoneReality/gif_dump/blob/master/bossfight.gif)

### Immersive Star Background Main Menu
- Simulated 3-D starfield with the illusion of fast space-travel
- Implemented using 3-D trignometry

![video-convert-1662629708606_Trim (2)](https://user-images.githubusercontent.com/46094706/189095662-f1bbe49f-deb6-4bcf-80da-487c90eb1ff8.gif)

```javascript
import Star3 from "./star3"
export default class StarField
{
    constructor(canvas, width, height){
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.innerWidth = width - 10;
        this.innerHeight = height- 10;
        this.radius = 1;
        this.starsIndex = 0;
        this.stars = [];
        this.centerX = width/2;
        this.centerY = height/2;
        this.focalLength = 100;
        this.starRadius = null;
        this.starX = null;
        this.starY = null;
        this.numStars = 500;
        this.mouse = {};
        this.starX_dir = 0;
        this.starY_dir = 0;
        this.continue = true;
        this.initiateEnd = false;
        //...
        
        canvas.width = this.innerWidth;
        canvas.height = this.innerHeight;

        this.start();
    }

    start()
    {
        //initialize 500 stars in random position, size dependent on position
        for(let s = 0; s < this.numStars; s++){
            let x = Math.random() * this.innerWidth;
            let y = Math.random() * this.innerHeight;
            let z = Math.random() * this.innerWidth;
            this.starsIndex++;
            let my_star = new Star3(x,y,z, this.radius, this.starsIndex, this.centerX, this.centerY, this.focalLength, this.starX_dir, this.starY_dir, this.innerWidth);
            
            this.stars[this.starsIndex] = my_star;
        }
        this.animate();
    }

    // Function for animate canvas objects
    animate(){
        if(this.continue){
            let c = this.context;
            requestAnimationFrame(this.animate.bind(this));
            c.fillStyle = "black";
            c.fillRect(0,0,this.innerWidth,this.innerHeight);

            for(let i = 1; i < 500; i++){
                this.stars[i].focalLength = this.focalLength;
                this.stars[i].update(c);
                if(this.initiateEnd && this.focalLength > 500)
                {
                    this.stars[i].r -= 1;
                    this.stars[i].g -= 1;
                    this.stars[i].b -= 1;
                }
            }
            
            if (this.initiateEnd) //Below code is for the zooming/fading in effect when a player initiates a new game
                this.focalLength < 1200 ? this.focalLength = this.focalLength + 2 : this.continue = false;
        }
        else
            this.stars = null;
    }
};
```
### End-of-Level Shop
- Shop to spend gold accumulated through the levels, with better upgrades being unlocked in later levels
- Players can buy or upgrade ships, and can also buy active and passive skills for use 

![](https://github.com/ForgoneReality/gif_dump/blob/master/shop.gif)

### Rotational Collision Detection
- To be implemented...


## Technologies, Libraries, APIs

The core of the game will be built using Javascript, HTML, and CANVAS. I used keymaster to help with deficiencies in response time of built-in EventListeners, which make the game clunky to play. There is a wait-time when holding down a key for the event listener to transition between a "tapped" key and a "held-down" key, which makes the game very clunky to play. At the moment, no other additional libraries are used aside from webpack to help set-up the project i.e. module dependencies, and Howler to play sounds.

Images edited/created via GIMP and Adobe Illustrator

Audio sometimes edited via Audacity. 

## To-Do

SOON:
- Level 2 Boss Finish
- Level 2 Intro Cutdown
- Tutorial
- Shop should show current balance
- Fix Preloading Screen Description Size
- Skills
- Settings
- Pause Game
- Shop Buttons

LATER: 
- Upgrade background: planets, nebulas, etc.
- Fix Yellow Ship... Looks out-of-place. Darken and edit
- Recolor some ships
- Shop should have upgrade-ship option
- Better healthbar/shield bar and energy bar
- Load Game
- More Levels, Ships, Bosses, and Skills
- Replay Level, Level Select
- Achievements
- Map Shifting

## Known Bugs

- Rotational bug!!
- Replay level twice music broken
- Make drops intervally shadow blur (minor)
- Tapping: Default Weapon (or ones with additional cooldowns) do not respond properly to tapping instead of holding (minor)
- Instructions not centered
- ships tend to teleport in (minor)
- If you destroy the boss simultaneously as it destroys you, unexpected things occur
- Picking up a shield/HP as you die may cause the game to continue (and invincibility)
- Newer player ships shots are slightly misaligned


### Special Thanks

- MIT for README formatting
- Kidzgames for inspiration and sprites
- Planer, Xolonium, Skirmisher, Neuropol fonts
- Intro: Road 96 - Mountain Peak
- Tutorial: Hello Meteor - Breeze Bay
- Level 1 Theme: DEFRAG - The Dawn of Utopia
- Level 1 Boss: Greg Dombrowski - Devour
- Level 2 Theme: Downtown Binary & Zane Alexander - Orbit
- Level 2 Boss: We are Magonia - Ground is the Limit
- Level 3 Theme: ?
- Level 3 Boss: ?
- Level 4 Theme: Reconfig - Shortwire
- Level 4 Boss: MALO - Vendetta
- Charles Patterson for "LOADING"

Note: HYPERDRIVE - Premium Music HQ for later levels?

All music has been confirmed free for non-commercial usage.

_Based on Kidzgames's Enigmata_

**Thanks for playing!**

