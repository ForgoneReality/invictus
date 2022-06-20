import StarField from "./starfield";

document.addEventListener('DOMContentLoaded', function(event) {
    console.log('DOM fully loaded and parsed');
    const canvas = document.getElementById('start-screen');

    const startscreen = new StarField(canvas);
});