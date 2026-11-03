// ENDPOINT (FONTE DI DATI)
const endpoint = 'https://api.sampleapis.com/coffee/hot';

// Elemento della pagina dove inserire le card
const lista = document.getElementById('userList');

function fetchCaffe() {
  fetch(endpoint)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      renderCaffe(data);
    })
    .catch(errore => {
      lista.textContent = 'Ops, qualcosa è andato storto: ' + errore.message;
    });
}

function renderCaffe(data) {
  // Svuoto la lista, che verrà popolata con il forEach
  lista.innerHTML = '';

  data.forEach(caffe => {
    // Colonna Bootstrap
    const col = document.createElement('div');
    col.className = 'col';

    // Card (h-100 = tutte della stessa altezza)
    const card = document.createElement('div');
    card.className = 'card h-100 shadow-sm';

    // Immagine
    const img = document.createElement('img');
    img.src = caffe.image;
    img.alt = caffe.title;
    img.className = 'card-img-top';
    img.style.height = '200px';
    img.style.objectFit = 'cover';
    // Se l'immagine è rotta, ne mostro una di riserva
    img.onerror = () => {
      img.onerror = null; // evita un ciclo infinito
      img.src = 'https://placehold.co/400x200?text=Nessuna+immagine';
    };

    // Corpo della card
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // Titolo
    const titolo = document.createElement('h5');
    titolo.className = 'card-title';
    titolo.textContent = caffe.title;

    // Descrizione
    const descrizione = document.createElement('p');
    descrizione.className = 'card-text';
    descrizione.textContent = caffe.description;

    // Assemblo: prima l'immagine, poi il body
    cardBody.appendChild(titolo);
    cardBody.appendChild(descrizione);
    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);
    lista.appendChild(col);
  });
}

// Avvio
fetchCaffe();