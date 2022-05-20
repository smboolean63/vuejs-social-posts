const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

// Milestone 1 - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.
const containerHTML = document.querySelector("#container");
const tplPostHTML = document.querySelector("#tpl-post").content;
const postLiked = [];

for(let i = 0; i < posts.length; i++) {
    const postHTML = tplPostHTML.cloneNode(true);
    const {id, content, media, author, likes, created} = posts[i];
    if(author.image !== null) {
        postHTML.querySelector(".profile-pic").src = author.image;
        postHTML.querySelector(".profile-pic").alt = author.name;
    } else {
        postHTML.querySelector(".post-meta__icon").innerHTML = `<div class="profile-pic-default"><span>${getInitials(author.name)}</span></div>`;
    }
    postHTML.querySelector(".post-meta__author").innerHTML = author.name;
    postHTML.querySelector(".post-meta__time").innerHTML = italianDate(created);
    postHTML.querySelector(".post__text").innerHTML = content;
    postHTML.querySelector(".post__image img").src = media;
    postHTML.querySelector(".post__image img").alt = `Image post ${id}`;
    postHTML.querySelector(".js-like-button").dataset.postid = id;
    postHTML.querySelector(".js-likes-counter").innerHTML = likes;
    postHTML.querySelector(".js-likes-counter").id = `like-counter-${id}`;
    postHTML.querySelector(".js-like-button").addEventListener("click", function(e) {
        e.preventDefault();
        const id = this.dataset.postid;
        this.classList.toggle("like-button--liked");
        const counterHTML = document.querySelector(`#like-counter-${id}`);
        if(!postLiked.includes(id)) {
            counterHTML.innerHTML++;
            postLiked.push(id);
        } else {
            // 3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone
            counterHTML.innerHTML--;
            const index = postLiked.indexOf(id);
            postLiked.splice(index, 1);
        }
    });
    containerHTML.append(postHTML);
}

// Milestone 2 - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
// Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.

// 1. Formattare le date in formato italiano (gg/mm/aaaa)
function italianDate(date) {
    return date.split("-").reverse().join("/");
}
// 2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
function getInitials(name) {
    const nameArray = name.split(" ");

    let initials = "";
    let i = 0;
    while (i < nameArray.length && i < 2) {
        initials += nameArray[i][0];
        i++;
    }

    return initials;
}