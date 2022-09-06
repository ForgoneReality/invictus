
//background.js
import Star from "./star"
import Ship from "./ship"
import Player from "./player"
import Drop from "./drop";
import CircleDamageProjectile  from "./circleDamageProjectile";

export default class Background{
    constructor(width, height, level_id, context, bgsong, gold, ship_level, parent, difficulty)
    {
        this.width = width;
        this.height = height;
        this.level_id = level_id;
        this.context = context;
        this.stars = [];
        this.projectiles = [];
        this.enemyprojectiles = [];
        this.enemyships = [];
        this.drops = [];
        this.lasers = [];
        this.extras = [];
        this.ship_level = ship_level;
        this.difficulty = difficulty;
        this.createLevel(level_id);
        this.initializeStars(context);

        this.bgsong = bgsong;
        //stats
        this.enemiesdefeated = 0; //for achievement purposes in the future
        this.gold = gold;
        this.initial_gold = gold;
        this.timer = 0;
        this.parent = parent;
        this.death = false; //might be extraneous because of this.continue
        
        this.continue = true;
    };


    createLevel(level)
    {
        this.player = new Player([this.width / 2, this.height - 50], this.ship_level);
        this.mouse_x = this.width / 2;
        this.mouse_y = 0;
        let handleMousemove = (event) => {
            this.mouse_x = event.offsetX;
            this.mouse_y = event.offsetY;
        };
          
        //note: as explained in Player#animate, movement and other spontaneous events cannot be added here
        document.addEventListener('mousemove', handleMousemove);

        if (level === 1)
        {
            this.drops.push(new Drop([.5*this.width, -300], 3));
            // this.enemyships.push(new Ship([.15*this.width, -100*1.25], 0, this)); //type 1
            // this.enemyships.push(new Ship([.44 * this.width, -480*1.25], 0, this)); //type 1
            // this.enemyships.push(new Ship([.55*this.width, -133*1.25], 1, this)); //type 2
            // this.enemyships.push(new Ship([.24 * this.width, -700*1.25], 1, this)); //type 2
            // this.enemyships.push(new Ship([.5 * this.width, -600*1.25], 2, this)); //type 3
            // this.enemyships.push(new Ship([.32 * this.width, -510*1.25], 3, this)); //type 4
            // this.enemyships.push(new Ship([.6*this.width, -780*1.25], 3, this)); //type 1
            // this.enemyships.push(new Ship([.35 * this.width, -840*1.25], 2, this)); //type 3
            // this.enemyships.push(new Ship([.24 * this.width, -985*1.25], 0, this)); //type 2
            // this.enemyships.push(new Ship([.1 * this.width, -1050*1.25], 1, this)); //type 2
            
            // this.enemyships.push(new Ship([.8*this.width, -1090*1.25], 4, this)); 
            // this.enemyships.push(new Ship([.75*this.width, -333*1.25], 4, this)); 
            // this.enemyships.push(new Ship([.68*this.width, -1150*1.25], 1, this)); 
            // this.enemyships.push(new Ship([.13*this.width, -1200*1.25], 1, this)); 
            // this.enemyships.push(new Ship([.27*this.width, -1300*1.25], 3, this)); 
            // this.enemyships.push(new Ship([.43*this.width, -1400*1.25], 2, this)); 
            // this.enemyships.push(new Ship([.53*this.width, -1500*1.25], 2, this)); 
            // this.enemyships.push(new Ship([.63*this.width, -1640*1.25], 0, this)); 
            // this.enemyships.push(new Ship([.77*this.width, -1523*1.25], 4, this)); 

            // this.enemyships.push(new Ship([.23*this.width, -1776*1.25], 3, this)); 
            // this.enemyships.push(new Ship([.56*this.width, -1840*1.25], 3, this)); 
            // this.enemyships.push(new Ship([.4*this.width, -1890*1.25], 3, this)); 
            // this.enemyships.push(new Ship([.5*this.width, -1992*1.25], 4, this)); 
            // this.enemyships.push(new Ship([.1*this.width, -2040*1.25], 2, this)); 
            // this.enemyships.push(new Ship([.6*this.width, -2100*1.25], 4, this)); 
            // this.enemyships.push(new Ship([.25*this.width, -2150*1.25], 1, this)); 
            // this.enemyships.push(new Ship([.53*this.width, -2160*1.25], 1, this)); 
            // this.enemyships.push(new Ship([.17*this.width, -2245*1.25], 3, this)); 
            // this.enemyships.push(new Ship([.48*this.width, -2324*1.25], 2, this));

            // this.enemyships.push(new Ship([.5*this.width, -2500*1.25], 0, this)); 
            // this.enemyships.push(new Ship([.38*this.width, -2570*1.25], 0, this)); 
            // this.enemyships.push(new Ship([.62*this.width, -2570*1.25], 0, this)); 
            // this.enemyships.push(new Ship([.26*this.width, -2640*1.25], 0, this)); 
            // this.enemyships.push(new Ship([.74*this.width, -2640*1.25], 0, this));
            // this.enemyships.push(new Ship([.14*this.width, -2710*1.25], 0, this)); 
            // this.enemyships.push(new Ship([.87*this.width, -2710*1.25], 0, this));  

            // this.enemyships.push(new Ship([.47*this.width, -2930*1.25], 3, this));  
            // this.enemyships.push(new Ship([.2*this.width, -2970*1.25], 2, this));  
            // this.enemyships.push(new Ship([.45*this.width, -3050*1.25], 5, this));    
            // this.enemyships.push(new Ship([.7*this.width, -3150*1.25], 1, this));  
            // this.enemyships.push(new Ship([.35*this.width, -3150*1.25], 1, this));
            // this.enemyships.push(new Ship([.5*this.width, -3270*1.25], 4, this));  
            // this.enemyships.push(new Ship([.2*this.width, -3310*1.25], 3, this));
            // this.enemyships.push(new Ship([.66*this.width, -3400*1.25], 5, this));
            // this.enemyships.push(new Ship([.4*this.width, -3400*1.25], 5, this));


            // this.enemyships.push(new Ship([.43*this.width, -3480*1.25], 1, this));
            // this.enemyships.push(new Ship([.2*this.width, -3480*1.25], 2, this));
            // this.enemyships.push(new Ship([.72*this.width, -3550*1.25], 5, this));
            // this.enemyships.push(new Ship([.34*this.width, -3550*1.25], 5, this));
            // this.enemyships.push(new Ship([.15*this.width, -3630*1.25], 3, this));
            // this.enemyships.push(new Ship([.61*this.width, -3630*1.25], 3, this));

            // this.enemyships.push(new Ship([.5*this.width, -4100*1.25], 0, this)); 
            // this.enemyships.push(new Ship([.38*this.width, -4000*1.25], 0, this)); 
            // this.enemyships.push(new Ship([.62*this.width, -4000*1.25], 0, this)); 
            // this.enemyships.push(new Ship([.26*this.width, -3900*1.25], 0, this)); 
            // this.enemyships.push(new Ship([.74*this.width, -3900*1.25], 0, this));
            // this.enemyships.push(new Ship([.14*this.width, -3810*1.25], 0, this)); 
            // this.enemyships.push(new Ship([.87*this.width, -3810*1.25], 0, this));  

            this.enemyships.push(new Ship([.12*this.width, -4800*1.25], 6, this, true)); 
        }
        if (level === 2)
        {
            this.enemyships.push(new Ship([.5*this.width, -100 * 1.5 -900], 8, this));
            this.enemyships.push(new Ship([.7*this.width, -200 * 1.5 -900], 3, this));
            this.enemyships.push(new Ship([.23*this.width, -300 * 1.5 -900], 8, this));
            this.enemyships.push(new Ship([.42*this.width, -380 * 1.5 -900], 4, this));
            this.enemyships.push(new Ship([.56*this.width, -440 * 1.5 -900], 4, this));
            this.enemyships.push(new Ship([.7*this.width, -500 * 1.5 -900], 5, this));
            this.enemyships.push(new Ship([.3*this.width, -555 * 1.5 -900], 8, this));
            this.enemyships.push(new Ship([.55*this.width, -600 * 1.5 -900], 1, this));
            this.enemyships.push(new Ship([.71*this.width, -666 * 1.5 -900], 2, this));
            this.enemyships.push(new Ship([.5*this.width, -700 * 1.5 -900], 8, this));
            this.enemyships.push(new Ship([.8*this.width, -750 * 1.5 -900], 5, this));
            this.enemyships.push(new Ship([.42*this.width, -888 * 1.5 -900], 4, this));
            this.enemyships.push(new Ship([.5*this.width, -950 * 1.5 -900], 8, this));
            this.enemyships.push(new Ship([.65*this.width, -1000 * 1.5 -900], 8, this));
            this.enemyships.push(new Ship([.47*this.width, -1075 * 1.5 -900], 2, this));
            this.enemyships.push(new Ship([.28*this.width, -1170 * 1.5 -900], 9, this));
            this.enemyships.push(new Ship([.45*this.width, -1200 * 1.5 -900], 8, this));

            this.enemyships.push(new Ship([.65*this.width, -1300 * 1.5 -900], 3, this));
            this.enemyships.push(new Ship([.3*this.width, -1300 * 1.5 -900], 3, this));
            this.enemyships.push(new Ship([.23*this.width, -1321 * 1.5 -900], 8, this));

            this.enemyships.push(new Ship([.7*this.width, -1362 * 1.5 -900], 2, this));
            this.enemyships.push(new Ship([.58*this.width, -1500 * 1.5 -900], 10, this));
            this.enemyships.push(new Ship([.4*this.width, -1567 * 1.5 -900], 8, this));
            this.enemyships.push(new Ship([.74*this.width, -1580 * 1.5 -900], 4, this));
            this.enemyships.push(new Ship([.54*this.width, -1626 * 1.5 -900], 5, this));
            this.enemyships.push(new Ship([.25*this.width, -1700 * 1.5 -900], 1, this));
            this.enemyships.push(new Ship([.43*this.width, -1720 * 1.5 -900], 8, this));
            this.enemyships.push(new Ship([.36*this.width, -1776 * 1.5 -900], 9, this));
            this.enemyships.push(new Ship([.69*this.width, -1878 * 1.5 -900], 5, this));
            this.enemyships.push(new Ship([.75*this.width, -1920 * 1.5 -900], 3, this));
            this.enemyships.push(new Ship([.83*this.width, -2000 * 1.5 -900], 8, this));
            this.enemyships.push(new Ship([.27*this.width, -2065 * 1.5 -900], 2, this));
            this.enemyships.push(new Ship([.38*this.width, -2100 * 1.5 -900], 10, this));
            this.enemyships.push(new Ship([.64*this.width, -2123 * 1.5 -900], 4, this));
            this.enemyships.push(new Ship([.5*this.width, -2180 * 1.5 -900], 5, this));
            this.enemyships.push(new Ship([.25*this.width, -2200 * 1.5 -900], 9, this));
            this.enemyships.push(new Ship([.1*this.width, -2300 * 1.5 -900], 8, this));
            this.enemyships.push(new Ship([.3*this.width, -2300 * 1.5 -900], 8, this));
            this.enemyships.push(new Ship([.5*this.width, -2300 * 1.5 -900], 8, this));
            this.enemyships.push(new Ship([.7*this.width, -2300 * 1.5 -900], 8, this));
            this.enemyships.push(new Ship([.9*this.width, -2300 * 1.5 -900], 8, this));
            this.enemyships.push(new Ship([.35*this.width, -2520 * 1.5 -900], 0, this));
            this.enemyships.push(new Ship([.65*this.width, -2450 * 1.5 -900], 5, this));

            this.enemyships.push(new Ship([0*this.width, -2600 * 1.5 -900], 8, this));
            this.enemyships.push(new Ship([.2*this.width, -2600 * 1.5 -900], 8, this));
            this.enemyships.push(new Ship([.4*this.width, -2600 * 1.5 -900], 8, this));
            this.enemyships.push(new Ship([.6*this.width, -2600 * 1.5 -900], 8, this));
            this.enemyships.push(new Ship([.8*this.width, -2600 * 1.5 -900], 8, this));
            this.enemyships.push(new Ship([.3*this.width, -2700 * 1.5 -900], 2, this));
            this.enemyships.push(new Ship([.5*this.width, -2700 * 1.5 -900], 1, this));

            this.enemyships.push(new Ship([.33*this.width, -2825 * 1.5 -900], 9, this));
            this.enemyships.push(new Ship([.66*this.width, -2950 * 1.5 -900], 3, this));
            this.enemyships.push(new Ship([.52*this.width, -3034 * 1.5 -900], 10, this));
            this.enemyships.push(new Ship([.22*this.width, -3090 * 1.5 -900], 3, this));
            this.enemyships.push(new Ship([.75*this.width, -3150 * 1.5 -900], 8, this));
            this.enemyships.push(new Ship([.64*this.width, -3240 * 1.5 -900], 2, this));
            this.enemyships.push(new Ship([.44*this.width, -3333 * 1.5 -900], 4, this));
            this.enemyships.push(new Ship([.44*this.width, -3400 * 1.5 -900], 8, this));
            this.enemyships.push(new Ship([.44*this.width, -3456 * 1.5 -900], 1, this));


            let newShip = new Ship([.3* this.width, -300*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);
            
            newShip = new Ship([.2* this.width, -300*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.1* this.width, -300*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.15* this.width, -300*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.25* this.width, -300*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.05* this.width, -300*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([0, -300*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.05* this.width, -300*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.6* this.width, -300*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.65* this.width, -300*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.7* this.width, -300*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.75* this.width, -300*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.8* this.width, -300*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.85* this.width, -300*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.9* this.width, -300*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.95* this.width, -300*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            //

            newShip = new Ship([.3* this.width, -325*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);
            
            newShip = new Ship([.2* this.width, -325*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.1* this.width, -325*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.15* this.width, -325*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.25* this.width, -325*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);


            newShip = new Ship([.05* this.width, -325*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([0, -325*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.05* this.width, -325*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.6* this.width, -325*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.65* this.width, -325*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.7* this.width, -325*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.75* this.width, -325*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.8* this.width, -325*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.85* this.width, -325*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.9* this.width, -325*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.95* this.width, -325*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);
            //

            newShip = new Ship([.3* this.width, -350*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);
            
            newShip = new Ship([.2* this.width, -350*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.1* this.width, -350*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.15* this.width, -350*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.25* this.width, -350*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.05* this.width, -350*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([0, -350*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.05* this.width, -350*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.6* this.width, -350*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.65* this.width, -350*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.7* this.width, -350*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.75* this.width, -350*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.8* this.width, -350*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.85* this.width, -350*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.9* this.width, -350*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.95* this.width, -350*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);
            //

            newShip = new Ship([.6* this.width, -375*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.3* this.width, -375*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.6* this.width, -400*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.3* this.width, -400*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.6* this.width, -425*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.3* this.width, -425*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.6* this.width, -450*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.3* this.width, -450*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.6* this.width, -475*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.3* this.width, -475*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.6* this.width, -500*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.3* this.width, -500*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.6* this.width, -525*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.3* this.width, -525*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.6* this.width, -550*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.3* this.width, -550*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.6* this.width, -575*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.3* this.width, -575*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.6* this.width, -600*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.3* this.width, -600*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.6* this.width, -625*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.3* this.width, -625*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.6* this.width, -650*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.3* this.width, -650*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.6* this.width, -675*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.3* this.width, -675*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.6* this.width, -700*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.3* this.width, -700*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);


            newShip = new Ship([.6* this.width, -725*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.3* this.width, -725*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.6* this.width, -750*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.3* this.width, -750*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.6* this.width, -775*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.3* this.width, -775*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.6* this.width, -800*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.3* this.width, -800*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            this.enemyships.push(new Ship([.45*this.width, -400 * 1.5 - 5700], 0, this)); 

            this.enemyships.push(new Ship([.44*this.width, -650 * 1.5 - 5700], 2, this)); 

            this.enemyships.push(new Ship([.365*this.width, -875 * 1.5 - 5700], 9, this)); 

            newShip = new Ship([.6* this.width, -825*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.3* this.width, -825*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.6* this.width, -850*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.3* this.width, -850*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.6* this.width, -875*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.3* this.width, -875*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.6* this.width, -900*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.3* this.width, -900*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.6* this.width, -925*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.3* this.width, -925*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.6* this.width, -950*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.3* this.width, -950*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            //zig-zag

            newShip = new Ship([.575* this.width, -975*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.275* this.width, -975*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.55* this.width, -1000*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.25* this.width, -1000*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.525* this.width, -1025*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.225* this.width, -1025*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.5* this.width, -1050*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.2* this.width, -1050*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.475* this.width, -1075*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.175* this.width, -1075*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);
            
            newShip = new Ship([.45* this.width, -1100*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.15* this.width, -1100*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);
            
            newShip = new Ship([.425* this.width, -1125*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.125* this.width, -1125*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.4* this.width, -1150*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.1* this.width, -1150*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.425* this.width, -1175*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.125* this.width, -1175*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.45* this.width, -1200*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.15* this.width, -1200*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.475* this.width, -1225*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.175* this.width, -1225*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.5* this.width, -1250*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.2* this.width, -1250*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.525* this.width, -1275*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.225* this.width, -1275*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.55* this.width, -1300*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.25* this.width, -1300*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.575* this.width, -1325*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.275* this.width, -1325*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.6* this.width, -1350*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.3 * this.width, -1350*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.45 * this.width, -1350*1.5 - 5700], 1, this);
            newShip.velY = 1.5;
            this.enemyships.push(newShip);

            newShip = new Ship([.625 * this.width, -1375*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.325 * this.width, -1375*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.65* this.width, -1400*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.35* this.width, -1400*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);
            
            newShip = new Ship([.675* this.width, -1425*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.375* this.width, -1425*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.7* this.width, -1450*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.4* this.width, -1450*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.725* this.width, -1475*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.425* this.width, -1475*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);
            
            newShip = new Ship([.75* this.width, -1500*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.45* this.width, -1500*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.775* this.width, -1525*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.475* this.width, -1525*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);
            
            newShip = new Ship([.75* this.width, -1550*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.45* this.width, -1550*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.725* this.width, -1575*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.425* this.width, -1575*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);
            
            newShip = new Ship([.7* this.width, -1600*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.4* this.width, -1600*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.55 * this.width, -1600*1.5 - 5700], 1, this);
            newShip.velY = 1.5;
            this.enemyships.push(newShip);

            newShip = new Ship([.675* this.width, -1625*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.375* this.width, -1625*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.65* this.width, -1650*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.35* this.width, -1650*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.625* this.width, -1675*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.325* this.width, -1675*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.6* this.width, -1700*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.3* this.width, -1700*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.6* this.width, -1725*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.3* this.width, -1725 * 1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);
            
            newShip = new Ship([.6* this.width, -1750*1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            newShip = new Ship([.3* this.width, -1750 * 1.5 - 5700], 8, this);
            
            newShip.velY = 1.5;
            newShip.health = 351
            this.enemyships.push(newShip);

            this.enemyships.push(new Ship([.34*this.width, -5750 * 1.5], 10, this));
            this.enemyships.push(new Ship([.62 * this.width, -5750 * 1.5], 10, this));
            this.enemyships.push(new Ship([.48*this.width, -5900 * 1.5], 9, this));
            this.enemyships.push(new Ship([.2*this.width, -5875 * 1.5], 4, this));
            this.enemyships.push(new Ship([.76*this.width, -5875 * 1.5], 3, this));
            this.enemyships.push(new Ship([.14*this.width, -7150 * 1.5], 11, this, true));

            //this can be refactored to not be hardcoded, but idc
            let pos = Math.random()*0.9 + 0.05;
            this.enemyships.push(new Ship([pos*this.width, -6500 * 1.5], 8, this));

            pos = Math.random()*0.9 + 0.05;
            this.enemyships.push(new Ship([pos*this.width, -7000 * 1.5], 8, this));

            pos = Math.random()*0.9 + 0.05;
            this.enemyships.push(new Ship([pos*this.width, -7500 * 1.5], 8, this));

            pos = Math.random()*0.9 + 0.05;
            this.enemyships.push(new Ship([pos*this.width, -8000 * 1.5], 8, this));

            pos = Math.random()*0.9 + 0.05;
            this.enemyships.push(new Ship([pos*this.width, -8500 * 1.5], 8, this));

            pos = Math.random()*0.9 + 0.05;
            this.enemyships.push(new Ship([pos*this.width, -9000 * 1.5], 8, this));

            pos = Math.random()*0.9 + 0.05;
            this.enemyships.push(new Ship([pos*this.width, -9500 * 1.5], 8, this));

            pos = Math.random()*0.9 + 0.05;
            this.enemyships.push(new Ship([pos*this.width, -10000 * 1.5], 8, this));

            pos = Math.random()*0.9 + 0.05;
            this.enemyships.push(new Ship([pos*this.width, -10500 * 1.5], 8, this));

            pos = Math.random()*0.9 + 0.05;
            this.enemyships.push(new Ship([pos*this.width, -11000 * 1.5], 8, this));

            pos = Math.random()*0.9 + 0.05;
            this.enemyships.push(new Ship([pos*this.width, -11500 * 1.5], 8, this));

            pos = Math.random()*0.9 + 0.05;
            this.enemyships.push(new Ship([pos*this.width, -12000 * 1.5], 8, this));

            pos = Math.random()*0.9 + 0.05;
            this.enemyships.push(new Ship([pos*this.width, -12500 * 1.5], 8, this));

            pos = Math.random()*0.9 + 0.05;
            this.enemyships.push(new Ship([pos*this.width, -13000 * 1.5], 8, this));

            pos = Math.random()*0.9 + 0.05;
            this.enemyships.push(new Ship([pos*this.width, -13500 * 1.5], 8, this));

            pos = Math.random()*0.9 + 0.05;
            this.enemyships.push(new Ship([pos*this.width, -14000 * 1.5], 8, this));

            pos = Math.random()*0.9 + 0.05;
            this.enemyships.push(new Ship([pos*this.width, -14500 * 1.5], 8, this));
            pos = Math.random()*0.9 + 0.05;
            this.enemyships.push(new Ship([pos*this.width, -15000 * 1.5], 8, this));

            pos = Math.random()*0.9 + 0.05;
            this.enemyships.push(new Ship([pos*this.width, -15500 * 1.5], 8, this));
            pos = Math.random()*0.9 + 0.05;
            this.enemyships.push(new Ship([pos*this.width, -16000 * 1.5], 8, this));

            pos = Math.random()*0.9 + 0.05;
            this.enemyships.push(new Ship([pos*this.width, -16500 * 1.5], 8, this));
            pos = Math.random()*0.9 + 0.05;
            this.enemyships.push(new Ship([pos*this.width, -17000 * 1.5], 8, this));
        }
    }

    initializeStars(context)
    {

        for(let i = 0; i < 15; i++)
        {
            let posx = Math.random() * (this.width-10);
            //let posy = 0;
            
            let size;
            if (Math.random()*2 > 1.7)
            {
                size = Math.random()* 4 + 1;
            }
            else
                size = Math.random()*2 + 1;
            
            let mystar = new Star(posx, Math.random()*1 + 0.2 + (size / (8)), size);

            mystar.posY = Math.random()*this.height-10;
            this.stars.push(mystar);

            context.shadowBlur = 0;
        }
    }

    animate(){
        let context = this.context;
        
        context.fillStyle = "black";
        context.fillRect(0, 0, this.width, this.height);

        if(this.continue) //probably can combine these two variables
            {
            this.createStars(context);

            this.timer += 1;
            if(this.level_id === 1 && this.timer === 5400) //NEEDS REFACTORING FOR DIFFERENT LEVELS... BOSS THEME
            {
                this.bgsong.fade(0.15, 0, 1500)
            } 
            else if(this.level_id === 1 && this.timer === 5550) //NEEDS REFACTORING
            {
                let bgsong2 = audio.devour;

                setTimeout( () => {
                    bgsong2.play();
                    if(this.bgsong!= null)
                    {
                        this.bgsong.stop();
                    }
                    this.bgsong = bgsong2;
                }, 100);
            }
            else if(this.level_id === 2 && this.timer === 8800)
            {
                this.bgsong.fade(0.18, 0, 2000)
            }
            else if(this.level_id === 2 && this.timer === 9400)
            {
                let bgsong2 = audio.ground;

                setTimeout( () => {
                    bgsong2.play();
                    bgsong2.fade(0, 0.18, 2000)
                    if(this.bgsong!= null)
                    {
                        this.bgsong.stop();
                    }
                    this.bgsong = bgsong2;
                }, 100);
            }
            
            if(key.isPressed(" ") )
            {
                let proj = this.player.shootProjectile(this.mouse_x, this.mouse_y, 2);
                if (proj)
                {
                    if(this.player.projectileType === 3)
                    {
                        audio.laser3.play();
                    }
                    else
                    {
                        audio.laser4.play();
                    }

                    this.projectiles = this.projectiles.concat(proj);
                }
            }
            else
            {
                this.player.shootProjectile(null, null, -1);
            }

            this.updateAll(context);
            this.player.animate(this.context, this.mouse_x, this.mouse_y);
            this.checkCollisions(context);

            this.updateUI(context);

            requestAnimationFrame(this.animate.bind(this));
        }   
        else if (!this.death)
        {
            this.parent.endLevel();
        }
        else{
            //do nothing... let player press buttons to choose
        }
    }

    createStars(context){
        let numStars = 0;
        for(let i=0; i<3; i++)
        {
            if(Math.random()*70 <= 1)
            {
                numStars++;
            }
        }
        for(let j = 0; j< numStars; j++)
        {
            let posx = Math.random() * (this.width-10);
            //let posy = 0;
            
            let size;
            if (Math.random()*2 > 1.7)
            {
                size = Math.random()* 4 + 1;
            }
            else
                size = Math.random()*2 + 1;

            
            let mystar = new Star(posx, Math.random()*1 + 0.2 + (size / (8)), size);
            this.stars.push(mystar);
            context.shadowBlur = 0;
            // context.filter = "none";
        }   
    }

    updateAll(context)
    {

        this.extras.forEach((extra) => {
            extra.animate(this.context);
        })

        for(let i = this.extras.length - 1; i >= 0; i--) // problematic! need to go backwards
        {
            if(this.extras[i].duration <= 0)
            {
                setTimeout(()=> 
                {
                    this.extras.splice(i, 1);
                }, 0);
                
            }
        }

        this.lasers.forEach((laser) => {
            laser.animate(this.context);
        })

        for(let i = this.lasers.length - 1; i >= 0; i--) // problematic! need to go backwards
        {
            if(this.lasers[i].duration <= 0)
            {
                setTimeout(()=> 
                {
                    this.lasers.splice(i, 1);
                }, 0);
                
            }
        }

        this.updateSomething(context, this.stars);

        this.projectiles.forEach((proj) => {
            proj.animate(this.context)
        });

        for(let i = this.projectiles.length - 1; i >= 0; i--) // problematic! need to go backwards
        {
            if(this.projectiles[i].outofBounds(this.width, this.height))
            {
                setTimeout(()=> 
                {
                    this.projectiles.splice(i, 1);
                }, 0);
                
            }
        }

        this.enemyprojectiles.forEach((proj) => {
            proj.animate(this.context)
        });

        for(let i = this.enemyprojectiles.length - 1; i >= 0; i--)
        {
            if(this.enemyprojectiles[i].outofBounds(this.width, this.height))
            {
                setTimeout(()=> 
                {
                    this.enemyprojectiles.splice(i, 1);
                }, 0);
            }
        }

        this.updateSomething(context, this.enemyships);


        this.drops.forEach((drop) => {
            drop.animate(this.context)
        });

        for(let i = this.drops.length - 1; i >= 0; i--)
        {
            if(this.drops[i].outofBounds(this.width, this.height))
            {
                setTimeout(()=> 
                {
                    this.drops.splice(i, 1);
                }, 0);
            }
        }
    }

    handlePlayerDefeat()
    {
        this.bgsong.stop();
        audio.loudboom.play();
        this.death = true;
        const explosion = document.querySelector("#explosion");
        const black_screen = document.querySelector("#black-screen");
        const gameover = document.querySelector("#gameover");
        const gameovermenu = document.querySelector("#gameovermenu");
        const replay_butt = document.querySelector("#replay-game-butt");
        

        explosion.style.top = (this.player.realY()-70).toString() + "px";
        explosion.style.left = (this.player.realX()).toString() + "px";
        explosion.style.display = "block";
        setTimeout(() =>
        {
            black_screen.style.display = "block";

        }, 5500);
        setTimeout(()=> 
        {
            explosion.style.display = "none";
        }, 4720);
        setTimeout(()=> 
        {
            this.bgsong = audio.gameover;
            this.bgsong.play();
            this.enemyprojectiles = [];
            this.enemiesdefeated = 0;
            this.gold = this.initial_gold;
            this.enemyships = [];
            this.projectiles = [];
            this.extras = [];
            this.lasers = [];
            gameover.style.display = "block";
            this.continue = false;

        }, 10500);
        setTimeout(()=> 
        {
            gameovermenu.style.display = "inline-block";
            replay_butt.addEventListener("click", () => {
                let bgsong2;

                if(this.level_id === 1)
                {
                    bgsong2 = audio.dawnutopia;   
                }
                else if(this.level_id === 2)
                {
                    bgsong2 = audio.orbit;
                }

                setTimeout( () => {
                    bgsong2.play();
                    if(this.bgsong!= null)
                    {
                        this.bgsong.stop();
                    }
                    this.bgsong = bgsong2;
                }, 100);

                black_screen.style.display = "none";
                gameover.style.display = "none";
                gameovermenu.style.display = "none";
                let timeme;
                if (this.level_id === 1)
                {
                    timeme = 2000;//for better music sync
                }
                else{
                    timeme = 10;
                }
                setTimeout(() => {
                    this.parent.start(this.difficulty);
                }, timeme);
            })
        }, 12500);

    }

    updateSomething(context, something){
      
        for(let i = something.length - 1; i >= 0; i--)
        {
            if(something[i].posY > this.height + 50)
            {
                something.splice(i, 1);
            }
        }
        
        something.forEach( (thingie) => {
            thingie.animate(context);
        })
    }

    checkCollisions(context)
    {
        //change to for-loop
        for(let i = this.enemyships.length - 1; i >= 0; i--)
        {
            for(let j = this.projectiles.length - 1; j >= 0; j--)
            {
                if(this.collidesWith(this.projectiles[j], this.enemyships[i], "enemyship"))
                {
                    this.enemyships[i].health -= this.projectiles[j].damage;
                    setTimeout(()=> 
                    {
                        this.projectiles.splice(j, 1);
                    }, 0);
           
                    
                    if(this.enemyships[i].health <= 0)
                    {
                    
                        setTimeout(()=> 
                        {
                            this.handleEnemyDefeat(this.enemyships[i]);
                           
                            this.enemyships.splice(i, 1);
                        }, 0);

                        if(this.enemyships[i].boss)
                        {
                            let x = this.enemyships[i].realX();
                            let y = this.enemyships[i].realY();
                            audio.loudboom.play();
                            for(let i = 0; i < 15; i++)
                            {
                                
                                //note: below may create drops outside the x-axis range... need fix
                                this.drops.push(new Drop([(x - 100)+ Math.random()*200, (y - 100) + Math.random() *200], 2));
                                setTimeout( () => {
                                    audio.levelcomplete.play();
                                }, 2000);
                                setTimeout( () => {
                                    this.continue = false;
                                }, 6000);
                            }
                        }
                       
                        break;
                    }

            
                }
            }
        }

        for(let j = this.enemyprojectiles.length - 1; j >= 0; j--)
        {
            if(this.collidesWith(this.player, this.enemyprojectiles[j]))
            {
                this.player.dealDamage(this.enemyprojectiles[j].damage);
                audio.hit.play();
                if(this.player.health <= 0)
                {
                    this.handlePlayerDefeat();
                }
                setTimeout(()=> 
                    {
                        this.enemyprojectiles.splice(j, 1);
                    }, 0);
            }
        }

        for(let j = this.lasers.length - 1; j >= 0; j--)
        {
            if(this.collidesWith(this.player, this.lasers[j]))
            {
                this.player.dealDamage(this.lasers[j].damage);
                if(this.player.health <= 0)
                {
                    this.handlePlayerDefeat();
                }
            }
        }

        //OPTIMIZATION ISSUE LOCATED HERE: CURRENTLY CHECKS ALLLLL SHIPS EVEN SHIPS FAR IN THE BACKGROUND
     
        for(let i = this.enemyships.length - 1; i >= 0; i--)
        {
            
            if(this.enemyships[i].type === 11)
            {
                if(this.collidesWith(this.player, this.enemyships[i], "corner"))
                // if(this.collidesWith(this.player, this.enemyships[i]))
                {
                    // alert("??!?");
                    this.player.dealDamage(1);

                    if(this.player.health <= 0)
                    {
                        this.bgsong.stop();
                    }

                    let n = this.normalizedVector(this.player, this.enemyships[i]);
                    this.player.collided = 20;
                    this.player.velX = n[0] * 13;
                    this.player.velY = n[1] * 13;
                }
            }
            else
            {
                if(this.collidesWith(this.player, this.enemyships[i], "enemyship"))
                {
                    if(this.enemyships[i].type === 8)
                    {
                        this.player.dealDamage(20);
                    }
                    else
                    {
                        this.player.dealDamage(50);
                    }

                    if(this.player.health <= 0) //NON-DRY: Optimization is to take this out and put it as another class method to be called
                    {
                        this.handlePlayerDefeat();
                        
                        //HANDLE THIS CASE!!!!!!!!!!!!!!!!! SHIP SHOULD BE DEAD <- maybe? 
                    }

                    
                    
                    
                    let n = this.normalizedVector(this.player, this.enemyships[i]);
                    this.player.collided = 20;
                    this.player.velX = n[0] * 13;
                    this.player.velY = n[1] * 13;

                    if(!this.enemyships[i].boss && this.enemyships[i].type !== 8)
                    {
                        this.enemyships[i].health -= 25;
                        this.enemyships[i].collided = 13;
                        this.enemyships[i].velX = n[0] * -13;
                        this.enemyships[i].velY = n[1] * -13;   
                    }
                    else if(this.enemyships[i].type === 8)
                    {
                        this.enemyships[i].health -= 150;  
                    }

                    if(this.enemyships[i].health <= 0)
                    {
                        setTimeout(()=> 
                            {
                                this.handleEnemyDefeat(this.enemyships[i]);

                                this.enemyships.splice(i, 1);
                            }, 0);
                    }
            
                }
            }
        }

        for(let i = this.drops.length - 1; i >= 0; i--)
        {
            if(this.collidesWith(this.player, this.drops[i]))
            {
                audio.droppickup.play();
                switch(this.drops[i].type)
                {
                    case 0: //health pack
                        this.player.health = Math.min(this.player.health + 500, this.player.basehealth, this.player.health + this.player.basehealth / 2);
                        break;
                    case 1: //double fire
                        this.player.projectileType = 2;
                        this.player.shotsLeft = 50;
                        break;
                    case 2: //money
                        this.gold += Math.floor(Math.random()* 6) * 1000 + 5000;
                        break;
                    case 3: //gamma ray
                        this.player.projectileType = 3;
                        this.player.shotsLeft = 60;
                        break;
                    case 4: 
                        this.player.shield = this.player.baseshield;
                    break;

                }
                setTimeout(()=> 
                    {
                        this.drops.splice(i, 1);
                    }, 0);
            }
        }
    }

    collidesWith(a, b, type="normal")
    {
        if(this.death === true)
        {
            return false;
        }
        if(type === "normal" || type === "enemyship")
        {
            if(type === "enemyship" && b.posY + b.height / 2 + 1 < 0)
            {
                return false;
            }

            if ((a.leftX() >= b.leftX() && a.leftX() <= b.rightX()) || (a.rightX() >= b.leftX() && a.rightX() <= b.rightX()))
            {
                if ((a.upY() >= b.upY() && a.upY() <= b.downY()) || (a.downY() >= b.upY() && a.downY() <= b.downY()))
                {
                    return true;
                }
            }
            if ((b.leftX() >= a.leftX() && b.leftX() <= a.rightX()) || (b.rightX() >= a.leftX() && b.rightX() <= a.rightX()))
            {
                if ((b.upY() >= a.upY() && b.upY() <= a.downY()) || (b.downY() >= a.upY() && b.downY() <= a.downY()))
                {
                    return true;
                }
            }
            return false;
        }
        else if(type === "corner")
        {
            //THE BELOW OPTIMIZATION SHOULD ALSO BE IN NORMAL
            console.log("colliding");
            console.log(b.posY + b.height / 2 + 1);
            console.log(b.posY, b.height)

            if(b.height === undefined || b.posY + b.height / 2 + 1 < 0)
            {
                return false;
            }
            //player is a, boss ship is b
            //is the original use of corner, although other variations can arise
            //assumes that an overlap will require a corner of A overlapping with some part of B
            let cornersA = a.corners();
            let cornersB = b.corners();

            let b_area = (b.width) * (b.height);//area should be the same as pre-rotation

            //for each corner of the player ship, check if it is inside the rotated rectangle
            for(let i = 0; i < 4; i++)
            {
                let corn = cornersA[i];

                let x_a = corn[0];
                let y_a = corn[1];
                let x_b = cornersB[0][0];
                let y_b = cornersB[0][1];
                let x_c = cornersB[1][0];
                let y_c = cornersB[1][1];

                let tri_1 = Math.abs(x_a * y_b + x_b * y_c + x_c * y_a - x_a * y_c - x_c * y_b - x_b * y_a) / 2;
                // let tri_1 = Math.abs(x_b * y_a + x_c * y_b + y_c * x_a - x_a * y_b - y_c * x_b - x_c * y_a) / 2;
                

                x_b = x_c;
                y_b = y_c;
                x_c = cornersB[2][0];
                y_c = cornersB[2][1];

                let tri_2 = Math.abs(x_a * y_b + x_b * y_c + x_c * y_a - x_a * y_c - x_c * y_b - x_b * y_a) / 2;
                // let tri_2 = Math.abs(x_b * y_a + x_c * y_b + y_c * x_a - x_a * y_b - y_c * x_b - x_c * y_a) / 2;


                x_b = x_c;
                y_b = y_c;
                x_c = cornersB[3][0];
                y_c = cornersB[3][1];

                let tri_3 = Math.abs(x_a * y_b + x_b * y_c + x_c * y_a - x_a * y_c - x_c * y_b - x_b * y_a) / 2;
                // let tri_3 = Math.abs(x_b * y_a + x_c * y_b + y_c * x_a - x_a * y_b - y_c * x_b - x_c * y_a) / 2;


                x_b = x_c;
                y_b = y_c;
                x_c = cornersB[0][0];
                y_c = cornersB[0][1];

                let tri_4 = Math.abs(x_a * y_b + x_b * y_c + x_c * y_a - x_a * y_c - x_c * y_b - x_b * y_a) / 2;
                // let tri_4 = Math.abs(x_b * y_a + x_c * y_b + y_c * x_a - x_a * y_b - y_c * x_b - x_c * y_a) / 2;

                if (tri_1 + tri_2 + tri_3 +tri_4 <= b_area)
                {
                    return true;
                }
            }
            return false;
        }
    }

    normalizedVector(a, b)
    {
        let target_x = a.realX();
        let target_y = a.realY();
        let distX = target_x - b.realX();
        let distY = target_y - b.realY();

        length = Math.sqrt(distX * distX + distY * distY);
        // this.normalVector = [Math.abs(distX) / length, Math.abs(distY) / length];
        return [distX / length, distY / length];
    }

    updateUI(ctx)
    {
        ctx.fillStyle = '#ff4040';
        ctx.strokeStyle = "black"
        ctx.textBaseline = 'top';
        ctx.font = '10pt Verdana';
        let healthtext = `Health: ${Math.max(Math.floor(this.player.health), 0)} / ${Math.floor(this.player.basehealth)}`;
        ctx.textAlign = 'left';
        // const t_width = ctx.measureText(text).width;
        // const t_height = ctx.measureText(text).height;
        ctx.fillText(healthtext, 20, this.height - 50);

        ctx.fillStyle = "#00EFF6";
        let shieldtext = `Shield: ${Math.floor(this.player.shield)} / ${Math.floor(this.player.baseshield)}`;
        ctx.fillText(shieldtext, 20, this.height - 75);

        let goldtext = `Gold: ${Math.floor(this.gold)}`;
        ctx.textAlign = 'right';
        ctx.fillStyle = 'gold';
        ctx.fillText(goldtext, this.width-20, this.height - 50);


        // ctx.fillText('this.', this.width-20, this.height - 50);
        ctx.textAlign = 'start';
        
    }

    //need to make sound & explosion
    handleEnemyDefeat(e_ship)
    {
        this.enemiesdefeated++;
        this.gold += e_ship.gold;
        let v = e_ship.value;

        if(e_ship.boss) //needs refactoring for bosses besides the first one
        {
            this.extras = []; //assuming only boss has extras
            for(let i = e_ship.dependencies.length - 1; i >= 0; i--)
            {
                let shipy = e_ship.dependencies[i];
                if(shipy instanceof Ship)
                {
                    for(let j = this.enemyships.length - 1; j >= 0; j--) // problematic! need to go backwards
                    {
                        if(this.enemyships[j] === shipy)
                        {
                            setTimeout(()=> 
                            {
                                this.enemyships.splice(j, 1);
                                shipy.health = 0; 
                            }, 0);
                            
                        }
                    }
                }
                    
            }
        }


        if(e_ship.type === 8) //bomb ship
        {
            let projs = [];
            //hardcoding this for no particular reason
            // let angles = [[0, 1], [.5, Math.sqrt(3)/2.0], [Math.sqrt(3)/2.0, .5], [1, 0], [Math.sqrt(3)/2.0, -.5], [.5, - Math.sqrt(3)/2.0], [-.5, -Math.sqrt(3)/2.0], [-Math.sqrt(3)/2.0, -.5], [-.5, Math.sqrt(3)/2.0], [-Math.sqrt(3)/2.0, .5], [-1, 0], [0,-1]];
            let angle = 0;

            while(angle < Math.PI * 2)
            {
                let x = Math.cos(angle);
                let y = Math.sin(angle);

                projs.push(new CircleDamageProjectile([e_ship.realX(), e_ship.realY()], [5.5 * x, 5.5*y], 4.5, 2, 6, e_ship.damage, 20));
                angle+= Math.PI/8;
            }
            this.enemyprojectiles = this.enemyprojectiles.concat(projs);
            console.log(this.enemyprojectiles);
        } 


        let num = Math.floor(Math.random()*100 * v);
        //these numbers will change
        //MAJOR REFACTORING IS NEEDED!!! SCRAP VALUE, HARDCODE DROP %'s BY LEVEL

        // if(num > 140)//ultimate drop
        // {

        // }
        // else if(num > 120)//super rare drop
        // {

        // }
        // else if(num > 110) //very rare drop
        // {

        // }
        if (num > 96.3)// rare drop: missiles,
        {
            this.drops.push(new Drop([e_ship.posX, e_ship.posY], 3));
        }
        else if (num > 65) //uncommon drop: gold, shield, health, missiles
        {
            let m = Math.random() * 10;
            if (m < 2.5)
                this.drops.push(new Drop([e_ship.posX, e_ship.posY], 1));
            else if (m < 5)
                this.drops.push(new Drop([e_ship.posX, e_ship.posY], 2));
            else if (m < 7)
            {
                this.drops.push(new Drop([e_ship.posX, e_ship.posY], 4));
            }
            else
                this.drops.push(new Drop([e_ship.posX, e_ship.posY], 0));
        }
        else{
            //no drop
        }

    }


    
}

