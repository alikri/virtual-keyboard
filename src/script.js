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
			'Paragraph': ['§', '±', '&gt;', '&lt;'],
			'Digit1': ['1', '!', '1', '!'],
			'Digit2': ['2', '@', '2', '№'],
			'Digit3': ['3', '#', '3', ';'],
			'Digit4': ['4', '$', '4', ','],
			'Digit5': ['5', '%', '5', '.'],
			'Digit6': ['6', '^', '6', ':'],
			'Digit7': ['7', '&', '7', '('],
			'Digit8': ['8', '*', '8', ')'],
			'Digit9': ['9', '(', '9', ')'],
			'Digit0': ['0', ')', '0', ''],
			'Minus': ['-', '', '-', '_'],
			'Equal': ['=', '+', '=', '+'],
			'Backspace': ['Backspace', 'Backspace', 'Backspace', 'Backspace']
}
		this.row2 = {
			'Tab': ['Tab', 'Tab', 'Tab', 'Tab'],
			'KeyQ': ['q', 'Q', 'й', 'Й'],
			'KeyW': ['w', 'W', 'ц', 'Ц'],
			'KeyE': ['e', 'E', 'у', 'У'],
			'KeyR': ['r', 'R', 'к', 'К'],
			'KeyT': ['t', 'T', 'е', 'Е'],
			'KeyY': ['y', 'Y', 'н', 'Н'],
			'KeyU': ['u', 'U', 'г', 'Г'],
			'KeyI': ['i', 'I', 'ш', 'Ш'],
			'KeyO': ['o', 'O', 'щ', 'Щ'],
			'KeyP': ['p', 'P', 'з', 'З'],
			'BracketLeft': ['[', '{', 'х', 'ъ'],
			'BracketRight': [']', '}', 'ъ', 'Ъ'],
			'Enter': ['Enter', 'Enter', 'Enter', 'Enter']
		}

		this.row3 = {
		'CapsLock': ['CapsLock', 'CapsLock', 'CapsLock', 'CapsLock'],
    'KeyA': ['a', 'A', 'ф', 'Ф'],
    'KeyS': ['s', 'S', 'ы', 'Ы'],
    'KeyD': ['d', 'D', 'в', 'В'],
    'KeyF': ['f', 'F', 'а', 'А'],
    'KeyG': ['g', 'G', 'п', 'П'],
    'KeyH': ['h', 'H', 'р', 'Р'],
    'KeyJ': ['j', 'J', 'о', 'О'],
    'KeyK': ['k', 'K', 'л', 'Л'],
    'KeyL': ['l', 'L', 'д', 'Д'],
		'Semicolon': [';', ':', 'ж', 'Ж'],
		'Quote':['\'','\"','э', 'Э'],
    'Backslash': ['\\', '|', 'ё', 'Ё'],
		}

		this.row4 = {
			'ShiftLeft': ['Shift', 'Shift', 'Shift', 'Shift'],
			'IntlBackslash': ['`', '~', ']', '['],
			'KeyZ': ['z', 'Z', 'я', 'Я'],
			'KeyX': ['x', 'X', 'ч', 'Ч'],
			'KeyC': ['c', 'C', 'с', 'С'],
			'KeyV': ['v', 'V', 'м', 'М'],
			'KeyB': ['b', 'B', 'и', 'И'],
			'KeyN': ['n', 'N', 'т', 'Т'],
			'KeyM': ['m', 'M', 'ь', 'Ь'],
			'Comma': [',', '<', 'б', 'Б'],
			'Period': ['.', '>', 'ю', 'Ю'],
			'Slash': ['/', '?', '/', '?'],
			'ArrowUp': ['▲', '▲', '▲', '▲'],
			'ShiftRight': ['Shift', 'Shift', 'Shift', 'Shift'],
		};

		this.row5 = {
			'ControlLeft': ['Control', 'Control', 'Control', 'Control'],
			'MetaLeft': ['Command', 'Command', 'Command', 'Command'],
			'AltLeft': ['Option', 'Option', 'Option', 'Option'],
			'Space': [' ', ' ', ' ', ' '],
			'AltRight': ['Option', 'Option', 'Option', 'Option'],
			'MetaRight': ['Command', 'Command', 'Command', 'Command'],
			'AltRight': ['Option', 'Option', 'Option', 'Option'],
			'ArrowLeft': ['◄', '◄', '◄', '◄'],
			'ArrowDown': ['▼', '▼', '▼', '▼'],
			'ArrowRight': ['►', '►', '►', '►'],
		};

		this.init();

	}


	init() {
		this.wrapper = document.createElement('div');
		this.wrapper.classList.add("wrapper");
		this.container = document.createElement('div');
		this.container.classList.add('container');
		this.keyboard = document.createElement('div');
		this.textarea = document.createElement('textarea');
		document.body.prepend(this.wrapper);
		this.textarea.classList.add("textarea");
		this.keyboard.classList.add('keyboard');
		this.wrapper.appendChild(this.container);
		this.container.appendChild(this.textarea);
		this.container.appendChild(this.keyboard);
		let rowsCount = 5;
		for (let i = 0; i < rowsCount; i++) {
			let row = document.createElement("div");
			row.classList.add("row");
			row.classList.add(`row${i + 1}`);
			row.id = `row${i + 1}`
			this.keyboard.appendChild(row);
		}
		document.querySelector(".row1").innerHTML = this.generateKeys(this.row1)
		document.querySelector(".row2").innerHTML = this.generateKeys(this.row2)
		document.querySelector(".row3").innerHTML = this.generateKeys(this.row3)
		document.querySelector(".row4").innerHTML = this.generateKeys(this.row4)
		document.querySelector(".row5").innerHTML = this.generateKeys(this.row5)

		this.addEventListeners()
	}

	generateKeys(row) {
		let innerHtml = '';
		for (let key in row) {
			let layout = row[key];
			let innerKey = '';

			let rusLayout = localStorage.getItem('rusLayout');
			if (rusLayout === "true") {
				this.rusLayout = true;
				for (let i = 0; i < layout.length; i++) {
					if (i === 0) {
						innerKey += `<span class="eng hidden">${layout[i]}</span>`
					} else if (i === 1) {
						innerKey += `<span class="engB hidden">${layout[i]}</span>`
					} else if (i === 2) {
						innerKey += `<span class="rus">${layout[i]}</span>`
					} else {
						innerKey += `<span class="rusB hidden">${layout[i]}</span>`
					}
				
				}
			} else {
				for (let i = 0; i < layout.length; i++) {
					if (i === 0) {
						innerKey += `<span class="eng">${layout[i]}</span>`
					} else if (i === 1) {
						innerKey += `<span class="engB hidden">${layout[i]}</span>`
					} else if (i === 2) {
						innerKey += `<span class="rus hidden">${layout[i]}</span>`
					} else {
						innerKey += `<span class="rusB hidden">${layout[i]}</span>`
					}
				
				}
			}
			innerHtml += `<div class="key${key} key">${innerKey}</div>`;
		}

		return innerHtml;
	}

	addEventListeners() {
		let keys = document.querySelectorAll(".key");
		keys.forEach(key => key.addEventListener("mousedown", (e) => {
			let showKey = [];
			let target = null;
			let isCapslock = false;
			if (e.target.nodeName === "SPAN") {
				target = e.target.parentElement.childNodes;
				if (e.target.parentElement.classList.contains("keyCapsLock")) {
					isCapslock = true;
				}
			} else {
				target = e.target.childNodes;
				if (e.target.classList.contains("keyCapsLock")) {
					isCapslock = true;
				}
			}
			if (isCapslock) {
				this.capsLockActive = !this.capsLockActive;
				this.toggleCapsLock();
			}
			target.forEach(key => {
				if (!key.classList.contains('hidden')) {
					key.parentElement.classList.add('pressed');
					this.keyPressAction(key.innerHTML);
					showKey.push(key);
				}
			});

		}))

		keys.forEach(key => key.addEventListener("mouseup", (e) => {
			let showKey = [];
			let target = null;
			if (e.target.nodeName === "SPAN") {
				target = e.target.parentElement.childNodes;
			} else {
				target = e.target.childNodes;
			}

			target.forEach(key => {
				if (!key.classList.contains('hidden')) {
					key.parentElement.classList.remove('pressed');
					showKey.push(key);
				}
			});

		}))


		document.addEventListener("keydown", (e) => {
			e.preventDefault();
			let showKey = [];
			let target = null;
			this.toggleShift(e);
			const keyElement = this.container.querySelector(`.key${e.code}`);
			if (keyElement) {
				this.toggleBackspace(keyElement);
				target = keyElement.childNodes;
				target.forEach(key => {
					if (!key.classList.contains('hidden')) {
						key.parentElement.classList.add('pressed');
						this.keyPressAction(key.innerHTML);
						showKey.push(key);
					}
				});
				if (keyElement.classList.contains("keyCapsLock")) {
					this.capsLockActive = !this.capsLockActive;
					this.toggleCapsLock();
				}
				keyElement.classList.add('pressed');
			}

		})

		document.addEventListener("keyup", (e) => {
			e.preventDefault();
			let showKey = [];
			let target = null;
			const keyElement = this.container.querySelector(`.key${e.code}`);
			if (keyElement) {
				target = keyElement.childNodes;
				target.forEach(key => {
					if (!key.classList.contains('hidden')) {
						key.parentElement.classList.remove('pressed');
						showKey.push(key);
					}
				});
			}

		})

	}

	toggleBackspace(keyElement) {
		if (keyElement.classList.contains("keyBackspace") && this.textarea.selectionStart !== this.textarea.selectionEnd) {
			const start = this.textarea.selectionStart;
			const end = this.textarea.selectionEnd;
			this.textarea.value = this.textarea.value.substring(0, start) + this.textarea.value.substring(end);
			this.textarea.selectionStart = this.textarea.selectionEnd = start;
			
		}

	}

	toggleShift(event) {
		if (event.shiftKey && event.altKey) {
			this.rusLayout = !this.rusLayout;
			localStorage.setItem('rusLayout', this.rusLayout);
			if (this.capsLockActive) {
				let keysEngBig = document.querySelectorAll(".engB");
				let keysRusBig = document.querySelectorAll(".rusB");
				keysEngBig.forEach(key => key.classList.toggle("hidden"));
				keysRusBig.forEach(key => key.classList.toggle("hidden"));
			} else {
				let keysEng = document.querySelectorAll(".eng");
				let keysRus = document.querySelectorAll(".rus");
				keysEng.forEach(key => key.classList.toggle("hidden"));
				keysRus.forEach(key => key.classList.toggle("hidden"));
			}
			
			
		}
}


keyPressAction(key) {
		switch (key) {
				case 'Backspace':
						this.textarea.value = this.textarea.value.slice(0, -1);
						break;
				case 'Enter':
						this.textarea.value += '\n';
						break;
				case 'Tab':
						this.textarea.value += '\t';
						break;
				case 'CapsLock':
				this.textarea.value += '';
				break;
				case 'Command':
				this.textarea.value += '';
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
	
	
	toggleCapsLock() {
		let keysSmallRus = document.querySelectorAll(".rus");
		let keysBigRus = document.querySelectorAll(".rusB");
		let keysSmallEng = document.querySelectorAll(".eng");
		let keysBigEng = document.querySelectorAll(".engB");

		if (this.rusLayout) {
			keysSmallRus.forEach(key => key.classList.toggle("hidden"));
			keysBigRus.forEach(key => key.classList.toggle("hidden"));
		} else  {

			keysSmallEng.forEach(key => key.classList.toggle("hidden"));
			keysBigEng.forEach(key => key.classList.toggle("hidden"));

		} 
	} 

}

new VirtualKeyboard();








