import Star3 from "./star3"

export default class StarField
{
    constructor(canvas){
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.innerWidth = window.innerWidth - 20;
        this.innerHeight = window.innerHeight - 20;
        this.radius = 1;
        this.starsIndex = 0;
        this.stars = [];
        this.centerX = innerWidth/2;
        this.centerY = innerHeight/2;
        this.focalLength = 100;
        this.starRadius = null;
        this.starX = null;
        this.starY = null;
        this.numStars = 500;
        this.mouse = {};
        this.starX_dir = 0;
        this.starY_dir = 0;
        

        canvas.width = this.innerWidth;
        canvas.height = this.innerHeight;

        canvas.addEventListener('mousewheel', function(e){
            if(e.deltaY < 0){
            this.focalLength *= 1.1;
            }else{
            this.focalLength /= 1.1;
            }
            
            if(this.focalLength >= this.innerWidth){
            this.focalLength = this.innerWidth - 20;
            }else if(this.focalLength < 100){
            this.focalLength = 100;
            }
            
        }, false);

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
        let c = this.context;
        requestAnimationFrame(this.animate.bind(this));
        c.fillStyle = "black";
        c.fillRect(0,0,this.innerWidth,this.innerHeight);
    
        for(let i = 1; i < 500; i++){
            this.stars[i].update(c);
            console.log("bruh");
        }

        
    }
};