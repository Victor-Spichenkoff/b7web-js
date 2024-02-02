//som legal azsaszz 300ms


class ControlarSom {


    constructor(keyValue) {
        this.keyValue = keyValue
    }
    
    start(){
        this.elemento = document.getElementById(`key${this.keyValue}`)
        //ele sobrescreve a cada nova instancia, por isso o bind
        document.addEventListener('keydown', this.lidarComKeyDown.bind(this))
    }


    emitirSom() {
        this.elemento.classList.add('active')
        this.audioTag = document.querySelector(`#s_key${this.keyValue}`)

        if (this.audioTag.readyState === 4) {//4 = carregou o suficiente
            this.audioTag.currentTime = 0//resetal, mesmo se já iniciado
            this.audioTag.play();
        } else {
            // Se ainda não carregou tudo
            this.audioTag.addEventListener("canplay", function () {
                //executa quando tudo pronto
                this.audioTag.currentTime = 0;
                this.audioTag.play();
            });
        }

        setTimeout(()=> this.elemento.classList.remove('active'), 100)
    }


    lidarComKeyDown(event) {
        if(event.key == this.keyValue) this.emitirSom() 
    }








}



function getInputs() {
    const todasLetras = document.querySelector('#input').value
    const ms = document.querySelector('#ms').value
    const infinito = document.getElementById('infinito').checked
    return {
        letras: todasLetras.split(''),
        ms: ms < 50 ? 50 : ms,
        infinito
    } 
}

var [ index, primeiranota ] = [ 0, true ]

function tocarSelecionados() {
    const { letras, ms, infinito }= getInputs()
    console.log( letras, ms, infinito)

    if(primeiranota) {
        primeiranota = false
        emitirSomPorSelecao(letras[index])
        
    } else {
        index += 1
        if(index > letras.length-1 && !infinito) return
        
        if(infinito && index > letras.length - 1) index = 0
        emitirSomPorSelecao(letras[index])
    }

    setTimeout(() => tocarSelecionados(), ms)

}




function setarValues() {
    index = 0
    primeiranota = true
    console.log('lop')
    tocarSelecionados()
}


// function useIndex() {
//     if(this.primeriaNota) {
//         this.primeriaNota = false
//         emitirSomPorSelecao(keys[this.index])
        
//     } else {
//         this.index += 1
//         emitirSomPorSelecao(keys[this.index])
//     }

//     setTimeout(() => ControlarSom.useIndex())
// }




function emitirSomPorSelecao(key) {
    const audioTag = document.querySelector(`#s_key${key}`)

    if (audioTag.readyState === 4) {//4 = carregou o suficiente
        // Reinicia a reprodução do áudio
        audioTag.currentTime = 0//resetal, mesmo se já iniciado
        audioTag.play();
    } else {
        // Se ainda não carregou tudo
        audioTag.addEventListener("canplay", function () {
            //executa quando tudo pronto
            audioTag.currentTime = 0;
            audioTag.play();
        });
    }
}


const q = new ControlarSom('q') 
q.start('q')
const w = new ControlarSom('w')
w.start()
const e = new ControlarSom('e')
e.start()
const a = new ControlarSom('a')
a.start()
const s = new ControlarSom('s')
s.start()
const d = new ControlarSom('d')
d.start()
const z = new ControlarSom('z')
z.start()
const x = new ControlarSom('x')
x.start()
const c = new ControlarSom('c')
c.start()




const btn = document.querySelector('button')
btn.addEventListener('click', setarValues)