document.getElementById('search-button').addEventListener('click', function () {
    const query = document.getElementById('search-input').value;
    searchMovies(query);
});

document.getElementById('search-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        const query = document.getElementById('search-input').value;
        searchMovies(query);
    }
});

function searchMovies(query) {
    const apiKey = '2e6ea4f4';  
    fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);  
            if (data.Response === 'True') {
                displayMovies(data.Search);
            } else {
                alert("Nenhum filme encontrado!");
            }
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
}

function displayMovies(movies) {
    const container = document.getElementById('movies-container');
    container.innerHTML = ''; 
    movies.slice(0, 16).forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie';
        const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=Sem+Imagem';

        movieElement.innerHTML = `
            <img src="${posterUrl}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        `;
        
        movieElement.addEventListener('click', function () {
            showMovieDetails(movie.imdbID);
        });

        container.appendChild(movieElement);
    });
}

function showMovieDetails(imdbID) {
    const modal = document.getElementById('movie-modal');
    const title = document.getElementById('modal-title');
    const poster = document.getElementById('modal-poster');
    const year = document.getElementById('modal-year');
    const description = document.getElementById('modal-description');
    
    fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=2e6ea4f4`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            title.textContent = data.Title;
            poster.src = data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/400x600?text=Sem+Imagem';
            year.textContent = `Ano: ${data.Year}`;
            description.textContent = data.Plot || "Sinopse indisponível.";
        })
        .catch(() => {
            description.textContent = "Erro ao buscar detalhes do filme.";
        });
    
    modal.style.display = "block";
}

document.getElementById('close-modal').addEventListener('click', function () {
    document.getElementById('movie-modal').style.display = "none";
});
