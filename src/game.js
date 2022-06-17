// //game.js
import Background from "./background"
import Player from "./player";

export default class Game
{
    constructor(canvas){
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
        this.state = "new-game";   

        this.projectiles = [];
        this.enemies = [];
        this.start();//initially new game every time... loading functionality later
 
    }

    

    start()
    {
        // this.level = new 
        this.background = new Background(this.canvas.width, this.canvas.height);
        this.state = "fighting";
        this.player = new Player([this.canvas.width / 2, this.canvas.height - 50]);
        this.mouse_x = -1;
        this.mouse_y = -1;
        let handleMousemove = (event) => {
            this.mouse_x = event.x;
            this.mouse_y = event.y;
        };
          
        //note: as explained in Player#animate, movement and other spontaneous events cannot be added here
        document.addEventListener('mousemove', handleMousemove);

             // draw the laser 
        this.animate();

        
    }

    animate(){
        //be cognizant of the order in which you animate things... layering!
        this.background.animate(this.context);

        this.player.animate(this.context, this.mouse_x, this.mouse_y);
    

        if(key.isPressed(" "))
        {
            let proj = this.player.shootProjectile(this.mouse_x, this.mouse_y, 1);
            if (proj)
            {
                this.projectiles = this.projectiles.concat(proj);
            }
        }

        this.projectiles.forEach((proj) => {
            proj.animate(this.context)
        });

        for(let i = 0; i < this.projectiles.length; i++)
        {
            if(this.projectiles[i].outofBounds(this.canvas.width, this.canvas.height))
            {
                this.projectiles.splice(i, 1);
                i--;
            }
        }

        requestAnimationFrame(this.animate.bind(this));
    }

    allObjectsNoInfo()
    {
        return ([[this.background], this.projectiles]);
    }

    allObjectsMouseInfo()
    {
        return ([[this.player], this.enemies]);
    }

}
