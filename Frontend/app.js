const widgets = [{title:"Womp Womp", img: "https://i.imgur.com/EjOJYmu.jpeg"},
{title:"Nuh uh", img: "https://i.imgur.com/EjOJYmu.jpeg"}]
let container = document.querySelector(".container")
widgets.forEach((item)=> {
    container.insertAdjacentHTML('afterbegin', `<div class="card">
    <h2 class="card-header">${item.title}</h2>
    <img class="card-img" src="${item.img}">
</div>`)
})