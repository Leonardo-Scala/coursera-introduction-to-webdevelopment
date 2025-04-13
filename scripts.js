// Funzione per il toggle del menu di navigazione
function toggleMenu() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
}

// Aggiungi un event listener per l'icona hamburger
document.querySelector('.hamburger-menu').addEventListener('click', toggleMenu);

// Abilita lo scrolling fluido per i link di navigazione
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Previene il comportamento predefinito
        const targetId = this.getAttribute('href').substring(1); // Ottieni l'ID della sezione
        const targetSection = document.getElementById(targetId);

        // Scorri fino alla sezione con comportamento fluido
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Chiudi il menu di navigazione su dispositivi mobili
        const nav = document.querySelector('nav');
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });
});

// Funzione per filtrare i progetti
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-list article');
    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

// Aggiungi un event listener per i pulsanti di filtro
document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', function () {
        const category = this.dataset.category;
        filterProjects(category);
    });
});

// Funzione per il lightbox
function openLightbox(imageSrc) {
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${imageSrc}" alt="Project Image">
            <span class="lightbox-close">&times;</span>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Chiudi il lightbox
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
        document.body.removeChild(lightbox);
    });

    // Chiudi il lightbox cliccando fuori dall'immagine
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            document.body.removeChild(lightbox);
        }
    });
}

// Aggiungi un event listener per le immagini dei progetti
document.querySelectorAll('.project-list img').forEach(img => {
    img.addEventListener('click', function () {
        openLightbox(this.src);
    });
});

// Funzione per validare il modulo di contatto
function validateContactForm(event) {
    event.preventDefault(); // Previene l'invio del modulo

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    let isValid = true;

    // Validazione del campo Nome
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Il nome è obbligatorio.');
        isValid = false;
    } else {
        clearError(nameInput);
    }

    // Validazione del campo Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Pattern per email valida
    if (!emailPattern.test(emailInput.value.trim())) {
        showError(emailInput, 'Inserisci un indirizzo email valido.');
        isValid = false;
    } else {
        clearError(emailInput);
    }

    // Validazione del campo Messaggio
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'Il messaggio è obbligatorio.');
        isValid = false;
    } else {
        clearError(messageInput);
    }

    // Se tutti i campi sono validi, mostra un messaggio di successo
    if (isValid) {
        alert('Grazie per averci contattato! Ti risponderemo al più presto.');
        document.getElementById('contact-form').reset(); // Resetta il modulo
    }
}

// Funzione per mostrare un messaggio di errore
function showError(input, message) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    input.classList.add('error');
}

// Funzione per rimuovere il messaggio di errore
function clearError(input) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = '';
    errorElement.style.display = 'none';
    input.classList.remove('error');
}

// Aggiungi un event listener per la validazione del modulo
document.getElementById('contact-form').addEventListener('submit', validateContactForm);