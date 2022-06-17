import Projectile from './projectile'

export default class LaserDamageProjectile extends Projectile{
    constructor(position, velocity, length, owner, color, damage, blur=0, width=2)
    {
        super(position, velocity, length, true, owner, color);
        this.blur = blur;
        this.damage = damage;
        this.width = width;
        //this.degrees = IMPLEMENT THIS
        //this.size refers to length
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
        context.shadowColor = this.color;
        setShadow(context, this.color, 0, 0, this.blur);
        context.fillStyle = this.color;
        // context.translate(this.posX+this.width/2, this.posY+this.size/2);
        // context.rotate(this.degrees*Math.PI/180.0);
        // context.translate(-this.posX-this.width/2, -this.posY-this.size/2);
        context.fillRect(this.posX, this.posY, this.width, this.size);
        context.closePath();

        context.shadowBlur = 0;
    }
    
}