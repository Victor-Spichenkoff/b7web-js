const s = (id, el) => el ? el.querySelector(id) : document.querySelector(id) 
const sa = (id, el) => el ? el.querySelectorAll(id) : document.querySelectorAll(id) 


var userNumber = ''
var totalDigits = 5
var currentDigitIndex = 0
var nullCandidate = false
const digits = sa('.digits span')

function writeNumeber() {
    s('')
}



sa('.numbers button').forEach(number => {
    number.addEventListener('click', (e) => {
        if(totalDigits == 0) return
        if(totalDigits == userNumber.length) return console.log('Maximo de digitos')
        
        const buttonNumber = e.target.getAttribute('data-value')

        userNumber +=  buttonNumber

        digits[currentDigitIndex].innerHTML = buttonNumber
        digits[currentDigitIndex].classList.remove('active')
        digits[currentDigitIndex].classList.add('down')
        currentDigitIndex ++

        if(currentDigitIndex >= totalDigits) {
            if(  verifyNull()  ) return 
            resetClass()
            loadCandidateData()

        } //todos para cima
        digits[currentDigitIndex].classList.add('active')
    })
})


//auxiliares
const resetClass = () => sa('.down').forEach((i) => i.classList.remove('down'))

const loadCandidateData = () => {
    addBlock('.candidate-data', '.bottom', '.right')

    const candidate = getCadidateData(getCandidateindex(userNumber))

    s('.candidate-name').innerHTML = candidate.name
    s('.candidate-party').innerHTML = candidate.party
    s('.image-major img').src = `./images/${userNumber}.jpg`
    if(userNumber == '13') s('.image-major img').style.objectPosition = '-82px'
    else s('.image-major img').style.objectPosition = 'center'

    if(userNumber < 9999) {//para presidente
        s('.image-vice').style.display = 'inline-block'
    } else {

    }


    s('.image-vice img').src = `./images/${userNumber}_2.jpg`
}

const getCandidateindex = (num) => numebersJson.indexOf(num)

const getCadidateData = (index) => candidatesJson[index]

const addBlock = (...classes) => {
    classes.forEach(classe => {
        s(classe).style.display = 'inline-block'
    })
}

const addNone = (...classes) => {
    classes.forEach(classe => {
        s(classe).style.display = 'none'
    })
}

const verifyNull = () => {
    nullCandidate = !numebersJson.includes(userNumber)
    if (nullCandidate) {
        return s('.null').style.display = 'block'
    }
    return nullCandidate
}

const resetDigits = () => {
    sa('.digits span').forEach(digit => digit.innerHTML = '')
}
//-82px
const fix = () => {
    resetClass()
    resetDigits()
    addNone('.right', '.image-vice', '.bottom', '.null','.candidate-data')
    disableBranco()
    if(totalDigits == 2) fortmatToPresident()
    userNumber = 0
    nullCandidate = 0
    currentDigitIndex = 0
    userNumber = ''
}

const confirm = () => {
    if(nullCandidate) return 
    disableBranco()
    if(totalDigits == 5) {
        fortmatToPresident()
        totalDigits = 2
        return
    }

    if(totalDigits == 2) {
        totalDigits = 0
        formatEnd() 
    }
}

const fortmatToPresident = () => {
    resetClass()
    resetDigits()

    addNone('.d3','.d4','.d5','.right', '.bottom', '.candidate-data')
    s('.left .role').innerHTML = 'Presidente'
    s('.image-major .role').innerHTML = 'Presidente'
}

const formatEnd = () => {
    addNone('.right-left', '.bottom')
    s('.fim').style.display = 'block'
}

const branco = () => {
    if(totalDigits == 0) return

    resetClass()
    resetDigits()
    if(currentDigitIndex == 5 || currentDigitIndex == 2) return

    // userNumber = 0
    // nullCandidate = 0
    // currentDigitIndex = 0
    // userNumber = ''
    addNone('.d1', '.d2', '.d3','.d4','.d5')
    s('.branco').style.display = 'block'
}

const disableBranco = () => {
    addBlock('.d1', '.d2', '.d3','.d4','.d5')
    addNone('.branco')
    userNumber = 0
    nullCandidate = 0
    currentDigitIndex = 0
    userNumber = ''
}

//eventos
s('.fix').addEventListener('click', fix)
s('.confirm').addEventListener('click', confirm)
s('.white').addEventListener('click', branco)