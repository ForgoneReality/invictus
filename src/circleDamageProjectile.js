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
        let gradient_c;
        let mid;
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
        else if (this.type === 4)
        {
            color = "purple";
            gradient_a = "#DEA5FF";
            gradient_b = "#6A00A7";
        }
        else if (this.type === 5)
        {
            color = "darkgreen";
            gradient_b = "#00A31A";
            gradient_a = "#78FF54";
        }
        else if (this.type === 6)
        {
            color = "blue";
            gradient_a = "#0019FF";
            gradient_b = "#1121B7";
        }
        else if (this.type === 7)
        {
            color = "blue";
            gradient_a = "white";
            gradient_b = "#1121B7";
        }

   
        context.save();
        context.beginPath();
        setShadow(context, color, 0, 0, this.blur);
        let grd = context.createRadialGradient(this.posX, this.posY, 0, this.posX, this.posY, this.size / 2);
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

        // if(this.type === 7)
        // {
        //     // context.setTransform(1, 0, 0, 1, 150, 150);
        //     // context.rotate(3 * Math.PI/2);//I hoped this line would rotate it to point downards (so the enemy ship shoots downwards), but it just makes it disappear
        //     // context.scale(-1,1);
        //     context.arc(150, 150, 60, (Math.PI/180)*40, (Math.PI/180)*320);
        //     context.bezierCurveTo(110, 75, 110, 225, 196, 188);
        // }
        // else{
            context.arc(this.posX, this.posY, this.size, this.arc_start, this.arc_end, false);
        // }
        context.fill();
        context.closePath();
        context.restore();

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
        return this.posX + 2 * this.size;
    }

    upY()
    {
        return this.posY;
    }

    downY()
    {
        return this.posY + 2 * this.size;
    }
    
}