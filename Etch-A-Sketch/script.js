document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const resetButton = document.getElementById('reset-button');
    createGrid(16);

    function createGrid(size) {
        container.innerHTML = '';
        container.style.gridTemplateColumns = `repeat(${size},1fr)`;
        container.style.gridTemplateRows = `repeat(${size},1fr)`;

        for (let i = 0; i < size * size; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.addEventListener('mouseover', changeColor);
            container.appendChild(square);
        }
    }

    function changeColor(e) {
        const randomColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        e.target.style.backgroundColor = randomColor;
    }

    resetButton.addEventListener('click', () => {
        let size = prompt('Enter new grid size (max 100):');
        size = parseInt(size);
        if (size && size > 0 && size <= 100) {
            createGrid(size);
        } else {
            alert('Invalid size! Please enter a number between 1 and 100.');
        }
    });
});
