import Projectile from './projectile'

export default class Star extends Projectile{
    constructor(positionX, velocityY, size, color="white")
    {
        super([positionX, 20], [0, velocityY], size, false, 0, color);
        let brightest = Math.random()*4;
        if (brightest < 1)
        {
            this.brightness = 255;
        }
        else
        {
            this.brightness = Math.random()*145 + 110;
        }
    }
    

    draw(context)
    {
        let that = this;
        function setShadow(ctx, color, ox, oy, blur) {
            ctx.shadowColor = color;
            // ctx.shadowOffsetX = ox;
            // ctx.shadowOffsetY = oy;
            ctx.shadowBlur = blur;
            // ctx.filter = `brightness(${that.brightness}%)`;
          }
    
        context.beginPath();
        context.fillStyle = `rgb(${this.brightness}, ${this.brightness}, ${this.brightness})`;
        setShadow(context, "white", 0, 0, this.size*2);
        context.arc(this.posX, this.posY, this.size, 0, 2 * Math.PI, false);
        context.fill();
        context.closePath();
    }
}
