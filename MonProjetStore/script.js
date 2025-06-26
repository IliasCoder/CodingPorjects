// Script pour gérer les produits et le panier sur index2.html
    // Fonction pour filtrer par catégorie
    function filterByCategory(category) {
      let cards = document.querySelectorAll(".product-card");
      
      cards.forEach(function (card) {
        let cardCategory = card.querySelector("img").getAttribute("data-category") || "";
        let shouldShow = category === 'tous' || cardCategory.toLowerCase() === category.toLowerCase();
        card.parentElement.style.display = shouldShow ? "block" : "none";
      });
    }
    
    // Fonction existante pour la recherche
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.addEventListener("keyup", function () {
        let input = this.value.toLowerCase();
        let cards = document.querySelectorAll(".product-card");
  
        cards.forEach(function (card) {
          let category = card.querySelector("img").getAttribute("data-category") || "";
          let title = card.querySelector(".product-title").textContent.toLowerCase();
          let visible = category.toLowerCase().includes(input) || title.includes(input);
          card.parentElement.style.display = visible ? "block" : "none";
        });
      });
    }
    
    // Gestion du panier
    const panier = JSON.parse(localStorage.getItem('panier')) || [];
    updateCartCount();
    
    function updateCartCount() {
      document.getElementById('cart-count').textContent = panier.length;
    }
    
    // Cette fonction sera appelée après le chargement des produits
    function setupAddToCartButtons() {
      const buttons = document.querySelectorAll('.add-to-cart');
      
      buttons.forEach((button) => {
        button.addEventListener('click', function() {
          const card = this.closest('.product-card');
          const nom = card.querySelector('.product-title').textContent;
          const prix = card.querySelector('.product-price').textContent;
          const image = card.querySelector('img').getAttribute('src');
          
          const produit = { nom, prix, image };
          panier.push(produit);
          
          localStorage.setItem('panier', JSON.stringify(panier));
          updateCartCount();
          
          // Feedback visuel
          this.innerHTML = '<i class="bi bi-check"></i> Ajouté';
          this.classList.add('bg-success');
          
          setTimeout(() => {
            this.innerHTML = '<i class="bi bi-cart-plus"></i> Ajouter au panier';
            this.classList.remove('bg-success');
          }, 1500);
        });
      });
    }
    
    // Fonction pour filtrer par intervalle de prix
    function fct_filtre_intervalle_prix() {
      const min = parseFloat(document.getElementById('prixMin').value) || 0;
      const max = parseFloat(document.getElementById('prixMax').value) || Infinity;
      
      let cards = document.querySelectorAll(".product-card");
      let visibleCount = 0;
      
      cards.forEach(function (card) {
        const priceText = card.querySelector(".product-price").textContent;
        const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
        
        const visible = price >= min && price <= max;
        card.parentElement.style.display = visible ? "block" : "none";
        if (visible) visibleCount++;
      });
      
      // Update product counter
      updateProductCounter();
      
      // Show feedback message
      if (min > 0 || max < Infinity) {
        const message = `Affichage de ${visibleCount} produit(s) entre ${min}€ et ${max === Infinity ? '∞' : max + '€'}`;
        showFilterNotification(message);
      }
    }

// Script pour afficher les produits sur index2.html
document.addEventListener('DOMContentLoaded', function() {
  // 1. Récupérer les produits du localStorage
  // Use the global products array defined in StructureDonnees.js
if (typeof products === 'undefined' || !Array.isArray(products)) {
  console.error("La variable 'products' n'est pas définie !");
  return;
}
  console.log("Produits chargés:", products);

  // 2. Obtenir le conteneur des produits
  const productsContainer = document.getElementById('zone_principale_Store');
  if (!productsContainer) {
    console.error("Élément #zone_principale_Store non trouvé!");
    return;
  }

  // 3. Vider le conteneur
  productsContainer.innerHTML = '';

  // 4. Vérifier si des produits existent
  if (!products || products.length === 0) {
    productsContainer.innerHTML = `
      <div class="col-12 text-center py-5 text-muted">
        <i class="bi bi-inbox fs-1"></i>
        <p class="mt-3">Aucun produit disponible pour le moment</p>
      </div>
    `;
    return;
  }

  // 5. Afficher chaque produit
  products.forEach((product, index) => {
    const productCol = document.createElement('div');
    productCol.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';

    const imageUrl = product.image || 'https://via.placeholder.com/300x200?text=Uniq%27Style';
    const promoTag = product.en_promo ? '<span class="product-badge">Promo</span>' : '';
    
    // Fix data attributes for filtering - handle both taille and tailles properties
    let sizes = '';
    if (product.tailles && Array.isArray(product.tailles)) {
      sizes = product.tailles.join(',');
    } else if (product.taille) {
      if (Array.isArray(product.taille)) {
        sizes = product.taille.join(',');
      } else {
        sizes = product.taille;
      }
    }
    
    const color = product.couleur || '';

    productCol.innerHTML = `
      <div class="product-card">
        <div class="product-image-container position-relative">
          ${promoTag}
          <img src="${imageUrl}" alt="${product.nom_produit}" 
               data-category="${product.categorie}" 
               data-sizes="${sizes}" 
               data-color="${color}">
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.nom_produit}</h3>
          <p class="product-price">${parseFloat(product.prix).toFixed(2)} DH</p>
          <button class="add-to-cart" data-product-index="${index}">
            <i class="bi bi-cart-plus"></i> Ajouter au panier
          </button>
          <button class="wishlist-btn" data-product-id="${product.id}" title="Ajouter à la wishlist"><i class="bi bi-heart"></i></button>
        </div>
      </div>
    `;
    productsContainer.appendChild(productCol);
  });

  // 6. Configuration des boutons d'ajout au panier
  setupAddToCartButtons();

  // 7. Mise à jour du compteur du panier
  updateCartCount();
  
  // 8. Mise à jour du compteur de produits
  updateProductCounter();

  // --- Improved Size and Color Filter Logic ---
  function filterBySizeAndColor() {
    const selectedSize = document.getElementById('sizeFilter').value;
    const selectedColor = document.getElementById('colorFilter').value.toLowerCase();
    const cards = document.querySelectorAll('.product-card');

    let visibleCount = 0;

    cards.forEach(function(card) {
      const img = card.querySelector('img');
      const sizes = (img.getAttribute('data-sizes') || '').split(',').map(s => s.trim());
      const color = (img.getAttribute('data-color') || '').toLowerCase();
      
      let show = true;
      
      // Size filter
      if (selectedSize && selectedSize !== '') {
        show = show && sizes.includes(selectedSize);
      }
      
      // Color filter
      if (selectedColor && selectedColor !== '') {
        show = show && color === selectedColor;
      }
      
      card.parentElement.style.display = show ? 'block' : 'none';
      if (show) visibleCount++;
    });
    
    // Update product counter
    updateProductCounter();
    
    // Show feedback message
    if (selectedSize || selectedColor) {
      let message = `Affichage de ${visibleCount} produit(s)`;
      if (selectedSize) message += ` en taille ${selectedSize}`;
      if (selectedColor) message += ` en couleur ${selectedColor}`;
      showFilterNotification(message);
    }
  }

  // Add event listeners for size and color filters
  const sizeFilter = document.getElementById('sizeFilter');
  const colorFilter = document.getElementById('colorFilter');
  
  if (sizeFilter) {
    sizeFilter.addEventListener('change', filterBySizeAndColor);
  }
  
  if (colorFilter) {
    colorFilter.addEventListener('change', filterBySizeAndColor);
  }
  
  // Initialize filter options based on available products
  initializeFilterOptions();

  // After setupAddToCartButtons();
  setupWishlistButtons();
});

// Function to initialize filter options based on available products
function initializeFilterOptions() {
  if (typeof products === 'undefined' || !Array.isArray(products)) {
    console.log('No products found or products is not an array:', products);
    return;
  }
  console.log('Products for filter initialization:', products);
  
  // Define valid sizes
  const validSizes = new Set(['S', 'M', 'L', 'XL']);
  // Define a regex for valid colors (letters only, at least 2 chars)
  const colorRegex = /^[a-zA-Zéèàùâêîôûçëïüÿœæ\-\s]{2,}$/i;

  const allSizes = new Set();
  const allColors = new Set();
  
  products.forEach(product => {
    // --- Handle sizes robustly ---
    let taillesArr = [];
    if (Array.isArray(product.taille)) {
      taillesArr = product.taille;
    } else if (typeof product.taille === 'string' && product.taille.trim() !== '') {
      taillesArr = [product.taille];
    }
    taillesArr.forEach(size => {
      if (typeof size === 'string' && validSizes.has(size.trim().toUpperCase())) {
        allSizes.add(size.trim().toUpperCase());
      }
    });
    // --- Handle colors robustly ---
    if (product.couleur && typeof product.couleur === 'string') {
      const color = product.couleur.trim();
      if (color && !validSizes.has(color.toUpperCase()) && colorRegex.test(color)) {
        allColors.add(color.charAt(0).toUpperCase() + color.slice(1).toLowerCase());
      }
    }
  });
  console.log('Sizes found:', Array.from(allSizes));
  console.log('Colors found:', Array.from(allColors));
  
  // Update size filter options
  const sizeFilter = document.getElementById('sizeFilter');
  if (sizeFilter) {
    const currentValue = sizeFilter.value;
    sizeFilter.innerHTML = '<option value="">Toutes les tailles</option>';
    Array.from(allSizes).sort().forEach(size => {
      const option = document.createElement('option');
      option.value = size;
      option.textContent = size;
      sizeFilter.appendChild(option);
    });
    sizeFilter.value = currentValue;
    console.log('Size filter populated');
  }
  // Update color filter options
  const colorFilter = document.getElementById('colorFilter');
  if (colorFilter) {
    const currentValue = colorFilter.value;
    colorFilter.innerHTML = '<option value="">Toutes les couleurs</option>';
    Array.from(allColors).sort().forEach(color => {
      const option = document.createElement('option');
      option.value = color;
      option.textContent = color;
      colorFilter.appendChild(option);
    });
    colorFilter.value = currentValue;
    console.log('Color filter populated');
  }
}

// Function to update product counter
function updateProductCounter() {
  const visibleCards = document.querySelectorAll('.product-card').length;
  const productCountElement = document.getElementById('productCount');
  if (productCountElement) {
    productCountElement.textContent = visibleCards;
  }
}

// Function to clear all filters and show all products
function clearAllFilters() {
  // Reset filter inputs
  const sizeFilter = document.getElementById('sizeFilter');
  const colorFilter = document.getElementById('colorFilter');
  const prixMin = document.getElementById('prixMin');
  const prixMax = document.getElementById('prixMax');
  
  if (sizeFilter) sizeFilter.value = '';
  if (colorFilter) colorFilter.value = '';
  if (prixMin) prixMin.value = '';
  if (prixMax) prixMax.value = '';
  
  // Show all products
  const cards = document.querySelectorAll('.product-card');
  cards.forEach(function(card) {
    card.parentElement.style.display = 'block';
  });
  
  // Update product counter
  updateProductCounter();
  
  // Show success message
  showFilterNotification('Tous les filtres ont été effacés');
}

// Function to show filter notifications
function showFilterNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'alert alert-success alert-dismissible fade show position-fixed';
  notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
  notification.innerHTML = `
    <i class="bi bi-check-circle me-2"></i>${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 3000);
}

// Fonction pour gérer les bouttons d'ajout au panier
function setupAddToCartButtons() {
  const buttons = document.querySelectorAll('.add-to-cart');
  buttons.forEach((button) => {
    button.addEventListener('click', function() {
      const card = this.closest('.product-card');
      const nom = card.querySelector('.product-title').textContent;
      const prix = card.querySelector('.product-price').textContent;
      const image = card.querySelector('img').getAttribute('src');
      const produit = { nom, prix, image };
      // Always get the latest panier from localStorage
      const panier = JSON.parse(localStorage.getItem('panier')) || [];
      panier.push(produit);
      localStorage.setItem('panier', JSON.stringify(panier));
      updateCartCount();
      this.innerHTML = '<i class="bi bi-check"></i> Ajouté';
      this.classList.add('bg-success');
      setTimeout(() => {
        this.innerHTML = '<i class="bi bi-cart-plus"></i> Ajouter au panier';
        this.classList.remove('bg-success');
      }, 1500);
    });
  });
}

// Mise à jour du compteur du panier
function updateCartCount() {
  const panier = JSON.parse(localStorage.getItem('panier')) || [];
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = panier.length;
  }
}

// --- Robust Night Mode Toggle ---
function updateNightModeButton() {
  const isNight = document.body.classList.contains('night-mode');
  const nightIcon = document.querySelector('#nightModeToggle .night-icon');
  const dayIcon = document.querySelector('#nightModeToggle .day-icon');
  if (nightIcon && dayIcon) {
    nightIcon.style.display = isNight ? 'none' : 'inline';
    dayIcon.style.display = isNight ? 'inline' : 'none';
  }
}

window.addEventListener('DOMContentLoaded', function() {
  const nightModeBtn = document.getElementById('nightModeToggle');
  // Restore state from localStorage
  if (localStorage.getItem('nightMode') === 'on') {
    document.body.classList.add('night-mode');
  } else {
    document.body.classList.remove('night-mode');
  }
  updateNightModeButton();
  if (nightModeBtn) {
    nightModeBtn.onclick = function() {
      document.body.classList.toggle('night-mode');
      if (document.body.classList.contains('night-mode')) {
        localStorage.setItem('nightMode', 'on');
      } else {
        localStorage.setItem('nightMode', 'off');
      }
      updateNightModeButton();
    };
  }
});

// --- Wishlist Functionality ---
function getWishlist() {
  return JSON.parse(localStorage.getItem('wishlist')) || [];
}

function saveWishlist(wishlist) {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function isInWishlist(productId) {
  const wishlist = getWishlist();
  return wishlist.includes(productId);
}

function toggleWishlist(productId) {
  let wishlist = getWishlist();
  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter(id => id !== productId);
  } else {
    wishlist.push(productId);
  }
  saveWishlist(wishlist);
  updateWishlistIcons();
  updateWishlistCount();
}

function updateWishlistIcons() {
  const wishlist = getWishlist();
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    const pid = parseInt(btn.getAttribute('data-product-id'));
    if (wishlist.includes(pid)) {
      btn.classList.add('active');
      btn.innerHTML = '<i class="bi bi-heart-fill"></i>';
    } else {
      btn.classList.remove('active');
      btn.innerHTML = '<i class="bi bi-heart"></i>';
    }
  });
}

function updateWishlistCount() {
  const count = getWishlist().length;
  const badge = document.getElementById('wishlist-count');
  if (badge) badge.textContent = count;
}

// Call this after rendering products
function setupWishlistButtons() {
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.onclick = function() {
      const pid = parseInt(this.getAttribute('data-product-id'));
      toggleWishlist(pid);
    };
  });
  updateWishlistIcons();
}

// --- Wishlist Modal Rendering ---
function renderWishlistModal() {
  console.log('Rendering wishlist modal...');
  const wishlist = getWishlist();
  console.log('Wishlist IDs:', wishlist);
  const body = document.getElementById('wishlistModalBody');
  if (!body) return;
  if (wishlist.length === 0) {
    body.innerHTML = '<div class="text-center text-muted py-4"><i class="bi bi-heart fs-1"></i><p class="mt-3">Votre wishlist est vide.</p></div>';
    return;
  }
  let html = '<div class="row">';
  wishlist.forEach(pid => {
    // Compare IDs as strings for robustness
    const product = products.find(p => String(p.id) === String(pid));
    console.log('Product for ID', pid, ':', product);
    if (!product) return;
    html += `<div class='col-md-4 mb-4'>
      <div class='card h-100'>
        <img src='${product.imageUrl}' class='card-img-top' alt='${product.nom_produit}'>
        <div class='card-body'>
          <h5 class='card-title'>${product.nom_produit}</h5>
          <p class='card-text mb-1'><strong>Prix:</strong> ${product.prix}</p>
          <p class='card-text mb-1'><strong>Couleur:</strong> ${product.couleur}</p>
          <p class='card-text mb-2'><strong>Tailles:</strong> ${(Array.isArray(product.taille) ? product.taille.join(', ') : product.taille || '-')}</p>
          <button class='btn btn-outline-danger btn-sm remove-wishlist-btn' data-product-id='${product.id}'>Retirer</button>
        </div>
      </div>
    </div>`;
  });
  html += '</div>';
  body.innerHTML = html;
  // Add event listeners for remove buttons
  document.querySelectorAll('.remove-wishlist-btn').forEach(btn => {
    btn.onclick = function() {
      const pid = this.getAttribute('data-product-id');
      toggleWishlist(pid);
      renderWishlistModal();
    };
  });
}

// Attach modal event after DOMContentLoaded
window.addEventListener('DOMContentLoaded', function() {
  const wishlistModal = document.getElementById('wishlistModal');
  if (wishlistModal) {
    wishlistModal.addEventListener('show.bs.modal', renderWishlistModal);
  }
});

