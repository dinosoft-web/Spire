const mainHexes = document.querySelectorAll('.main')
const allHexes = document.querySelectorAll('.hexagon')
const backdrop = document.querySelector('.backdrop')

const titleData = [
	{
		title: 'coaching',
		formation: [
			{ title: 'Formation 1', duration: 2, rating: 4.5 },
			{ title: 'Formation 2', duration: 2, rating: 4.5 },
			{ title: 'Formation 3', duration: 2, rating: 4.5 },
			{ title: 'Formation 4', duration: 2, rating: 4.5 },
			{ title: 'Formation 5', duration: 2, rating: 4.5 },
		],
	},
	{
		title: 'formation',
		formation: [
			{ title: 'Formation 1', duration: 2, rating: 4.5 },
			{ title: 'Formation 2', duration: 2, rating: 4.5 },
			{ title: 'Formation 3', duration: 2, rating: 4.5 },
			{ title: 'Formation 4', duration: 2, rating: 4.5 },
			{ title: 'Formation 5', duration: 2, rating: 4.5 },
			{ title: 'Formation 6', duration: 2, rating: 4.5 },
		],
	},
	{
		title: 'mentorat',
		formation: [
			{ title: 'Formation 1', duration: 2, rating: 4.5 },
			{ title: 'Formation 2', duration: 2, rating: 4.5 },
			{ title: 'Formation 3', duration: 2, rating: 4.5 },
			{ title: 'Formation 4', duration: 2, rating: 4.5 },
			{ title: 'Formation 5', duration: 2, rating: 4.5 },
		],
	},
]

const HexNumbers = [
	[1, 2, 3, 4, 5],
	[0, 1, 2, 4, 6, 8],
	[2, 4, 5, 7, 8],
]

let filledHexes = []
let prevHtml = ''
let initialHtml = ''
let index = 0

allHexes.forEach((hex, idx) => {
	hex.addEventListener('click', () => {
		if (idx === 0 && hex.classList.contains('main')) {
			index = 0
		} else if (idx === 5 && hex.classList.contains('main')) {
			index = 1
		} else if (idx === 6 && hex.classList.contains('main')) {
			index = 2
		}

		if (
			(idx === 0 || idx === 5 || idx === 6) &&
			allHexes[0].classList.contains('main') &&
			allHexes[5].classList.contains('main') &&
			allHexes[6].classList.contains('main')
		) {
			toggleMainHex(idx, index, filledHexes, prevHtml, initialHtml)
		} else if (
			((allHexes[0].classList.contains('main') &&
				!allHexes[5].classList.contains('main') &&
				!allHexes[6].classList.contains('main')) ||
				(!allHexes[0].classList.contains('main') &&
					allHexes[5].classList.contains('main') &&
					!allHexes[6].classList.contains('main')) ||
				(!allHexes[0].classList.contains('main') &&
					!allHexes[5].classList.contains('main') &&
					allHexes[6].classList.contains('main'))) &&
			!hex.classList.contains('filled')
		) {
			clearAllHexes(filledHexes, prevHtml, initialHtml)
			for (i = 0; i <= mainHexes.length - 1; i++) {
				mainHexes[i].classList.add('main')

				mainHexes[i].innerHTML = `
				   <div class="hexacontent">
						   <h3>${titleData[i].title}</h3>
					   </div>
					`
			}
		} else if (
			hex.classList.contains('filled') &&
			!hex.classList.contains('active')
		) {
			initialHtml = allHexes[idx].innerHTML
			if (!allHexes[idx].classList.contains('active')) {
				prevHtml = initialHtml
				hexIndex = idx
			}

			console.log(hexIndex)

			showInfos(idx, index, filledHexes)

			backdrop.addEventListener('click', () => {
				allHexes[idx].classList.remove('active')
				allHexes[hexIndex].innerHTML = prevHtml
				backdrop.classList.remove('visible')
			})
		} else if (hex.classList.contains('active')) {
			hex.classList.remove('active')
			backdrop.classList.remove('visible')
			allHexes[hexIndex].innerHTML = prevHtml
		}
	})
})

const toggleMainHex = (idx, index, filledHexes) => {
	if (
		allHexes[0].classList.contains('main') &&
		allHexes[5].classList.contains('main') &&
		allHexes[6].classList.contains('main')
	) {
		clearAllHexes(filledHexes)

		allHexes[idx].classList.add('main')
		allHexes[idx].innerHTML = `
			   <div class="hexacontent">
					   <h3>${titleData[index].title}</h3>
				   </div>
				`

		fillSecondaryHexes(index, filledHexes)
	}
}

const showInfos = (idx, index) => {
	const position = HexNumbers[index].findIndex((position) => position === idx)
	allHexes[idx].classList.add('active')
	backdrop.classList.add('visible')

	allHexes[idx].innerHTML = `
	<div class="hexacontent">
		<h3>${titleData[index].formation[position].title}</h3>
		<div class="expand">
		<div class="line">
		<svg width="30px" height="20px" viewBox="0 0 24 24" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.8284 6.75736C12.3807 6.75736 12.8284 7.20507 12.8284 7.75736V12.7245L16.3553 14.0653C16.8716 14.2615 17.131 14.8391 16.9347 15.3553C16.7385 15.8716 16.1609 16.131 15.6447 15.9347L11.4731 14.349C11.085 14.2014 10.8284 13.8294 10.8284 13.4142V7.75736C10.8284 7.20507 11.2761 6.75736 11.8284 6.75736Z" fill="#0F1729"/>
</svg>
			<p>${titleData[index].formation[position].duration} heures</p>
			</div>
			<div class="line">
			<svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.0748 3.25583C11.4141 2.42845 12.5859 2.42845 12.9252 3.25583L14.6493 7.45955C14.793 7.80979 15.1221 8.04889 15.4995 8.07727L20.0303 8.41798C20.922 8.48504 21.2841 9.59942 20.6021 10.1778L17.1369 13.1166C16.8482 13.3614 16.7225 13.7483 16.8122 14.1161L17.8882 18.5304C18.1 19.3992 17.152 20.0879 16.3912 19.618L12.5255 17.2305C12.2034 17.0316 11.7966 17.0316 11.4745 17.2305L7.60881 19.618C6.84796 20.0879 5.90001 19.3992 6.1118 18.5304L7.18785 14.1161C7.2775 13.7483 7.1518 13.3614 6.86309 13.1166L3.3979 10.1778C2.71588 9.59942 3.07796 8.48504 3.96971 8.41798L8.50046 8.07727C8.87794 8.04889 9.20704 7.80979 9.35068 7.45955L11.0748 3.25583Z" stroke="#000000" stroke-width="2"/>
</svg>
			<p>Note : ${titleData[index].formation[position].rating}/5</p>
			</div>
		</div>
		<button>En savoir plus</button>
	</div>

	`
}

const fillSecondaryHexes = (index, filledHexes) => {
	let loop = 0
	HexNumbers[index].forEach((num) => {
		allHexes[num].classList.add('filled')
		allHexes[num].innerHTML = `
					<div class="hexacontent">
							<h3>${titleData[index].formation[loop].title}</h3>
						</div>
					 `
		filledHexes.push(allHexes[num])
		loop++
	})
}

const clearAllHexes = (filledHexes, prevHtml, initialHtml) => {
	filledHexes.length = 0
	initialHtml = ''
	prevHtml = ''

	allHexes.forEach((hex) => {
		hex.classList.remove('main')
		hex.classList.remove('filled')
		hex.innerHTML = ''
	})
}
