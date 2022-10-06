
//index.js
import Game from './game';

document.addEventListener('DOMContentLoaded', function(event) {
    console.log('DOM fully loaded and parsed');
    const canvas = document.getElementById('game-canvas');
    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.1.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
    const gam = new Game(canvas);
});

