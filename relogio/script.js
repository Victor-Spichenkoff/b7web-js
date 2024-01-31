const now = new Date()

// var hour = 23
// var minute = 59
// var second = 58
var hour = now.getHours()
var minute = now.getMinutes()
var second = now.getSeconds()

const digital = document.querySelector('.digital')
rotateClock('s', second)
rotateClock('m', minute)
rotateClock('h', hour)


function formatTime(time) {
    const roundedTime = Math.floor(time)
    if(time < 10) return `0${roundedTime}`
    return roundedTime
}
digital.innerHTML = `${formatTime(hour)} : ${formatTime(minute)} : ${formatTime(second)}`

var firstHour = true

setInterval(() => {
    second += 1
    rotateClock('s', second)
    if(!firstHour) {
        minute += 1 /60
        hour += (1 / 60) /60
        rotateClock('m', minute)
        rotateClock('h', hour)
    }
    
    
    if(second > 59) {
        second = 0
        if(firstHour) minute += 1

        rotateClock('m', minute)
        rotateClock('h', hour)

        if(minute > 59) {
            if(firstHour) hour += 1
            firstHour = false
            minute = 0
            rotateClock('h', hour)

            if(hour > 23) {
                minute = 0
                hour = 0
            }
        }
    }

    digital.innerHTML = `${formatTime(hour)} : ${formatTime(minute)} : ${formatTime(second)}`
}, 1000);


function rotateClock(type, value) {// s m h
    //-90 == ARRUAMR O INICIAL, TODOS ESTÃO RETOS A 90DEGS

    var degs = type != 'h' ? value * 6 - 90 : 0
    if(type == 'h') { //só conta até 12
        if(value > 12) value - 12

        degs = value * 30 -90

    }
    const element = document.querySelector(`.p_${type}`)
    element.style.transform = `rotate(${degs}deg)`
}