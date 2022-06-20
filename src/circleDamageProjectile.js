import Projectile from './projectile'

export default class CircleDamageProjectile extends Projectile{
    constructor(position, velocity, radius, owner, type, damage, blur=0, arc_start, arc_end) //owner might be dead code
    {
        super(position, velocity, radius, true, owner, type);
        this.blur = blur;
        this.damage = damage;
        this.type = type;
        if (arc_start === undefined)
        {
            this.arc_start = 0;
        }
        else
        {
            this.arc_start = arc_start;
        }
        if (arc_end === undefined)
            this.arc_end = Math.PI * 2;
        else
            this.arc_end = arc_end;
    }

    draw(context)
    {
        function setShadow(ctx, color, ox, oy, blur) {
            ctx.shadowColor = color;
            ctx.shadowOffsetX = ox;
            ctx.shadowOffsetY = oy;
            ctx.shadowBlur = blur;
        }

        let gradient_a;
        let gradient_b;
        let color;
        if(this.type === 0)
        {
            color = "red";
            gradient_a = "#FF0000";
            gradient_b = "#AD0303";
        }
        else if (this.type === 1)
        {
            color = "pink";
            gradient_b = "#FF4da6";
            gradient_a = "#CC0099";
        }
        else if (this.type === 3)
        {
            color = "cyan";
            gradient_a = "  #b3ffff";
            gradient_b = "#00FFFF";
        }

   
        // context.save();
        context.beginPath();
        setShadow(context, color, 0, 0, this.blur);
        let grd = context.createRadialGradient(this.posX, this.posY, 0, this.posX, this.posY, this.size / 2);
        grd.addColorStop(0, gradient_a);
        grd.addColorStop(1, gradient_b);
        context.fillStyle = grd;

        context.arc(this.posX, this.posY, this.size, this.arc_start, this.arc_end, false);
        context.fill();
        context.closePath();
        // context.restore();

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

    leftX()
    {
        return this.posX;
    }

    rightX()
    {
        return this.posX;
    }

    upY()
    {
        return this.posY;
    }

    downY()
    {
        return this.posY;
    }
    
}