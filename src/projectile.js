//projectile.js
//just pass context around into draw and animate specifically


export default class Projectile {
    constructor(position, velocity, size, collidable, owner, type)//color optional
    {
        this.posX = position[0];
        this.posY = position[1];
        this.velX = velocity[0];
        this.velY = velocity[1];
        this.size = size;
        this.collidable = collidable;
        this.type = type;
        this.owner = owner; //1 ally, 2 enemy, 3 neutral
    }

    draw()
    {
        console.error("Projectile#draw() should be overridden");
    }

    animate(context)
    {
        this.move();
        if (this.posY >= 0)
            this.draw(context);
    }

    move() //default move, no acceleration. projectiles, stars, some enemy ships, drops, etc.
    {
        this.posX += this.velX;
        this.posY += this.velY;
    }
    
    outofBounds(width, height)
    {
        return ( (this.owner !== 2 && this.posX < 0) || (this.owner === 2 && this.posX < -500) || (this.owner !== 2 && this.posY < 0) || (this.owner === 2 && this.posY < -500) || (this.owner!== 2 && this.posX >= width) || (this.owner === 2 && this.posX >= width + 500) || this.posY >= height)
    }

}
