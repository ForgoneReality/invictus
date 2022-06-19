
//background.js
import Star from "./star"
import Ship from "./ship"
import Player from "./player"

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
        this.createLevel(1);
        this.initializeStars(context);
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
            // this.enemyships.push(new Ship([.25*this.width, -300], 0, this)); //type 1
            // this.enemyships.push(new Ship([.54 * this.width, -500], 0, this)); //type 1
            this.enemyships.push(new Ship([.75*this.width, -250], 1, this)); //type 2
            this.enemyships.push(new Ship([.34 * this.width, -88], 1, this)); //type 2
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
    

        if(key.isPressed(" "))
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
        // console.log("projectiles: ", this.projectiles);
        // console.log("enemies", this.enemyships);
        
        this.updateSomething(context, this.stars);
        this.updateSomething(context, this.enemyships);

        this.projectiles.forEach((proj) => {
            proj.animate(this.context)
        });

        for(let i = 0; i < this.projectiles.length; i++)
        {
            if(this.projectiles[i].outofBounds(this.width, this.height))
            {
                this.projectiles.splice(i, 1);
                i--;
            }
        }

        this.enemyprojectiles.forEach((proj) => {
            proj.animate(this.context)
        });

        for(let i = 0; i < this.enemyprojectiles.length; i++)
        {
            if(this.enemyprojectiles[i].outofBounds(this.width, this.height))
            {
                this.enemyprojectiles.splice(i, 1);
                i--;
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
                    this.projectiles.splice(j, 1);
                    j--;
                    
                    if(this.enemyships[i].health <= 0)
                    {
                        this.enemyships.splice(i, 1);
                        i--;
                        break;
                    }

            
                }
            }
        }

        for(let j = 0; j < this.enemyprojectiles.length; j++)
        {
            if(this.collidesWith(this.player, this.enemyprojectiles[j]))
            {
                this.player.health -= this.enemyprojectiles[j].damage;
                this.enemyprojectiles.splice(j, 1);
                j--;
                
                if(this.player.health <= 0)
                {
                    alert("YOU LOSE!");
                    exit;
                }

        
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
}
