document.addEventListener('DOMContentLoaded', () => {
    const character = document.getElementById('character');
    const gameContainer = document.getElementById('game-container');
    const colorButtons = document.getElementById('color-buttons');
    const colorItems = document.querySelectorAll('.color-item');
    const controls = document.getElementById('controls');
    let collectedColors = [];

    let characterPosition = { x: 0, y: 0 };

    function moveCharacter(x, y) {
        characterPosition.x += x;
        characterPosition.y += y;
        characterPosition.x = Math.max(0, Math.min(gameContainer.clientWidth - character.clientWidth, characterPosition.x));
        characterPosition.y = Math.max(0, Math.min(gameContainer.clientHeight - character.clientHeight, characterPosition.y));
        character.style.transform = `translate(${characterPosition.x}px, ${characterPosition.y}px)`;
        gameContainer.style.transform = `translate(${-characterPosition.x + window.innerWidth / 2 - character.clientWidth / 2}px, ${-characterPosition.y + window.innerHeight / 2 - character.clientHeight / 2}px)`;
        checkForCollisions();
    }

    function checkForCollisions() {
        colorItems.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const charRect = character.getBoundingClientRect();
            if (!(itemRect.right < charRect.left ||
                itemRect.left > charRect.right ||
                itemRect.bottom < charRect.top ||
                itemRect.top > charRect.bottom)) {
                collectColor(item);
            }
        });
    }

    function collectColor(item) {
        const color = item.style.backgroundColor;
        if (!collectedColors.includes(color)) {
            collectedColors.push(color);
            addColorButton(color);
        }
        item.remove();
    }

    function addColorButton(color) {
        const button = document.createElement('button');
        button.textContent = `Change to ${color}`;
        button.style.backgroundColor = color;
        button.addEventListener('click', () => {
            character.style.backgroundColor = color;
        });
        colorButtons.appendChild(button);
    }

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                moveCharacter(0, -10);
                break;
            case 'ArrowDown':
                moveCharacter(0, 10);
                break;
            case 'ArrowLeft':
                moveCharacter(-10, 0);
                break;
            case 'ArrowRight':
                moveCharacter(10, 0);
                break;
        }
    });

    controls.addEventListener('click', (e) => {
        switch (e.target.id) {
            case 'up':
                moveCharacter(0, -10);
                break;
            case 'down':
                moveCharacter(0, 10);
                break;
            case 'left':
                moveCharacter(-10, 0);
                break;
            case 'right':
                moveCharacter(10, 0);
                break;
        }
    });
});
