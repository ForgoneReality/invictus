
//background.js
import Star from "./star"
import Ship from "./ship"
import Player from "./player"
import Drop from "./drop";

export default class Background{
    constructor(width, height, level_id, context)
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
        this.createLevel(1);
        this.initializeStars(context);

        //stats
        this.enemiesdefeated = 0;
        this.gold = 0;
    };

    createLevel(level)
    {
        this.player = new Player([this.width / 2 + 1, this.height - 50]);
        this.mouse_x = this.width / 2;
        this.mouse_y = 0;
        let handleMousemove = (event) => {
            this.mouse_x = event.x;
            this.mouse_y = event.y;
        };
          
        //note: as explained in Player#animate, movement and other spontaneous events cannot be added here
        document.addEventListener('mousemove', handleMousemove);

        if (level === 1)
        {
            this.enemyships.push(new Ship([.25*this.width, -100], 0, this)); //type 1
            this.enemyships.push(new Ship([.54 * this.width, -480], 0, this)); //type 1
            this.enemyships.push(new Ship([.65*this.width, -133], 1, this)); //type 2
            this.enemyships.push(new Ship([.34 * this.width, -700], 1, this)); //type 2
            this.enemyships.push(new Ship([.6 * this.width, -600], 2, this)); //type 3
            this.enemyships.push(new Ship([.42 * this.width, -510], 3, this)); //type 4
            this.enemyships.push(new Ship([.7*this.width, -780], 3, this)); //type 1
            this.enemyships.push(new Ship([.45 * this.width, -840], 2, this)); //type 3
            this.enemyships.push(new Ship([.34 * this.width, -985], 0, this)); //type 2
            this.enemyships.push(new Ship([.18 * this.width, -1050], 1, this)); //type 2
            
            this.enemyships.push(new Ship([.9*this.width, -1090], 4, this)); 
            this.enemyships.push(new Ship([.75*this.width, -333], 4, this)); 
            this.enemyships.push(new Ship([.68*this.width, -1150], 5, this)); 
            this.enemyships.push(new Ship([.23*this.width, -1200], 1, this)); 
            this.enemyships.push(new Ship([.37*this.width, -1300], 3, this)); 
            this.enemyships.push(new Ship([.53*this.width, -1400], 5, this)); 
            this.enemyships.push(new Ship([.4*this.width, -1500], 2, this)); 
            this.enemyships.push(new Ship([.71*this.width, -1640], 0, this)); 
            this.enemyships.push(new Ship([.44*this.width, -1523], 4, this)); 

            this.enemyships.push(new Ship([.33*this.width, -1776], 3, this)); 
            this.enemyships.push(new Ship([.66*this.width, -1840], 3, this)); 
            this.enemyships.push(new Ship([.5*this.width, -1890], 3, this)); 
            this.enemyships.push(new Ship([.4*this.width, -1992], 4, this)); 
            this.enemyships.push(new Ship([.2*this.width, -2040], 5, this)); 
            this.enemyships.push(new Ship([.7*this.width, -2100], 0, this)); 
            this.enemyships.push(new Ship([.35*this.width, -2150], 1, this)); 
            this.enemyships.push(new Ship([.63*this.width, -2160], 1, this)); 
            this.enemyships.push(new Ship([.27*this.width, -2245], 5, this)); 
            this.enemyships.push(new Ship([.58*this.width, -2324], 2, this)); 

            

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
        this.createStars(context);

        if(this.enemiesdefeated === 1)
        {
            this.player.levelup(1);
        }

    

        if(key.isPressed(" ") )
        {
            let proj = this.player.shootProjectile(this.mouse_x, this.mouse_y, 2);
            if (proj)
            {
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
        this.updateSomething(context, this.stars);
        this.updateSomething(context, this.enemyships);

        this.projectiles.forEach((proj) => {
            proj.animate(this.context)
        });

        for(let i = 0; i < this.projectiles.length; i++)
        {
            if(this.projectiles[i].outofBounds(this.width, this.height))
            {
                setTimeout(()=> 
                {
                    this.projectiles.splice(i, 1);
                    i--;
                }, 0);
                
            }
        }

        this.enemyprojectiles.forEach((proj) => {
            proj.animate(this.context)
        });

        for(let i = 0; i < this.enemyprojectiles.length; i++)
        {
            if(this.enemyprojectiles[i].outofBounds(this.width, this.height))
            {
                setTimeout(()=> 
                {
                    this.enemyprojectiles.splice(i, 1);
                    i--;
                }, 0);
            }
        }

        this.drops.forEach((drop) => {
            drop.animate(this.context)
        });

        for(let i = 0; i < this.drops.length; i++)
        {
            if(this.drops[i].outofBounds(this.width, this.height))
            {
                setTimeout(()=> 
                {
                    this.drops.splice(i, 1);
                    i--;
                }, 0);
            }
        }

 
    }

    updateSomething(context, something){
      
        for(let i = 0; i < something.length; i++)
        {
            if(something[i].posY > this.height + 50)
            {
                something.splice(i, 1);
                i--;
            }
        }
        
        something.forEach( (thingie) => {
            thingie.animate(context);
        })
    }

    checkCollisions(context)
    {
        //change to for-loop
        for(let i = 0; i <this.enemyships.length; i++)
        {
            for(let j = 0; j < this.projectiles.length; j++)
            {
                if(this.collidesWith(this.enemyships[i], this.projectiles[j]))
                {
                    this.enemyships[i].health -= this.projectiles[j].damage;
                    setTimeout(()=> 
                    {
                        this.projectiles.splice(j, 1);
                        j--;
                    }, 0);
           
                    
                    if(this.enemyships[i].health <= 0)
                    {
                        this.handleEnemyDefeat(this.enemyships[i]);

                        setTimeout(()=> 
                        {
                            this.enemyships.splice(i, 1);
                            i--;
                        }, 0);

                        break;
                    }

            
                }
            }
        }

        for(let j = 0; j < this.enemyprojectiles.length; j++)
        {
            if(this.collidesWith(this.player, this.enemyprojectiles[j]))
            {
                this.player.dealDamage(this.enemyprojectiles[j].damage);

                setTimeout(()=> 
                    {
                        this.enemyprojectiles.splice(j, 1);
                        j--;
                    }, 0);
        
            }
        }

        for(let i = 0; i <this.enemyships.length; i++)
        {
            if(this.collidesWith(this.player, this.enemyships[i]))
            {
                this.player.dealDamage(Math.max(this.enemyships[i].damage, 50, ));
                this.enemyships[i].health -= 25;
                
                let n = this.normalizedVector(this.player, this.enemyships[i]);
                this.player.collided = 20;
                this.player.velX = n[0] * 13;
                this.player.velY = n[1] * 13;

                this.enemyships[i].collided = 13;
                this.enemyships[i].velX = n[0] * -13;
                this.enemyships[i].velY = n[1] * -13;   

                if(this.enemyships[i].health <= 0)
                {
                    this.handleEnemyDefeat(this.enemyships[i]);

                    setTimeout(()=> 
                        {
                            this.enemyships.splice(i, 1);
                            i--;
                        }, 0);
                }
        
            }
        }

        for(let i = 0; i <this.drops.length; i++)
        {
            if(this.collidesWith(this.player, this.drops[i]))
            {
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
                        this.player.shotsLeft = 55;
                        break;
                }
                setTimeout(()=> 
                    {
                        this.drops.splice(i, 1);
                        i--;
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

        let goldtext = `Gold: ${Math.floor(this.gold)}`;
        ctx.textAlign = 'right';
        ctx.fillStyle = 'gold';
        ctx.fillText(goldtext, this.width-20, this.height - 50);
        ctx.textAlign = 'start';
        
    }

    //need to make sound & explosion
    handleEnemyDefeat(e_ship)
    {
        this.enemiesdefeated++;
        this.gold += e_ship.gold;
        let v = e_ship.value;

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
        if (num > 95)// rare drop: missiles,
        {
            this.drops.push(new Drop([e_ship.posX, e_ship.posY], 3));
        }
        else if (num > 65) //uncommon drop: gold, shield, health, missiles
        {
            let m = Math.random() * 10;
            if (m < 3)
                this.drops.push(new Drop([e_ship.posX, e_ship.posY], 1));
            else if (m < 7)
                this.drops.push(new Drop([e_ship.posX, e_ship.posY], 2));
            else
                this.drops.push(new Drop([e_ship.posX, e_ship.posY], 0));
        }
        else{
            //no drop
        }

    }


    
}

