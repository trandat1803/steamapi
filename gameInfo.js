// game-info.js

document.addEventListener("DOMContentLoaded", () => {
    const gameInfoSection = document.querySelector(".game-info");
    const params = new URLSearchParams(window.location.search);
    const appid = params.get("appid");

    const fetchGameInfo = async () => {
        if (appid) {
            try {
                const response = await fetch(`https://steam-api-dot-cs-platform-306304.et.r.appspot.com/genres ${appid}`);
                const game = await response.json();
                displayGameInfo(game);
            } catch (error) {
                console.error('Error fetching game details:', error);
                gameInfoSection.innerHTML = "<p>Failed to load game details.</p>";
            }
        } else {
            gameInfoSection.innerHTML = "<p>Game not found.</p>";
        }
    };

    const displayGameInfo = (game) => {
        gameInfoSection.innerHTML = `
            <h1>${game.name}</h1>
            <img src="${game.header_image}" alt="${game.name}">
            <p>Release Date: ${new Date(game.release_date).toDateString()}</p>
            <p>Developer: ${game.developer.join(', ')}</p>
            <p>Price: $${game.price}</p>
            <p>Description: ${game.description}</p>
        `;
    };

    fetchGameInfo();
});
