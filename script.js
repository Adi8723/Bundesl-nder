
let bundesland =[]
let letters = [];


async function init() { 
	let url = './bundesland.json'
	let res = await fetch(url)
	bundesland = await res.json()
	console.log('resAsJson :>> ', bundesland);
	render()
}

function render(filter) { 
	let content = document.getElementById('content');
	content.innerHTML = '';
	for (let i = 0; i < bundesland.length; i++) {
		const land = bundesland[i];
		const population = (bundesland[i]['population'] + '').replace('.', ',');
		const firstLetter = land['name'].charAt(0);

		if (!filter || filter == firstLetter) {
			content.innerHTML += generateLink(land, population);
		}

		if (!letters.includes(firstLetter)) {
			
			letters.push(firstLetter)
		}

	}
	renderLetters()
}


function setFilter(letter) { 
	render(letter);
}


function renderLetters() { 
	let letterBox = document.getElementById('letterbox');
	letterBox.innerHTML = '';

	for (let i = 0; i < letters.length; i++) {
		const letter = letters[i];
		letterBox.innerHTML += /*html*/`
		<div onclick="setFilter('${letter}')" class="letterCard">${letter}</div>
	
		`
	}
	

}

function generateLink(land, population) {
	return /*html*/`
		<a href="${land['url']}" class="card" target="_blank">
			<div class="txt-black">${land['name']}</div>
			<div class="txt-gray">${population} Millionen</div>
		</a>
		
		`;
}