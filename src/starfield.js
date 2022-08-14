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
        
        const image = new Image();
        image.src  = "images/instructions.png";
        image.onload = () => {
            this.instructions = image;
            this.i_width = this.innerWidth * .6;
            this.i_height = this.innerHeight * .8;
        }

        const spacebar = new Image();
        spacebar.src  = "images/spacebar.png";
        spacebar.onload = () => {
            this.spacebar = spacebar;
            const SCALE = 0.4;
            this.s_width = spacebar.width * SCALE;
            this.s_height = spacebar.height * SCALE;
        }

        const wasd = new Image();
        wasd.src  = "images/wasd.png";
        wasd.onload = () => {
            this.wasd = wasd;
            const SCALE = 0.5;
            this.w_width = wasd.width * SCALE;
            this.w_height = wasd.height * SCALE;
        }

        const mousey = new Image();
        mousey.src  = "images/mouse.png";
        mousey.onload = () => {
            this.mousey = mousey;
            const SCALE = 0.12;
            this.m_width = mousey.width * SCALE;
            this.m_height = mousey.height * SCALE;
        }

        this.instructionsOn = false;


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

            if(this.instructionsOn) //why in god's name the instructions is inside here, I do not know. It should be refactored into the HTML
            //and displayed on when clicked, instead of being hardcoded as part of starfield (where it can't even be reached via CSS    )
            {   
                
                // c.canvas.width = 1280;
                // c.canvas.height = 720;
                c.save();
                c.globalAlpha = 0.7;
                c.fillStyle="black";
                c.fillRect(this.innerWidth * .203, this.innerHeight * .22, this.i_width * .86, this.i_height *.75);
                c.fillStyle="black";
                c.globalAlpha = 1;
                c.fillRect(this.innerWidth * .203, this.innerHeight * .12, this.i_width * .86, this.i_height *.123);
                c.restore();
                c.drawImage(this.instructions, this.innerWidth * .16, this.i_height * .06, this.i_width, this.i_height);
                c.drawImage(this.spacebar, this.innerWidth * .33, this.innerHeight * .53, this.s_width, this.s_height);
                c.drawImage(this.wasd, this.innerWidth * .33, this.innerHeight * .28, this.w_width, this.w_height);
                c.drawImage(this.mousey, this.innerWidth * .55, this.innerHeight * .26, this.m_width, this.m_height);
                c.font = '16px Planer';
                c.fillStyle = "white";
                c.fillText('Move Ship', this.innerWidth * .342, this.innerHeight * .44);
                c.fillText('Aim Lasers', this.innerWidth * .54, this.innerHeight * .44);
                c.fillText('Fire Lasers', this.innerWidth * .344, this.innerHeight * .67);

                c.font = '35px Neuropol';
                c.fillText('INSTRUCTIONS', this.innerWidth * .345, this.innerHeight * .19)

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