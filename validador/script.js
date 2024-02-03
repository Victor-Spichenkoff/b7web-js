const validator = {
    handleSubmit(e) {
        e.preventDefault()
        let send = true

        const inputs = document.querySelectorAll('input')


        validator.clearErrors()

        inputs.forEach(input => {
            const check = validator.checkInput(input)//se estiver errao ele faa
            
            if(check !== true) {
                validator.showError(input, check)
                send = false
                return
            }
        })

        document.querySelector('.certo').style.display = 'none'
        // if(send) form.submit()
        if(send) document.querySelector('.certo').style.display = 'block'
    
    },  

    checkInput(input) {
        let rules = input.getAttribute('data-rules')
        // if(!rules) return true
        
        if(rules != null) {
            rules = rules.split('|')
            for(let i in rules) {
                let ruleDetails = rules[i].split('=')//me devolve um aarray com 1 ou dois elementos
    
                switch(ruleDetails[0]){
                    case 'required':
                        if(input.value == '') {
                            return  'Campo não pode ser vazio'
                        }
                        break

                    case 'min': 
                        if(input.value.length < Number(ruleDetails[1])) return `Deve ter, pelo menos, ${ruleDetails[1]} caracteres`
                        break;

                    case 'email': 
                        if(!input.value.split('').includes('@')) return `Formato inválido`

                    break
                    
    
                }
            }
        } else {
            return true
        }

        return true

    },

    showError(input, msg) {
        input.style.borderColor = 'red'


        //para não criar vários
        if(input.parentElement.querySelector('div')) return

        let errorElement = document.createElement('div')
        errorElement.classList.add('error')
        errorElement.innerHTML = msg

        // input.parentElement.insertBefore(errorElement, input.ElementSibling)
        //meu metoedo
        input.parentElement.appendChild(errorElement)
    },

    clearErrors() {
        document.querySelectorAll('input').forEach(input => {
            input.style= ''
        })
        document.querySelectorAll('.error').forEach(error => {
            error.parentElement.removeChild(error)
        })
    }
}

const form = document.querySelector('.b7validator')
form.addEventListener('submit', validator.handleSubmit)