
//background.js
import Star from "./star"

export default class Background{
    constructor(width, height)
    {
        this.width = width;
        this.height = height;
        this.stars = [];
    };

    animate(context){
        context.fillStyle = "black";
        context.fillRect(0, 0, this.width, this.height);
        this.createStars(context);
        this.updateStars(context);
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

    updateStars(context){
        for(let i = 0; i < this.stars.length; i++)
        {
            this.stars[i].move();
            if(this.stars[i].posY > this.height + 10)
            {
                this.stars.splice(i, 1);
                i--;
            }

        }
        this.stars.forEach( (star) => {
            star.draw(context);
        })
    }
}
