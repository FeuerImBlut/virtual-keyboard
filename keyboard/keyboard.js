// import keys from './keys.js';
import { keys, specials } from './keys.js';



class virtualKeyboard {
    constructor() {
        this.capsLock = false;
        this.shift = false;
        this.lang = 'en';
        this.keyNames = Object.keys(keys);
        this.specials = Array.from(specials);
        this.keyboard;
        // this.arrayOfLettersKeys = [];
        this.arrayOfLetters = [];
        this.keyLetters;
        this.textArea;

    }

    init() {
        this.createKeyGroups();

        let divArray;
        const container = document.createElement('div');
        container.classList.add('container');
        const keyboardDiv = document.createElement('div');
        keyboardDiv.classList.add('keyboard');
        this.textArea = document.createElement('textarea');
        this.textArea.rows = 10;
        container.append(this.textArea);
        // create Rows
        for (let i = 0; i < 5; i++) {
            const divRow = document.createElement('div');
            divRow.classList.add('row');
            keyboardDiv.append(divRow);
        }
        container.append(keyboardDiv);
        document.body.append(container);
        divArray = document.querySelectorAll('.row');
        // fill Rows
        this.keyNames.forEach((element, index) => {
            const keyElement = document.createElement('button');
            if (this.arrayOfLetters.includes(element)) {
                keyElement.classList.add('Key')
            }
            else if (this.specials.includes(element)) {
                keyElement.classList.add('Special');
            }
            keyElement.classList.add(`${element}`);
            keyElement.dataset.Key = element;
            keyElement.classList.add('keyboard-key')
            keyElement.innerHTML = keys[element].en.lowerCase;
            let arrayIndex = 0;
            if (index > 13 && index < 29) arrayIndex = 1;
            else if (index >= 29 && index < 42) arrayIndex = 2;
            else if (index >= 42 && index < 55) arrayIndex = 3;
            else if (index >= 55) arrayIndex = 4;
            divArray[arrayIndex].append(keyElement);
        });
        this.keyboard = document.querySelectorAll('.keyboard-key');
        // this.arrayOfLetters = Array.from(this.keyboard).filter(element.);
        this.keyLetters = document.querySelectorAll('.Key');
        const leftShift = document.querySelector('[data--key="ShiftLeft"]');
        leftShift.addEventListener('mousedown', () => {
            this.capitalizeLetters(this.keyLetters);
        });
        leftShift.addEventListener('mouseup', () => {
            this.deCapitalizeLetters(this.keyLetters);
        });

        this.keysBackLight();
        this.addEvents();
    }

    createKeyGroups() {
        this.arrayOfLetters = this.keyNames.filter((el) => {
            return el.includes('Key');
        });
    }

    capitalizeLetters(symbols) {
        symbols.forEach(el => {
            el.innerHTML = keys[el.dataset.Key].en.upperCase;
        });
    }

    deCapitalizeLetters(symbols) {
        symbols.forEach(el => {
            el.innerHTML = keys[el.dataset.Key].en.lowerCase;
        });
    }

    keysBackLight() {
        const virtualKeys = document.querySelectorAll('.keyboard-key');
        virtualKeys.forEach(element => {
            element.addEventListener('mousedown', (e) => {
                element.classList.add('active');
                this.inputCharacter(e.target.dataset.Key);
            });
        });
        virtualKeys.forEach(element => {
            element.addEventListener('mouseup', (e) => {
                element.classList.remove('active');
            });
        });

        document.addEventListener('keydown', (e) => {
            // e.preventDefault();
            const oneKey = document.querySelector(`.${e.code}`);
            oneKey.classList.add('active');
            if (!this.specials.includes(e.code)) {
                this.inputCharacter(e.code);
            }
            else {
                
            }
        });

        document.addEventListener('keyup', e => {
            // e.preventDefault();
            const oneKey = document.querySelector(`.${e.code}`);
            oneKey.classList.remove('active');
        });
    }

    toggleCapsLock() {
        if (this.capsLock) {
            this.capsLock = false;
            this.deCapitalizeLetters(this.keyLetters);
        }
        else {
            this.capsLock = true;
            this.capitalizeLetters(this.keyLetters);
        }

    }

    addEvents() {
        //caps lock
        const capsLockKey = document.querySelector('.CapsLock');
        const leftShiftKey = document.querySelector('.LeftShift');
        const rightShiftKey = document.querySelector('.RightShift');
        capsLockKey.addEventListener('click', ((e) => {
            this.toggleCapsLock();
        }));
    }

    // input characters in textarea
    inputCharacter(code) {
        let lang = this.lang;
        let symb = 'lowerCase';
        if (this.capsLock) {
            if (this.shift) symb = 'capsShift';
            else symb = 'caps';
        }
        else if (this.shift) symb = 'upperCase';
        this.textArea.value += keys[code][lang][symb];;
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