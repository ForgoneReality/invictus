import Projectile from './projectile'

export default class CircleDamageProjectile extends Projectile{
    constructor(position, velocity, radius, owner, color, damage, blur=0)
    {
        super(position, velocity, radius, true, owner, color);
        this.blur = blur;
        this.damage = damage;

    }

    draw(context)
    {
        function setShadow(ctx, color, ox, oy, blur) {
            ctx.shadowColor = color;
            ctx.shadowOffsetX = ox;
            ctx.shadowOffsetY = oy;
            ctx.shadowBlur = blur;
        }
   
        context.beginPath();
        context.fillStyle = this.color;
        setShadow(context, this.color, 0, 0, this.blur);
        context.arc(this.posX, this.posY, this.size, 0, 2 * Math.PI, false);
        context.fill();
        context.closePath();

        context.shadowBlur = 0;

        // context.save();
        // context.shadowColor = this.color;
        // context.shadowBlur = 9;
        // context.fillColor = this.color;
        // // context.translate(this.posX+this.width/2, this.posY+this.size/2);
        // // context.rotate(this.degrees*Math.PI/180.0);
        // // context.translate(-this.posX-this.width/2, -this.posY-this.size/2);
        // context.fillRect(this.posX, this.posY, 4, 32);
        // context.restore();

        // context.shadowBlur = 0;

    }
    
}