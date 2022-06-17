/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background.js":
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Background)\n/* harmony export */ });\n/* harmony import */ var _star__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./star */ \"./src/star.js\");\n\n//background.js\n\n\nclass Background{\n    constructor(width, height)\n    {\n        this.width = width;\n        this.height = height;\n        this.stars = [];\n    };\n\n    animate(context){\n        context.fillStyle = \"black\";\n        context.fillRect(0, 0, this.width, this.height);\n        this.createStars(context);\n        this.updateStars(context);\n    }\n\n    createStars(context){\n        let numStars = 0;\n        for(let i=0; i<3; i++)\n        {\n            if(Math.random()*70 <= 1)\n            {\n                numStars++;\n            }\n        }\n        for(let j = 0; j< numStars; j++)\n        {\n            let posx = Math.random() * (this.width-10);\n            //let posy = 0;\n            \n            let size;\n            if (Math.random()*2 > 1.7)\n            {\n                size = Math.random()* 4 + 1;\n            }\n            else\n                size = Math.random()*2 + 1;\n\n            \n            let mystar = new _star__WEBPACK_IMPORTED_MODULE_0__[\"default\"](posx, Math.random()*1 + 0.2 + (size / (8)), size);\n            this.stars.push(mystar);\n            context.shadowBlur = 0;\n            // context.filter = \"none\";\n        }\n        \n    }\n\n    updateStars(context){\n        for(let i = 0; i < this.stars.length; i++)\n        {\n            this.stars[i].move();\n            if(this.stars[i].posY > this.height + 10)\n            {\n                this.stars.splice(i, 1);\n                i--;\n            }\n\n        }\n        this.stars.forEach( (star) => {\n            star.draw(context);\n        })\n    }\n}\n\n\n//# sourceURL=webpack:///./src/background.js?");

/***/ }),

/***/ "./src/circleDamageProjectile.js":
/*!***************************************!*\
  !*** ./src/circleDamageProjectile.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CircleDamageProjectile)\n/* harmony export */ });\n/* harmony import */ var _projectile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectile */ \"./src/projectile.js\");\n\n\nclass CircleDamageProjectile extends _projectile__WEBPACK_IMPORTED_MODULE_0__[\"default\"]{\n    constructor(position, velocity, radius, owner, color, damage, blur=0)\n    {\n        super(position, velocity, radius, true, owner, color);\n        this.blur = blur;\n        this.damage = damage;\n\n    }\n\n    draw(context)\n    {\n        function setShadow(ctx, color, ox, oy, blur) {\n            ctx.shadowColor = color;\n            ctx.shadowOffsetX = ox;\n            ctx.shadowOffsetY = oy;\n            ctx.shadowBlur = blur;\n        }\n   \n        context.beginPath();\n        context.fillStyle = this.color;\n        setShadow(context, this.color, 0, 0, this.blur);\n        context.arc(this.posX, this.posY, this.size, 0, 2 * Math.PI, false);\n        context.fill();\n        context.closePath();\n\n        context.shadowBlur = 0;\n\n        // context.save();\n        // context.shadowColor = this.color;\n        // context.shadowBlur = 9;\n        // context.fillColor = this.color;\n        // // context.translate(this.posX+this.width/2, this.posY+this.size/2);\n        // // context.rotate(this.degrees*Math.PI/180.0);\n        // // context.translate(-this.posX-this.width/2, -this.posY-this.size/2);\n        // context.fillRect(this.posX, this.posY, 4, 32);\n        // context.restore();\n\n        // context.shadowBlur = 0;\n\n    }\n    \n}\n\n//# sourceURL=webpack:///./src/circleDamageProjectile.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _background__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./background */ \"./src/background.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n// //game.js\n\n\n\nclass Game\n{\n    constructor(canvas){\n        this.canvas = canvas;\n        this.context = canvas.getContext('2d');\n        this.canvas.width = innerWidth;\n        this.canvas.height = innerHeight;\n        this.state = \"new-game\";   \n\n        this.projectiles = [];\n        this.enemies = [];\n        this.start();//initially new game every time... loading functionality later\n \n    }\n\n    \n\n    start()\n    {\n        // this.level = new \n        this.background = new _background__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.canvas.width, this.canvas.height);\n        this.state = \"fighting\";\n        this.player = new _player__WEBPACK_IMPORTED_MODULE_1__[\"default\"]([this.canvas.width / 2, this.canvas.height - 50]);\n        this.mouse_x = -1;\n        this.mouse_y = -1;\n        let handleMousemove = (event) => {\n            this.mouse_x = event.x;\n            this.mouse_y = event.y;\n        };\n          \n        //note: as explained in Player#animate, movement and other spontaneous events cannot be added here\n        document.addEventListener('mousemove', handleMousemove);\n\n             // draw the laser \n        this.animate();\n\n        \n    }\n\n    animate(){\n        //be cognizant of the order in which you animate things... layering!\n        this.background.animate(this.context);\n\n        this.player.animate(this.context, this.mouse_x, this.mouse_y);\n    \n\n        if(key.isPressed(\" \"))\n        {\n            let proj = this.player.shootProjectile(this.mouse_x, this.mouse_y, 1);\n            if (proj)\n            {\n                this.projectiles = this.projectiles.concat(proj);\n            }\n        }\n\n        this.projectiles.forEach((proj) => {\n            proj.animate(this.context)\n        });\n\n        for(let i = 0; i < this.projectiles.length; i++)\n        {\n            if(this.projectiles[i].outofBounds(this.canvas.width, this.canvas.height))\n            {\n                this.projectiles.splice(i, 1);\n                i--;\n            }\n        }\n\n        requestAnimationFrame(this.animate.bind(this));\n    }\n\n    allObjectsNoInfo()\n    {\n        return ([[this.background], this.projectiles]);\n    }\n\n    allObjectsMouseInfo()\n    {\n        return ([[this.player], this.enemies]);\n    }\n\n}\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n//index.js\n\n\ndocument.addEventListener('DOMContentLoaded', function(event) {\n    console.log('DOM fully loaded and parsed');\n    const canvas = document.getElementById('game-canvas');\n    const gam = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas);\n});\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/laserDamageProjectile.js":
/*!**************************************!*\
  !*** ./src/laserDamageProjectile.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ LaserDamageProjectile)\n/* harmony export */ });\n/* harmony import */ var _projectile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectile */ \"./src/projectile.js\");\n\n\nclass LaserDamageProjectile extends _projectile__WEBPACK_IMPORTED_MODULE_0__[\"default\"]{\n    constructor(position, velocity, length, owner, color, damage, blur=0, width=2)\n    {\n        super(position, velocity, length, true, owner, color);\n        this.blur = blur;\n        this.damage = damage;\n        this.width = width;\n        //this.degrees = IMPLEMENT THIS\n        //this.size refers to length\n    }\n\n    draw(context)\n    {\n        function setShadow(ctx, color, ox, oy, blur) {\n            ctx.shadowColor = color;\n            ctx.shadowOffsetX = ox;\n            ctx.shadowOffsetY = oy;\n            ctx.shadowBlur = blur;\n        }\n   \n        context.beginPath();\n        context.shadowColor = this.color;\n        setShadow(context, this.color, 0, 0, this.blur);\n        context.fillStyle = this.color;\n        // context.translate(this.posX+this.width/2, this.posY+this.size/2);\n        // context.rotate(this.degrees*Math.PI/180.0);\n        // context.translate(-this.posX-this.width/2, -this.posY-this.size/2);\n        context.fillRect(this.posX, this.posY, this.width, this.size);\n        context.closePath();\n\n        context.shadowBlur = 0;\n    }\n    \n}\n\n//# sourceURL=webpack:///./src/laserDamageProjectile.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _circleDamageProjectile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./circleDamageProjectile */ \"./src/circleDamageProjectile.js\");\n/* harmony import */ var _laserDamageProjectile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./laserDamageProjectile */ \"./src/laserDamageProjectile.js\");\nlet SAFEFRAMES = 5;\n\n\n\n\nclass Player {\n    constructor(position, context) //more later, type?\n    {\n        this.posX = position[0];\n        this.posY = position[1];\n        this.velX = 0;\n        this.velY = 0;\n\n        this.canvasX = this.posX * 2;\n        this.canvasY = this.posY + 50;\n\n        const image = new Image();\n        image.src  = '../images/playership1.png';\n        image.onload = () => {\n            this.image = image;\n            // const SCALE = 1;\n            this.width = image.width;\n            this.height = image.height;\n        }\n\n        this.movedX = 0;\n        this.movedY = 0;\n        this.degrees = 0;\n        // this.initialThrottleY = 0;\n\n        // this.color = \"red\";\n        this.normalVector = [0,-1];\n        this.shootTimer = 0;\n    }\n\n    draw(context, mouse_x, mouse_y)\n    {\n        if (this.image)\n        {\n            this.updateAngleAndNormalizedVector(mouse_x, mouse_y);\n            // console.log(this.degrees);\n            // console.log(this.normalVector);\n\n            context.save();\n            context.shadowColor = \"red\";\n            context.shadowBlur = 9;\n            context.translate(this.posX+this.width/2, this.posY+this.height/2);\n            context.rotate(this.degrees*Math.PI/180.0);\n            context.translate(-this.posX-this.width/2, -this.posY-this.height/2);\n            context.drawImage(this.image, this.posX, this.posY, this.width, this.height);\n            context.restore();\n        }\n        else\n        {\n            console.error(\"Ship not loaded\");\n        }\n    }\n\n    animate(context, mouse_x, mouse_y)\n    {\n        //BINDING KEYS DOES NOT WORK\n        //It creates a lag between whether it determines a key is being tapped or held (~1 second)\n        //which makes movement very, very slow and clunky\n        //so have to do it this way instead. Neither keymaster.js's bind nor built-in events work\n        console.log(this.posX, this.posY);\n        if(key.isPressed(\"up\") || key.isPressed(\"w\"))\n        {\n            this.power(\"up\");\n        }\n        if(key.isPressed(\"right\") || key.isPressed(\"d\"))\n        {\n            this.power(\"right\");\n        }\n        if(key.isPressed(\"down\")|| key.isPressed(\"s\"))\n        {\n            this.power(\"down\");\n        }\n        if(key.isPressed(\"left\")|| key.isPressed(\"a\"))\n        {\n            this.power(\"left\");\n        }\n        \n        this.move();\n        this.applyGravity();\n        if(mouse_x === -1 && this.mouse_y === -1)\n            this.draw(context, this.posX, 0);\n        else \n            this.draw(context, mouse_x, mouse_y);\n    }\n\n    move()\n    {\n        this.posX += this.velX;\n        if(this.posX<50)\n        {\n            this.posX = 50;\n        }\n        if(this.posX>this.canvasX - 50)\n        {\n            this.posX = this.canvasX - 50;\n        }\n        this.posY += this.velY;\n        if(this.posY<50)\n        {\n            this.posY = 50;\n        }\n        if(this.posY>this.canvasY - 50)\n        {\n            this.posY = this.canvasY - 50;\n        }\n    }\n\n    // bindKeys()\n    // {\n    //     let player = this;\n    //     key('up', function(){ player.power(\"up\")});\n    //     key('left', function(){ player.power(\"left\")});\n    //     key('down', function(){ player.power(\"down\") });\n    //     key('right', function(){ player.power(\"right\")});\n\n\n    //     // key('space', function(){ ship.fireBullet() });\n\n    // }\n\n    power(direction)\n    {\n        const MAXSPEED = 10;\n        const MINSPEED = MAXSPEED * -1; //can also use Math.abs()\n        switch(direction)\n        {\n            case \"up\":\n                if(this.velY>-4)\n                {\n                    this.velY = -4;\n                }\n                else\n                {\n                this.velY -= 0.45;\n                }\n                if(this.velY < MINSPEED)\n                {\n                    this.velY = MINSPEED;\n                }\n                this.movedY = SAFEFRAMES;\n                break;\n            case \"down\":\n                if(this.velY<4)\n                {\n                    this.velY = 4;\n                }\n                else\n                {\n                    this.velY += 0.45;\n                }\n                if(this.velY > MAXSPEED)\n                {\n                    this.velY = MAXSPEED;\n                }\n                this.movedY = SAFEFRAMES;\n                break;\n            case \"right\":\n                if(this.velX<4)\n                {\n                    this.velX = 4;\n                }\n                else\n                {\n                this.velX += 0.45;\n                }\n                if(this.velX > MAXSPEED)\n                {\n                    this.velX = MAXSPEED;\n                }\n                this.movedX = SAFEFRAMES;\n                break;\n            case \"left\":\n                if(this.velX>-4)\n                {\n                    this.velX = -4;\n                }\n                else\n                {\n                this.velX -= 0.45;\n                }\n                if(this.velX < MINSPEED)\n                {\n                    this.velX = MINSPEED;\n                }\n                this.movedX = SAFEFRAMES;\n                break;\n        }\n    }\n    \n    applyGravity()\n    {\n        if(this.movedX <= 0)\n        {\n            let x = Math.abs(this.velX);\n            if (x < 0.7)\n            {\n                this.velX = 0;\n            }\n            else if (x < 1.3)\n            {\n                this.velX = this.velX * 0.4;\n            }\n            else if (x < 2.5)\n            {\n                this.velX = this.velX * 0.6;\n            }\n            else if (x < 5)\n            {\n                this.velX = this.velX * 0.7;\n            }\n            else\n            {\n                this.velX = this.velX * 0.8;\n            }\n\n        }\n        else\n        {\n            this.movedX -= 1;\n        }\n        if(this.movedY <= 0)\n        {\n            let y = Math.abs(this.velY);\n            if (y < 0.7)\n            {\n                this.velY = 0;\n            }\n            else if (y < 1.3)\n            {\n                this.velY = this.velY * 0.4;\n            }\n            else if (y < 2.5)\n            {\n                this.velY = this.velY * 0.6;\n            }\n            else if (y < 5)\n            {\n                this.velY = this.velY * 0.7;\n            }\n            else\n            {\n                this.velY = this.velY * 0.8;\n            }\n        }\n        else\n        {\n            this.movedY -= 1;\n        }\n    }\n\n    shootProjectile(mouse_x, mouse_y, type = 0)\n    {\n        let mx;\n        let my;\n        if(mouse_x === -1 && mouse_y === -1)\n        {\n            mx = this.realX();\n            my = 0;\n        }\n        else\n        {\n            mx = mouse_x;\n            my = mouse_y;\n        }\n        this.updateAngleAndNormalizedVector(mouse_x, mouse_y);\n        switch(type)\n        {\n            case 0: //red ball center\n                let speed = 10;\n                let cooldown = 15;\n                if(this.shootTimer === 0)\n                {\n                    this.shootTimer = cooldown;\n                    let proj = new _circleDamageProjectile__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([this.realX(), this.realY()], [speed * this.normalVector[0], speed*this.normalVector[1]], 2, 1, \"red\", 25, 4);\n                    return [proj];\n                }\n                else\n                {\n                    this.shootTimer -= 1;\n                    return undefined;\n                }\n                break;\n            case 1: //primitive lasers center\n                let speed1 = 12;\n                let cooldown1 = 12;\n                if(this.shootTimer === 0)\n                {\n                    this.shootTimer = cooldown1;\n                    let proj = new _laserDamageProjectile__WEBPACK_IMPORTED_MODULE_1__[\"default\"]([this.realX(), this.realY()], [speed1 * this.normalVector[0], speed1*this.normalVector[1]], 20, 1, \"red\", 25, 4);\n                    return [proj];\n                }\n                else\n                {\n                    this.shootTimer -= 1;\n                    return undefined;\n                }\n                break;\n            case 2: //basic lasers double\n                //remember to return an array!\n                break;\n            default:\n                console.error(\"unknown projectile type\");\n        }\n    }\n\n    updateAngleAndNormalizedVector(mouse_x, mouse_y)\n    {\n        let distX = mouse_x - this.realX();\n        let distY = mouse_y - this.realY();\n        if(distX === 0)\n        {\n            if(this.realY() > mouse_y)\n            {\n                this.degrees = 180;\n            }\n            else\n                this.degrees = 0;\n        }\n        else if (distY === 0)\n        {\n            if(distX > 0)\n            {\n                this.degrees = 90;\n            }\n            else\n            {\n                this.degrees = 270;\n            }\n        }\n        else\n        {//beware y is on top not bototm\n            if(distX > 0)\n            {\n                this.degrees = 90 + ((Math.atan(distY / distX)) * 180.0 / Math.PI);\n            }\n            else\n            {\n                this.degrees = 270 + ((Math.atan(distY / distX)) * 180.0 / Math.PI);\n            }\n        }\n\n        length = Math.sqrt(distX * distX + distY * distY);\n        // this.normalVector = [Math.abs(distX) / length, Math.abs(distY) / length];\n        this.normalVector = [distX / length, distY / length];\n    }\n\n    realX(){ //INCOMPLETE - NEEDS TO FACTOR IN ANGLE!!\n        return this.posX + this.width / 2;\n    }\n\n    realY(){ //INCOMPLETE - NEEDS TO FACTOR IN ANGLE!!\n        return this.posY + this.height / 2;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/projectile.js":
/*!***************************!*\
  !*** ./src/projectile.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Projectile)\n/* harmony export */ });\n//projectile.js\n//just pass context around into draw and animate specifically\n\nclass Projectile {\n    constructor(position, velocity, size, collidable, owner, color)//color optional\n    {\n        this.posX = position[0];\n        this.posY = position[1];\n        this.velX = velocity[0];\n        this.velY = velocity[1];\n        this.size = size;\n        this.collidable = collidable;\n        this.color = color;\n        this.owner = owner; //1 ally, 2 enemy, 3 neutral\n    }\n\n    draw()\n    {\n        console.error(\"Projectile#draw() should be overridden\");\n    }\n\n    animate(context)\n    {\n        this.move();\n        this.draw(context);\n    }\n\n    move() //default move, no acceleration. projectiles, stars, some enemy ships, drops, etc.\n    {\n        this.posX += this.velX;\n        this.posY += this.velY;\n    }\n    \n    outofBounds(width, height)\n    {\n        return (this.posX < 0 || this.posY < 0 || this.posX >= width || this.posY >= height)\n    }\n\n}\n\n\n//# sourceURL=webpack:///./src/projectile.js?");

/***/ }),

/***/ "./src/star.js":
/*!*********************!*\
  !*** ./src/star.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Star)\n/* harmony export */ });\n/* harmony import */ var _projectile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectile */ \"./src/projectile.js\");\n\n\nclass Star extends _projectile__WEBPACK_IMPORTED_MODULE_0__[\"default\"]{\n    constructor(positionX, velocityY, size, color=\"white\")\n    {\n        super([positionX, 20], [0, velocityY], size, false, 0, color);\n        this.brightness = `brightness(${Math.random()*50 + 70}%)`;\n    }\n    \n\n    draw(context)\n    {\n        let that = this;\n        function setShadow(ctx, color, ox, oy, blur) {\n            ctx.shadowColor = color;\n            ctx.shadowOffsetX = ox;\n            ctx.shadowOffsetY = oy;\n            ctx.shadowBlur = blur;\n            // ctx.filter = that.brightness;\n          }\n    \n        context.beginPath();\n        context.fillStyle = this.color;\n        setShadow(context, this.color, 0, 0, this.size*2);\n        context.arc(this.posX, this.posY, this.size, 0, 2 * Math.PI, false);\n        context.fill();\n        context.closePath();\n\n\n    }\n}\n\n\n//# sourceURL=webpack:///./src/star.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;