document.addEventListener("DOMcontentLoaded", () => {
    const gameInfoContainer = document.querySelector("game-info-container");

    const fetchGameDetails = async (appid) => {
        try{
            const response = await fetch(`curl --location 'https://steam-api-dot-cs-platform-306304.et.r.appspot.com/single-game/20'`);
            const gameData = await response.json();
            displayGameDetails(gameData);
        }catch(error){
            console.log('error fetching data', error);
        }
    }

    const displayGameDetails = (game) => {
        gameInfoContainer.innerHTML = `
            <div class="game-header" style="background-image: url(${game.background});">
                <img src="${game.header_image}" alt="${game.name}">
                <h1>${game.name}</h1>
            </div>
            <div class="game-details">
                <p><strong>Release Date:</strong> ${new Date(game.release_date).toDateString()}</p>
                <p><strong>Developer:</strong> ${game.developer.join(', ')}</p>
                <p><strong>Platforms:</strong> ${game.platforms.join(', ')}</p>
                <p><strong>Categories:</strong> ${game.categories.join(', ')}</p>
                <p><strong>Genres:</strong> ${game.genres.join(', ')}</p>
                <p><strong>Tags:</strong> ${game.steamspy_tags.join(', ')}</p>
                <p><strong>Positive Ratings:</strong> ${game.positive_ratings}</p>
                <p><strong>Negative Ratings:</strong> ${game.negative_ratings}</p>
                <p><strong>Average Playtime:</strong> ${game.average_playtime} minutes</p>
                <p><strong>Price:</strong> $${game.price}</p>
                <p><strong>Description:</strong> ${game.description}</p>
            </div>
        `;
    };

    const getAppIdFromURL = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('appid');
    };

    const appid = getAppIdFromURL();
    if (appid) {
        fetchGameDetails(appid);
    } else {
        console.log('No appid found in the URL.');
    }
});

