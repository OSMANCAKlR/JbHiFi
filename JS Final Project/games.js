const gameListEl = document.querySelector(".games-list");
const gamesWrapper = document.querySelector(".games")

async function main(filter) {
  gamesWrapper.classList += ' games__loading'
  const games = await fetch(
    "https://api.rawg.io/api/games?key=75086e988cdc447b9da1b7531cb1e1ca"
  );
  const gamesData = await games.json();
  gamesWrapper.classList.remove('games__loading')
    if (filter === "LOW_TO_HIGH") {
        gamesData.results.sort((a,b) => a.rating - b.rating)
    }  
   else if (filter === "HIGH_TO_LOW") {
        gamesData.results.sort((a,b) => b.rating - a.rating)
    }



  gameListEl.innerHTML = gamesData.results
    .map((game) => gameHTML(game))
    .join("");

    
    const searchInput = document.getElementById("search");
    const searchValue = searchInput.value;



    const filteredData = gamesData.results.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()));

    gameListEl.innerHTML = filteredData.map((game) => gameHTML(game))
    .join("");

    console.log(filteredData)
}

main();

function gameHTML(game) {
    let platforms = "";
    for (const platform of game.parent_platforms) {
      platforms += platform.platform.name + " ";
    }
  
    
    let randomNum = Math.floor(Math.random() * 7);
    let price = (80 + (randomNum * 5) + (randomNum > 2 ? 10 : 0)).toFixed(2);
  
    return `
      <div class="game">
        <div class="game-card">
          <div class="game-card__container">
            <img class="game__img" src="${game.background_image}" alt="">
            <p class="game__title"> ${game.name}</p>
            <p class="game__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum aliquam totam vel, itaque corrupti eius voluptates sed exercitationem sit blanditiis asperiores neque consectetur id consequatur.</p>
            <p class="game__price">$${price}</p>
            <p class="game__rating">Rating : ${game.rating}</p>
            <button class="game__button">Buy Now</button>
          </div>
        </div>
      </div>
    `;
  }


function filterName(event) {
  main(event.target.value);
}

function filterGames(event) {
  main(event.target.value);
}