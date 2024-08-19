document.addEventListener("DOMContentLoaded", () => {
    const gameGrid = document.querySelector(".game-grid");
    const searchBtn = document.getElementById("search-btn");
    const searchInput = document.getElementById("search-input");
    const categoriesList = document.querySelector(".sidebar ul");
    let gamesData = [];



    const fetchGames =async() => {
        try {
            const response = await fetch('https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games');
            const data = await response.json();
            gamesData = data.data;
            displayGameCards(gamesData);
        }catch (error){
            console.log('error fetching game', error);
        }
    };

    const displayGameCards = (games) => {
        gameGrid.innerHTML = '';
        games.forEach(game =>{
            const gameCard = document.createElement("div");
            gameCard.className = "game-card";
            gameCard.innerHTML = 
            `<img src="${game.header_image}" alt="${game.name}">
                <h3>${game.name}</h3>
                <p>$${game.price}</p>
                `;
            gameCard.addEventListener("click", () => navigateToGameInfo(game.appid));
            gameGrid.appendChild(gameCard);
        });
    };

    const navigateToGameInfo= (appid) => {
        window.location.href = `gameInfo.html?appid=${appid}`;
    };

    const searchGames = () => {
        const searchTerms = searchInput.value.toLowerCase()
        const filteredGames = gamesData.filter(game => game.name.toLowerCase().includes(searchTerms));
        displayGameCards(filteredGames);
    }

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://steam-api-dot-cs-platform-306304.et.r.appspot.com/genres');
            const data = await response.json();
            const categories = data.data;
            displayCategories(categories);
        } catch (error) {
            console.log('Error fetching categories:', error);
        }
    };

    const displayCategories = (categories) => {
        categories.forEach(category => {
            const categoryItem = document.createElement("li");
            const categoryLink = document.createElement("a");
            categoryLink.href = `#`;
            categoryLink.textContent = `${category.name}`;
            categoryLink.dataset.category = category.name;
            categoryLink.addEventListener("click", () => filterGamesByCategory(category.name));
            categoryItem.appendChild(categoryLink);
            categoriesList.appendChild(categoryItem);
        });
    };

    const filterGamesByCategory = async (categoryName) => {
        try {
            const response = await fetch(`https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games?genres=${categoryName}`);
            const data = await response.json();
            displayGameCards(data.data);
        } catch (error) {
            console.log('Error fetching games by category:', error);
        }
    };


    searchBtn.addEventListener("click", searchGames);

    fetchGames();
    fetchCategories();
})