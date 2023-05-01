class VirtualKeyboard {
  constructor() {
    this.wrapper = null;
    this.container = null;
    this.keyboard = null;
    this.textarea = null;
    this.rusLayout = false;
    this.uppercase = false;
    this.shiftPressed = false;
    this.capsLockActive = false;
    this.row1 = {
      Paragraph: ['§', '±', '&gt;', '&lt;'],
      Digit1: ['1', '!', '1', '!'],
      Digit2: ['2', '@', '2', '№'],
      Digit3: ['3', '#', '3', ';'],
      Digit4: ['4', '$', '4', ','],
      Digit5: ['5', '%', '5', '.'],
      Digit6: ['6', '^', '6', ':'],
      Digit7: ['7', '&', '7', '('],
      Digit8: ['8', '*', '8', ')'],
      Digit9: ['9', '(', '9', ')'],
      Digit0: ['0', ')', '0', ''],
      Minus: ['-', '', '-', '_'],
      Equal: ['=', '+', '=', '+'],
      Backspace: ['Backspace', 'Backspace', 'Backspace', 'Backspace'],
    };
    this.row2 = {
      Tab: ['Tab', 'Tab', 'Tab', 'Tab'],
      KeyQ: ['q', 'Q', 'й', 'Й'],
      KeyW: ['w', 'W', 'ц', 'Ц'],
      KeyE: ['e', 'E', 'у', 'У'],
      KeyR: ['r', 'R', 'к', 'К'],
      KeyT: ['t', 'T', 'е', 'Е'],
      KeyY: ['y', 'Y', 'н', 'Н'],
      KeyU: ['u', 'U', 'г', 'Г'],
      KeyI: ['i', 'I', 'ш', 'Ш'],
      KeyO: ['o', 'O', 'щ', 'Щ'],
      KeyP: ['p', 'P', 'з', 'З'],
      BracketLeft: ['[', '{', 'х', 'ъ'],
      BracketRight: [']', '}', 'ъ', 'Ъ'],
      Enter: ['Enter', 'Enter', 'Enter', 'Enter'],
    };

    this.row3 = {
      CapsLock: ['CapsLock', 'CapsLock', 'CapsLock', 'CapsLock'],
      KeyA: ['a', 'A', 'ф', 'Ф'],
      KeyS: ['s', 'S', 'ы', 'Ы'],
      KeyD: ['d', 'D', 'в', 'В'],
      KeyF: ['f', 'F', 'а', 'А'],
      KeyG: ['g', 'G', 'п', 'П'],
      KeyH: ['h', 'H', 'р', 'Р'],
      KeyJ: ['j', 'J', 'о', 'О'],
      KeyK: ['k', 'K', 'л', 'Л'],
      KeyL: ['l', 'L', 'д', 'Д'],
      Semicolon: [';', ':', 'ж', 'Ж'],
      Quote: ['\'', '"', 'э', 'Э'],
      Backslash: ['\\', '|', 'ё', 'Ё'],
      Del: ['Del', 'Del', 'Del', 'Del'],
    };

    this.row4 = {
      ShiftLeft: ['Shift', 'Shift', 'Shift', 'Shift'],
      IntlBackslash: ['`', '~', ']', '['],
      KeyZ: ['z', 'Z', 'я', 'Я'],
      KeyX: ['x', 'X', 'ч', 'Ч'],
      KeyC: ['c', 'C', 'с', 'С'],
      KeyV: ['v', 'V', 'м', 'М'],
      KeyB: ['b', 'B', 'и', 'И'],
      KeyN: ['n', 'N', 'т', 'Т'],
      KeyM: ['m', 'M', 'ь', 'Ь'],
      Comma: [',', '<', 'б', 'Б'],
      Period: ['.', '>', 'ю', 'Ю'],
      Slash: ['/', '?', '/', '?'],
      ArrowUp: ['▲', '▲', '▲', '▲'],
      ShiftRight: ['Shift', 'Shift', 'Shift', 'Shift'],
    };

    this.row5 = {
      ControlLeft: ['Control', 'Control', 'Control', 'Control'],
      AltLeft: ['Option', 'Option', 'Option', 'Option'],
      MetaLeft: ['Command', 'Command', 'Command', 'Command'],
      Space: [' ', ' ', ' ', ' '],
      MetaRight: ['Command', 'Command', 'Command', 'Command'],
      AltRight: ['Option', 'Option', 'Option', 'Option'],
      ArrowLeft: ['◄', '◄', '◄', '◄'],
      ArrowDown: ['▼', '▼', '▼', '▼'],
      ArrowRight: ['►', '►', '►', '►'],
    };
  }

  generateHtml() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('wrapper');
    this.container = document.createElement('div');
    this.container.classList.add('container');
    const header = document.createElement('h1');
    const info = document.createElement('p');
    info.classList.add('details');
    info.innerText = 'Клавиатура создана на операционной системе macOS (del клавишу добавила дополнительно)';
    const detail = document.createElement('p');
    detail.innerText = 'Для переклюения языка комбинация: левые Ctrl + Option (alt)';
    detail.classList.add('details');
    header.classList.add('title');
    header.innerText = 'Виртуальная клавиатура';
    this.keyboard = document.createElement('div');
    this.textarea = document.createElement('textarea');
    document.body.prepend(this.wrapper);
    this.textarea.classList.add('textarea');
    this.keyboard.classList.add('keyboard');
    this.wrapper.appendChild(this.container);
    this.container.appendChild(header);
    this.container.appendChild(this.textarea);
    this.container.appendChild(this.keyboard);
    this.container.appendChild(info);
    this.container.appendChild(detail);
    const rowsCount = 5;
    for (let i = 0; i < rowsCount; i += 1) {
      const row = document.createElement('div');
      row.classList.add('row');
      row.classList.add(`row${i + 1}`);
      row.id = `row${i + 1}`;
      this.keyboard.appendChild(row);
    }
    document.querySelector('.row1').innerHTML = this.generateKeys(this.row1);
    document.querySelector('.row2').innerHTML = this.generateKeys(this.row2);
    document.querySelector('.row3').innerHTML = this.generateKeys(this.row3);
    document.querySelector('.row4').innerHTML = this.generateKeys(this.row4);
    document.querySelector('.row5').innerHTML = this.generateKeys(this.row5);

    this.addEventListeners();
  }

  generateKeys(row) {
    let innerHtml = '';

    Object.entries(row).forEach(([key, layout]) => {
      let innerKey = '';

      const rusLayout = localStorage.getItem('rusLayout') === 'true';

      if (rusLayout) {
        this.rusLayout = true;
      }

      if (this.rusLayout) {
        layout.forEach((item, i) => {
          let classes = '';

          if (i === 0) {
            classes = 'eng hidden';
          } else if (i === 1) {
            classes = 'engB hidden';
          } else if (i === 2) {
            classes = 'rus';
          } else {
            classes = 'rusB hidden';
          }

          innerKey += `<span class="${classes}">${item}</span>`;
        });
      } else {
        layout.forEach((item, i) => {
          let classes = '';

          if (i === 0) {
            classes = 'eng';
          } else if (i === 1) {
            classes = 'engB hidden';
          } else if (i === 2) {
            classes = 'rus hidden';
          } else {
            classes = 'rusB hidden';
          }

          innerKey += `<span class="${classes}">${item}</span>`;
        });
      }

      innerHtml += `<div class="key${key} key">${innerKey}</div>`;
    });

    return innerHtml;
  }

  addEventListeners() {
    const keys = document.querySelectorAll('.key');
    keys.forEach((key) => key.addEventListener('mousedown', (e) => {
      let target = null;
      let isCapslock = false;
      let isShift = false;
      if (e.target.nodeName === 'SPAN') {
        target = e.target.parentElement.childNodes;
        if (e.target.parentElement.classList.contains('keyCapsLock')) {
          isCapslock = true;
        } else if (e.target.parentElement.classList.contains('keyShiftLeft')) {
          isShift = true;
        }
      } else {
        target = e.target.childNodes;
        if (e.target.classList.contains('keyCapsLock')) {
          isCapslock = true;
        } else if (e.target.classList.contains('keyShiftLeft')) {
          isShift = true;
        }
      }
      if (isCapslock || (!document.querySelector('.keyCapsLock').classList.contains('pressed') && isShift)) {
        this.capsLockActive = !this.capsLockActive;
        this.toggleCapsLock();
      }
      target.forEach((item) => {
        if (!item.classList.contains('hidden')) {
          item.parentElement.classList.add('pressed');
          this.keyPressAction(item.innerHTML, e);
        }
      });
    }));

    keys.forEach((key) => key.addEventListener('mouseup', (e) => {
      let parent = null;
      let target = null;
      if (e.target.nodeName === 'SPAN') {
        parent = e.target.parentElement;
        target = e.target.parentElement.childNodes;
      } else {
        parent = e.target;
        target = e.target.childNodes;
      }
      if (!document.querySelector('.keyCapsLock').classList.contains('pressed') && parent.classList.contains('keyShiftLeft')) {
        this.capsLockActive = !this.capsLockActive;
        this.toggleCapsLock();
      }
      target.forEach((letter) => {
        if (!letter.classList.contains('hidden')) {
          if (this.capsLockActive && letter.parentElement.classList.contains('keyCapsLock')) return;
          letter.parentElement.classList.remove('pressed');
        }
      });
    }));

    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      let keyElement = null;
      let target = null;
      this.toggleShift(e);
      if (e.code === 'Delete') {
        keyElement = this.container.querySelector('.keyDel');
      } else {
        keyElement = this.container.querySelector(`.key${e.code}`);
      }
      if (keyElement) {
        this.toggleBackspace(keyElement);
        target = keyElement.childNodes;
        target.forEach((key) => {
          if (!key.classList.contains('hidden')) {
            key.parentElement.classList.add('pressed');
            this.keyPressAction(key.innerHTML, e);
          }
        });
        if ((keyElement.classList.contains('keyCapsLock')) || (!this.capsLockActive && keyElement.classList.contains('keyShiftLeft'))) {
          this.capsLockActive = !this.capsLockActive;
          this.toggleCapsLock();
        }
        keyElement.classList.add('pressed');
      }
    });

    document.addEventListener('keyup', (e) => {
      e.preventDefault();
      let keyElement = null;
      let target = null;
      if (e.code === 'Delete') {
        keyElement = this.container.querySelector('.keyDel');
      } else {
        keyElement = this.container.querySelector(`.key${e.code}`);
      }
      if (keyElement) {
        target = keyElement.childNodes;
        target.forEach((key) => {
          if (!key.classList.contains('hidden')) {
            if (this.capsLockActive && key.parentElement.classList.contains('keyCapsLock')) return;
            key.parentElement.classList.remove('pressed');
            if (!document.querySelector('.keyCapsLock').classList.contains('pressed') && keyElement.classList.contains('keyShiftLeft')) {
              this.capsLockActive = !this.capsLockActive;
              this.toggleCapsLock();
              key.parentElement.classList.remove('pressed');
            }
          }
        });
      }
    });
  }

  toggleBackspace(keyElement) {
    if (keyElement.classList.contains('keyBackspace') && this.textarea.selectionStart !== this.textarea.selectionEnd) {
      const start = this.textarea.selectionStart;
      const end = this.textarea.selectionEnd;
      const { value } = this.textarea;
      const newValue = value.substring(0, start) + value.substring(end);
      this.textarea.value = newValue;
      this.textarea.selectionStart = start;
      this.textarea.selectionEnd = start;
    }
  }

  toggleShift(event) {
    if (event.ctrlKey && event.altKey) {
      this.rusLayout = !this.rusLayout;
      localStorage.setItem('rusLayout', this.rusLayout);
      if (this.capsLockActive) {
        const keysEngBig = document.querySelectorAll('.engB');
        const keysRusBig = document.querySelectorAll('.rusB');
        keysEngBig.forEach((key) => key.classList.toggle('hidden'));
        keysRusBig.forEach((key) => key.classList.toggle('hidden'));
      } else {
        const keysEng = document.querySelectorAll('.eng');
        const keysRus = document.querySelectorAll('.rus');
        keysEng.forEach((key) => key.classList.toggle('hidden'));
        keysRus.forEach((key) => key.classList.toggle('hidden'));
      }
    }
  }

  keyPressAction(key, event) {
    switch (key) {
      case 'Backspace':
        this.textarea.value = this.textarea.value.slice(0, -1);
        break;
      case 'Enter':
        this.textarea.value += '\n';
        break;
      case 'Tab':
        event.preventDefault();
        this.textarea.value += '\t';
        break;
      case 'CapsLock':
        this.textarea.value += '';
        break;
      case 'Command':
        this.textarea.value += '';
        break;
      case 'Del':
        this.handleDelBtn();
        break;
      case 'Option':
        this.textarea.value += '';
        break;
      case 'Control':
        this.textarea.value += '';
        break;
      case 'Shift':
        this.textarea.value += '';
        break;
      case 'Ctrl':
        this.textarea.value += '';
        break;
      default:
        this.textarea.value += this.capsLockActive ? key.toUpperCase() : key;
        break;
    }
  }

  handleDelBtn() {
    const cursorPosition = this.textarea.selectionStart;
    const beforeCursor = this.textarea.value.slice(0, cursorPosition);
    const afterCursor = this.textarea.value.slice(cursorPosition + 1);
    this.textarea.value = `${beforeCursor}${afterCursor}`;
    this.textarea.setSelectionRange(cursorPosition, cursorPosition);
  }

  toggleCapsLock() {
    const keysSmallRus = document.querySelectorAll('.rus');
    const keysBigRus = document.querySelectorAll('.rusB');
    const keysSmallEng = document.querySelectorAll('.eng');
    const keysBigEng = document.querySelectorAll('.engB');

    if (this.rusLayout) {
      keysSmallRus.forEach((key) => key.classList.toggle('hidden'));
      keysBigRus.forEach((key) => key.classList.toggle('hidden'));
    } else {
      keysSmallEng.forEach((key) => key.classList.toggle('hidden'));
      keysBigEng.forEach((key) => key.classList.toggle('hidden'));
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const virtualKeyboard = new VirtualKeyboard();
  virtualKeyboard.generateHtml();
});
