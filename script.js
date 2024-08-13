document.addEventListener("DOMContentLoaded", () => {
    const gameGrid = document.querySelector(".game-grid");

    const fetchGames =async() => {
        try {
            const response = await fetch('https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games');
            const data = await response.json();
            displayGameCards(data.data);
        }catch (error){
            console.log('error fetching game', error);
        }
    };

    const displayGameCards = (games) => {
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

    const navigateToGameInfo = (appid) => {
        window.location.href = `gameInfo.html?appid=${appid}`;
    };

    fetchGames();
})