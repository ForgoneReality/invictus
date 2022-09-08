# Invictus
 _A spaceship based game built on Javascript, HTML, and Canvas_

[//]: # (Logo here if have time lol)

##### This Project is under active construction!! Features may be missing or dysfunctional as the project is being continuously changed everyday.

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

### Smooth Movement and Rotation
- Created fluid spaceship movement using velocity and acceleration
- Spaceship rotates responsively to mouse movement by manipulating trignometric identities
- Utilizes DRY code in the form of a helper functions to rotate X/Y offsets via rotational matrix transformations

![rotate1final](https://user-images.githubusercontent.com/46094706/189086539-a4cfe111-aa0a-4da3-b9a1-e9c5e9d234cd.gif)

## Future Features

- Play multiple levels in an arcade-style spaceship shooting game
- Multiple enemies of varied attack patterns, some more intelligent enemies, and a boss for every level
- Enemies drop gold and powerups, that former of which can be spent at shops to buy upgrades and skills, customize hotkeys, and upgrade ships. 
- Autosave games, load saved games, and import saves from across different networks and devices
- Settings for customizing user experience such as audio control

These are the core features of the game. I'll try to make the game as visually appealing as I can, and add sound effects and maybe even some relevant music. I'm also thinking of making more advanced, adaptive AI's that make decisions based on experience and circumstance, and elite enemies or bosses that have more unique fight patterns than just shooting projectiles out. Also tentatively thinking of a 3d star zooming intro page. Adding achievements hopefully as well. A large portion of the project will be spent on vectors and trignomentry as arcade-esque space games tend to be.


## Technologies, Libraries, APIs

The core of the game will be built using Javascript, HTML, and CANVAS. I used keymaster to help with deficiencies in response time of built-in EventListeners, which make the game clunky to play. There is a wait-time when holding down a key for the event listener to transition between a "tapped" key and a "held-down" key, which makes the game very clunky to play. At the moment, no other additional libraries are used aside from webpack to help set-up the project i.e. module dependencies

Images edited/created via GIMP and Adobe Illustrator

Audio sometimes edited via Audacity

## Production Timeline

Under Reconstruction...

## To-Do

Under Construction...

SOON:
- Level 2 Boss Finish
- Level 2 Intro Cutdown
- Tutorial
- Shop should show current balance
- Fix Preloading Screen Description Size
- Fix Major Bugs
- Skills
- Settings
- Pause Game
- Shop Buttons

LATER: 
- Upgrade background: planets, nebulas, etc. -> MORE IMPORTANT THAN IT SEEMS
- Fix Yellow Ship... Looks out-of-place. Darken and edit
- Recolor some ships
- Drawing off-screen ships (slightly off atm) (boss should be able to shoot off-screen)
- Shop should have upgrade-ship option
- better healthbar/shield bar and energy bar
- Shop should have back button
- Load Game
- More Levels, Ships, Bosses, and Skills
- Replay Level, Level Select
- Achievements
- RESOLUTION CHANGE - MAP SHIFT
- Make resolution adjustable: RIGHT NOW ONLY LARGER SCREENS CAN PLAY IT
- Consistent graphics -> change drop images, UI, etc.

## Known Bugs

- Rotational bug!!
- Replay level twice music broken
- Make drops intervally shadow blur (minor)
- RESOLUTION CHANGE - MAP SHIFT - WHY IS IT OFF THE SCREEN ?
- Tapping: Default Weapon (or ones with additional cooldowns) do not respond properly to tapping instead of holding (minor)
- Fix Bosses -> Should be able to move off-screen
- Instructions not centered
- BOSS HURTBOX AND COLLISION BOX INACCURATE WHEN ROTATING -> Normal ships probably also inaccurate -> Very noticable with Orios
- ships tend to teleport in (minor)
- If you destroy the boss simultaneously as it destroys you, unexpected things occur
- Picking up a shield/HP as you die may cause the game to continue (and invincibility)
- Newer player ships shots are misaligned


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

