
class VirtualKeyboard {
	constructor() {
		this.wrapper = null;
		this.container = null;
		this.keyboard = null;
		this.textarea = null;
		this.layout = false;
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
						['Shift', 'ShiftLeft'], ['`', '~'], ['z', 'Z'], ['x', 'X'], ['c', 'C'], ['v', 'V'], ['b', 'B'], ['n', 'N'], ['m', 'M'], [',', '<'], ['.', '>'], ['/', '?'], ['▼','ArrowUp'], ['Shift', 'ShiftRight']
					],
					[
						['Control'], ['Alt', 'AltLeft'], ['Meta', 'MetaLeft'], [' ', 'Space'], ['Meta', 'MetaRight'], ['Alt', 'AltRight'], [ '▼', 'ArrowLeft'], ['▼','ArrowDown'], ['▼','ArrowRight']
					]
		];
		this.keyListR = [
			[
				['>', '<'], ['1', '!'], ['2', '"'], ['3', '№'], ['4', '%'], ['5', ':'], ['6', ','], ['7', '.'], ['8', ';'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], ['Backspace']
			],
			[
				['Tab'], ['й', 'Й'], ['ц', 'Ц'], ['у', 'У'], ['к', 'К'], ['е', 'Е'], ['н', 'Н'], ['г', 'Г'], ['ш', 'Ш'], ['щ', 'Щ'], ['з', 'З'], ['х', 'Х'], ['ъ', 'Ъ'], ['Enter']
			],
			[
				['CapsLock'], ['ф', 'Ф'], ['ы', 'Ы'], ['в', 'В'], ['а', 'А'], ['п', 'П'], ['р', 'Р'], ['о', 'О'], ['л', 'Л'], ['д', 'Д'], ['ж', 'Ж'], ['э', 'Э'], ['ё', 'Ё']
			],
			[
				['Shift', 'ShiftLeft'],[']', '['], ['я', 'Я'], ['ч', 'Ч'], ['с', 'С'], ['м', 'М'], ['и', 'И'], ['т', 'Т'], ['ь', 'Ь'], ['б', 'Б'], ['ю', 'Ю'], ['/', '?'], ['▼', 'ArrowUp'], ['Shift', 'ShiftRight']
			],
			[
				['Control'], ['Alt', 'AltLeft'], ['Meta'], [' ', 'Space'], ['Meta'], ['Alt', 'AltRight'], [ '▼', 'ArrowLeft'], ['▼','ArrowDown'], ['▼','ArrowRight']
			]
		]
			
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
		const savedLayout = localStorage.getItem('layout'); 
		if (savedLayout === "true") {
			this.keyboard.innerHTML = "";
			this.keyboard.innerHTML = this.generateKeyboardHtml(this.keyListR);
		} else {
			this.keyboard.innerHTML = "";
			this.keyboard.innerHTML = this.generateKeyboardHtml(this.keyListE);
		}
	}

	generateKeyboardHtml(layout) {
		let innerKeyboard = '';
		for (let i = 0; i < layout.length; i++) {
			let rowKeys = ``;
			for (let j = 0; j < layout[i].length; j++) {
				if (layout[i][j][1] === 'Space') {
					rowKeys += `<div class="key keySpace">${layout[i][j][0]}</div>`
				} else if (layout[i][j][1] === '±') {
					rowKeys += `<div class="key key-backquote">${layout[i][j][0]}</div>`
				} else if (layout[i][j][1] === 'AltLeft') {
					rowKeys += `<div class="key keyAltLeft">${layout[i][j][0]}</div>`
				} else if (layout[i][j][1] === 'AltRight') {
					rowKeys += `<div class="key keyAltRight">${layout[i][j][0]}</div>`
				} else if (layout[i][j][1] === 'MetaLeft') {
					rowKeys += `<div class="key keyMeta keyMetaLeft">${layout[i][j][0]}</div>`
				} else if (layout[i][j][1] === 'MetaRight') {
					rowKeys += `<div class="key keyMeta keyMetaRight">${layout[i][j][0]}</div>`
				} else if (layout[i][j][1] === 'ArrowUp') {
					rowKeys += `<div class="key keyArrowUp">${layout[i][j][0]}</div>`
				} else if (layout[i][j][0] === 'CapsLock') {
					if (this.capsLockActive) {
						rowKeys += `<div class="key keyCapsLock pressed">${layout[i][j][0]}</div>`
					} else {
						rowKeys += `<div class="key keyCapsLock">${layout[i][j][0]}</div>`
					}
				} else if (layout[i][j][1] === 'ArrowLeft') {
					rowKeys += `<div class="key keyArrowLeft">${layout[i][j][0]}</div>`
				} else if (layout[i][j][1] === 'ArrowRight') {
					rowKeys += `<div class="key keyArrowRight">${layout[i][j][0]}</div>`
				} else if (layout[i][j][1] === 'ArrowDown') {
					rowKeys += `<div class="key keyArrowDown">${layout[i][j][0]}</div>`
				} else if (layout[i][j][1] === 'ShiftLeft') {
					rowKeys += `<div class="key keyShift keyShiftLeft">${layout[i][j][0]}</div>`
				} else if (layout[i][j][1] === 'ShiftRight') {
					rowKeys += `<div class="key keyShift keyShiftRight">${layout[i][j][0]}</div>`
				} else if (layout[i][j][0] === 'Control') {
					rowKeys += `<div class="key keyCtrl keyControl">Ctrl</div>`
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
			if (key.classList.contains('key')) {
				key.classList.add('pressed');
				if (key.classList.contains('keyArrowUp')) {
					this.keyPressAction('ArrowUp');
				} else if (key.classList.contains('keyArrowDown')) {
					this.keyPressAction('ArrowDown');
				} else if (key.classList.contains('keyArrowRight')) {
					this.keyPressAction('ArrowRight');
				} else if (key.classList.contains('keyArrowLeft')) {
					this.keyPressAction('ArrowLeft');
				} else {
					this.keyPressAction(key.innerHTML);
				}
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
				let keyElement;
				if (event.shiftKey && event.altKey) {
					this.layout = !this.layout;
					localStorage.setItem('layout', this.layout);
					this.switchLayout()
				}
				if (event.code === 'Space' || event.code === 'ShiftLeft' || event.code === 'ShiftRight' || event.code === 'AltRight' || event.code === 'AltLeft'  || event.code === 'MetaLeft' || event.code === 'MetaRight') {
					keyElement = event.code;
				} else {
					keyElement = event.key;
				}
				if (keyElement) {
					this.keyPressAction(keyElement);
					let key = document.querySelector(`.key${keyElement}`)
					if (key.classList.contains("keyCapsLock")) return;
					key.classList.add('pressed');
				}
				
			});

			document.addEventListener('keyup', (event) => {
				let keyElement;
				if (event.code === 'Space' || event.code === 'ShiftLeft' || event.code === 'ShiftRight' || event.code === 'AltRight' || event.code === 'AltLeft' || event.code === 'MetaLeft' || event.code === 'MetaRight') {
					keyElement = event.code;
				} else {
					keyElement = event.key;
				}
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
					case 'Alt':
						this.textarea.value += '';
					break;
					case 'AltRight':
						this.textarea.value += '';
					break;
					case 'AltLeft':
						this.textarea.value += '';
					break;
					case 'Space':
						this.textarea.value += ' ';
						break;
					case 'Enter':
							this.textarea.value += '\n';
							break;
					case 'Tab':
							this.textarea.value += '\t';
					break;
					case 'ArrowDown':
						this.textarea.value += '▼';
					break;
					case 'ArrowRight':
						this.textarea.value += '►';
					break;
					case 'ArrowUp':
						this.textarea.value += '▲';
					break;
					case 'ArrowLeft':
						this.textarea.value += '◄';
						break;
					case 'CapsLock':
					this.capsLockActive = !this.capsLockActive;
					this.getCapslockKey(this.capsLockActive);
					break;
					case 'Meta':
					this.textarea.value += '';
					break;
					case 'MetaLeft':
					this.textarea.value += '';
					break;
					case 'MetaRight':
					this.textarea.value += '';
								break;
				case 'ShiftRight':
					this.textarea.value += '';
					break;
					case 'Shift':
						this.textarea.value += '';
							break;
				case 'ShiftLeft':
					this.textarea.value += '';
						break;
				case 'Control':
					this.textarea.value += '';
					break;
					case 'Ctrl':
						this.textarea.value += '';
								break;
					default:
							this.textarea.value +=  key;
							break;
			}
	}

	getCapslockKey(key) {
		if (key) {
			this.keyboard.innerHTML = '';
			const savedLayout = localStorage.getItem('layout'); 
			if (savedLayout === "true") {
				this.keyboard.innerHTML = this.toggleCapsLock(this.keyListR);
			} else {
				this.keyboard.innerHTML = this.toggleCapsLock(this.keyListE);
			}
			
		} else {
			this.keyboard.innerHTML = '';
			const savedLayout = localStorage.getItem('layout'); 
			if (savedLayout === "false") {
				this.keyboard.innerHTML = this.toggleCapsLock(this.keyListE);
			} else {
				this.keyboard.innerHTML = this.toggleCapsLock(this.keyListR);
			}
		}
	}


	toggleCapsLock(layout) {
		let innerKeyboard = '';
	for (let i = 0; i < layout.length; i++) {
		let rowKeys = ``;
		for (let j = 0; j < layout[i].length; j++) {
			let label = this.capsLockActive && layout[i][j][1] ? layout[i][j][1] : layout[i][j][0];
			if (layout[i][j][1] === 'Space') {
				rowKeys += `<div class="key keySpace">${layout[i][j][0]}</div>`
			} else if (layout[i][j][1] === '±') {
				rowKeys += `<div class="key key-backquote">${label}</div>`
			} else if (layout[i][j][1] === 'ArrowUp') {
				rowKeys += `<div class="key keyArrowUp">${layout[i][j][0]}</div>`
			} else if (layout[i][j][0] === 'CapsLock') {
				if (this.capsLockActive) {
					rowKeys += `<div class="key keyCapsLock pressed">${layout[i][j][0]}</div>`
				} else {
					rowKeys += `<div class="key keyCapsLock">${layout[i][j][0]}</div>`
				}
			} else if (layout[i][j][1] === 'MetaLeft') {
				rowKeys += `<div class="key keyMeta keyMetaLeft">${layout[i][j][0]}</div>`
			} else if (layout[i][j][1] === 'MetaRight') {
				rowKeys += `<div class="key keyMeta keyMetaRight">${layout[i][j][0]}</div>`
			} else if (layout[i][j][1] === 'AltLeft') {
				rowKeys += `<div class="key keyAltLeft">${layout[i][j][0]}</div>`
			} else if (layout[i][j][1] === 'AltRight') {
				rowKeys += `<div class="key keyAltRight">${layout[i][j][0]}</div>`
			} else if (layout[i][j][1] === 'ArrowLeft') {
				rowKeys += `<div class="key keyArrowLeft">${layout[i][j][0]}</div>`
			} else if (layout[i][j][1] === 'ArrowRight') {
				rowKeys += `<div class="key keyArrowRight">${layout[i][j][0]}</div>`
			} else if (layout[i][j][1] === 'ArrowDown') {
				rowKeys += `<div class="key keyArrowDown">${layout[i][j][0]}</div>`
			} else if (layout[i][j][1] === 'ShiftLeft') {
				rowKeys += `<div class="key keyShift keyShiftLeft">${layout[i][j][0]}</div>`
			} else if (layout[i][j][0] === 'Control') {
				rowKeys += `<div class="key keyCtrl keyControl">Ctrl</div>`
			} else if (layout[i][j][1] === 'ShiftRight') {
				rowKeys += `<div class="key keyShift keyShiftRight">${layout[i][j][0]}</div>`
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









