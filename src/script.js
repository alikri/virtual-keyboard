
class VirtualKeyboard {
	constructor() {
		this.wrapper = null;
		this.container = null;
		this.keyboard = null;
		this.textarea = null;
		this.layoutIndex = 0;
		this.shiftPressed = false;
		this.capsLockActive = false;
		this.keyListE = [
					[
						['§', '±'], ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&'], ['8', '*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], ['Backspace']
					],
					[
						['Tab'], ['q', 'Q'], ['w', 'W'], ['e', 'E'], ['r', 'R'], ['t', 'T'], ['y', 'Y'], ['u', 'U'], ['i', 'I'], ['o', 'O'], ['p', 'P'], ['[', '{'], [']', '}'], ['Enter']
					],
					[
						['CapsLock'], ['a', 'A'], ['s', 'S'], ['d', 'D'], ['f', 'F'], ['g', 'G'], ['h', 'H'], ['j', 'J'], ['k', 'K'], ['l', 'L'], [';', ':'], ['\\', '|']
					],
					[
						['Shift'], ['`', '~'], ['z', 'Z'], ['x', 'X'], ['c', 'C'], ['v', 'V'], ['b', 'B'], ['n', 'N'], ['m', 'M'], [',', '<'], ['.', '>'], ['/', '?'], ['▼','ArrowUp'], ['Shift']
					],
					[
						['Ctrl'], ['Alt'], ['Meta'], [' ', 'Space'], ['Meta'], ['Alt'], [ '▼', 'ArrowLeft'], ['▼','ArrowDown'], ['▼','ArrowRight']
					]
		];
		this.keyListR = [
			[
				['>', '<'], ['1', '!'], ['2', '"'], ['3', '№'], ['4', '%'], ['5', ':'], ['6', ','], ['7', '.'], ['8', ';'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+']
			],
			[
				['Tab'], ['й', 'Й'], ['ц', 'Ц'], ['у', 'У'], ['к', 'К'], ['е', 'Е'], ['н', 'Н'], ['г', 'Г'], ['ш', 'Ш'], ['щ', 'Щ'], ['з', 'З'], ['х', 'Х'], ['ъ', 'Ъ'], ['Enter']
			],
			[
				['CapsLock'], ['ф', 'Ф'], ['ы', 'Ы'], ['в', 'В'], ['а', 'А'], ['п', 'П'], ['р', 'Р'], ['о', 'О'], ['л', 'Л'], ['д', 'Д'], ['ж', 'Ж'], ['э', 'Э'], ['ё', 'Ё']
			],
			[
				['Shift'],[']', '['], ['я', 'Я'], ['ч', 'Ч'], ['с', 'С'], ['м', 'М'], ['и', 'И'], ['т', 'Т'], ['ь', 'Ь'], ['б', 'Б'], ['ю', 'Ю'], ['/', '?'], ['▼', 'ArrowUp'], ['Shift']
			],
			[
				['Ctrl'], ['Alt'], ['Meta'], [' ', 'Space'], ['Meta'], ['Alt'], [ '▼', 'ArrowLeft'], ['▼','ArrowDown'], ['▼','ArrowRight']
			]
		];

		this.layouts = [
			this.keyListE,
			this.keyListR
		];
			
			this.init();
	}

	init() {
		this.wrapper = document.createElement('div');
		this.wrapper.classList.add("wrapper");
		this.container = document.createElement('div');
		this.container.classList.add('container');
		this.keyboard = document.createElement('div');
		this.textarea = document.createElement('textarea');
		this.switchLayout();
		this.addEventListeners();
		document.body.prepend(this.wrapper);
		this.textarea.classList.add("textarea");
		this.keyboard.classList.add('keyboard');
		this.wrapper.appendChild(this.container);
		this.container.appendChild(this.textarea);
		this.container.appendChild(this.keyboard);

	}

	switchLayout() {
		const savedLayoutIndex = localStorage.getItem('layoutIndex');
		if (savedLayoutIndex !== null) {
				this.layoutIndex = parseInt(savedLayoutIndex, 10);
		} else {
				this.layoutIndex = 0;
		}
		this.keyboard.innerHTML = this.generateKeyboardHtml(this.layouts[this.layoutIndex]);
	}

	generateKeyboardHtml(layout) {
		let innerKeyboard = '';
		for (let i = 0; i < layout.length; i++) {
			let rowKeys = ``;
			for (let j = 0; j < layout[i].length; j++) {
				if (layout[i][j][1] === 'Space') {
					rowKeys += `<div class="key keySpace">${layout[i][j][0]}</div>`
				} else if (layout[i][j][1] === 'ArrowUp') {
					rowKeys += `<div class="key key-arrow-up">${layout[i][j][0]}</div>`
				} else if (layout[i][j][0] === 'CapsLock') {
					if (this.capsLockActive) {
						rowKeys += `<div class="key keyCapsLock pressed">${layout[i][j][0]}</div>`
					} else {
						rowKeys += `<div class="key keyCapsLock">${layout[i][j][0]}</div>`
					}
				} else if (layout[i][j][1] === 'ArrowLeft') {
					rowKeys += `<div class="key key-arrow-left">${layout[i][j][0]}</div>`
				} else if (layout[i][j][1] === 'ArrowRight') {
					rowKeys += `<div class="key key-arrow-right">${layout[i][j][0]}</div>`
				} else if (layout[i][j][1] === 'ArrowDown') {
					rowKeys += `<div class="key key-arrow-down">${layout[i][j][0]}</div>`
				} else {
					rowKeys += `<div class="key key${layout[i][j][0]}">${layout[i][j][0]}</div>`
				}
				
			}
			let row = `<div class="row row${i+1}">${rowKeys}</div>`
			innerKeyboard += row;
		}
		return innerKeyboard;
	}

	addEventListeners() {
		this.keyboard.addEventListener('mousedown', (event) => {
			const key = event.target;
			console.log(key);
			if (key.classList.contains('key')) {
				key.classList.add('pressed');
				this.keyPressAction(key.innerHTML);
	
					}
			});

			this.keyboard.addEventListener('mouseup', (event) => {
					const key = event.target;
				if (key.classList.contains('key')) {
					if (key.classList.contains("keyCapsLock")) return;
						key.classList.remove('pressed');
					}
			});

			this.keyboard.addEventListener('mouseout', (event) => {
					const key = event.target;
				if (key.classList.contains('key')) {
					if (key.classList.contains("keyCapsLock")) return;
							key.classList.remove('pressed');
					}
			});

			document.addEventListener('keydown', (event) => {
					event.preventDefault();
				const keyElement = event.key;
				if (keyElement) {
					this.keyPressAction(keyElement);
					let key = document.querySelector(`.key${keyElement}`)
					if (key.classList.contains("keyCapsLock")) return;
						key.classList.remove('pressed');
					
					}
			});

			document.addEventListener('keyup', (event) => {
					const keyElement = event.key;
				if (keyElement) {
					let key = document.querySelector(`.key${keyElement}`)
					if (key.classList.contains("keyCapsLock")) return;
					key.classList.remove('pressed');
				}
			});
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
					this.capsLockActive = !this.capsLockActive;
					this.keyboard.innerHTML = '';
					this.keyboard.innerHTML = this.toggleCapsLock(this.keyListE);
							break;
					case 'Shift':
							this.shiftPressed = !this.shiftPressed;
							this.toggleShift();
							break;
				case 'Ctrl':
					this.switchLayout();
					localStorage.setItem('layoutIndex', this.layoutIndex);
		
					this.layoutIndex = (this.layoutIndex + 1) % this.layouts.length;
							break;
					default:
							if (this.shiftPressed) {
									this.textarea.value += this.getShiftKey(key);
							} else {
									this.textarea.value += this.capsLockActive ? key.toUpperCase() : key;
							}
							break;
			}
	}

	getShiftKey(key) {
		const keyElement = this.keyboard.querySelector('.keyShift');
			return keyElement.innerHTML || key;
	}


	toggleCapsLock(layout) {
		let innerKeyboard = '';
	for (let i = 0; i < layout.length; i++) {
		let rowKeys = ``;
		for (let j = 0; j < layout[i].length; j++) {
			let label = this.capsLockActive && layout[i][j][1] ? layout[i][j][1] : layout[i][j][0];
			if (layout[i][j][1] === 'Space') {
				rowKeys += `<div class="key keySpace">${layout[i][j][0]}</div>`
			} else if (layout[i][j][1] === 'ArrowUp') {
				rowKeys += `<div class="key key-arrow-up">${layout[i][j][0]}</div>`
			} else if (layout[i][j][0] === 'CapsLock') {
				if (this.capsLockActive) {
					rowKeys += `<div class="key keyCapsLock pressed">${layout[i][j][0]}</div>`
				} else {
					rowKeys += `<div class="key keyCapsLock">${layout[i][j][0]}</div>`
				}
			} else if (layout[i][j][1] === 'ArrowLeft') {
				rowKeys += `<div class="key key-arrow-left">${layout[i][j][0]}</div>`
			} else if (layout[i][j][1] === 'ArrowRight') {
				rowKeys += `<div class="key key-arrow-right">${layout[i][j][0]}</div>`
			} else if (layout[i][j][1] === 'ArrowDown') {
				rowKeys += `<div class="key key-arrow-down">${layout[i][j][0]}</div>`
			} else {
				rowKeys += `<div class="key key${layout[i][j][0]}">${label}</div>`
			}
		}
		let row = `<div class="row row${i+1}">${rowKeys}</div>`
		innerKeyboard += row;
	}
		return innerKeyboard;
	}

}

new VirtualKeyboard();









