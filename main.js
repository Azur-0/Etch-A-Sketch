const container = document.querySelector('#container');
const leftSideDiv = document.querySelector('#left-side');
const gridSizeText = document.querySelector('#grid-size-text');

const sizeInput = document.querySelector('#grid-size-input');  
let size = sizeInput.value;
gridSizeText.textContent = `${size}x${size}`;

const rainbowButton = document.querySelector('#rainbow-button');
let rainbowMode = false;

let pixels;
let gridLines = true;

const body = document.body;


leftSideDiv.addEventListener('mouseup', removeHoverFill);
container.addEventListener('mouseup', disableDrawingAfterLeavingCanvas);
body.addEventListener('mouseup', disableDrawingAfterLeavingCanvas);
body.addEventListener('mousedown', fillOnHover);

function disableDrawingAfterLeavingCanvas(e) {
    if (e.srcElement.localName == 'body' || e.srcElement.id == 'container'){
        removeHoverFill();
    }
}

const colorInput = document.querySelector('#color-pick');
let color = colorInput.value;

colorInput.addEventListener('input', function(e) {
    color = this.value;
})

function fillContainer() {    
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for(i = 0; i < size*size; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-pixel');
        container.appendChild(gridElement);
    }

    pixels = document.querySelectorAll('.grid-pixel');
    if(gridLines){
        pixels.forEach(pixel => {
            pixel.style.borderTop = '1px solid rgb(187, 186, 186)';
            pixel.style.borderLeft = '1px solid rgb(187, 186, 186)';        
        });
    }

    mouseDownDraw();
    if(!eraserMode) {
        rainbowToggle();
    }
    
}

function mouseDownDraw() {
    pixels.forEach(pixel => {        
        pixel.addEventListener('mousedown', function() {
            this.style.backgroundColor = color;
            fillOnHover();
        });
        pixel.addEventListener('mouseup', removeHoverFill);
    })
}

function removeHoverFill() {
    pixels.forEach(pixel => {
        pixel.removeEventListener('mouseover', fillColors);
    }); 
}

function fillOnHover() {        
    pixels.forEach(pixel => {
        pixel.addEventListener('mouseover', fillColors);
    });        
};
    
function fillColors() {
    this.style.backgroundColor = color;
}


let rainbowColorsArray = ['red', 'orange', 'yellow', 
                     'lightgreen', 'lightskyblue', 'blue', 'purple'];
let rainbowArrayItem = 1;

function rainbowColors() {
    color = rainbowColorsArray[0];
    rainbowArrayItem = 1;
    pixels.forEach(pixel => {
        pixel.addEventListener('mouseover', rainbowColorsListener);
    });
}

function rainbowColorsListener() {
    color = rainbowColorsArray[rainbowArrayItem];            
    rainbowArrayItem++;
    if(rainbowArrayItem == 7) {
        rainbowArrayItem = 0;
    }
}

function rainbowToggle() {
    if (rainbowMode && eraserMode) {
        rainbowColors();
        eraserMode = false;
        rainbowButton.style.backgroundColor = 'rgb(75, 60, 172)';
        rainbowButton.style.color = 'white';
        eraser.style.backgroundColor = 'transparent';
        eraser.style.color = 'rgb(75, 60, 172)';
    }
    else if (rainbowMode) {
        rainbowColors();
        rainbowButton.style.backgroundColor = 'rgb(75, 60, 172)';
        rainbowButton.style.color = 'white';
    }
    else {
        rainbowButton.style.backgroundColor = 'transparent';
        rainbowButton.style.color = 'rgb(75, 60, 172)';
        color = colorInput.value;
        pixels.forEach(pixel => {
            pixel.removeEventListener('mouseover', rainbowColorsListener);
        }); 
    }
}

rainbowButton.addEventListener('click', function() {
    rainbowMode = !rainbowMode;
    rainbowToggle();
});

const eraser = document.querySelector('#eraser');
let eraserMode = false;

eraser.addEventListener('click', activateEraser);

function activateEraser() {
    eraserMode = !eraserMode;
    if (eraserMode && rainbowMode) {
        pixels.forEach(pixel => {
            pixel.removeEventListener('mouseover', rainbowColorsListener);
        });
        rainbowButton.style.backgroundColor = 'transparent';
        rainbowButton.style.color = 'rgb(75, 60, 172)';
        eraser.style.backgroundColor = 'rgb(75, 60, 172)';
        eraser.style.color = 'white';
        rainbowMode = false;
        color = 'white';
    }
    else if (eraserMode) {
        color = 'white';
        eraser.style.backgroundColor = 'rgb(75, 60, 172)';
        eraser.style.color = 'white';
    }
    else if (rainbowMode) {
        rainbowColors();
        eraser.style.backgroundColor = 'transparent';
        eraser.style.color = 'rgb(75, 60, 172)';
    }
    else {
        eraser.style.backgroundColor = 'transparent';
        eraser.style.color = 'rgb(75, 60, 172)';
        color = colorInput.value;
    }
}


function changeGridSize() {
    if(size != sizeInput.value){
        container.innerHTML = '';
        size = sizeInput.value;
        gridSizeText.textContent = `${size}x${size}`;
        fillContainer();
    }
}

function changeGridSizeText() {
    gridSizeText.textContent = `${sizeInput.value}x${sizeInput.value}`;
}

sizeInput.addEventListener('input', changeGridSizeText)
sizeInput.addEventListener('mouseup', changeGridSize);

fillContainer();

function toggleGridLines() {
    pixels.forEach(pixel => {

        if(gridLines){
            pixel.style.border = '0px';  
        }
        else {
            pixel.style.borderLeft = '1px solid rgb(187, 186, 186)';
            pixel.style.borderTop = '1px solid rgb(187, 186, 186)';
        }
    });
    
    if(gridLines) {        
        container.style.border = '1px solid rgb(187, 186, 186)';
        gridLinesButton.style.backgroundColor = 'rgb(75, 60, 172)';
        gridLinesButton.style.color = 'white';
    }
    else {
        container.style.border = '0px';
        container.style.borderRight  = '1px solid rgb(187, 186, 186)';
        container.style.borderBottom = '1px solid rgb(187, 186, 186)';
        gridLinesButton.style.backgroundColor = 'transparent';
        gridLinesButton.style.color = 'rgb(75, 60, 172)';
    }
    
    gridLines = !gridLines;
}

const gridLinesButton = document.querySelector('#toggle-border');
gridLinesButton.addEventListener('click', toggleGridLines);

