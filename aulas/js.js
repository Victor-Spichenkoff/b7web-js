const input = document.querySelector('input')
const lista = document.querySelector('#lista')


function add() {
    const data = input.value
    const newItem = document.createElement('li')
    newItem.innerHTML = data


    lista.appendChild(newItem)

    input.value = ''
}

function press(event) {
    console.log(event.key)
    if(event.key == 'Enter') {
        add()
    }

}


input.addEventListener('keyup', press)