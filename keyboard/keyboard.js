import keys from './keys.js';



class virtualKeyboard {
    constructor() {
        this.capsLock = false;
        this.shift = false;
        this.keyNames = Object.keys(keys);
        this.keyboard = '';
    }

    init() {
        const container = document.createElement('div');
        container.classList.add('container');
        let divArray = [];
        const keyboardDiv = document.createElement('div');
        keyboardDiv.classList.add('keyboard');
        for (let i = 0; i < 5; i++) {
            const divRow = document.createElement('div');
            divRow.classList.add('row');
            keyboardDiv.append(divRow);
        } 
        container.append(keyboardDiv);
        document.body.append(container);
        divArray = (document.querySelectorAll)

        this.keyNames.forEach(element => {
            const keyElement = document.createElement('button');
            let test = element;
            keyElement.classList.add(`${element}`);
            keyElement.classList.add('keyboard-key')
            keyElement.innerHTML = keys[element].en.lowerCase;
            keyboardDiv.append(keyElement);
        });
    }

}

const vk = new virtualKeyboard();
vk.init();

// const virtualKeys = document.querySelectorAll('.keyboard-key');

// document.addEventListener('keydown', (e) => {
//     const oneKey = keyboard.querySelector(`.${e.code}`);
//     oneKey.style.color = 'grey';
//     // console.log(e.code);
// });

// document.addEventListener('keyup', e => {
//     const oneKey = keyboard.querySelector(`.${e.code}`);
//     oneKey.style.color = 'inherit';
// });