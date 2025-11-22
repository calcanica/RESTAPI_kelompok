// app.js

async function loadPopularPhotos(){
    const res = await fetch(`${UNSPLASH_API_URL}/photos?client_id=${UNSPLASH_ACCESS_KEY}`);
    const data = await res.json();
    displayPhotos(data, "photo-grid");
}

async function searchPhotos(query){
    const res = await fetch(`${UNSPLASH_API_URL}/search/photos?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`);
    const data = await res.json();
    displayPhotos(data.results, "search-results");
}

async function loadPhotoDetail(id){
    const res = await fetch(`${UNSPLASH_API_URL}/photos/${id}?client_id=${UNSPLASH_ACCESS_KEY}`);
    const photo = await res.json();
    const container = document.getElementById("photo-detail");
    container.innerHTML = `
        <h2>${photo.description || "Untitled"}</h2>
        <img src="${photo.urls.regular}" class="img-fluid">
        <p>By: ${photo.user.name}</p>
        <a href="${photo.links.download}" class="btn btn-primary" target="_blank">Download</a>
        <button class="btn btn-success" onclick='addToFavorites(${JSON.stringify(photo)})'>Add to Favorites</button>
    `;
}

function displayPhotos(photos, containerId){
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    photos.forEach(photo => {
        container.innerHTML += `
            <div class="col">
                <div class="card h-100">
                    <img src="${photo.urls.small}" class="card-img-top" alt="${photo.alt_description}">
                    <div class="card-body">
                        <h5 class="card-title">${photo.user.name}</h5>
                        <a href="detail.html?id=${photo.id}" class="btn btn-primary">View</a>
                    </div>
                </div>
            </div>
        `;
    });
}

function addToFavorites(photo){
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    favorites.push(photo);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Added to favorites!");
}

function loadFavorites(){
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    displayPhotos(favorites, "favorites-grid");
}
