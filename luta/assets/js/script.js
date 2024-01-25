// let log = new Log(document.querySelector('.log'))

// const char = new Knight('Victor')
// console.log(char.name)

// const monster = new LittleMonster()

// const stage = new Stage(
//     char,
//     monster,
//     document.querySelector('#char'),
//     document.querySelector('#monster'),
//     log
// )

// stage.start()

const selectionArea = document.querySelector('.create')
const gameArea = document.querySelector('.game')
const restartButton = document.querySelector('.restart')

function selectPlayers(classe, name, monster) {
    let log = new Log(document.querySelector('.log'))

    //selecionando]
    name = name ? name : 'Sem Nome'
    if(classe == 'knight') var char = new Knight(name)
    else var char = new Sorcerer(name)

    if(monster == 'litle') var monster = new LittleMonster()
    else var monster = new LittleMonster()


    const bot = document.getElementById('bot').checked


    const stage = new Stage(
        char,
        monster,
        document.querySelector('#char'),
        document.querySelector('#monster'),
        log,
        bot
    )

    stage.start()

    selectionArea.style.display = 'none'
}


function getDataAndStart() {
    const p1Type = document.querySelector('#p1').value
    const name = document.querySelector('#player-name').value
    const monsterType = document.querySelector('#p2').value

    selectPlayers(p1Type, name, monsterType)

    gameArea.style.display = 'block'
}


function restart() {
    document.querySelector('.log').innerHTML = ''
    selectionArea.style.display = 'block'
    restartButton.style.display = 'none'
    gameArea.style.display = 'none'
}


const start = document.querySelector('.start')

start.addEventListener('click', getDataAndStart)

restartButton.addEventListener('click', restart)