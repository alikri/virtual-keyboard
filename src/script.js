
class VirtualKeyboard {
	constructor() {
		this.wrapper = null;
		this.container = null;
		this.keyboard = null;
		this.textarea = null;
		this.layoutIndex = 0;
		this.shiftPressed = false;
		this.capsLockActive = false;
		this.keyList = [
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
		this.keyboard.innerHTML = this.generateKeyboardHtml(this.keyList);
		this.textarea.classList.add("textarea");
		this.keyboard.classList.add('keyboard');
		this.wrapper.appendChild(this.container);
		this.container.appendChild(this.textarea);
		this.container.appendChild(this.keyboard);
	
	}

	generateKeyboardHtml(layout) {
		let innerKeyboard = '';
		for (let i = 0; i < layout.length; i++) {
			let rowKeys = ``;
			for (let j = 0; j < layout[i].length; j++) {
				if (layout[i][j][1] === 'Space') {
					rowKeys += `<div class="key keySpace">${layout[i][j][0]}</div>`
				} else {
					rowKeys += `<div class="key key${layout[i][j][0]}">${layout[i][j][0]}</div>`
				}
				
			}
			let row = `<div class="row">${rowKeys}</div>`
			innerKeyboard += row;
		}
		console.log(innerKeyboard);
		return innerKeyboard;
	}


}

new VirtualKeyboard();









