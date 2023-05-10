const container = document.querySelector('#container');
const gridSizeText = document.querySelector('#grid-size-text');

const sizeInput = document.querySelector('input');  
let size = sizeInput.value;
gridSizeText.textContent = `${size}x${size}`;

let pixels;

function fillContainer() {    
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for(i = 0; i < size*size; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-pixel');
        container.appendChild(gridElement);
    }

    pixels = document.querySelectorAll('.grid-pixel');    
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