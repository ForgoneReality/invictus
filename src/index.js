
//index.js
import Game from './game';

document.addEventListener('DOMContentLoaded', function(event) {
    console.log('DOM fully loaded and parsed');
    const canvas = document.getElementById('game-canvas');
    const gam = new Game(canvas);
});

