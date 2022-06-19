import Projectile from './projectile'

export default class LaserDamageProjectile extends Projectile{
    constructor(position, velocity, angle, length, owner, type, damage, blur=0, width=2)
    {
        super(position, velocity, length, true, owner, type);
        this.blur = blur;
        this.damage = damage;
        this.width = width;
        this.degrees = angle;
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

        let color;
        if(this.type === 0)
        {
            color = "red";
        }
        
        context.save();
        context.shadowColor = color;
        setShadow(context, color, 0, 0, this.blur);
        context.fillStyle = color;
        context.translate(this.posX+this.width/2, this.posY+this.size/2);
        context.rotate(this.degrees*Math.PI/180.0);
        context.translate(-this.posX-this.width/2, -this.posY-this.size/2);
        context.fillRect(this.posX, this.posY, this.width, this.size);
        context.restore();

        context.shadowBlur = 0;
    }

    leftX() //scuffed
    {
        return this.posX;
    }

    rightX() //scuffed
    {
        return this.posX + (this.size + this.width) / 2;
    }

    upY() //scuffed
    {
        return this.posY;
    }

    downY() //scuffed
    {
        return this.posY + (this.size + this.width) / 2;
    }
    
}