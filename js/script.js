// Nav Links
const navBtn = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
const menu = document.querySelectorAll('.menu');
const menuList = document.querySelectorAll('.menu__list');
const links = document.querySelectorAll('.nav__link');

// Main Section
const mainSection = document.querySelector('.main');
const headerTitle = document.querySelector('.header__title');

// Navigation Behavior
function handleNav() {
	nav.classList.toggle('nav--active');
	mainSection.classList.toggle('main--active');
	headerTitle.classList.toggle('header__title--active');
	navBtn.classList.toggle('is-active');
}

// Event Listeners
navBtn.addEventListener('click', handleNav);
links.forEach((link) => {
	link.addEventListener('click', handleNav);
});
headerTitle.addEventListener('click', () => window.location.reload());

menu.forEach((item, idx) =>
	item.addEventListener('mouseenter', () => {
		menuList[idx].classList.add('menu__list--active');
	})
);
menu.forEach((item, idx) =>
	item.addEventListener('mouseleave', () => {
		menuList[idx].classList.remove('menu__list--active');
	})
);

const apiKey = '91d37b248bc493220dad9af41c35790a';

// API URLS
const popularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=`;
const topRatedMovies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=`;
const upcomingMovies = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=`;
const topRatedTv = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&page=`;
const popularPeople = `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&language=en-US&page=`;
const imgPath = 'https://image.tmdb.org/t/p/w300';
const searchURL = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query="`;

// Item Data
const itemsContainer = document.querySelector('.main__items-container');
const mainTitle = document.querySelector('.main__title');
const mainSubtitle = document.querySelector('.main__subtitle');
const addListNotification = document.querySelector('.main__notification-text');

// Searchbox
const form = document.querySelector('.nav__form');
const search = document.querySelector('.nav__searchbox');

// Nav Links
const navLinks = document.querySelectorAll('.nav__link');

// Page Buttons
const pageBtns = document.querySelectorAll('.main__btn');
const pageBtnContainer = document.querySelector('.main__btn-container');
let page = 1;
let urlLink = popularMovies

// Listeners added to change page button
let listenersAdded = false

// Watchlist/Favorites Containers
let watchList = [];
let favorites = [];

// Get Data From API
async function getData(url) {
	const res = await fetch(url + page);
	const data = await res.json();
	const results = data.results;
	showList(results);
	
	// Change Page
	if (!listenersAdded) {
        pageBtns.forEach((btn) => {
            btn.addEventListener('click', () => changePage(urlLink, btn));
        });
        listenersAdded = true; // Set the flag so this block won't run again
    }
}

// Show Popular Movies OnLoad
getData(popularMovies);

// Change Sections
function changeSection(link) {
	page = 1;
	document.querySelector('.prev-btn').classList.remove('prev-btn--active');
	document.querySelector('.next-btn').classList.add('next-btn--active');
	if (link.classList.contains('top-rated-movies')) {
		urlLink = topRatedMovies
		getData(topRatedMovies);
		mainTitle.textContent = 'Top rated movies';
	} else if (link.classList.contains('upcoming-movies')) {
		urlLink = upcomingMovies
		getData(upcomingMovies);
		mainTitle.textContent = 'Upcoming movies';
	} else if (link.classList.contains('top-rated-tv')) {
		urlLink = topRatedTv
		getData(topRatedTv);
		mainTitle.textContent = 'Top rated TV Series';
	} else if (link.classList.contains('popular-people')) {
		urlLink = popularPeople
		getData(popularPeople);
		mainTitle.textContent = 'Popular people';
	} else if (link.classList.contains('watchlist')) {
		showList(watchList);
		mainTitle.textContent = 'My watchlist';
	} else if (link.classList.contains('favorites')) {
		showList(favorites);
		mainTitle.textContent = 'My favorites';
	}
}

// Show List Of Movies/TV/People
function showList(items) {
	itemsContainer.innerHTML = '';
	items.forEach((item) => {
		const {
			title,
			name,
			poster_path,
			profile_path,
			vote_average,
			overview,
			release_date,
			first_air_date,
			known_for,
			gender,
		} = item;

		const element = document.createElement('div');
		element.classList.add('item');
		element.innerHTML = `
        <div class="item__img-box">
            <img src=${
							poster_path || profile_path
								? `${
										poster_path ? imgPath + poster_path : imgPath + profile_path
								  }`
								: 'https://cdn.pixabay.com/photo/2017/02/01/00/26/cranium-2028555_1280.png'
						} alt="${title ? title : name}"} class="item__img">
        </div>
        <div class="item__info-box">
            <div class="item__header">

			${
				!gender
					? `<p class="item__year">${(release_date
							? release_date
							: first_air_date
					  ).slice(0, 4)}</p>`
					: ''
			}

				
				${
					vote_average
						? `<p class="item__rating ${ratingColor(
								vote_average
						  )}">${vote_average.toFixed(1)}</p>`
						: ''
				}
                <h3 class="item__title">${title ? title : name}</h3>
              
            </div>
			${
				known_for
					? `${
							known_for
								? `<p style="font-size: .8rem">Known for: </br><span style="color: gold">• ${known_for.map(el => {return el.title ? el.title + ' • ' : '' }).join('')}</span></p>`
								: ''
					  }`
					: ''
			}
			
			${
				!gender
					? `${
							items === watchList || items === favorites
								? `<div class="item__btn-container" style="flex-direction:row; justify-content:space-between; width: 100%">
        	    <button class="item__btn remove-btn">- remove</button>
        	    <button class="item__btn info-btn">i</button>
        	</div>   `
								: `<div class="item__btn-container">
				<button class="item__btn watchlist-btn">+ watchlist</button>
				<button class="item__btn favorites-btn">+ favorites</button>
				<button class="item__btn info-btn">i</button>
			</div>`
					  }`
					: `<div class="item__btn-container" style="display:none">
					<button class="item__btn watchlist-btn">+ watchlist</button>
					<button class="item__btn favorites-btn">+ favorites</button>
			</div>`
			}
        </div>

		${
			overview
				? `
				<div class="item__info"> 
				<p class="item__close-btn">x</p>
				<p>${title ? title : name}</p> ${
						!gender
							? `</br></br><p>${
									release_date ? release_date : first_air_date
							  }</p>`
							: ''
				  } </br></br></br> <p>${overview}</p></div>`
				: '<p class="item__info">No info found</p>'
		} `;
		itemsContainer.appendChild(element);
	});

	items === watchList || items === favorites
		? (pageBtnContainer.style.display = 'none')
		: (pageBtnContainer.style.display = 'inline-block');

	items.length === 0
		? (mainSubtitle.style.display = 'inline')
		: (mainSubtitle.style.display = 'none');
	showInfo();
	showPageBtns()
	addToWatchList(items);
	addToFavorites(items);
	removeItemFromMyList(items);
}

// Handle Rating Color
function ratingColor(vote) {
	if (vote >= 8) {
		return 'green';
	} else if (vote >= 5) {
		return 'orange';
	} else {
		return 'red';
	}
}

// Show Info On Click
function showInfo() {
	const itemsInfo = document.querySelectorAll('.item__info');
	const infoBtns = document.querySelectorAll('.info-btn');
	const infoCloseBtns = document.querySelectorAll('.item__close-btn');
	infoBtns.forEach((btn, idx) =>
		btn.addEventListener('click', () => {
			itemsInfo.forEach((infoEl) =>
				infoEl.classList.remove('item__info--active')
			);
			btn
				.closest('.item__info-box')
				.nextElementSibling.classList.add('item__info--active');
				infoCloseBtns[idx].addEventListener('click', () =>
				itemsInfo[idx].classList.remove('item__info--active')
			);
			
		})
	);
}

// Add And Remove From List
function addToWatchList(items) {
	const watchlistBtns = document.querySelectorAll('.watchlist-btn');
	watchlistBtns.forEach((btn, idx) => {
		btn.addEventListener('click', () => {
			createItemAddToList(watchList, items, idx, 'Added to watchlist');
		});
	});
}
function addToFavorites(items) {
	const favoritesBtns = document.querySelectorAll('.favorites-btn');
	favoritesBtns.forEach((btn, idx) => {
		btn.addEventListener('click', () => {
			createItemAddToList(favorites, items, idx, 'Added to favorites');
		});
	});
}
function createItemAddToList(list, items, idx, notification) {
	let isOnList = Boolean(list.find((el) => el.title === items[idx].title));
	if (!isOnList) {
		list.push(items[idx]);
		showNotification(notification);
	} else {
		showNotification('Already on the list');
		return;
	}
	updateLS();
}
function removeItemFromMyList(list) {
	const removeBtns = document.querySelectorAll('.remove-btn');
	removeBtns.forEach((btn, idx) => {
		btn.addEventListener('click', () => {
			list.splice(idx, 1);
			if (list === favorites) {
				showList(list);
			} else if (list === watchList) {
				showList(list);
			}
		});
	});
	updateLS();
}

function showNotification(text) {
	addListNotification.textContent = text;
	addListNotification.classList.add('main__notification-text--active');
	setTimeout(() => {
		addListNotification.classList.remove('main__notification-text--active');
	}, 1000);
}

// Local Storage Update
function updateLS() {
	localStorage.setItem('watchList', JSON.stringify(watchList));
	localStorage.setItem('favorites', JSON.stringify(favorites));
}
function getFromLS() {
	const watchListLS = JSON.parse(localStorage.getItem('watchList'));
	const favoritesLS = JSON.parse(localStorage.getItem('favorites'));
	if (watchListLS) {
		watchListLS.forEach((item) => watchList.push(item));
	}
	if (favoritesLS) {
		favoritesLS.forEach((item) => favorites.push(item));
	}
}
getFromLS();

// Show/hide page buttons
function hidePageBtns() {
	pageBtns.forEach(btn => btn.style.visibility = 'hidden')
}
function showPageBtns() {
	pageBtns.forEach(btn => btn.style.visibility = 'visible')
}

// Change Page
function changePage(url, btn) {
			if (btn.classList.contains('next-btn')) {
				document.querySelector('.prev-btn').classList.add('prev-btn--active');
				page++;
			} else {
				document.querySelector('.next-btn').classList.add('next-btn--active');
				page--;
			}
			if (page === 1) {
				btn.classList.remove('prev-btn--active');
			}
			if (page === 5) {
				btn.classList.remove('next-btn--active');
			}
			window.scrollTo({top:0, behavior: 'smooth'})
			getData(url)
			console.log(page);
}



// Event Listeners
form.addEventListener('submit', (e) => {
	e.preventDefault();
	const searchTerm = search.value;
	hidePageBtns()
	if (searchTerm && searchTerm !== '') {
		getData(searchURL + searchTerm + '"&page=');
		handleNav();
		mainTitle.textContent = `Found results`;
		search.value = '';
	} else {
		window.location.reload();
		mainTitle.textContent = `Movies popular now`;
	}
});
navLinks.forEach((link) =>
	link.addEventListener('click', () => changeSection(link))
);

