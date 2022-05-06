// import keys from './keys.js';
import { keys, specials } from './keys.js';

class virtualKeyboard {
    constructor() {
        this.capsLock = false;
        this.shift = false;
        this.lang =  (localStorage.lang) ? localStorage.lang : 'en';
        this.keyNames = Object.keys(keys); //array of all keys codes
        this.specials = Array.from(specials); //array of specials codes
        this.keyboard; //all keys
        this.arrayOfLetters = [];
        this.keyLetters;
        this.notSpecials;
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
            keyElement.innerHTML = keys[element][this.lang].lowerCase;
            let arrayIndex = 0;
            if (index > 13 && index < 29) arrayIndex = 1;
            else if (index >= 29 && index < 42) arrayIndex = 2;
            else if (index >= 42 && index < 55) arrayIndex = 3;
            else if (index >= 55) arrayIndex = 4;
            divArray[arrayIndex].append(keyElement);
        });


        this.keyboard = document.querySelectorAll('.keyboard-key'); //all keys
        this.keyLetters = document.querySelectorAll('.Key'); //letters
        this.notSpecials = document.querySelectorAll('.keyboard-key:not(.Special)');// all except specials

        this.keysBackLight();
    }

    createKeyGroups() {
        this.arrayOfLetters = this.keyNames.filter((el) => {
            return el.includes('Key');
        });
    }

    capitalizeLetters(symbols) {
        let symb = 'lowerCase';
        if (this.capsLock) {
            if (this.shift) symb = 'capsShift';
            else symb = 'caps';
        }
        else if (this.shift) symb = 'upperCase';

        symbols.forEach(el => {
            el.innerHTML = keys[el.dataset.Key][this.lang][symb];
        });
    }

    deCapitalizeLetters(symbols) {
        symbols.forEach(el => {
            el.innerHTML = keys[el.dataset.Key][this.lang].lowerCase;
        });
    }



    keysBackLight() {
        let pressed = new Set();
        let codes = ['ControlLeft', 'AltLeft']
        const virtualKeys = document.querySelectorAll('.keyboard-key');
        virtualKeys.forEach(element => {
            if (element.dataset.Key == 'Backspace') {
                element.addEventListener('mousedown', () => {
                    this.deletesymbol('b');
                });
            }
            else if (element.dataset.Key == 'Delete') {
                element.addEventListener('mousedown', () => {
                    this.deletesymbol('f');
                });
            }
            else if (element.dataset.Key == 'CapsLock') {
                element.addEventListener('click', () => {
                    this.toggleCapsLock();
                });
            }
            else if (element.dataset.Key == 'ShiftLeft' || element.dataset.Key == 'ShiftRight') {
                element.addEventListener('mousedown', () => {
                    this.toggleShift();
                });
            }
            element.addEventListener('mousedown', (e) => {
                element.classList.add('active');
                if (!this.specials.includes(e.target.dataset.Key))
                    this.inputCharacter(e.target.dataset.Key);
            });
        });


        document.addEventListener('mouseup', () => {
            virtualKeys.forEach(element => {
                element.classList.remove('active');
                this.shift = false;
                this.capitalizeLetters(this.keyboard);
            });
        });

        document.addEventListener('keydown', (e) => {
            if (!this.keyNames.includes(e.code)) return;
            e.preventDefault();
            //simultaneously press
            pressed.add(e.code);
            for (let code of codes) {
                if (pressed.has('ControlLeft') && pressed.has('AltLeft')) {
                    this.switchLanguage();
                    pressed.clear();
                }
            }
            const oneKey = document.querySelector(`.${e.code}`);
            oneKey.classList.add('active');
            if (!this.specials.includes(e.code)) {
                this.inputCharacter(e.code);
            }
            else {
                if (e.code == 'CapsLock') {
                    this.toggleCapsLock();
                }
                else if (e.code == 'Backspace') {
                    this.deletesymbol('b');
                }
                else if (e.code == 'ShiftLeft' || e.code == 'ShiftRight') {
                    this.toggleShift();
                }
            }
        });

        document.addEventListener('keyup', e => {
            if (!this.keyNames.includes(e.code)) return;
            e.preventDefault();
            const oneKey = document.querySelector(`.${e.code}`);
            oneKey.classList.remove('active');
            pressed.clear();
        });
    }
    // caps lock toggle
    toggleCapsLock() {
        if (this.capsLock) {
            this.capsLock = false;
        }
        else {
            this.capsLock = true;
            this.capitalizeLetters(this.keyLetters);
        }
        this.capitalizeLetters(this.keyLetters);
    }

    toggleShift() {
        if (this.shift == true) this.shift = false;
        else this.shift = true;
        this.capitalizeLetters(this.notSpecials);
    }

    switchLanguage() {
        if (this.lang == 'ru') {
            this.lang = 'en';
        }
        else {
            this.lang = 'ru';
        }
        this.capitalizeLetters(this.notSpecials);
        localStorage.setItem("lang", this.lang)
    }



    addEvents() {
        //caps lock
        // const capsLockKey = document.querySelector('.CapsLock');
        // capsLockKey.addEventListener('click', (() => {
        //     this.toggleCapsLock();
        // }));
        // shift (left and right)
        // const leftShiftKey = document.querySelector('.ShiftLeft');
        // const rightShiftKey = document.querySelector('.ShiftRight');
        // [leftShiftKey, rightShiftKey].forEach((el) => {
        //     el.addEventListener('mousedown', () => {
        //         this.shift = true;
        //     });
        //     el.addEventListener('mouseup', () => {
        //         this.shift = false;
        //     });
        // });
    }

    // input characters in textarea
    inputCharacter(code, flag = true) {
        let lang = this.lang;
        let symb = 'lowerCase';
        if (this.capsLock) {
            if (this.shift) symb = 'capsShift';
            else symb = 'caps';
        }
        else if (this.shift) symb = 'upperCase';
        this.textArea.value += keys[code][lang][symb];
    }

    deletesymbol(dir) {
        console.log(this.textArea.selectionStart + ' ' + this.textArea.selectionStart);
        let startSel = this.textArea.selectionStart;
        let endSel = this.textArea.selectionEnd;
        let strEnd = this.textArea.value.length - 1;
        if (dir == 'b' && startSel != 0) {
            if (startSel == endSel) {
                //delete one symbol backward
                this.textArea.value = this.textArea.value.slice(0, startSel - 1) //+ this.textArea.value.slice(startSel, strEnd + 1);
                this.textArea.selectionStart = startSel;
                this.textArea.selectionStart = this.textArea.selectionStart;
                console.log(this.textArea.selectionStart + ' ' + this.textArea.selectionStart);

                // if (startSel >= this.textArea.value.length) {
                //     this.textArea.selectionStart = this.textArea.value.length - 1;
                //     this.textArea.selectionEnd = this.textArea.value.length - 1;
                // }
            }
            else {
                this.textArea.value = this.textArea.value.slice(0, startSel) + this.textArea.value.slice(endSel, strEnd + 1);
            }

        }
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