import Projectile from './projectile'

export default class EllipseDamageProjectile extends Projectile{
    constructor(position, velocity, x_radius, y_radius, type, damage, blur=0) //owner might be dead code
    {
        super(position, velocity, y_radius, true, -1, type);
        this.blur = blur;
        this.damage = damage;
        this.type = type;
        this.x_radius = x_radius;
        this.y_radius = y_radius;
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
        let gradient_c;
        let mid;
        let color;
        if(this.type === 0)
        {
            gradient_a = "gold";
            gradient_b = "GoldenRod";
            gradient_c = "#DEB300";
            mid = 0.9;
            color = "#DEB300";
        }

   
        context.save();
        context.beginPath();
        setShadow(context, color, 0, 0, this.blur);
        console.log("x", this.posX);
        console.log("y", this.posY);
        console.log("rad", this.y_radius);
        let grd = context.createRadialGradient(this.posX, this.posY, 0, this.posX, this.posY, this.y_radius);
        if(gradient_c === undefined)
        {
            grd.addColorStop(0, gradient_a);
            grd.addColorStop(1, gradient_b);
        }
        else
        {
            grd.addColorStop(0, gradient_a);
            grd.addColorStop(mid, gradient_b);
            grd.addColorStop(1, gradient_c);
        }
        
        context.fillStyle = grd;

        context.ellipse(this.posX, this.posY, this.x_radius, this.y_radius, 0, 0, Math.PI*2);
        context.fill();
        context.closePath();
        context.restore();

        context.shadowBlur = 0;
    }

    leftX()
    {
        return this.posX;
    }

    rightX()
    {
        return this.posX + 2 * this.x_radius;
    }

    upY()
    {
        return this.posY;
    }

    downY()
    {
        return this.posY + 2 * this.y_radius;
    }
    
}
