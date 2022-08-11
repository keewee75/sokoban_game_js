

function buildMap() {  

    document.getElementById('container').style.display = "grid";
    document.getElementById('container').style.gridTemplateRows = "repeat(16, 35px)";
    document.getElementById('container').style.gridTemplateColumns = "repeat(19, 35px)";
    document.getElementById('container').style.justifyContent = "center";
    document.getElementById('container').style.margin = "20px";

    // Loop Y axis
    for (let y = 0; y < tileMap01.height; y++) {
        
        // Loop X axis
        for (let x = 0; x < tileMap01.width; x++) {
            
            let map = document.createElement("div");
            let idCoord = x + "," + y;
            map.id = idCoord;
            // map.innerText = idCoord;
            map.style.padding = "0px";
            map.style.margin = "2px";
            
            // Wall, brown
            if (tileMap01.mapGrid[y][x][0] === "W") {
                map.classList.add(Tiles.Wall);
            }

            // Block, blue
            else if (tileMap01.mapGrid[y][x][0] === "B") {
                map.classList.add(Entities.Block);
            }

            // Player circle, yellow
            else if (tileMap01.mapGrid[y][x][0] === "P") {
                map.classList.add(Entities.Character);
            }

            // Goal, red circle
            else if (tileMap01.mapGrid[y][x][0] === "G") {
                map.classList.add(Tiles.Goal);
            }

            // Space, white
            else  {
                map.classList.add(Tiles.Space);
            }
            
            // map.classList.add('tile');

            document.getElementById('container').appendChild(map);

        }
    }
}

let playerXpos = 11;
let playerYpos = 11;

// function findPlayerCoords() {
//     let playerDiv = document.getElementsByClassName(Entities.Character)[0];
//     let playerPosString = playerDiv.id;
//     playerXpos = playerPosString.split(',')[0];
//     playerYpos = playerPosString.split(',')[1];
//     console.log(playerDiv);
//     console.log(playerPosString);
//     console.log("Xpos: "+ playerXpos + " Ypos: " + playerYpos);
//   }


buildMap();

document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (event.repeat) return;
    

    let xMove = 0;
    let yMove = 0;

    switch (event.key) {
        case 'ArrowUp':
            yMove = -1
            break;
        case 'ArrowDown':
            yMove = 1
            break;
        case 'ArrowLeft':
            xMove = -1
            break;
        case 'ArrowRight':
            xMove = 1
            break;
    }

    let newPlayerXpos = playerXpos + xMove;
    let newPlayerYpos = playerYpos + yMove;

    // console.log(newPlayerXpos + "," + newPlayerYpos);

    // Check Tiles-Wall collision
    if (document.getElementById(`${newPlayerXpos},${newPlayerYpos}`).classList.contains(Tiles.Wall)) {
        return;
      }

    // Check and move Entities.Block
    if (document.getElementById(`${newPlayerXpos},${newPlayerYpos}`).classList.contains(Entities.Block)) {
        if (
            document.getElementById(`${newPlayerXpos + xMove},${newPlayerYpos + yMove}`).classList.contains(Entities.Block)
            || document.getElementById(`${newPlayerXpos + xMove},${newPlayerYpos + yMove}`).classList.contains(Tiles.Wall)
        )
        {
            return;
        }
        document.getElementById(`${newPlayerXpos},${newPlayerYpos}`).classList.remove(Entities.Block);
        document.getElementById(`${newPlayerXpos + xMove},${newPlayerYpos + yMove}`).classList.add(Entities.Block);
    }

    // Remove Entities.Character from old position
    document.getElementById(`${playerXpos},${playerYpos}`).classList.remove(Entities.Character);
    
    // Set Entities.Character to new position
    document.getElementById(`${newPlayerXpos},${newPlayerYpos}`).classList.add(Entities.Character);
    playerXpos = newPlayerXpos;
    playerYpos = newPlayerYpos;

    // Check all blocks done
    
    let blocksDone = document.getElementsByClassName("tile-goal entity-block").length;
    console.log(blocksDone);
    if (blocksDone === 6) {
        // console.log("Genius!");
        // confirm("Genius !! Play again?");
        pop.open('Genius !!', 'Press X to reload game...');
        

    }


}, false);
