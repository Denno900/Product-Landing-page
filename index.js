document.addEventListener('DOMContentLoaded', 
    fetch("http://localhost:3000/instruments")
     .then(response => response.json())
     .then(
        instruments => {
            for(let instrument of instruments){
                handleInstrument(instrument)
            }
        }
        )
)


function handleInstrument(instrument){
    let prices = document.getElementById('prices')
    let productDiv = document.createElement('div')
    productDiv.setAttribute('class', 'product')
    let levelDiv = document.createElement('div')
    levelDiv.setAttribute('class', 'level')
    levelDiv.innerText = instrument.name

    let select = document.createElement('button')
    select.setAttribute('class', 'btn')
    select.innerText = "Select"
    select.addEventListener('click', ()=>{
        displayInstrument(instrument)
    })

    productDiv.append(levelDiv)
    productDiv.append(select)
    prices.append(productDiv)
}

let instrumentName = document.getElementById('name')
let instrumentImg = document.getElementById('img')
let instrumentPrice = document.getElementById('price')
let instrumentDesc = document.getElementById('description')
let orderNow = document.createElement('button')
    orderNow.setAttribute('class', 'btn')
    orderNow.innerText = "Order Now"

function displayInstrument(instrument){
    instrumentName.innerHTML = instrument.name
    instrumentImg.src = instrument.image
    instrumentDesc.innerHTML = instrument.description
    instrumentPrice.innerHTML = instrument.price
    
    let instrumentDiv = document.getElementById('instruments')
    instrumentDiv.append(orderNow)
    
    orderNow.addEventListener('click', () => {
        fetch(`http://localhost:3000/customers/${instrument.id}`,  {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                order: instrument.name
            })
        })
        alert("Your order has been submitted successfully")
    })
}

let form = document.getElementById('form')

form.addEventListener('submit', (e) => {
    e.preventDefault
    let email = e.target.email.value
    let card = e.target.card.value

    fetch('http://localhost:3000/customers', {
    method:'POST',
    headers:{
        'Content-type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        email: email,
        card: card
    })
})
    alert("Your credentials have been saved")
})

