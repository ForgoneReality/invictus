import Projectile from './projectile'

export default class Star extends Projectile{
    constructor(positionX, velocityY, size, color="white")
    {
        super([positionX, 20], [0, velocityY], size, false, 0, color);
        this.brightness = Math.random()*50 + 70;
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
        context.fillStyle = "white";
        setShadow(context, "white", 0, 0, this.size*2);
        context.arc(this.posX, this.posY, this.size, 0, 2 * Math.PI, false);
        context.fill();
        context.closePath();
    }
}
