class Character {
    //básico de todos
    _life = 1;
    maxLife = 1;
    attack = 0;
    defence = 0;
    
    constructor(name) {
        this.name = name;
    }

    get life() {
        return this._life;
    }

    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife;
    }
}


class Knight extends Character {
    constructor(name) {
    super(name)
        this.life = 100
        this.attack = 10
        this.defence = 8
        this.maxLife = this.life
    }
}




class Sorcerer extends Character {
    constructor(name) {
        super(name)
        this.life = 80
        this.attack = 14
        this.defence = 3
        this.maxLife = this.life
    }
}



class LittleMonster extends Character {
    constructor() {
        super('Little Monster')
        this.life = 40
        this.attack = 4
        this.defence = 4
        this.maxLife = this.life
    }
}


class BigMonster extends Character {
    constructor() {
        super('Big Monster')
        this.life = 120
        this.attack = 16
        this.defence = 6
        this.maxLife = this.life
    }
}


class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObj, bot) {
        this.fighter1 = fighter1
        this.fighter2 = fighter2
        this.fighter1El = fighter1El
        this.fighter2El = fighter2El
        this.log = logObj,
        this.bot = bot
        this.gameFinished = false
    }

    start() {//inicia jogo
        if(this.gameFinished) return
        this.update() 

        //tirar botão para o bot
        if(this.bot) this.fighter2El.querySelector('.attack-button').style.display = 'none'

        this.fighter1El.querySelector('.attack-button').addEventListener('click', () => {
            this.doAttack(this.fighter1, this.fighter2)
            if(this.bot) this.botAttack()
        })

        

        this.fighter2El.querySelector('.attack-button').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1))
    }

    update() {
        if(this.gameFinished) return 
        //Fighter1
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100
        this.fighter1El.querySelector('.bar').style.width  = f1Pct + '%'
        //Fighter1
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100
        this.fighter2El.querySelector('.bar').style.width  = f2Pct + '%'
        
        if(this.fighter1.life < 0 || this.fighter2.life < 0) this.allowRestart()
    }

    doAttack(attacking, attacked) {
        if(this.gameFinished) return
        if(attacking.life <= 0 || attacked.life <= 0) {// já morto
            this.log.addMensage('Atacando Cachorro Morto')
            this.allowRestart()
            return
        }

        let attackFactor = (Math.random() * 2).toFixed(2)
        let actualAttack = (attacking.attack * attackFactor).toFixed(2)

        let defenseFactor = (Math.random() * 2).toFixed(2)
        let actualDefense = (attacked.defence * defenseFactor).toFixed(2)

        if(actualAttack > actualDefense) {
            attacked.life -= actualAttack
            this.log.addMensage(`${attacking.name} causou ${actualAttack} dano a ${attacked.name}`)
        } else {
            //defendeu
            this.log.addMensage(`${attacked.name} Denfendeu...`)
        }

        this.update()
    }


    allowRestart() {
        this.gameFinished = true
        restartButton.style.display = 'block'
    }

    botAttack() {
        setTimeout(()=> {
            this.doAttack(this.fighter2, this.fighter1)
        }, 500)
    }

}



class Log {
    list = []
    constructor(listEl) {
        this.listEl = listEl

    }

    addMensage(newMensage) {
        this.list.push(newMensage)
        this.render()
    }


    render() {
        this.listEl.innerHTML = ''//limpa ela

        const historicList = []
        const size = this.list.length
        for (let i in this.list) {
            historicList.push(this.list[size - i - 1])
        }
        

        for(let msg of historicList) {
            this.listEl.innerHTML += `<li>${msg}</li>`
        } 
    }
}