const slidersNumber = document.querySelectorAll('.slider-item').length

document.querySelector('.slider-width').style.width =  `calc(100vw * ${slidersNumber})`
// document.querySelector('.slider-controls').style.height = 



var currentSlide = 0

const controls = document.querySelectorAll('.slider-control')

controls.forEach(c => {
    c.onclick = () => clearInterval(intervalo)
})

controls[0].addEventListener('click', prev)
controls[1].addEventListener('click', next)
const intervalo = setInterval(()=> {
    next()
}, 5000)


function prev() {
    currentSlide--
    if(currentSlide < 0) currentSlide = slidersNumber - 1//volta para o ultimo

    updateMargin() 
}


function next() {
    currentSlide++
    if(currentSlide > slidersNumber -1) currentSlide = 0//volta para o primeiro
    
    updateMargin()
}




const updateMargin = () => {
    const margin = document.body.clientWidth * currentSlide
    document.querySelector('.slider-width').style.marginLeft = `-${margin}px`
}
