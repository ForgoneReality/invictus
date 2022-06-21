// Function for create new star
export default class Star3
{
    constructor(x,y,z, radius, starsIndex, centerX, centerY, focalLength, starX_dir, starY_dir, innerWidth){
        this.x = x;
        this.y = y;
        this.z = z;
        this.radius = radius;
        this.r = 255;
        this.g = 255;
        this.b = 255;

        this.id = starsIndex;
        this.centerX = centerX;
        this.centerY = centerY;
        this.focalLength = focalLength;
        this.starX_dir = starX_dir; 
        this.starY_dir = starY_dir;
        this.starY_dir;
        this.innerWidth = innerWidth;
    }
        
        // Animate Stars
    update(c){
        this.starX = (this.x - this.centerX) * (this.focalLength / this.z);
        this.starX += this.centerX;
        
        this.starY = (this.y - this.centerY) * (this.focalLength / this.z);
        this.starY += this.centerY;
        
        this.starRadius = this.radius * (this.focalLength / this.z);
        
        this.starX += this.starX_dir;
        this.starY += this.starY_dir;
        
        this.z += -10;
        
        if(this.z <= 0){
            this.z = parseInt(innerWidth);
        }
        
        this.draw(c);
    
    }
    
    
    // Function for draw star
    draw(c){
        c.beginPath();
        c.shadowColor = `rgb(${this.r}, ${this.g}, ${this.b})`;
        c.shadowBlur = this.starRadius * 2;
        c.fillStyle = `rgb(${this.r}, ${this.g}, ${this.b})`;
        c.arc(this.starX,this.starY,this.starRadius, 2*Math.PI, false);
        c.fill();
        c.closePath();
        c.shadowBlur = 0;
    }
};