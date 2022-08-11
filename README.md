# Invictus
 _A spaceship based game built on Javascript, HTML, and Canvas_

[//]: # (Logo here if have time lol)

## How To Play

Under Construction...
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
| C | Open command-line to enter cheats |


## Features

lol I barely have anything don't play it yet...

## Future Features

- Play multiple levels in an arcade-style spaceship shooting game
- Multiple enemies of varied attack patterns, some more intelligent enemies, and a boss for every level
- Enemies drop gold and powerups, that former of which can be spent at shops to buy upgrades and skills, customize hotkeys, and upgrade ships. 
- Autosave games, load saved games, and import saves from across different networks and devices
- Settings for customizing user experience such as audio control

These are the core features of the game. I'll try to make the game as visually appealing as I can, and add sound effects and maybe even some relevant music. I'm also thinking of making more advanced, adaptive AI's that make decisions based on experience and circumstance, and elite enemies or bosses that have more unique fight patterns than just shooting projectiles out. Also tentatively thinking of a 3d star zooming intro page. Adding achievements hopefully as well. A large portion of the project will be spent on vectors and trignomentry as arcade-esque space games tend to be.


## Technologies, Libraries, APIs

The core of the game will be built using Javascript, HTML, and CANVAS. I used keymaster to help with deficiencies in response time of built-in EventListeners, which make the game clunky to play. There is a wait-time when holding down a key for the event listener to transition between a "tapped" key and a "held-down" key, which makes the game very clunky to play. At the moment, no other additional libraries are used aside from webpack to help set-up the project i.e. module dependencies


## WireFrame

Under Construction...


## Production Timeline

Week 9
- Thursday: Project Setup, Create canvas, stars, spaceship movement, shooting projectiles
- Friday: Finish shooting projectiles, offset, basic enemies, collisions (bouncing?), damage, healthbars
- Saturday: Finish First Level. Add power-ups, more enemies, maybe boss? 
- Sunday: Create shop, be able to level-up and add powerups. 

Week 10
- Monday: Catchup...Finish non-completed
- Tuesday: Add more levels
- Wendesday: UI (Start-game, end-game, saving/loading, options like turning off volumes, pause)
- Thursday: More graphics improvements/cleanup, additional difficult bosses and AI, background upgrade (Scrollable?), achievments, complex/multi-faceted hitboxes, and other bonuses
- Friday: Continue working
- Saturday: Continue Working
- Sunday: Finish-up!


## To-Do

Under Construction...

SOON:
- Fix Yellow Ship... Looks out-of-place. Darken and edit
- Recolor some ships
- RESOLUTION CHANGE - MAP SHIFT
- Make resolution adjustable: RIGHT NOW ONLY LARGER SCREENS CAN PLAY IT

LATER: 
- Loading...
- Upgrade background: planets, nebulas, etc.
- Drawing off-screen ships (slightly off atm)
- Consistent graphics -> change drop images, UI, etc.

## Known Bugs

- Sometimes on page refresh, mousemove event not working as intended (maybe DOMload?)
- Random shadow blurring unintended
- Make drops intervally shadow blur
- LAG: WHEN UPGRADING SHIP, CREATING DROP (load image?)
- RESOLUTION CHANGE - MAP SHIFT - WHY IS IT OFF THE SCREEN ?
- Tapping: Default Weapon (or ones with additional cooldowns) do not respond properly to tapping instead of holding
- Fix Boss -> Should be able to move off-screen
- Instructions not centered
- SHOP NEEDS COMPLETE REFACTORING - Not Full Images for everyshop screen, just add the necessary stuff
- SHOP is currently hard-coded and does not have implemented backwards functionality (or scalability)


### Special Thanks

- MIT for README formatting
- Kidzgames for inspiration and sprites
- Planer, Xolonium, Skirmisher, Neuropol fonts
- Intro: Road 96 - Mountain Peak
- Level 1 Theme: DEFRAG - The Dawn of Utopia
- Level 1 Boss: Greg Dombrowski - Devour
- Level 2 Theme: Downtown Binary & Zane Alexander - Orbit
- Level ? Theme: Reconfig - Shortwire
- Charles Patterson for "LOADING"

All music has been confirmed free for non-commercial usage.

_Based on Kidzgames's Enigmata_


**Thanks for playing!**

