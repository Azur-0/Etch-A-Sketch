const container = document.querySelector('#container');
const gridSizeText = document.querySelector('#grid-size-text');

const sizeInput = document.querySelector('input');  
let size = sizeInput.value;
gridSizeText.textContent = `${size}x${size}`;

let pixels;
let gridLines = true; 

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

    fillOnHover();
}


function fillOnHover() {
    pixels.forEach(pixel => {
        pixel.addEventListener('mouseover', function () {
            pixel.style.backgroundColor = 'black';
        });
    });
}


function changeGridSize() {
    container.innerHTML = '';
    size = sizeInput.value;
    gridSizeText.textContent = `${size}x${size}`;
    fillContainer();
}

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
    }
    else {
        container.style.border = '0px';
        container.style.borderRight  = '1px solid rgb(187, 186, 186)';
        container.style.borderBottom = '1px solid rgb(187, 186, 186)';
    }
    
    gridLines = !gridLines;
}

const borderButton = document.querySelector('#toggle-border');
borderButton.addEventListener('click', toggleGridLines);
