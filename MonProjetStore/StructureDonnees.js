// Classe Produit 
class Produit {
    constructor(id, nom, prix, categorie, imageUrl, description, promotion = false,couleur,taille) {
        this.id = id;
        this.nom = nom;
        this.prix = prix;
        this.categorie = categorie;
        this.imageUrl = imageUrl; // Propriété pour le chemin de l'image
        this.image = imageUrl;    // Ajout pour la compatibilité avec les deux conventions
        this.description = description;
        this.couleur = couleur;
        this.taille = taille;
        this.tailles = taille; // Add compatibility property
        this.nom_produit = nom; // Add compatibility property
        this.en_promo = promotion; // Add compatibility property
    }
}

// Tableau des produits sont stockets sous forme des objets pour la class produits
var produits = [
    new Produit(1, "Chemise femme", "100 DH", "femme", "image1.png", "Description de produit 1", false, "Noir", ["M", "L", "XL"]),
    new Produit(2, "Robe élégante", "200 DH", "femme", "image2.png", "Description de produit 2", false, "Blanc", ["S", "M", "L"]),
    new Produit(3, "Robe pour l'été", "300 DH", "femme", "image3.png", "Robe pour la saison estivale.", false, "Orange", ["S", "M"]),
    new Produit(4, "Robe de soirée", "800 DH", "femme", "image4.png", "Robe légère d'été.", false, "Bleu", ["M", "L", "XL"]),
    new Produit(5, "Robe tendance", "300 DH", "femme", "image5.png", "Modèle tendance pour l'été.", false, "Vert", ["S", "M", "L"]),
    new Produit(6, "Robe de plage", "400 DH", "femme", "image6.png", "Parfaite pour la plage.", false, "Rose", ["M", "L"]),
    new Produit(7, "Robe casual", "500 DH", "femme", "image7.png", "Confort et style.", false, "Jaune", ["S", "M", "L", "XL"]),
    new Produit(8, "Robe de gala", "700 DH", "femme", "image6.png", "Coupe flatteuse.", false, "Rouge", ["M", "L"]),
    new Produit(9, "Robe d'été", "200 DH", "femme", "image11.png", "Look estival assuré.", false, "Violet", ["S", "M"]),
    new Produit(10, "Hoodie gris", "300 DH", "homme", "image13.png", "Hoodie confortable.", false, "Gris", ["M", "L", "XL"]),
    new Produit(11, "Jacket Sport", "300 DH", "homme", "image13.png", "Veste pour le sport.", false, "Bleu", ["L", "XL"]),
    new Produit(12, "Jacket Sport Pro", "300 DH", "homme", "image14.png", "Modèle sport.", false, "Noir", ["M", "L"]),
    new Produit(13, "Hoodie noir", "300 DH", "homme", "image15.png", "Modèle casual.", false, "Noir", ["S", "M", "L"]),
    new Produit(14, "Hoodie tendance", "300 DH", "homme", "image16.png", "Hoodie homme tendance.", false, "Vert", ["M", "L", "XL"]),
    new Produit(15, "Veste professionnelle", "300 DH", "homme", "image17.png", "Idéale pour le bureau.", false, "Gris", ["L", "XL"]),
    new Produit(16, "Jacket homme", "300 DH", "homme", "image18.png", "Style moderne.", false, "Bleu", ["M", "L"]),
    new Produit(17, "Hoodie bleu", "300 DH", "homme", "image19.png", "Modèle décontracté.", false, "Bleu", ["S", "M", "L"]),
    new Produit(18, "Hoodie coton", "500 DH", "homme", "image20.png", "Hoodie coton.", false, "Blanc", ["M", "L", "XL"]),
    new Produit(19, "Hoodie urbain", "300 DH", "homme", "image21.png", "Style urbain.", false, "Noir", ["L", "XL"]),
    new Produit(20, "Hoodie sport", "900 DH", "homme", "image13.png", "Look sportswear.", false, "Rouge", ["M", "L", "XL"]),
    new Produit(21, "Hoodie hiver", "300 DH", "homme", "image14.png", "Modèle hiver.", false, "Gris", ["S", "M", "L"]),
    new Produit(22, "Hoodie chaud", "400 DH", "homme", "image11.png", "Hoodie chaud.", false, "Marron", ["M", "L"]),
    new Produit(23, "Hoodie moderne", "300 DH", "homme", "image14.png", "Design moderne.", false, "Noir", ["L", "XL"]),
];

// Global products array for compatibility with script.js
var products = produits;

// // Fonction unique pour charger et afficher les produits
function afficherProduits() {
    const container = document.getElementById("zone_principale_Store");
    // les produit seront afficher dans cette zone principale avec id  zone_principale_Store
    
    // Vérifier si le conteneur existe
    if (!container) {
        console.error("Le conteneur zone_principale_Store n'a pas été trouvé dans le DOM.");
        return;
    }
    
    // Vider le conteneur
    container.innerHTML = "";
    
    // Parcourir tous les produits et les afficher

    produits.forEach(produit => {  //On parcourt chaque élément de la liste produits avec une boucle forEach.
        
        const colDiv = document.createElement("div"); //On crée un div pour chaque produit
                                                     //  avec
                                                     //  des classes Bootstrap pour le rendre adapté à tous les écrans.
        colDiv.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";
        
        // Prepare tailles for data-sizes attribute
        let tailles = '';
        if (Array.isArray(produit.taille)) {
            tailles = produit.taille.join(',');
        } else if (typeof produit.taille === 'string') {
            tailles = produit.taille;
        }
        
        // remplit la div avec le code HTML 
        colDiv.innerHTML = `  
  
            <div class="product-card" data-product-id="${produit.id}">
               
        
                <div class="product-image-container">
                    <img src="${produit.imageUrl}" alt="${produit.nom}"
                         data-category="${produit.categorie}" 
                         data-color="${produit.couleur || ''}"
                         data-sizes="${tailles}"
                         onerror="this.src='https://via.placeholder.com/300x250?text=Image+Non+Disponible'" 
                         onclick="voirDetails(${produit.id})">
                         //onclick = si on clique sur l'image, on appelle la fonction voirDetails()
                         //  pour afficher les détails du produit.
                </div>
                
                <div class="product-info">
                    <div>
                        <h5 class="product-title">${produit.nom}</h5>
                        <p class="product-price">${produit.prix}</p>
                        <p class="small text-muted">${produit.description}</p>
                    </div>
                    <button class="add-to-cart">
                        <i class="bi bi-cart-plus"></i> Ajouter au panier
                    </button>
               
            </div>
        `;
        
        container.appendChild(colDiv);
    });
    
    // Configuration des boutons d'ajout au panier
    setupAddToCartFunctionality();
}

// Fonction pour voir les détails d'un produit
function voirDetails(idProduit) {
    localStorage.setItem("produitSelectionne", idProduit);  //La méthode localStorage.setItem(clé, valeur)
    // Cette ligne enregistre l'ID du produit sélectionné dans le localStorage du navigateur.

// ocalStorage est une sorte de mémoire locale du navigateur.

//  "produitSelectionne" est la clé.

// idProduit est la valeur qu'on stocke.

// Cela permet de retrouver cet ID plus tard, même après avoir changé de page.



    window.location.href = "details.html";

    // On redirige l'utilisateur vers une nouvelle page HTML : details.html.

// Cette page va utiliser l'ID stocké pour afficher les détails du produit sélectionné.
}

// Fonction pour filtrer par catégorie
function filterByCategory(category) {
    const container = document.getElementById("zone_principale_Store"); //On sélectionne la zone HTML où les produits doivent apparaître (zone_principale_Store).
    container.innerHTML = "";   //Ensuite, on la vide (innerHTML = "") pour pouvoir afficher les nouveaux produits filtrés.
    
    const produitsFiltres = category === 'tous' ? // Si l'utilisateur a cliqué sur "Tous", alors on garde tous les produits.
        produits : 
        produits.filter(produit => produit.categorie.toLowerCase() === category.toLowerCase()); //Sinon, on filtre la liste des produits avec la méthode filter() pour ne garder que ceux qui ont une catégorie correspondante 
        // (on utilise toLowerCase() pour ne pas être sensible à la casse).
    
    produitsFiltres.forEach(produit => {  // Pour chaque produit filtré, on crée une div pour l'affichage en colonne avec Bootstrap.
        const colDiv = document.createElement("div");
        colDiv.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";
        
        const promotionBadge = produit.promotion 
            ? `<span class="product-badge">Promo</span>` 
            : '';
            
        // Prepare tailles for data-sizes attribute
        let tailles = '';
        if (Array.isArray(produit.taille)) {
            tailles = produit.taille.join(',');
        } else if (typeof produit.taille === 'string') {
            tailles = produit.taille;
        }
         
//   On insère le contenu HTML du produit dans colDiv.

// Image avec onclick="voirDetails(...)" pour aller à la page de détails.

// Titre, prix, description.

// Bouton "Ajouter au panier" avec une icône de caddie.
// tu insères du contenu HTML directement dans la div colDiv
        colDiv.innerHTML = `
            <div class="product-card" data-product-id="${produit.id}">
                ${promotionBadge}
                <div class="product-image-container">
                    <img src="${produit.imageUrl}" alt="${produit.nom}" 
                         data-category="${produit.categorie}" 
                         data-color="${produit.couleur || ''}"
                         data-sizes="${tailles}"
                         onerror="this.src='https://via.placeholder.com/300x250?text=Image+Non+Disponible'" 
                         onclick="voirDetails(${produit.id})">
                </div>
                <div class="product-info">
                    <div>
                        <h5 class="product-title">${produit.nom}</h5>
                        <p class="product-price">${produit.prix}</p>
                        <p class="small text-muted">${produit.description}</p>
                    </div>
                    <button class="add-to-cart">
                        <i class="bi bi-cart-plus"></i> Ajouter au panier
                    </button>
                </div>
            </div>
        `;
        
        container.appendChild(colDiv); //On ajoute la colDiv (le produit) à la zone principale.
    });
    
    // Configuration des boutons d'ajout au panier
    setupAddToCartFunctionality();  //On appelle une fonction qui va activer les boutons "Ajouter au panier" pour qu'ils fonctionnent.
}

// Fonction pour filtrer par intervalle de prix (corrigée)
function fct_filtre_intervalle_prix() {
    const min = parseFloat(document.getElementById("prixMin").value) || 0;
    const max = parseFloat(document.getElementById("prixMax").value) || Infinity;
    
    const container = document.getElementById("zone_principale_Store"); //kan selectionnew la zone principale dyana
    container.innerHTML = ""; // kan videw la zone bach n7ato fiha par la suite ghi les produits avec prix filtre par utilisateur
    
    const produitsFiltres = produits.filter(produit => {
        // Extraire le nombre du prix (sans "DH" ou autres caractères)
        const prixProduit = parseFloat(produit.prix.replace(/[^\d]/g, ''));
        return prixProduit >= min && prixProduit <= max;   // kan filtrew b max w min
    });
    
    produitsFiltres.forEach(produit => {
        const colDiv = document.createElement("div");
        colDiv.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4"; // hna kan crew div bnisba les produits selectionnee b prix dyalhom
        
        const promotionBadge = produit.promotion 
            ? `<span class="product-badge">Promo</span>` 
            : '';
            
        // Prepare tailles for data-sizes attribute
        let tailles = '';
        if (Array.isArray(produit.taille)) {
            tailles = produit.taille.join(',');
        } else if (typeof produit.taille === 'string') {
            tailles = produit.taille;
        }
        
        //hna kan affichwe  dok les produits li filtraw
        colDiv.innerHTML = `
            <div class="product-card" data-product-id="${produit.id}">
                ${promotionBadge}
                <div class="product-image-container">
                    <img src="${produit.imageUrl}" alt="${produit.nom}" 
                         data-category="${produit.categorie}" 
                         data-color="${produit.couleur || ''}"
                         data-sizes="${tailles}"
                         onerror="this.src='https://via.placeholder.com/300x250?text=Image+Non+Disponible'" 
                         onclick="voirDetails(${produit.id})">
                </div>
                <div class="product-info">
                    <div>
                        <h5 class="product-title">${produit.nom}</h5>
                        <p class="product-price">${produit.prix}</p>
                        <p class="small text-muted">${produit.description}</p>
                    </div>
                    <button class="add-to-cart">
                        <i class="bi bi-cart-plus"></i> Ajouter au panier
                    </button>
                </div>
            </div>
        `;
        
        container.appendChild(colDiv);
    });
    
    // Configuration des boutons d'ajout au panier
    setupAddToCartFunctionality();
}

// Fonction pour gérer l'ajout des produits au panier
function setupAddToCartFunctionality() {
    // Récupérer le panier existant ou créer un nouveau
    let panier = JSON.parse(localStorage.getItem('panier')) || [];
    
    // Mettre à jour le compteur du panier
    function updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = panier.length;
        }
    }
    
    // Initialiser le compteur
    updateCartCount();
    
    // Ajouter les écouteurs d'événements aux boutons
    document.querySelectorAll('.add-to-cart').forEach(button => { //On sélectionne tous les boutons ayant la classe .add-to-cart et on boucle dessus avec .forEach.
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productId = productCard.getAttribute('data-product-id');
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const productImage = productCard.querySelector('img').getAttribute('src');
            const productCategory = productCard.querySelector('img').getAttribute('data-category');
            
            const product = {
                id: productId,
                nom: productName,
                prix: productPrice,
                image: productImage,
                categorie: productCategory,
                quantite: 1
            };
            
            const existingProductIndex = panier.findIndex(item => item.id === productId);
            
            if (existingProductIndex > -1) {
                panier[existingProductIndex].quantite += 1;
            } else {
                panier.push(product);
            }
            
            localStorage.setItem('panier', JSON.stringify(panier));
            updateCartCount();
            
            // Feedback visuel
            this.innerHTML = '<i class="bi bi-check"></i> Ajouté';
            this.classList.add('bg-success');
            this.style.color = 'white';
            
            setTimeout(() => {
                this.innerHTML = '<i class="bi bi-cart-plus"></i> Ajouter au panier';
                this.classList.remove('bg-success');
                this.style.color = '';
            }, 1500);
            
            // Afficher une notification
            showNotification(productName);
        });
    });
}

// Fonction pour afficher une notification
function showNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'toast-notification';
    notification.innerHTML = `
        <div class="toast-content">
            <i class="bi bi-check-circle-fill text-success"></i>
            <div class="toast-message">
                <span class="fw-bold">${productName}</span> a été ajouté au panier
            </div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Ajouter le style pour les notifications
const style = document.createElement('style');
style.textContent = `
    .toast-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: white;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        padding: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        z-index: 1100;
        animation: slideIn 0.3s ease-out;
    }
    
    .toast-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .toast-close {
        background: transparent;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #888;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

document.head.appendChild(style);

// Initialiser les produits au chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
    afficherProduits();
    
    // Configurer les écouteurs d'événements pour la recherche
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("keyup", function() {
            let input = this.value.toLowerCase();
            const container = document.getElementById("zone_principale_Store");
            container.innerHTML = "";
            
            const produitsFiltres = produits.filter(produit => 
                produit.nom.toLowerCase().includes(input) || 
                produit.categorie.toLowerCase().includes(input) ||
                produit.description.toLowerCase().includes(input)
            );
            
            if (produitsFiltres.length === 0) {
                container.innerHTML = `
                    <div class="col-12 text-center py-5">
                        <h3>Aucun produit ne correspond à votre recherche</h3>
                        <p>Essayez avec d'autres termes ou consultez nos catégories</p>
                    </div>
                `;
                return;
            }
            
            produitsFiltres.forEach(produit => {
                const colDiv = document.createElement("div");
                colDiv.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";
                
                const promotionBadge = produit.promotion 
                    ? `<span class="product-badge">Promo</span>` 
                    : '';
                
                colDiv.innerHTML = `
                    <div class="product-card" data-product-id="${produit.id}">
                        ${promotionBadge}
                        <div class="product-image-container">
                            <img src="${produit.imageUrl}" alt="${produit.nom}" data-category="${produit.categorie}" 
                                 onerror="this.src='https://via.placeholder.com/300x250?text=Image+Non+Disponible'" 
                                 onclick="voirDetails(${produit.id})">
                        </div>
                        <div class="product-info">
                            <div>
                                <h5 class="product-title">${produit.nom}</h5>
                                <p class="product-price">${produit.prix}</p>
                                <p class="small text-muted">${produit.description}</p>
                            </div>
                            <button class="add-to-cart">
                                <i class="bi bi-cart-plus"></i> Ajouter au panier
                            </button>
                        </div>
                    </div>
                `;
                
                container.appendChild(colDiv);
            });
            
            setupAddToCartFunctionality();
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Appliquer la préférence au chargement
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }

    // Gestion du changement de thème
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            // Sauvegarder la préférence dans le localStorage
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
});



