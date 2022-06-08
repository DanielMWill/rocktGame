// Keylistner
let KEY_SPACE = false; //32
let KEY_UP = false; //38
let KEY_DOWN = false; //40
let canvas;
let ctx;
let backgroundImage = new Image();

// Einbinden der Rakete
let rocket = {
    x: 50,
    y: 100,
    width: 100,
    height: 80,
    src: 'img/rocket.png'
};

// Einbinden des UFO --> Ufo Container ein sog. Array
let ufos = [];
let shots = [];

document.onkeydown = function(e) {
    if (e.keyCode == 32) { // wird die Leertaste gedrückt
        KEY_SPACE = true;
    }

    if (e.keyCode == 38) { // wird die UP gedrückt
        KEY_UP = true;
    }

    if (e.keyCode == 40) { // wird die DOWN gedrückt
        KEY_DOWN = true;
    }
}


document.onkeyup = function(e) {
    if (e.keyCode == 32) { // wird die Leertaste losgelassen
        KEY_SPACE = false;
    }


    if (e.keyCode == 38) { // wird die UP losgelassen
        KEY_UP = false;
    }


    if (e.keyCode == 40) { // wird die DOWN losgelassen
        KEY_DOWN = false;
    }
}

function startGame(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    loadImages();
    setInterval(update, 1000 / 25);
    setInterval(createUfos, 5000);
    setInterval(checkForCollision, 1000 / 25);
    setInterval(checkForShot, 1000 / 10);
    draw();
    // calculate
}

function checkForCollision(){
    ufos.forEach(function(ufo){
        if(rocket.x + rocket.width > ufo.x 
        && rocket.y + rocket.height > ufo.y
        && rocket.x < ufo.x
        && rocket.y < ufo.y + ufo.height
        ) {
            rocket.img.src = 'img/boom.png';
            console.log('Collision');
            ufos = ufos.filter(u => u != ufo);
            window.location.reload(false);
        }

        shots.forEach(function(shot){
            if ( shot.x + shot.width > ufo.x 
        && shot.y + shot.height > ufo.y
        && shot.x < ufo.x
        && shot.y < ufo.y + ufo.height
            ) {
                ufo.hit = true;
                ufo.img.src = 'img/boom.png';
                console.log('Collision');

                setTimeout(() => {
                    ufos = ufos.filter (u => u != ufo);
                }, 2000);
            }
        });

    });

}

function createUfos(){
    let ufo = {
        x: 800,
        y: Math.random() * 500, 
        width: 100,
        height: 50,
        src: 'img/ufo.png',
        img: new Image(),
    };
    // JSON Container

    ufo.img.src = ufo.src; // Ufo-Bild laden
    ufos.push(ufo);

}

function checkForShot(){
    if (KEY_SPACE) {
    let shot = {
        x: rocket.x + 110,
        y: rocket.y + 22,
        width: 20,
        height: 4,
        src: 'img/shot.png',
        img: new Image()
    };

    shot.img.src = shot.src; // Shoot-Bild laden
    shots.push(shot);

  }
}

function update (){
    if (KEY_UP){
        rocket.y -= 4;
    }

    if (KEY_DOWN){
        rocket.y += 4;
    }

    ufos.forEach(function(ufo){
        if (!ufo.hit){
         ufo.x -= 5;
        }
    });

    shots.forEach(function(shot){
        shot.x += 15;
    });
}

function loadImages(){
    backgroundImage.src = 'img/background.png';

    rocket.img = new Image();
    rocket.img.src = rocket.src;
}

function draw() {
    ctx.drawImage(backgroundImage, 0, 0);
    ctx.drawImage(rocket.img, rocket.x, rocket.y, rocket.width, rocket.height);

    ufos.forEach(function(ufo){
     ctx.drawImage(ufo.img, ufo.x, ufo.y, ufo.width, ufo.height);
    });

     shots.forEach(function(shot){
     ctx.drawImage(shot.img, shot.x, shot.y, shot.width, shot.height);
    });

    requestAnimationFrame(draw);
}