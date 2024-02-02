//selecionadores
const s = (id, el) => el ? el.querySelector(id) : document.querySelector(id)
const sa = (id, el) => el ? el.querySelectorAll(id) : document.querySelectorAll(id)


var modalQuant = 1
var cart = []
var modalKey

var currentWindowPizza;

pizzaJson.map((pizza, i) => {
    let pizzaItem = s('.models .pizza-item').cloneNode(true)
    const formatedPrice = `R$ ${pizza.price.toFixed(2).replace('.', ',')}`

    pizzaItem.setAttribute('data-key', i)


    //colocando infos
    s('.pizza-item--img > img', pizzaItem).src = pizza.img
    s('.pizza-item--price', pizzaItem).innerHTML = formatedPrice
    s('.pizza-item--name', pizzaItem).innerHTML = pizza.name
    s('.pizza-item--desc', pizzaItem).innerHTML = pizza.description
    s('.pizza-item--name', pizzaItem).innerHTML = pizza.name


    s('a', pizzaItem).addEventListener('click', (e) => {
        e.preventDefault()
        let key = e.target.closest('.pizza-item').getAttribute('data-key')
        modalQuant = 1
        modalKey = key
        
        const currentPizza = pizzaJson[key]
        s('.pizzaBig img').src = currentPizza.img
        s('.pizzaInfo h1').innerHTML = currentPizza.name
        s('.pizzaInfo--desc').innerHTML = currentPizza.description
        s('.pizzaInfo--actualPrice').innerHTML = `R$ ${currentPizza.price.toFixed(2).replace('.', ',')}`


        s('.pizzaInfo--size.selected').classList.remove('selected')


        document.querySelectorAll('.pizzaInfo--size').forEach((size, sizeIndex)=> {//colocar os tamnhhos de pizza
            if(sizeIndex == 2) size.classList.add('selected')//é p padrao
            s('span', size).innerHTML = currentPizza.sizes[sizeIndex]
        })


        s('.pizzaInfo--qt').innerHTML = modalQuant
        
        s('.pizzaWindowArea').style.opacity = 0
        s('.pizzaWindowArea').style.display = 'flex'
        setTimeout(()=> s('.pizzaWindowArea').style.opacity = 1, 250)
    })



    s('.pizza-area').appendChild(pizzaItem)
})



//modal
function closeModal() {
    s('.pizzaWindowArea').style.opacity = 0
    setTimeout(()=> s('.pizzaWindowArea').style.display = 'none', 500)
}

sa('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach(item => {
    item.addEventListener('click', closeModal)
})


s('.pizzaInfo--qtmenos').addEventListener('click', ()=> {
        modalQuant -=1
        if(modalQuant < 1) modalQuant = 1
    s('.pizzaInfo--qt').innerHTML = modalQuant
})

s('.pizzaInfo--qtmais').addEventListener('click', ()=> {
    modalQuant += 1
    s('.pizzaInfo--qt').innerHTML = modalQuant
})  

sa('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', () => {
        s('.pizzaInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')
        
    })
})

s('.pizzaInfo--addButton').addEventListener('click', () => {
    const pizza = pizzaJson[modalKey]
    const size = s('.pizzaInfo--size.selected').getAttribute('data-key')
    const identifier = pizza.id + '@' + size

    //verificar se é o mesmo (id e size igual)
    
    let key = cart.findIndex((item)=> item.identifier == identifier )

    if(key > -1) { // já tem, só altera
        cart[key].qt = modalQuant
    } else {//adicionar novo
        cart.push( {
            identifier,//mesmo id e tamanho == mesmo elemento
            id: pizza.id,
            size: parseInt(size),
            qt: modalQuant,
        })
    }


    
    updateCart()
    closeModal()
})


s('.menu-openner').addEventListener('click', () => {
    if( cart.length > 0) {
        s('aside').style.left = '0'
    }
})

s('.menu-closer').addEventListener('click', () => {
    s('aside').style.left = '100vw'
})
function updateCart() {
    if(cart.length > 0) {
        s('aside').classList.add('show')

        s('.cart').innerHTML = ''//resesta

        let subtotal = 0
        let desc = 0
        let total = 0

        for(let i in cart) {
            let pizzaItem = pizzaJson.find(item =>  item.id == cart[i].id)

            subtotal += pizzaItem.price * cart[i].qt

            const cartItem = s('.models .cart--item').cloneNode(true)

            const pizzaSizeName = formatedSize(cart[i].size)
            const formatedName = `${pizzaItem.name} ${pizzaSizeName}`


            s('img', cartItem).src = pizzaItem.img
            s('.cart--item-nome', cartItem).innerHTML = formatedName
            s('.cart--item--qt', cartItem).innerHTML = cart[i].qt

            s('.cart--item-qtmenos', cartItem).addEventListener('click', ()=> {
                if(cart[i].qt > 1) cart[i].qt--
                else {// tira ele
                    cart.splice(i, 1)
                }
                updateCart()
            })
            s('.cart--item-qtmais', cartItem).addEventListener('click', ()=> {
                cart[i].qt++
                updateCart()
            })


            s('.cart').appendChild(cartItem)
        }

        desc = subtotal * .1
        total = subtotal - desc
        s('.subtotal span:last-child').innerHTML = `R$${subtotal.toFixed(2).replace('.', ',')}`
        s('.desconto span:last-child').innerHTML = `R$${desc.toFixed(2).replace('.', ',')}`
        s('.total span:last-child').innerHTML = `R$${total.toFixed(2).replace('.', ',')}`

    } else  {//sumir/fechar
        s('aside').classList.remove('show')
        s('aside').style.left = '100vw'
    }

    //mobile
    s('.menu-openner span').innerHTML = cart.length
}



function formatedSize(size) {
    if(size == 0) return '(P)'
    if(size == 1) return '(M)'
    if(size == 2) return '(G)'
}