//If you would like to, you can create a variable to store the API_URL here.
//This is optional. if you do not want to, skip this and move on.
const puppyUrl = "https://fsa-puppy-bowl.herokuapp.com/api/2501-ftb-et-web-am-PUPPIES/players"
/////////////////////////////
/*This looks like a good place to declare any state or global variables you might need*/
let players = []
////////////////////////////
const puppyRoster = document.querySelector("#puppyRoster")
const singlePuppy = document.querySelector("#singlePuppy")
const newPlayerForm = document.querySelector("#newPlayerForm")
window.addEventListener("hashchange", () => {
    render()
})

newPlayerForm.addEventListener("submit", async (event) => {
  event.preventDefault()
  const addNewPlayer = {
    name: event.target.name.value,
    breed: event.target.breed.value
  } 
})



/**
 * Fetches all players from the API.
 * This function should not be doing any rendering
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async () => {
  //TODO
    const response = await fetch(puppyUrl)
    const data = await response.json()
    return data.data.players

};

/**
 * Fetches a single player from the API.
 * This function should not be doing any rendering
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (singlePlayer) => {
  //TODO

    const playerData = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2501-ftb-et-web-am-PUPPIES/players/${singlePlayer.id}`)
    const singlePlayerData = await playerData.json()
    console.log(singlePlayerData)
    renderSinglePlayer(singlePlayerData)

};

/**
 * Adds a new player to the roster via the API.
 * Once a player is added to the database, the new player
 * should appear in the all players page without having to refresh
 * @param {Object} newPlayer the player to add
 */
/* Note: we need data from our user to be able to add a new player
 * Do we have a way to do that currently...? 
*/
/**
 * Note#2: addNewPlayer() expects you to pass in a
 * new player object when you call it. How can we
 * create a new player object and then pass it to addNewPlayer()?
 */
/**
 * FOR TESTING PURPOSES ONLY PLEASE OBSERVE THIS SECTION
 * @returns {Object} the new player object added to database
 */

const addNewPlayer = async (addNewPlayer) => {
  //TODO
  try {
    repsonse = await fetch(puppyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPlayer)
    })
    const json = await response.json()
    render()
    partyForm.reset()
    
  } catch (error) {
    console.error(error)
  }
      
};

/**
 * Removes a player from the roster via the API.
 * Once the player is removed from the database,
 * the player should also be removed from our view without refreshing
 * @param {number} playerId the ID of the player to remove
 */
/**
 * Note: In order to call removePlayer() some information is required.
 * Unless we get that information, we cannot call removePlayer()....
 */
/**
 * Note#2: Don't be afraid to add parameters to this function if you need to!
 */

const removePlayer = async (playerId) => {
  //TODO
    try {
      await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2501-ftb-et-web-am-PUPPIES/players/${playerId}`,{
        method: "DELETE"
      })
      players.splice(idx,1)
    } catch (error) {
        console.error(error)
    }

};

puppyRoster.addEventListener("click", (event) => {
  if(event.target.classList.contains("deleteButton")){
    removePlayer(event.target.data.player.id)
  }
})
/**
 * Updates html to display a list of all players or a single player page.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player in the all player list is displayed with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, for each player we should be able to:
 * - See details of a single player. When clicked, should be redirected
 *    to a page with the appropriate hashroute. The page should show
 *    specific details about the player clicked 
 * - Remove from roster. when clicked, should remove the player
 *    from the database and our current view without having to refresh
 *
 */
const render = async () => {
  // TODO
    const rosterList = players.map((player) => {
      return `
        <a href=#${player.name}>${player.name}</a>
      `
    })
    puppyRoster.innerHTML = rosterList.join("")


    const name = window.location.hash.slice(1)
    console.log(name)
 
    const singlePlayer = players.find((player) => {
        return player.name === name
    })

    puppyRoster.innerHTML = singlePlayer ? fetchSinglePlayer(singlePlayer) : `<div id="rosterContainer">${rosterList.join("")}`

   

};

/**
 * Updates html to display a single player.
 * A detailed page about the player is displayed with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The page also contains a "Back to all players" that, when clicked,
 * will redirect to the approriate hashroute to show all players.
 * The detailed page of the single player should no longer be shown.
 * @param {Object} player an object representing a single player
 */
const renderSinglePlayer = (singlePlayerData) => {
  // TODO
  puppyRoster.innerHTML = `
    <h2>Selected Player</h2>
    <h2>${singlePlayerData.data.player.name}</h2>
    <h3>Breed:</h3>
    <p>${singlePlayerData.data.player.breed}</p>
    <br>
    <h3>Status:</h3>
    <p>${singlePlayerData.data.player.status}</p>
    <button class="deleteButton" id="${singlePlayerData.data.player.id}">Delete</button>
    <br>
    <a href=#>Back to Puppy Roster</a>
`

};


/**
 * Initializes the app by calling render
 * HOWEVER....
 */
const init = async () => {
  //Before we render, what do we always need...?
      const playerData =  await fetchAllPlayers()
      players = playerData
      render()


};

init()
/**THERE IS NO NEED TO EDIT THE CODE BELOW =) **/

// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    addNewPlayer,
  };
} else {
  init();
}
