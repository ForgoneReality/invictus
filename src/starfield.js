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


        canvas.width = this.innerWidth;
        canvas.height = this.innerHeight;

        this.start();
    }

    start()
    {
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
            if (this.initiateEnd)
            {
                if (this.focalLength < 1200)
                {
                    this.focalLength = this.focalLength + 2;
                }
                else
                {
                    this.continue = false;
                }
            }
        }
        else
        {
            this.stars = null;
        }

    }
};