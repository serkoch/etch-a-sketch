const container = document.querySelector('.container');
const btn = document.querySelector('.btn');
const containerHeight = 500;
const containerWidth = 500;

function grid(num) {
    let width = containerWidth / num;
    let height = containerHeight / num;
    console.log(height);
    for (let i = 0; i < (num*num); i++) {
        const div = document.createElement('div');
        div.style.height = `${height}px`;
        div.style.width = `${width}px`;
        div.classList.add('grid-item');
        container.appendChild(div);
        div.addEventListener('mouseover', function() {
            div.style.backgroundColor = 'black';
        })
    }
}

btn.addEventListener('click', function userInput() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    let choice = prompt('Please, enter the canvas size from 1 to 100:');
    userChoice = parseInt(choice);    
    if (userChoice > 0 && userChoice <= 100) {
        grid(userChoice);
    } else {
        return userInput();
    }
});
