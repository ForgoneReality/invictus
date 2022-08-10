
//background.js
import Star from "./star"
import Ship from "./ship"
import Player from "./player"
import Drop from "./drop";
import CircleDamageProjectile  from "./circleDamageProjectile";

export default class Background{
    constructor(width, height, level_id, context, bgsong, gold, ship_level, parent)
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
        this.createLevel(level_id);
        this.initializeStars(context);

        this.bgsong = bgsong;
        //stats
        this.enemiesdefeated = 0;
        this.gold = gold;
        this.timer = 0;
        this.parent = parent;
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

            this.enemyships.push(new Ship([.12*this.width, -48*1.25], 6, this, true)); 
        }
      
        if (level === 2)
        {
            this.enemyships.push(new Ship([.5*this.width, -100 * 1.5 - 500], 8, this));
            this.enemyships.push(new Ship([.7*this.width, -200 * 1.5 - 500], 3, this));
            this.enemyships.push(new Ship([.23*this.width, -300 * 1.5 - 500], 8, this));
            this.enemyships.push(new Ship([.42*this.width, -380 * 1.5 - 500], 4, this));
            this.enemyships.push(new Ship([.56*this.width, -440 * 1.5 - 500], 4, this));
            this.enemyships.push(new Ship([.7*this.width, -500 * 1.5 - 500], 5, this));
            this.enemyships.push(new Ship([.3*this.width, -555 * 1.5 - 500], 8, this));
            this.enemyships.push(new Ship([.64*this.width, -100 * 1.5 - 500], 9, this));

            this.enemyships.push(new Ship([.55*this.width, -600 * 1.5 - 500], 1, this));
            this.enemyships.push(new Ship([.71*this.width, -666 * 1.5 - 500], 2, this));
            this.enemyships.push(new Ship([.5*this.width, -700 * 1.5 - 500], 8, this));
            this.enemyships.push(new Ship([.8*this.width, -750 * 1.5 - 500], 5, this));
            this.enemyships.push(new Ship([.42*this.width, -888 * 1.5 - 500], 4, this));
            this.enemyships.push(new Ship([.5*this.width, -950 * 1.5 - 500], 8, this));
            this.enemyships.push(new Ship([.35*this.width, -1000 * 1.5 - 500], 8, this));
            this.enemyships.push(new Ship([.65*this.width, -1000 * 1.5 - 500], 8, this));
            this.enemyships.push(new Ship([.47*this.width, -1075 * 1.5 - 500], 2, this));
            this.enemyships.push(new Ship([.58*this.width, -1170 * 1.5 - 500], 9, this));
            this.enemyships.push(new Ship([.28*this.width, -1170 * 1.5 - 500], 9, this));
            this.enemyships.push(new Ship([.45*this.width, -1200 * 1.5 - 500], 8, this));

            this.enemyships.push(new Ship([.5*this.width, -1250 * 1.5 - 500], 3, this));
            this.enemyships.push(new Ship([.65*this.width, -1300 * 1.5 - 500], 3, this));
            this.enemyships.push(new Ship([.3*this.width, -1300 * 1.5 - 500], 3, this));
            this.enemyships.push(new Ship([.23*this.width, -1321 * 1.5 - 500], 8, this));

            this.enemyships.push(new Ship([.7*this.width, -1362 * 1.5 - 500], 2, this));
            this.enemyships.push(new Ship([.58*this.width, -1500 * 1.5 - 500], 10, this));
            this.enemyships.push(new Ship([.4*this.width, -1567 * 1.5 - 500], 8, this));
            this.enemyships.push(new Ship([.74*this.width, -1580 * 1.5 - 500], 4, this));
            this.enemyships.push(new Ship([.54*this.width, -1626 * 1.5 - 500], 5, this));
            this.enemyships.push(new Ship([.25*this.width, -1700 * 1.5 - 500], 1, this));
            this.enemyships.push(new Ship([.43*this.width, -1720 * 1.5 - 500], 8, this));
            this.enemyships.push(new Ship([.36*this.width, -1776 * 1.5 - 500], 9, this));
            this.enemyships.push(new Ship([.69*this.width, -1878 * 1.5 - 500], 5, this));
            this.enemyships.push(new Ship([.75*this.width, -1920 * 1.5 - 500], 3, this));
            this.enemyships.push(new Ship([.83*this.width, -2000 * 1.5 - 500], 8, this));
            this.enemyships.push(new Ship([.27*this.width, -2065 * 1.5 - 500], 2, this));
            this.enemyships.push(new Ship([.38*this.width, -2100 * 1.5 - 500], 10, this));
            this.enemyships.push(new Ship([.64*this.width, -2123 * 1.5 - 500], 4, this));
            this.enemyships.push(new Ship([.5*this.width, -2180 * 1.5 - 500], 5, this));
            this.enemyships.push(new Ship([.25*this.width, -2200 * 1.5 - 500], 9, this));
            this.enemyships.push(new Ship([.3*this.width, -2300 * 1.5 - 500], 8, this));
            this.enemyships.push(new Ship([.6*this.width, -2300 * 1.5 - 500], 8, this));
            this.enemyships.push(new Ship([.9*this.width, -2300 * 1.5 - 500], 8, this));
            this.enemyships.push(new Ship([.5*this.width, -2350 * 1.5 - 500], 10, this));
            this.enemyships.push(new Ship([.15*this.width, -2440 * 1.5 - 500], 8, this));
            this.enemyships.push(new Ship([.45*this.width, -2440 * 1.5 - 500], 8, this));
            this.enemyships.push(new Ship([.75*this.width, -2440 * 1.5 - 500], 8, this));

            
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

        if(this.continue)
            {
            this.createStars(context);

           
            this.timer += 1;
            if(this.level_id === 1 && this.timer === 5400) //NEEDS REFACTORING FOR DIFFERENT LEVELS
            {
                this.bgsong.fade(0.15, 0, 1500)
            } 
            if(this.level_id === 1 && this.timer === 5550) //NEEDS REFACTORING
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
        else
        {
            this.parent.endLevel();
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
        this.updateSomething(context, this.enemyships);

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
                if(this.collidesWith(this.enemyships[i], this.projectiles[j]))
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
                    this.bgsong.stop();
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
                    this.bgsong.stop();
                }
            }
        }

        for(let i = this.enemyships.length - 1; i >= 0; i--)
        {
            if(this.collidesWith(this.player, this.enemyships[i]))
            {
                this.player.dealDamage(Math.max(this.enemyships[i].damage, 50)); //fix this
                if(this.player.health <= 0)
                {
                    this.bgsong.stop();
                }
                
                
                let n = this.normalizedVector(this.player, this.enemyships[i]);
                this.player.collided = 20;
                this.player.velX = n[0] * 13;
                this.player.velY = n[1] * 13;

                if(!this.enemyships[i].boss)
                {
                    this.enemyships[i].health -= 25;
                    this.enemyships[i].collided = 13;
                    this.enemyships[i].velX = n[0] * -13;
                    this.enemyships[i].velY = n[1] * -13;   
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

        for(let i = this.drops.length - 1; i >= 0; i--)
        {
            if(this.collidesWith(this.player, this.drops[i]))
            {
                audio.droppickup.play();
                switch(this.drops[i].type)
                {
                    case 0: //health pack
                        this.player.health = Math.min(this.player.health - 500, this.player.basehealth, this.player.health + this.player.basehealth / 2);
                        break;
                    case 1: //double fire
                        this.player.projectileType = 2;
                        this.player.shotsLeft = 50;
                        break;
                    case 2: //money
                        this.gold += Math.floor(Math.random()* 6) * 1000 - 5000;
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

    collidesWith(a, b)
    {
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
        let healthtext = `Health: ${Math.floor(this.player.health)} / ${Math.floor(this.player.basehealth)}`;
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

