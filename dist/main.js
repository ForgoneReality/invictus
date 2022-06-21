(()=>{"use strict";class t{constructor(t,s,e,i,h,o){this.posX=t[0],this.posY=t[1],this.velX=s[0],this.velY=s[1],this.size=e,this.collidable=i,this.type=o,this.owner=h}draw(){console.error("Projectile#draw() should be overridden")}animate(t){this.move(),this.posY>=0&&this.draw(t)}move(){this.posX+=this.velX,this.posY+=this.velY}outofBounds(t,s){return this.posX<0||this.posY<0||this.posX>=t||this.posY>=s}}class s extends t{constructor(t,s,e,i="white"){super([t,20],[0,s],e,!1,0,i);let h=4*Math.random();this.brightness=h<1?255:145*Math.random()+110}draw(t){var s,e;t.beginPath(),t.fillStyle=`rgb(${this.brightness}, ${this.brightness}, ${this.brightness})`,s=t,e=2*this.size,s.shadowColor="white",s.shadowBlur=e,t.arc(this.posX,this.posY,this.size,0,2*Math.PI,!1),t.fill(),t.closePath()}}class e extends t{constructor(t,s,e,i,h,o,a=0,r,l){super(t,s,e,!0,i,h),this.blur=a,this.damage=o,this.type=h,this.arc_start=void 0===r?0:r,this.arc_end=void 0===l?2*Math.PI:l}draw(t){let s,e,i;0===this.type?(i="red",s="#FF0000",e="#AD0303"):1===this.type?(i="pink",e="#FF4da6",s="#CC0099"):3===this.type?(i="cyan",s="  #b3ffff",e="#00FFFF"):4===this.type?(i="purple",s="#DEA5FF",e="#6A00A7"):5===this.type&&(i="darkgreen",e="#00A31A",s="#78FF54"),t.beginPath(),function(t,s,e,i,h){t.shadowColor=s,t.shadowOffsetX=0,t.shadowOffsetY=0,t.shadowBlur=h}(t,i,0,0,this.blur);let h=t.createRadialGradient(this.posX,this.posY,0,this.posX,this.posY,this.size/2);h.addColorStop(0,s),h.addColorStop(1,e),t.fillStyle=h,t.arc(this.posX,this.posY,this.size,this.arc_start,this.arc_end,!1),t.fill(),t.closePath(),t.shadowBlur=0}leftX(){return this.posX}rightX(){return this.posX+2*this.size}upY(){return this.posY}downY(){return this.posY+2*this.size}}class i extends t{constructor(t,s,e,i,h,o,a,r=0,l=2,n){if(super(t,s,i,!0,h,o),this.blur=r,this.damage=a,this.width=l,this.degrees=e,this.isImage=!1,null!=n){let t;this.isImage=!0,3===o&&(t=.1);const s=new Image;s.src=n,s.onload=()=>{this.image=s,this.width=s.width*t,this.height=s.height*t}}}draw(t){let s;0===this.type?s="red":2===this.type?s="#DDB300":3===this.type&&(s="#39FF14"),t.save(),t.shadowColor=s,function(t,s,e,i,h){t.shadowColor=s,t.shadowOffsetX=0,t.shadowOffsetY=0,t.shadowBlur=h}(t,s,0,0,this.blur),t.fillStyle=s,t.translate(this.posX+this.width/2,this.posY+this.size/2),t.rotate(this.degrees*Math.PI/180),t.translate(-this.posX-this.width/2,-this.posY-this.size/2),this.isImage?this.image&&t.drawImage(this.image,this.posX,this.posY,this.width,this.height):t.fillRect(this.posX,this.posY,this.width,this.size),t.restore(),t.shadowBlur=0}leftX(){return 3===this.type?this.posX+.25*this.width:this.posX}rightX(){return 3===this.type?this.posX+.75*this.width:this.posX+this.width}upY(){return 3===this.type?this.posY+.2*this.height:this.posY}downY(){return 3===this.type?this.posY+.8*this.height:this.posY+this.height}}class h{constructor(t,s,e,i,h,o,a,r){this.posX=t[0],this.posY=t[1],this.velX=s[0],this.velY=s[1],this.length=e,this.width=i,this.type=o,this.damage=h,this.duration=a,this.angle=r}draw(t){let s;0===this.type&&(s="red"),t.save(),function(t,s,e,i,h){t.shadowColor=s,t.shadowOffsetX=0,t.shadowOffsetY=0,t.shadowBlur=40}(t,s);let e=t.createLinearGradient(this.posX,this.posY,this.posX-this.width/2,this.posY);e.addColorStop(0,"#DE4040"),e.addColorStop(.6,"red"),e.addColorStop(1,"#760C0C"),t.fillStyle=e,t.fillRect(this.posX-this.width/2,this.posY,this.width/2+1,this.length);let i=t.createLinearGradient(this.posX,this.posY,this.posX+this.width/2,this.posY);i.addColorStop(0,"#DE4040"),i.addColorStop(.6,"red"),i.addColorStop(1,"#760C0C"),t.fillStyle=i,t.fillRect(this.posX,this.posY,this.width/2,this.length),t.shadowBlur=0,t.restore()}animate(t){this.duration-=1,this.move(),this.draw(t)}move(){}outofBounds(t,s){return!1}leftX(){return this.posX}rightX(){return this.posX+this.width}upY(){return 0}downY(){return this.length}}class o{constructor(t,s,e,i,h,o){this.posX=t[0],this.posY=t[1],this.duration=s,this.scale=i,this.color=h,this.blur=o;const a=new Image;a.src=e,a.onload=()=>{this.image=a,this.width=a.width*this.scale,this.height=a.height*this.scale}}draw(t){t.shadowColor=this.color,t.shadowBlur=this.blur,this.image&&t.drawImage(this.image,this.posX-this.width/2,this.posY-this.width/2,this.width,this.height),t.fillRect(this.posX,this.posY,this.width/2,this.length),t.shadowBlur=0}animate(t){this.duration-=1,this.draw(t)}outofBounds(t,s){return!1}}const a=[{velocity:[0,1.65*(.4+.8*Math.random())],endvelocity:[0,1.65],health:135,damage:60,img:"../images/enemyship1.png",color:"red",blur:0,rotatable:!1,scale:.022,shootTimerInit:50,gold:1500,value:1,shotsLeft:40},{velocity:[0,1*(.4+.8*Math.random())],endvelocity:[0,1],health:175,damage:70,img:"../images/enemyship2.png",color:"pink",blur:0,rotatable:!1,scale:.022,shootTimerInit:50,gold:2e3,value:1.03,shotsLeft:40},{velocity:[0,5],endvelocity:[0,1.4],health:250,damage:60,img:"../images/enemyship3.png",color:"yellow",blur:0,rotatable:!1,scale:.022,shootTimerInit:50,gold:2e3,value:1.04,shotsLeft:8},{velocity:[0,10.2],endvelocity:[0,1.8],health:150,damage:35,img:"../images/enemyship4.png",color:"cyan",blur:0,rotatable:!0,scale:.022,shootTimerInit:32,gold:2200,value:1.06,shotsLeft:8},{velocity:[0,1.6],endvelocity:[0,1.6],health:165,damage:55,img:"../images/enemyship5.png",color:"purple",blur:0,rotatable:!0,scale:.1,shootTimerInit:20,gold:2100,value:1.05,shotsLeft:3},{velocity:[0,.6],endvelocity:[0,.6],health:222,damage:75,img:"../images/enemyship6.png",color:"green",blur:0,rotatable:!1,scale:.085,shootTimerInit:40,gold:2500,value:1.09,shotsLeft:2},{velocity:[0,2.4],endvelocity:[0,0],health:8e3,damage:80,img:"../images/boss1.png",color:"red",blur:0,rotatable:!1,scale:.11,shootTimerInit:30,shootTimerInit2:444,shootTimerInit3:250,gold:2e4,value:0,shotsLeft:15},{velocity:[0,0],endvelocity:[0,0],health:2500,damage:50,img:"../images/bossminion.png",color:"red",blur:0,rotatable:!0,scale:.11,shootTimerInit:70,gold:0,value:0,shotsLeft:2}];class r{constructor(t,s,e,i=!1){this.posX=t[0],this.posY=t[1],this.collided=0,this.background=e,this.type=s,this.boss=i,this.canvasBottom=document.getElementById("game-canvas").getAttribute("height"),this.setup(s)}setup(t){const s=new Image;if(s.src=a[t].img,s.onload=()=>{this.image=s,this.width=s.width*a[t].scale,this.height=s.height*a[t].scale},this.velX=a[t].velocity[0],this.velY=a[t].velocity[1],this.health=a[t].health,this.damage=a[t].damage,this.degrees=0,this.color=a[t].color,this.blur=a[t].blur,this.normalVector=[0,1],this.rotatable=a[t].rotatable,this.shootTimer=a[t].shootTimerInit,this.boss&&(this.shootTimer2=a[t].shootTimerInit2,this.shootTimer3=a[t].shootTimerInit3),this.gold=a[t].gold,this.value=a[t].value,this.shotsLeft=a[t].shotsLeft,this.boss&&(this.dependencies=[],6===this.type)){let t=new r([this.posX,this.posY+50],7,this.background,!0);this.dependencies.push(t),this.background.enemyships.push(t);let s=new r([this.posX+800,this.posY+50],7,this.background,!0);this.dependencies.push(s),this.background.enemyships.push(s)}}draw(t){this.image&&(this.rotatable&&this.updateAngleAndNormalizedVector(),t.save(),t.shadowColor=this.color,t.shadowBlur=this.blur,t.translate(this.posX+this.width/2,this.posY+this.height/2),t.rotate(this.degrees*Math.PI/180),t.translate(-this.posX-this.width/2,-this.posY-this.height/2),t.drawImage(this.image,this.posX,this.posY,this.width,this.height),t.restore())}animate(t){this.posY+this.height/2+1>=0?(this.move(),this.shootProjectile(),this.draw(t)):this.posY+=1}move(){return this.collided>1?(this.posX+=this.velX,this.posY+=this.velY,this.velX=.9*this.velX,this.velY=.9*this.velY,void(this.collided-=1)):1===this.collided?(this.posX+=this.velX,this.posY+=this.velY,this.velX=a[this.type].endvelocity[0],this.velY=a[this.type].endvelocity[1],void(this.collided-=1)):void(0===this.type?(this.posY+100<this.background.player.posY&&(this.posX>this.background.player.posX?this.velX=-.4:this.velX=.4,this.posX+=this.velX),this.posY+=this.velY):1===this.type||4===this.type?(this.posX+=this.velX,this.posY+=this.velY):2===this.type?(this.posY+=this.velY,this.velY>1.4&&(this.velY-=.4),this.posY+100<this.background.player.posY&&(this.posX>this.background.player.posX?this.velX=-.3:this.velX=.3,this.posX+=this.velX)):3===this.type?(this.posY+=this.velY,this.velY>1.8&&(this.velY-=.4)):5===this.type?(this.posY+100<this.background.player.posY&&(this.posX>this.background.player.posX?this.velX=-1:this.velX=1,this.posX+=this.velX),this.posY+=this.velY):6===this.type?(this.posX+=this.velX,this.posY+=this.velY,this.dependencies.forEach((t=>{null!=t&&(t.posX+=this.velX,t.posY+=this.velY)})),this.dependencies[0]&&this.dependencies[0].health<=0&&(this.health-=1500,this.dependencies[0]=null),this.dependencies[1]&&this.dependencies[1].health<=0&&(this.health-=1500,this.dependencies[0]=null),3===this.dependencies.length&&this.dependencies[2].duration<=0&&this.dependencies.pop(),this.velY>1?this.velY=.85*this.velY:this.velY>.15?this.velY=.98*this.velY:this.velY=0,this.realX()>this.background.player.realX()+30?this.realX()<=.3*this.background.width?this.velX=0:this.velX=-1.5:this.realX()+30<this.background.player.realX()?this.realX()>=.67*this.background.width?this.velX=0:this.velX=1.5:this.realX()>this.background.player.realX()?this.velX-=.003:this.realX()<this.background.player.realX()&&(this.velX+=.003),this.velX>1.5&&(this.velX=.5),this.velX<-1.5&&(this.velX=-.5)):this.type)}shootProjectile(t,s,a,r){let l,n;switch(this.type){case 0:if(l=3.3,n=100,!(this.shootTimer<=0))return void(this.shootTimer-=1);{this.shootTimer=n;let t=new e([this.realX(),this.realY()+30],[l*this.normalVector[0],l*this.normalVector[1]],4.5,2,0,this.damage,20);this.background.enemyprojectiles.push(t),this.shotsLeft-=1}break;case 1:if(l=5.5,n=150,!(this.shootTimer<=0))return void(this.shootTimer-=1);{this.shootTimer=n;let t=new e([this.realX()+40,this.realY()+30],[l*Math.sqrt(2)/2,l*Math.sqrt(2)/2],6,2,1,this.damage,20,-1*Math.PI/4,3*Math.PI/4);this.background.enemyprojectiles.push(t);let s=new e([this.realX()-40,this.realY()+30],[-1*l*Math.sqrt(2)/2,l*Math.sqrt(2)/2],6,2,1,this.damage,20,Math.PI/4,5*Math.PI/4);this.background.enemyprojectiles.push(s);let i=new e([this.realX()+40,this.realY()-30],[l*Math.sqrt(2)/2,-1*l*Math.sqrt(2)/2],6,2,1,this.damage,20,5*Math.PI/4,9*Math.PI/4);this.background.enemyprojectiles.push(i);let h=new e([this.realX()-40,this.realY()-30],[-1*l*Math.sqrt(2)/2,-1*l*Math.sqrt(2)/2],6,2,1,this.damage,20,3*Math.PI/4,7*Math.PI/4);this.background.enemyprojectiles.push(h),this.shotsLeft-=1}break;case 2:if(l=3.5,n=18,this.shotsLeft<=0)return this.shootTimer=150,void(this.shotsLeft=8);if(this.shootTimer<=0){let t;this.shootTimer=n,t=this.shotsLeft%2==0?26.5:-26.5;let s=new i([this.realX()+t,this.realY()+30],[0,l],0,15,2,2,this.damage,25);this.background.enemyprojectiles.push(s),this.shotsLeft-=1}else this.shootTimer-=1;break;case 3:if(l=4,n=5.5,this.shotsLeft<=0)return this.shootTimer=250,void(this.shotsLeft=8);if(this.shootTimer<=0){this.shootTimer=n;let t=this.normalVector[0]*(Math.random(.4)+.8),s=this.normalVector[1]*(Math.random(.4)+.8),i=new e([this.realX(),this.realY()+30],[l*t,l*s],4.5,2,3,this.damage,20);this.background.enemyprojectiles.push(i),this.shotsLeft-=1}else this.shootTimer-=1;break;case 4:if(l=3.8,n=22,this.shotsLeft<=0)return this.shootTimer=132,void(this.shotsLeft=3);if(this.shootTimer<=0){this.shootTimer=n;let t=27,s=0,i=this.offset(t,s),h=this.offset(-1*t,s),o=new e([this.realX()+i[0],this.realY()+i[1]],[l*this.normalVector[0],l*this.normalVector[1]],5,2,4,this.damage,5),a=new e([this.realX()+h[0],this.realY()+h[1]],[l*this.normalVector[0],l*this.normalVector[1]],5,2,4,this.damage,5);this.background.enemyprojectiles.push(o),this.background.enemyprojectiles.push(a),this.shotsLeft-=1}else this.shootTimer-=1;break;case 5:if(l=3.3,n=30,this.shotsLeft<=0)return this.shootTimer=125,void(this.shotsLeft=2);if(!(this.shootTimer<=0))return void(this.shootTimer-=1);{this.shootTimer=n;let t=new e([this.realX()-40,this.realY()+30],[l*this.normalVector[0],l*this.normalVector[1]],5,2,5,this.damage,20);this.background.enemyprojectiles.push(t);let s=new e([this.realX()+40,this.realY()+30],[l*this.normalVector[0],l*this.normalVector[1]],5,2,5,this.damage,20);this.background.enemyprojectiles.push(s),this.shotsLeft-=1}break;case 6:if(l=5.5,n=100,this.shootTimer<=0){this.shootTimer=n;let t=new i([this.realX()+122,this.realY()+110],[0,l],0,41,2,0,90,25,3),s=new i([this.realX()-122,this.realY()+110],[0,l],0,41,2,0,90,25,3);this.background.enemyprojectiles.push(t),this.background.enemyprojectiles.push(s)}else this.shootTimer-=1;if(l=6,n=750,this.shootTimer2<=0){this.shootTimer2=n;let t=new h([this.realX(),this.realY()+65],[0,0],this.canvasBottom,70,7.5,0,150);this.background.lasers.push(t),this.dependencies.push(t)}else this.shootTimer2-=1;if(100===this.shootTimer2){let t=new o([this.realX(),this.realY()+93.5],98.5,"../images/redflare.png",.12,"#8b0000",20);this.background.extras.push(t),this.dependencies.push(t)}if(l=3.7,n=4,this.shotsLeft<=0)return this.shootTimer3=500,void(this.shotsLeft=15);if(this.shootTimer3<=0){this.shootTimer3=n;let t=60*Math.random()+240,s=Math.cos(t*Math.PI/180),i=-1*Math.sin(t*Math.PI/180),h=new e([this.realX()-262,this.realY()+117],[l*s,l*i],4,2,0,25,18),o=new e([this.realX()+262,this.realY()+117],[l*s,l*i],4,2,0,25,18);this.background.enemyprojectiles.push(h),this.background.enemyprojectiles.push(o),this.shotsLeft-=1}else this.shootTimer3-=1;break;case 7:if(l=3.8,n=35,this.shotsLeft<=0)return this.shootTimer=180,void(this.shotsLeft=2);if(this.shootTimer<=0){this.shootTimer=n;let t=27,s=0,e=this.offset(t,s),h=this.offset(-1*t,s),o=new i([this.realX()+e[0],this.realY()+e[1]],[l*this.normalVector[0],l*this.normalVector[1]],this.degrees+180,30,2,0,this.damage,5),a=new i([this.realX()+h[0],this.realY()+h[1]],[l*this.normalVector[0],l*this.normalVector[1]],this.degrees+180,30,2,0,this.damage,5);this.background.enemyprojectiles.push(o),this.background.enemyprojectiles.push(a),this.shotsLeft-=1}else this.shootTimer-=1;break;default:console.error("unknown projectile type")}}updateAngleAndNormalizedVector(){let t=this.background.player.realX(),s=this.background.player.realY(),e=t-this.realX(),i=s-this.realY();0===e?s>this.realY()?this.degrees=180:this.degrees=0:this.degrees=0===i?e<0?90:270:e<0?90+180*Math.atan(i/e)/Math.PI:270+180*Math.atan(i/e)/Math.PI,length=Math.sqrt(e*e+i*i),this.normalVector=[e/length,i/length]}realX(){return this.posX+this.width/2}realY(){return 1===this.type?this.posY+.4*this.height:this.posY+this.height/2}offset(t,s){void 0===this.degrees&&this.rotatable&&this.updateAngleAndNormalizedVector();let e=this.degrees,i=Math.cos(e*Math.PI/180),h=Math.sin(e*Math.PI/180);return[t*i-s*h,t*h+s*i]}leftX(){return this.posX}rightX(){return this.posX+this.width}upY(){return this.posY}downY(){return this.posY+this.height}}const l=[{basehealth:500,basedamage:25,baseshield:250,img:"../images/playership1.png",scale:.022,defaultprojType:0},{basehealth:1e3,basedamage:35,baseshield:400,img:"../images/playership2.png",scale:.022,defaultprojType:1}];class n{constructor(t){this.posX=t[0],this.posY=t[1],this.velX=0,this.velY=0,this.canvasX=2*this.posX,this.canvasY=this.posY+50,this.ship_level=0;const s=new Image;s.src=l[this.ship_level].img,s.onload=()=>{this.image=s,this.width=.02*s.width,this.height=.02*s.height},this.basehealth=l[this.ship_level].basehealth,this.health=this.basehealth,this.baseshield=l[this.ship_level].baseshield,this.shield=this.baseshield,this.basedamage=l[this.ship_level].basedamage,this.regen=.05,this.movedX=0,this.movedY=0,this.degrees=0,this.normalVector=[0,-1],this.projectileType=0,this.shotsLeft=0,this.shootTimer=0,this.collided=0,this.interval=1}draw(t,s,e){this.image&&(this.updateAngleAndNormalizedVector(s,e),t.save(),t.shadowColor="red",this.shield>0?t.shadowBlur=15:t.shadowBlur=0,t.translate(this.posX+this.width/2,this.posY+this.height/2),t.rotate(this.degrees*Math.PI/180),t.translate(-this.posX-this.width/2,-this.posY-this.height/2),t.drawImage(this.image,this.posX,this.posY,this.width,this.height),t.restore(),t.shadowBlur=0)}animate(t,s,e){this.health<this.basehealth&&(this.health+=this.regen),this.collided<=0?((key.isPressed("up")||key.isPressed("w"))&&this.power("up"),(key.isPressed("right")||key.isPressed("d"))&&this.power("right"),(key.isPressed("down")||key.isPressed("s"))&&this.power("down"),(key.isPressed("left")||key.isPressed("a"))&&this.power("left")):this.collided-=1,this.move(),this.applyGravity(),-1===s&&-1===this.mouse_y?this.draw(t,this.posX,0):this.draw(t,s,e)}move(){this.posX+=this.velX,this.posX<50&&(this.posX=50),this.posX>this.canvasX-50&&(this.posX=this.canvasX-50),this.posY+=this.velY,this.posY<50&&(this.posY=50),this.posY>this.canvasY-50&&(this.posY=this.canvasY-50)}levelup(t){if(!(this.ship_level>=t)){if(this.ship_level=t,this.projectileType=l[t].defaultprojType,1===t){const s=new Image;s.src=l[t].img,s.onload=()=>{this.image=s,this.width=.02*s.width,this.height=.02*s.height}}this.basehealth=l[t].basehealth,this.health=this.basehealth,this.basedamage=l[t].basedamage,this.baseshield=l[t].baseshield,this.shield=this.baseshield}}power(t){const s=-10;switch(t){case"up":this.velY>-4?this.velY=-4:this.velY-=.45,this.velY<s&&(this.velY=s),this.movedY=5;break;case"down":this.velY<4?this.velY=4:this.velY+=.45,this.velY>10&&(this.velY=10),this.movedY=5;break;case"right":this.velX<4?this.velX=4:this.velX+=.45,this.velX>10&&(this.velX=10),this.movedX=5;break;case"left":this.velX>-4?this.velX=-4:this.velX-=.45,this.velX<s&&(this.velX=s),this.movedX=5}}applyGravity(){if(this.movedX<=0){let t=Math.abs(this.velX);this.velX=t<.7?0:t<1.3?.4*this.velX:t<2.5?.6*this.velX:t<5?.7*this.velX:.8*this.velX}else this.movedX-=1;if(this.movedY<=0){let t=Math.abs(this.velY);this.velY=t<.7?0:t<1.3?.4*this.velY:t<2.5?.6*this.velY:t<5?.7*this.velY:.8*this.velY}else this.movedY-=1}shootProjectile(t,s){let e,h,o,a,r=this.projectileType;switch(-1===t&&-1===s?(e=this.realX(),h=0):(e=t,h=s),this.updateAngleAndNormalizedVector(t,s),r){case-1:return void(this.shootTimer-=1);case 0:if(o=12,a=8,this.shootTimer<=0){let t=[];this.shootTimer=a;let s=17,e=-30;if(1===this.interval){let h=this.offset(s,e);t.push(new i([this.realX()+h[0],this.realY()+h[1]],[o*this.normalVector[0],o*this.normalVector[1]],this.degrees,20,1,0,this.basedamage,4)),this.interval=0}else if(0===this.interval){let h=this.offset(-1*s,e);t.push(new i([this.realX()+h[0],this.realY()+h[1]],[o*this.normalVector[0],o*this.normalVector[1]],this.degrees,20,1,0,this.basedamage,4)),this.interval=1}return t}return void(this.shootTimer-=1);case 1:if(o=12,a=12,this.shootTimer<=0){let t=[];this.shootTimer=a;let s=17,e=-40,h=this.offset(s,e),r=this.offset(-1*s,e);return t.push(new i([this.realX()+h[0],this.realY()+h[1]],[o*this.normalVector[0],o*this.normalVector[1]],this.degrees,20,1,0,this.basedamage,4)),t.push(new i([this.realX()+r[0],this.realY()+r[1]],[o*this.normalVector[0],o*this.normalVector[1]],this.degrees,20,1,0,this.basedamage,4)),t}return void(this.shootTimer-=1);case 2:if(o=12,a=12,this.shootTimer<=0){this.shotsLeft--;let t=[];this.shootTimer=a;let s=17,e=-40;0===this.ship_level&&(e=-30);let h=this.offset(s,e),r=this.offset(-1*s,e),n=this.normalVector[0],d=this.normalVector[1],p=(this.degrees,Math.PI,n*Math.cos(Math.PI/6)-d*Math.sin(Math.PI/6)),c=n*Math.sin(Math.PI/6)+d*Math.cos(Math.PI/6),m=n*Math.cos(-Math.PI/6)-d*Math.sin(-Math.PI/6),g=n*Math.sin(-Math.PI/6)+d*Math.cos(-Math.PI/6);return console.log([m,g]),t.push(new i([this.realX()+h[0],this.realY()+h[1]],[o*this.normalVector[0],o*this.normalVector[1]],this.degrees,20,1,0,this.basedamage,4)),t.push(new i([this.realX()+r[0],this.realY()+r[1]],[o*this.normalVector[0],o*this.normalVector[1]],this.degrees,20,1,0,this.basedamage,4)),t.push(new i([this.realX()+h[0],this.realY()+h[1]],[o*p,o*c],this.degrees+30,20,1,0,this.basedamage,4)),t.push(new i([this.realX()+r[0],this.realY()+r[1]],[o*m,o*g],this.degrees-30,20,1,0,this.basedamage,4)),this.shotsLeft<=0&&(this.projectileType=l[this.ship_level].defaultprojType),t}return void(this.shootTimer-=1);case 3:if(o=17,a=6,this.shootTimer<=0){this.shotsLeft--;let t=[];this.shootTimer=a;let s=0,e=-40,h=this.offset(s,e);return t.push(new i([this.realX()+h[0],this.realY()+h[1]],[o*this.normalVector[0],o*this.normalVector[1]],this.degrees,20,1,3,2.5*this.basedamage,4,2,"../images/gamma.png")),this.shotsLeft<=0&&(this.projectileType=l[this.ship_level].defaultprojType),t}return void(this.shootTimer-=1)}}dealDamage(t){this.shield>0?(this.shield-=t,this.shield<0&&(this.shield=0)):(this.health-=t,this.health<=0&&exit)}updateAngleAndNormalizedVector(t,s){let e=t-this.realX(),i=s-this.realY();0===e?this.realY()>s?this.degrees=180:this.degrees=0:this.degrees=0===i?e>0?90:270:e>0?90+180*Math.atan(i/e)/Math.PI:270+180*Math.atan(i/e)/Math.PI,length=Math.sqrt(e*e+i*i),this.normalVector=[e/length,i/length]}realX(){return this.posX+this.width/2+1}realY(){return this.posY+.3*this.height}offset(t,s,e=0){let i=this.degrees+e,h=Math.cos(i*Math.PI/180),o=Math.sin(i*Math.PI/180);return[t*h-s*o,t*o+s*h]}leftX(){return this.posX}rightX(){return this.posX+this.width}upY(){return this.posY}downY(){return this.posY+this.height}}const d=[{img:"../images/heart.png",color:"red",blur:5,scale:.06,rarity:"common"},{img:"../images/drop1.png",color:"white",blur:0,scale:.04,rarity:"common"},{img:"../images/gold.png",color:"gold",blur:0,scale:.1,rarity:"common"},{img:"../images/gamma.png",color:"green",blur:0,scale:.1,rarity:"uncommon"},{img:"../images/shielddrop.png",color:"blue",blur:0,scale:.15,rarity:"common"}];class p extends t{constructor(t,s){super(t,[0,1.75],.25,!0,3,s);const e=new Image;e.src=d[s].img,e.onload=()=>{this.image=e,this.width=e.width*d[s].scale,this.height=e.height*d[s].scale}}draw(t){this.image&&(t.save(),t.drawImage(this.image,this.posX,this.posY,this.width,this.height),t.restore())}leftX(){return this.posX}rightX(){return this.posX+(this.size+this.width)/2}upY(){return this.posY}downY(){return this.posY+(this.size+this.width)/2}outofBounds(t,s){return this.posX>=t||this.posY>=s}}class c{constructor(t,s,e,i){this.width=t,this.height=s,this.level_id=e,this.context=i,this.stars=[],this.projectiles=[],this.enemyprojectiles=[],this.enemyships=[],this.drops=[],this.lasers=[],this.extras=[],this.createLevel(1),this.initializeStars(i),this.enemiesdefeated=0,this.gold=0}createLevel(t){this.player=new n([this.width/2,this.height-50]),this.mouse_x=this.width/2,this.mouse_y=0,document.addEventListener("mousemove",(t=>{this.mouse_x=t.x,this.mouse_y=t.y})),1===t&&(this.enemyships.push(new r([.12*this.width,-100],6,this,!0)),this.drops.push(new p([.64*this.width,-4200],0)))}initializeStars(t){for(let e=0;e<15;e++){let e,i=Math.random()*(this.width-10);e=2*Math.random()>1.7?4*Math.random()+1:2*Math.random()+1;let h=new s(i,1*Math.random()+.2+e/8,e);h.posY=Math.random()*this.height-10,this.stars.push(h),t.shadowBlur=0}}animate(){let t=this.context;if(t.fillStyle="black",t.fillRect(0,0,this.width,this.height),this.createStars(t),1===this.enemiesdefeated&&this.player.levelup(1),key.isPressed(" ")){let t=this.player.shootProjectile(this.mouse_x,this.mouse_y,2);t&&(this.projectiles=this.projectiles.concat(t))}else this.player.shootProjectile(null,null,-1);this.updateAll(t),this.player.animate(this.context,this.mouse_x,this.mouse_y),this.checkCollisions(t),this.updateUI(t),requestAnimationFrame(this.animate.bind(this))}createStars(t){let e=0;for(let t=0;t<3;t++)70*Math.random()<=1&&e++;for(let i=0;i<e;i++){let e,i=Math.random()*(this.width-10);e=2*Math.random()>1.7?4*Math.random()+1:2*Math.random()+1;let h=new s(i,1*Math.random()+.2+e/8,e);this.stars.push(h),t.shadowBlur=0}}updateAll(t){this.extras.forEach((t=>{t.animate(this.context)}));for(let t=this.extras.length-1;t>=0;t--)this.extras[t].duration<=0&&setTimeout((()=>{this.extras.splice(t,1)}),0);this.lasers.forEach((t=>{t.animate(this.context)}));for(let t=this.lasers.length-1;t>=0;t--)this.lasers[t].duration<=0&&setTimeout((()=>{this.lasers.splice(t,1)}),0);this.updateSomething(t,this.stars),this.updateSomething(t,this.enemyships),this.projectiles.forEach((t=>{t.animate(this.context)}));for(let t=this.projectiles.length-1;t>=0;t--)this.projectiles[t].outofBounds(this.width,this.height)&&setTimeout((()=>{this.projectiles.splice(t,1)}),0);this.enemyprojectiles.forEach((t=>{t.animate(this.context)}));for(let t=this.enemyprojectiles.length-1;t>=0;t--)this.enemyprojectiles[t].outofBounds(this.width,this.height)&&setTimeout((()=>{this.enemyprojectiles.splice(t,1)}),0);this.drops.forEach((t=>{t.animate(this.context)}));for(let t=this.drops.length-1;t>=0;t--)this.drops[t].outofBounds(this.width,this.height)&&setTimeout((()=>{this.drops.splice(t,1)}),0)}updateSomething(t,s){for(let t=s.length-1;t>=0;t--)s[t].posY>this.height+50&&s.splice(t,1);s.forEach((s=>{s.animate(t)}))}checkCollisions(t){for(let t=this.enemyships.length-1;t>=0;t--)for(let s=this.projectiles.length-1;s>=0;s--)if(this.collidesWith(this.enemyships[t],this.projectiles[s])&&(this.enemyships[t].health-=this.projectiles[s].damage,setTimeout((()=>{this.projectiles.splice(s,1)}),0),this.enemyships[t].health<=0)){this.handleEnemyDefeat(this.enemyships[t]),setTimeout((()=>{this.enemyships.splice(t,1)}),0);break}for(let t=this.enemyprojectiles.length-1;t>=0;t--)this.collidesWith(this.player,this.enemyprojectiles[t])&&(this.player.dealDamage(this.enemyprojectiles[t].damage),setTimeout((()=>{this.enemyprojectiles.splice(t,1)}),0));for(let t=this.lasers.length-1;t>=0;t--)this.collidesWith(this.player,this.lasers[t])&&this.player.dealDamage(this.lasers[t].damage);for(let t=this.enemyships.length-1;t>=0;t--)if(this.collidesWith(this.player,this.enemyships[t])){this.player.dealDamage(Math.max(this.enemyships[t].damage,50));let s=this.normalizedVector(this.player,this.enemyships[t]);this.player.collided=20,this.player.velX=13*s[0],this.player.velY=13*s[1],this.enemyships[t].boss||(this.enemyships[t].health-=25,this.enemyships[t].collided=13,this.enemyships[t].velX=-13*s[0],this.enemyships[t].velY=-13*s[1]),this.enemyships[t].health<=0&&(this.handleEnemyDefeat(this.enemyships[t]),setTimeout((()=>{this.enemyships.splice(t,1)}),0))}for(let t=this.drops.length-1;t>=0;t--)if(this.collidesWith(this.player,this.drops[t])){switch(this.drops[t].type){case 0:this.player.health=Math.min(this.player.health+500,this.player.basehealth,this.player.health+this.player.basehealth/2);break;case 1:this.player.projectileType=2,this.player.shotsLeft=50;break;case 2:this.gold+=1e3*Math.floor(6*Math.random())+5e3;break;case 3:this.player.projectileType=3,this.player.shotsLeft=50;break;case 4:this.player.shield=this.player.baseshield}setTimeout((()=>{this.drops.splice(t,1)}),0)}}collidesWith(t,s){return(t.leftX()>=s.leftX()&&t.leftX()<=s.rightX()||t.rightX()>=s.leftX()&&t.rightX()<=s.rightX())&&(t.upY()>=s.upY()&&t.upY()<=s.downY()||t.downY()>=s.upY()&&t.downY()<=s.downY())||(s.leftX()>=t.leftX()&&s.leftX()<=t.rightX()||s.rightX()>=t.leftX()&&s.rightX()<=t.rightX())&&(s.upY()>=t.upY()&&s.upY()<=t.downY()||s.downY()>=t.upY()&&s.downY()<=t.downY())}normalizedVector(t,s){let e=t.realX(),i=t.realY(),h=e-s.realX(),o=i-s.realY();return length=Math.sqrt(h*h+o*o),[h/length,o/length]}updateUI(t){t.fillStyle="#ff4040",t.strokeStyle="black",t.textBaseline="top",t.font="10pt Verdana";let s=`Health: ${Math.floor(this.player.health)} / ${Math.floor(this.player.basehealth)}`;t.textAlign="left",t.fillText(s,20,this.height-50),t.fillStyle="#00EFF6";let e=`Shield: ${Math.floor(this.player.shield)} / ${Math.floor(this.player.baseshield)}`;t.fillText(e,20,this.height-75);let i=`Gold: ${Math.floor(this.gold)}`;t.textAlign="right",t.fillStyle="gold",t.fillText(i,this.width-20,this.height-50),t.textAlign="start"}handleEnemyDefeat(t){this.enemiesdefeated++,this.gold+=t.gold;let s=t.value;if(t.boss){this.extras=[];for(let s=t.dependencies.length-1;s>=0;s--){let e=t.dependencies[s];if(e instanceof r)for(let t=this.enemyships.length-1;t>=0;t--)this.enemyships[t]===e&&setTimeout((()=>{this.enemyships.splice(t,1),e.health=0}),0)}}let e=Math.floor(100*Math.random()*s);if(e>96.3)this.drops.push(new p([t.posX,t.posY],3));else if(e>65){let s=10*Math.random();s<2.5?this.drops.push(new p([t.posX,t.posY],1)):s<5?this.drops.push(new p([t.posX,t.posY],2)):s<7?this.drops.push(new p([t.posX,t.posY],4)):this.drops.push(new p([t.posX,t.posY],0))}}}class m{constructor(t,s,e,i,h,o,a,r,l,n,d){this.x=t,this.y=s,this.z=e,this.radius=i,this.r=255,this.g=255,this.b=255,this.id=h,this.centerX=o,this.centerY=a,this.focalLength=r,this.starX_dir=l,this.starY_dir=n,this.starY_dir,this.innerWidth=d}update(t){this.starX=(this.x-this.centerX)*(this.focalLength/this.z),this.starX+=this.centerX,this.starY=(this.y-this.centerY)*(this.focalLength/this.z),this.starY+=this.centerY,this.starRadius=this.radius*(this.focalLength/this.z),this.starX+=this.starX_dir,this.starY+=this.starY_dir,this.z+=-10,this.z<=0&&(this.z=parseInt(innerWidth)),this.draw(t)}draw(t){t.beginPath(),t.shadowColor=`rgb(${this.r}, ${this.g}, ${this.b})`,t.shadowBlur=2*this.starRadius,t.fillStyle=`rgb(${this.r}, ${this.g}, ${this.b})`,t.arc(this.starX,this.starY,this.starRadius,2*Math.PI,!1),t.fill(),t.closePath(),t.shadowBlur=0}}class g{constructor(t){this.canvas=t,this.context=t.getContext("2d"),this.innerWidth=window.innerWidth-20,this.innerHeight=window.innerHeight-20,this.radius=1,this.starsIndex=0,this.stars=[],this.centerX=innerWidth/2,this.centerY=innerHeight/2,this.focalLength=100,this.starRadius=null,this.starX=null,this.starY=null,this.numStars=500,this.mouse={},this.starX_dir=0,this.starY_dir=0,this.continue=!0,this.initiateEnd=!1,t.width=this.innerWidth,t.height=this.innerHeight,this.start()}start(){for(let t=0;t<this.numStars;t++){let t=Math.random()*this.innerWidth,s=Math.random()*this.innerHeight,e=Math.random()*this.innerWidth;this.starsIndex++;let i=new m(t,s,e,this.radius,this.starsIndex,this.centerX,this.centerY,this.focalLength,this.starX_dir,this.starY_dir,this.innerWidth);this.stars[this.starsIndex]=i}this.animate()}animate(){if(this.continue){let t=this.context;requestAnimationFrame(this.animate.bind(this)),t.fillStyle="black",t.fillRect(0,0,this.innerWidth,this.innerHeight);for(let s=1;s<500;s++)this.stars[s].focalLength=this.focalLength,this.stars[s].update(t),this.initiateEnd&&this.focalLength>500&&(this.stars[s].r-=1,this.stars[s].g-=1,this.stars[s].b-=1);this.initiateEnd&&(this.focalLength<1200?this.focalLength=this.focalLength+2:this.continue=!1)}else this.stars=null}}class u{constructor(t){this.canvas=t,this.canvas.width=innerWidth,this.canvas.height=innerHeight,this.context=this.canvas.getContext("2d"),this.state="new-game",this.level=1,this.width=this.canvas.width,this.height=this.canvas.height,this.loading_screen()}loading_screen(){const t=document.querySelector("#loading");document.querySelector("#new-game-butt").addEventListener("click",(()=>{t.style.display="none",this.starField.initiateEnd=!0,this.starField=null,setTimeout((()=>{this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.start()}),10700)})),this.starField=new g(this.canvas)}start(){this.background=new c(this.width,this.height,this.level,this.context),this.state="fighting",this.background.animate()}}document.addEventListener("DOMContentLoaded",(function(t){console.log("DOM fully loaded and parsed");const s=document.getElementById("game-canvas");new u(s)}))})();