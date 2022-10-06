import Star from "./star"
import Ship from "./ship"
import Player from "./player"
import Drop from "./drop";

export default class Tutorial{
    constructor(width, height, context, bgsong, parent)
    {
        this.width = width;
        this.height = height;
        this.context = context;
        this.stars = [];
        this.projectiles = [];
        this.enemyprojectiles = [];
        this.enemyships = [];
        this.drops = [];
        this.ship_level = 0;
        

        this.bgsong = bgsong; //prob not needed
        //stats
        this.gold = 0;
        this.parent = parent;

        this.stage = 0;
        this.stage_helper = 0;//for counting stuff
        //stage 0: move around
        //stage 1: move into flags
        //stage 2: shoot
        //stage 3: shoot targets
        //stage 4: power-ups [OPTIONAL]
        //stage 5: use power-ups [OPTIONAL]
        //stage 6: shop buy new 
        //stage 7: play!

        this.popup_number = 0;
        this.popup = true;

        this.popups = document.querySelector("#popups");
        this.textbox = document.querySelector("#textbox");
        this.mel_idle = document.querySelector("#mel-idle");
        this.mel_talking = document.querySelector("#mel-talking");
        this.typedtext = document.querySelector("#typedtext");
        this.fade = document.querySelector(".modal-background");


        this.createLevel();
        this.initializeStars(context);
          
    };

    createLevel()
    {
        this.player = new Player([this.width / 2, this.height - 50], this.ship_level, true);
        this.mouse_x = this.width / 2;
        this.mouse_y = 0;
        let handleMousemove = (event) => {
            this.mouse_x = event.offsetX;
            this.mouse_y = event.offsetY;
        };
          
        //note: as explained in Player#animate, movement and other spontaneous events cannot be added here
        document.addEventListener('mousemove', handleMousemove);
        
        document.body.addEventListener('keypress', function(e) {
            if (e.key === "Escape") {
                this.parent.initiateStart();
            }
        });
        this.textpopup(this.popup_number);
        this.animate();

        
    }

    // set up text to print, each item in array is new line
    
     
    typewriter(aText, iIndex, sContents, iTextPos)
    {
        let iSpeed = 15;
        let iScrollAt = 20; // start scrolling up at this many lines

        sContents =  ' ';
        let iRow = Math.max(0, iIndex-iScrollAt);
        const destination = document.getElementById("typedtext");
        while ( iRow < iIndex ) {
        sContents += aText[iRow++] + '<br />';
        }
        destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos);
        //  destination.innerHTML = "testing";
        if ( iTextPos++ == aText[iIndex].length ) {
        iTextPos = 0;
        iIndex++;
        if ( iIndex != aText.length ) {
        setTimeout(() => this.typewriter(aText, iIndex, sContents, iTextPos), 200);
        }
        } else {
        setTimeout(() => this.typewriter(aText, iIndex, sContents, iTextPos), iSpeed);
        }
    }
   
    
    textpopup(num)
    {

        if(num === 0)
        {
            this.popups.style.display = "block";
            this.textbox.style.display = "block";
            this.mel_talking.style.display = "block";
            this.typedtext.style.display = "block";
            this.fade.style.display = "block";

            setTimeout(() => {
                this.mel_talking.style.display = "none";
                this.mel_idle.style.display = "block";
            }, 3000); //change number once we test out the text

            setTimeout(() => {
                $(document).one('click keypress', $.proxy(function(e) {
                    this.popup = false;
                    this.popups.style.display = "none";
                    this.textbox.style.display = "none";
                    this.mel_talking.style.display = "none";
                    this.mel_idle.style.display = "none";
                    this.typedtext.style.display = "none";
                    this.fade.style.display = "none";
                }, this));
            }, 3500)
            let aText = new Array(
                "Welcome to Invictus! My name's Mei, and I'll be helping",
                "you learn the ropes of how to operate your spaceship"
            );
            this.typewriter(aText, 0, 0, " ", 0);
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
        if(!this.popup) //probably can combine these two variables
            {
            this.createStars(context);
            
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
        }   
        else{
            // console.log("???");
            // if(key.isPressed(" "))
            // {
            //     alert("!");
               
            // }
        }
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
                       
                        break;
                    }

            
                }
            }
        }

        for(let j = this.enemyprojectiles.length - 1; j >= 0; j--)
        {
            if(this.collidesWith(this.player, this.enemyprojectiles[j]))
            {
                audio.hit.play();
                setTimeout(()=> 
                    {
                        this.enemyprojectiles.splice(j, 1);
                    }, 0);
            }
        }
        //OPTIMIZATION ISSUE LOCATED HERE: CURRENTLY CHECKS ALLLLL SHIPS EVEN SHIPS FAR IN THE BACKGROUND
     
        for(let i = this.enemyships.length - 1; i >= 0; i--)
        {
            
            // if(this.enemyships[i].type === 11)
            // {
            //     if(this.collidesWith(this.player, this.enemyships[i], "corner"));
            //     // if(this.collidesWith(this.player, this.enemyships[i]))
            //     {
            //         this.player.dealDamage(1);

            //         if(this.player.health <= 0)
            //         {
            //             this.bgsong.stop();
            //         }

            //         let n = this.normalizedVector(this.player, this.enemyships[i]);
            //         this.player.collided = 20;
            //         this.player.velX = n[0] * 13;
            //         this.player.velY = n[1] * 13;
            //     }
            // }
            // else
            // {
                if(this.collidesWith(this.player, this.enemyships[i], "enemyship"))
                {
                    
                    let n = this.normalizedVector(this.player, this.enemyships[i]);
                    this.player.collided = 20;
                    this.player.velX = n[0] * 13;
                    this.player.velY = n[1] * 13;

                    if(!this.enemyships[i].boss && this.enemyships[i].type !== 8)
                    {
                        // this.enemyships[i].health -= 25;
                        this.enemyships[i].collided = 13;
                        this.enemyships[i].velX = n[0] * -13;
                        this.enemyships[i].velY = n[1] * -13;   
                    }
                }
            // }
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

    collidesWith(a, b, type="normal")//type is probably dead code from background.js
    {
        
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
        let healthtext = `Health: Infinite`;
        ctx.textAlign = 'left';
        // const t_width = ctx.measureText(text).width;
        // const t_height = ctx.measureText(text).height;
        ctx.fillText(healthtext, 20, this.height - 50);

        ctx.fillStyle = "#00EFF6";
        let shieldtext = `Shield: Infinite`;
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
        //use value to indicate the specific ship that is supposed to drop a drop
        //if/when we get there
    }

    

}

