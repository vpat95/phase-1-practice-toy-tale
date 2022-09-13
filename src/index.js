let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })

  //Call to Fetch toys
  getAllToys()

  //Event Listener to create new toy based on successful Post of new toy via form
  document.querySelector('.submit').addEventListener('click', handleSubmit)

});


//DOM Render Functions

function renderToys(toys) {
  let cardDiv = document.createElement('div')
  cardDiv.className = 'card'

  let cardHeader = document.createElement('h2')
  cardHeader.innerText = `${toys.name}`

  let cardImg = document.createElement('img')
  cardImg.src = `${toys.image}`
  cardImg.className = 'toy-avatar'

  let cardLikes = document.createElement('p')
  cardLikes.innerText = `${toys.likes} Likes`

  let cardButton = document.createElement('button')
  cardButton.className = 'like-btn'
  cardButton.setAttribute('id', `${toys.id}`)
  cardButton.innerText = "Like ❤️"

  cardButton.addEventListener('click', () => {
    toys.likes+= 1
    cardDiv.querySelector('p').textContent = `${toys.likes} Likes`
    updateLikes(toys)
  })

  const toyCollection = document.querySelector('#toy-collection')

  cardDiv.append(cardHeader, cardImg, cardLikes, cardButton)
  toyCollection.append(cardDiv)
}

//Event Handlers

function handleSubmit(e) {
  e.preventDefault()
  let toyObj = {
    name: e.target.parentNode.name.value,
    image: e.target.parentNode.image.value,
    likes: 0
  }
  createToy(toyObj)
}

//FETCHES
//Get

function getAllToys() {
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => toys.forEach(toy => renderToys(toy)))
}

//Post

function createToy(toyObj) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toyObj)
  })
    .then(res => res.json())
    .then(toyData => renderToys(toyData))
}

//Patch

function updateLikes(toys){

  fetch(`http://localhost:3000/toys/${toys.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": toys.likes
    })
  })
    .then(res => res.json())
    .then(toyData => toyData)
}
