document.addEventListener("DOMContentLoaded", function() {
    fetch('https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games')
    .then(response => response.json())
    .then(json => {
        const data = json.data;
        const gameGrid = document.querySelector('.game-grid');
        data.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.classList.add('game-card');
            gameCard.innerHTML = `
                <a href="game.html?id=${game.appid}">
                    <img src="${game.header_image}" alt="${game.name}">
                    <h3>${game.name}</h3>
                    <p>Price: $${game.price.toFixed(2)}</p>
                </a>
            `;
            gameGrid.appendChild(gameCard);
        });
    })
    .catch(error => console.error('Error fetching the game data:', error));
});


document.addEventListener("DOMContentLoaded", () => {
    const gameList = document.getElementById("game-list");
    const gameDetails = document.getElementById("game-details");

    // Fetch and display the list of games
    fetch('https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games')
        .then(response => response.json())
        .then(data => {
            displayGameList(data.data);
        })
        .catch(error => console.error('Error fetching games:', error));

    function displayGameList(games) {
        games.forEach(game => {
            const gameCard = document.createElement("div");
            gameCard.className = "game-card";
            gameCard.innerHTML = `
                <img src="${game.header_image}" alt="${game.name}">
                <h3>${game.name}</h3>
                <p>$${game.price}</p>
            `;
            gameCard.addEventListener("click", () => showGameDetails(game.appid));
            gameList.appendChild(gameCard);
        });
    }

    function showGameDetails(appid) {
        fetch(`https://steam-api-dot-cs-platform-306304.et.r.appspot.com/single-game/${appid}`)
            .then(response => response.json())
            .then(game => {
                gameDetails.innerHTML = `
                    <h1>${game.name}</h1>
                    <img src="${game.header_image}" alt="${game.name}">
                    <p>Release Date: ${new Date(game.release_date).toDateString()}</p>
                    <p>Developer: ${game.developer.join(', ')}</p>
                    <p>Price: $${game.price}</p>
                    <p>Description: ${game.description}</p>
                `;
                toggleView();
            })
            .catch(error => console.error('Error fetching game details:', error));
    }

    function toggleView() {
        gameList.classList.toggle("hidden");
        gameDetails.classList.toggle("hidden");
    }

    document.getElementById("home").addEventListener("click", () => {
        gameDetails.classList.add("hidden");
        gameList.classList.remove("hidden");
    });
});
