const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// the + sign coverts the value to a number
let ticketPrice = +movieSelect.value;

// save movie index and price
const movieData = (movieIndex, moviePrice) => {
	localStorage.setItem('selectedMovieIndex', movieIndex);
	localStorage.setItem('selectedMoviePrice', moviePrice);
}

// update selected count 
const updateSelectedCountAndTotal = () => {
	const selectedSeats = document.querySelectorAll('.row .seat.selected');

	const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
	
	localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

	const selectedSeatCount = selectedSeats.length;
	count.innerText = selectedSeatCount;
	total.innerText = selectedSeatCount * ticketPrice;
}

// get data from local storage and populate UI
const populateUI = () => {
	const uiSeats = JSON.parse(localStorage.getItem('selectedSeats'));
	console.log(uiSeats);

// -1 means if an index isn't in the local staorage, it = -1
// so if it's > -1, it means the index is in local storage
	if (uiSeats !== null && uiSeats.length > 0) {
		seats.forEach((seat, index) => {
			if (uiSeats.indexOf(index) > -1) {
				seat.classList.add('selected');
			}
		})
	}

	const movieIndex = localStorage.getItem('selectedMovieIndex');

	if (movieIndex !== null) {
		movieSelect.selectedIndex = movieIndex;
	}
}

// movie select event listener 
movieSelect.addEventListener('change', e => {
	ticketPrice = +e.target.value;
	movieData(e.target.selectedIndex, e.target.value);
	updateSelectedCountAndTotal();
})

// add event listener
container.addEventListener('click', e => {
	if (e.target.classList.contains('seat') &&
	!e.target.classList.contains('occupied')) {
		e.target.classList.toggle('selected');

		updateSelectedCountAndTotal();
	} 
})

populateUI();
updateSelectedCountAndTotal();