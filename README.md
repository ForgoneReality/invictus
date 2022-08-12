# Invictus
 _A spaceship based game built on Javascript, HTML, and Canvas_

[//]: # (Logo here if have time lol)

## How To Play

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

For best experience, use a mouse and enter full-screen view mode


## Features

pew pew

## Future Features

- Play multiple levels in an arcade-style spaceship shooting game
- Multiple enemies of varied attack patterns, some more intelligent enemies, and a boss for every level
- Enemies drop gold and powerups, that former of which can be spent at shops to buy upgrades and skills, customize hotkeys, and upgrade ships. 
- Autosave games, load saved games, and import saves from across different networks and devices
- Settings for customizing user experience such as audio control

These are the core features of the game. I'll try to make the game as visually appealing as I can, and add sound effects and maybe even some relevant music. I'm also thinking of making more advanced, adaptive AI's that make decisions based on experience and circumstance, and elite enemies or bosses that have more unique fight patterns than just shooting projectiles out. Also tentatively thinking of a 3d star zooming intro page. Adding achievements hopefully as well. A large portion of the project will be spent on vectors and trignomentry as arcade-esque space games tend to be.


## Technologies, Libraries, APIs

The core of the game will be built using Javascript, HTML, and CANVAS. I used keymaster to help with deficiencies in response time of built-in EventListeners, which make the game clunky to play. There is a wait-time when holding down a key for the event listener to transition between a "tapped" key and a "held-down" key, which makes the game very clunky to play. At the moment, no other additional libraries are used aside from webpack to help set-up the project i.e. module dependencies

## Production Timeline

Under Reconstruction...

## To-Do

Under Construction...

SOON:
- Level 2
- Tutorial
- Skills
- Fix Yellow Ship... Looks out-of-place. Darken and edit
- Recolor some ships
- RESOLUTION CHANGE - MAP SHIFT
- Make resolution adjustable: RIGHT NOW ONLY LARGER SCREENS CAN PLAY IT

LATER: 
- Upgrade background: planets, nebulas, etc. -> MORE IMPORTANT THAN IT SEEMS
- Drawing off-screen ships (slightly off atm)
- Settings
- Load Game
- More Levels, Ships, Bosses, and Skills
- Replay Level, Level Select
- Achievements
- Consistent graphics -> change drop images, UI, etc.

## Known Bugs

- Make drops intervally shadow blur (minor)
- RESOLUTION CHANGE - MAP SHIFT - WHY IS IT OFF THE SCREEN ?
- Tapping: Default Weapon (or ones with additional cooldowns) do not respond properly to tapping instead of holding (minor)
- Fix Bosses -> Should be able to move off-screen
- Instructions not centered
- BOSS HURTBOX AND COLLISION BOX INACCURATE WHEN ROTATING -> Normal ships probably also inaccurate -> Very noticable with Orios
- ships tend to teleport in (minor)


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

