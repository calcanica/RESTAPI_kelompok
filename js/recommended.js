// === LOAD RECOMMENDED PHOTOS ===
async function loadRecommended() {
    const container = document.getElementById("recommended-section");
    container.style.display = "block"; // tampilkan rekomendasi

    const res = await fetch(`${UNSPLASH_API_URL}/photos?client_id=${UNSPLASH_ACCESS_KEY}`);
    const data = await res.json();
    displayMasonry(data, "recommended-photos");
}


// === CUSTOM MASONRY RENDERER ===
function displayMasonry(photos, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    photos.forEach(photo => {
        container.innerHTML += `
            <a href="detail.html?id=${photo.id}" class="photo-card">
                <img src="${photo.urls.small}">
                <div class="overlay">
                    <p class="title">${photo.alt_description || "Untitled"}</p>
                    <p class="author">By ${photo.user.name}</p>
                </div>
            </a>
        `;
    });
}


// === OVERRIDE DISPLAY PHOTOS (KHUSUS SEARCH RESULT) ===
document.addEventListener("DOMContentLoaded", () => {
    const originalDisplay = displayPhotos;

    displayPhotos = function (photos, containerId) {

        // Jika hasil search muncul → sembunyikan rekomendasi
        if (containerId === "search-results") {
            document.getElementById("recommended-section").style.display = "none";
            return displayMasonry(photos, "search-results");
        }

        // Jika bukan search → pakai fungsi asli
        return originalDisplay(photos, containerId);
    };

    // load recommendation ketika halaman dibuka
    loadRecommended();
});

