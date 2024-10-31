document.addEventListener('DOMContentLoaded', () => {
    let totalGeneral = 0; // Variable pour stocker le prix total général

    // Fonction pour mettre à jour le prix total général
    function updateTotalGeneral() {
        const contentSections = document.querySelectorAll('.content-1'); // Re-sélectionne les sections existantes
        totalGeneral = Array.from(contentSections).reduce((total, section) => {
            const count = parseInt(section.querySelector('#count').innerText);
            const price = parseFloat(section.querySelector('p:not([class])').innerText.replace(/\s/g, '').replace('Fcfa', ''));
            return total + (count * price); // Additionne les prix pour chaque produit restant
        }, 0);
        document.querySelector('.para').innerText = `Prix Total: ${totalGeneral.toLocaleString('fr-FR')} Fcfa`;
    }

    // Sélectionne toutes les sections de produits
    const contentSections = document.querySelectorAll('.content-1');
    contentSections.forEach(section => {
        const decreaseButton = section.querySelector('#decrease'); // Bouton pour diminuer la quantité
        const increaseButton = section.querySelector('#increase'); // Bouton pour augmenter la quantité
        const countSpan = section.querySelector('#count'); // Élément affichant le nombre d'articles
        const totalPriceParagraph = section.querySelector('p[class^="para"]'); // Élément pour le prix total du produit
        const priceText = section.querySelector('p:not([class])').innerText; // Récupère le prix unitaire
        const price = parseFloat(priceText.replace(/\s/g, '').replace('Fcfa', '')); // Transforme le texte en nombre
        let count = parseInt(countSpan.innerText); // Récupère le nombre d'articles

        // Icône de cœur spécifique pour chaque section
        const heartIcon = section.querySelector('.heart');

        // Met à jour l'affichage pour ce produit
        function updateDisplay() {
            countSpan.innerText = count; // Met à jour le compteur
            const totalPrice = count * price; // Calcule le prix total pour ce produit
            totalPriceParagraph.innerText = `Prix Total: ${totalPrice.toLocaleString('fr-FR')} Fcfa`; // Affiche le prix total
            updateTotalGeneral(); // Met à jour le prix total général
        }

        // Événements pour les boutons
        decreaseButton.addEventListener('click', () => {
            if (count > 1) { // Empêche d'avoir moins d'un article
                count--;
                updateDisplay(); // Met à jour l'affichage
            }
        });

        increaseButton.addEventListener('click', () => {
            count++; // Incrémente le nombre d'articles
            updateDisplay(); // Met à jour l'affichage
        });

        const deleteButton = section.querySelector('#deleteButton'); // Bouton pour supprimer le produit
        deleteButton.addEventListener('click', () => {
            section.remove(); // Supprime la section du produit
            updateTotalGeneral(); // Met à jour le prix total général après suppression
        });

        // Gestionnaire d'événement pour le cœur
        heartIcon.addEventListener('click', () => {
            heartIcon.classList.toggle('active'); // Active ou désactive la classe "active" au clic
        });

        // Initialisation de l'affichage pour chaque produit
        updateDisplay();
    });
});
