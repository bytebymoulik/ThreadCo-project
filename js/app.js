/**
 * ThreadCo - Application Core Logic
 * Catalog rendering, Cart management, Filtering, Size Chart, Ouija Reviews, Contact form
 */

class ThreadCoApp {
  constructor() {
    this.products = PRODUCTS_DATA;
    this.filteredProducts = [...this.products];
    this.cart = JSON.parse(localStorage.getItem('threadco_cart') || '[]');
    this.wishlist = JSON.parse(localStorage.getItem('threadco_wishlist') || '[]');
    this.activeCategory = 'all';
    this.searchQuery = '';
    this.sortBy = 'featured';
    this.selectedSizes = {}; // Product ID -> Selected Size
    this.selectedColors = {}; // Product ID -> Selected Color
    this.reviews = [...INITIAL_REVIEWS];
    this.discountApplied = false;
    this.discountRate = 0.20; // 20% off with BLOODMOON

    // Initialize default selections
    this.products.forEach(p => {
      this.selectedSizes[p.id] = p.defaultSize || p.sizes[0];
      this.selectedColors[p.id] = p.colors[0].name;
    });

    this.init();
  }

  init() {
    this.renderProducts();
    this.renderReviews();
    this.updateCartUI();
    this.initEventListeners();
    this.initCountdown();
    this.initSizeChart();
    this.initFitAdvisor();
  }

  /* ============================================================
     RENDER PRODUCT PROFILE CARDS
     ============================================================ */
  renderProducts() {
    const grid = document.getElementById('products-grid');
    const countBadge = document.getElementById('catalog-count');
    if (!grid) return;

    if (countBadge) {
      countBadge.textContent = `${this.filteredProducts.length} Cursed Artifacts`;
    }

    if (this.filteredProducts.length === 0) {
      grid.innerHTML = `
        <div class="empty-catalog-state">
          <div class="empty-ghost">👻</div>
          <h3 class="gothic-title">No Cursed Garments Found</h3>
          <p>The spectral mists yielded no results for "${this.searchQuery}". Try a different incantation or reset filters.</p>
          <button class="spooky-btn-primary" onclick="app.resetFilters()">Clear Filters 🕷️</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = this.filteredProducts.map(product => {
      const selectedSize = this.selectedSizes[product.id] || product.defaultSize;
      const stockForSize = product.stock[selectedSize] || 5;
      const isWishlisted = this.wishlist.includes(product.id);
      const selectedColor = this.selectedColors[product.id] || product.colors[0].name;

      // Stock warning text
      let stockMarkup = `<span class="stock-badge in-stock">⚡ In Stock - Ships from Crypt</span>`;
      if (stockForSize <= 3) {
        stockMarkup = `<span class="stock-badge low-stock">🔥 Only ${stockForSize} left in Size ${selectedSize}!</span>`;
      }

      return `
        <article class="clothing-card" id="card-${product.id}" data-id="${product.id}" style="--item-glow: ${product.glowColor};">
          <div class="card-inner">
            
            <!-- Top Badges & Actions -->
            <div class="card-header">
              <span class="product-badge badge-${product.badgeType}">${product.badge}</span>
              <button 
                class="wishlist-btn ${isWishlisted ? 'active' : ''}" 
                onclick="app.toggleWishlist('${product.id}', event)" 
                title="Curse / Wishlist Item"
                aria-label="Wishlist ${product.name}"
              >
                <svg viewBox="0 0 24 24" class="heart-icon"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </button>
            </div>

            <!-- Profile Visual Showcase -->
            <div class="card-image-wrapper" onclick="app.openQuickView('${product.id}')">
              <img 
                src="${product.image}" 
                alt="${product.name}" 
                class="card-img" 
                loading="lazy"
                onerror="this.onerror=null; this.src='${product.fallbackImage}';"
              />
              <div class="image-overlay-glow"></div>
              <button class="quick-view-trigger" onclick="event.stopPropagation(); app.openQuickView('${product.id}')">
                <span>👁️ Quick Summon</span>
              </button>
              <div class="fabric-floating-pill">${product.fit}</div>
            </div>

            <!-- Profile Info Content -->
            <div class="card-content">
              <div class="product-meta">
                <span class="category-tag">${product.categoryLabel}</span>
                <div class="skull-rating" title="${product.rating} out of 5 Skulls">
                  <span class="skulls">💀💀💀💀💀</span>
                  <span class="rating-num">${product.rating}</span>
                  <span class="review-count">(${product.reviewsCount})</span>
                </div>
              </div>

              <h3 class="product-name" onclick="app.openQuickView('${product.id}')">${product.name}</h3>
              <p class="product-snippet">${product.description}</p>

              <!-- Interactive Colorway Selector -->
              <div class="color-selection">
                <span class="selection-label">Hue: <strong>${selectedColor}</strong></span>
                <div class="color-swatches">
                  ${product.colors.map(c => `
                    <button 
                      class="color-swatch ${c.name === selectedColor ? 'active' : ''}" 
                      style="background-color: ${c.hex};" 
                      title="${c.name}"
                      onclick="app.selectColor('${product.id}', '${c.name}', event)"
                    ></button>
                  `).join('')}
                </div>
              </div>

              <!-- Interactive Size Selector & Size Chart Link -->
              <div class="size-selection-box">
                <div class="size-header">
                  <span class="selection-label">Select Vessel Size:</span>
                  <button class="size-chart-link-btn" onclick="app.openSizeChart('${product.category}', event)">
                    📏 Size Chart
                  </button>
                </div>
                
                <div class="size-pills">
                  ${product.sizes.map(size => `
                    <button 
                      class="size-pill ${size === selectedSize ? 'active' : ''}" 
                      onclick="app.selectSize('${product.id}', '${size}', event)"
                    >
                      ${size}
                    </button>
                  `).join('')}
                </div>

                <!-- Stock / Urgency Feedback -->
                <div class="stock-status-bar" id="stock-${product.id}">
                  ${stockMarkup}
                </div>
              </div>

              <!-- Price & Actions Footer -->
              <div class="card-footer">
                <div class="price-container">
                  <span class="current-price">$${product.price}</span>
                  <span class="original-price">$${product.originalPrice}</span>
                  <span class="discount-pill">-${Math.round((1 - product.price/product.originalPrice)*100)}%</span>
                </div>

                <button 
                  class="add-to-cart-btn" 
                  id="add-btn-${product.id}"
                  onclick="app.addToCart('${product.id}', event)"
                >
                  <span class="btn-icon">🛒</span>
                  <span class="btn-text">Add to Coven</span>
                </button>
              </div>

            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  /* ============================================================
     SELECTION HANDLERS
     ============================================================ */
  selectSize(productId, size, event) {
    if (event) event.stopPropagation();
    this.selectedSizes[productId] = size;

    const card = document.getElementById(`card-${productId}`);
    if (card) {
      const pills = card.querySelectorAll('.size-pill');
      pills.forEach(p => p.classList.toggle('active', p.textContent.trim() === size));

      // Update stock notice
      const product = this.products.find(p => p.id === productId);
      const stockBar = document.getElementById(`stock-${productId}`);
      if (product && stockBar) {
        const stock = product.stock[size] || 5;
        if (stock <= 3) {
          stockBar.innerHTML = `<span class="stock-badge low-stock">🔥 Only ${stock} left in Size ${size}!</span>`;
        } else {
          stockBar.innerHTML = `<span class="stock-badge in-stock">⚡ In Stock - Ships from Crypt</span>`;
        }
      }
    }

    if (window.halloweenFX) {
      window.halloweenFX.playSpookySound('select-size');
    }
  }

  selectColor(productId, colorName, event) {
    if (event) event.stopPropagation();
    this.selectedColors[productId] = colorName;

    const card = document.getElementById(`card-${productId}`);
    if (card) {
      const swatches = card.querySelectorAll('.color-swatch');
      swatches.forEach(s => s.classList.toggle('active', s.getAttribute('title') === colorName));
      const label = card.querySelector('.color-selection strong');
      if (label) label.textContent = colorName;
    }

    if (window.halloweenFX) {
      window.halloweenFX.playSpookySound('select-color');
    }
  }

  toggleWishlist(productId, event) {
    if (event) event.stopPropagation();
    const index = this.wishlist.indexOf(productId);
    const product = this.products.find(p => p.id === productId);

    if (index === -1) {
      this.wishlist.push(productId);
      this.showToast(`Curse bound! "${product.name}" added to your Dark Wishlist 🕷️`);
      if (window.halloweenFX) {
        window.halloweenFX.spawnBatBurst(event.clientX, event.clientY, 5);
      }
    } else {
      this.wishlist.splice(index, 1);
      this.showToast(`Curse lifted from "${product.name}"`);
    }

    localStorage.setItem('threadco_wishlist', JSON.stringify(this.wishlist));
    this.renderProducts();
    this.updateWishlistCount();
  }

  updateWishlistCount() {
    const badge = document.getElementById('wishlist-badge');
    if (badge) {
      badge.textContent = this.wishlist.length;
      badge.classList.toggle('visible', this.wishlist.length > 0);
    }
  }

  /* ============================================================
     CART MANAGEMENT
     ============================================================ */
  addToCart(productId, event) {
    if (event) event.stopPropagation();
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    const size = this.selectedSizes[productId] || product.defaultSize;
    const color = this.selectedColors[productId] || product.colors[0].name;

    const existingIndex = this.cart.findIndex(
      item => item.id === productId && item.size === size && item.color === color
    );

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += 1;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        fallbackImage: product.fallbackImage,
        size: size,
        color: color,
        quantity: 1
      });
    }

    this.saveCart();
    this.updateCartUI();

    // Button animation feedback
    const btn = document.getElementById(`add-btn-${productId}`);
    if (btn) {
      const originalHtml = btn.innerHTML;
      btn.innerHTML = `<span>🦇 Summoned!</span>`;
      btn.classList.add('btn-summoned');
      setTimeout(() => {
        btn.innerHTML = originalHtml;
        btn.classList.remove('btn-summoned');
      }, 1200);
    }

    // Audio & particle feedback
    if (window.halloweenFX) {
      window.halloweenFX.playSpookySound('add-to-cart');
      const rect = event.target.getBoundingClientRect();
      window.halloweenFX.spawnBatBurst(rect.left + rect.width/2, rect.top + rect.height/2, 6);
    }

    this.showToast(`🎃 Added "${product.name}" [${size} / ${color}] to Coven Cart!`);
  }

  removeFromCart(index) {
    this.cart.splice(index, 1);
    this.saveCart();
    this.updateCartUI();
    if (window.halloweenFX) window.halloweenFX.playSpookySound('banish');
    this.showToast('Item banished from cart 💨');
  }

  updateCartQuantity(index, delta) {
    if (!this.cart[index]) return;
    this.cart[index].quantity += delta;
    if (this.cart[index].quantity <= 0) {
      this.removeFromCart(index);
      return;
    }
    this.saveCart();
    this.updateCartUI();
    if (window.halloweenFX) window.halloweenFX.playSpookySound('bubble');
  }

  saveCart() {
    localStorage.setItem('threadco_cart', JSON.stringify(this.cart));
  }

  updateCartUI() {
    const countBadge = document.getElementById('cart-count');
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);

    if (countBadge) {
      countBadge.textContent = totalItems;
      countBadge.classList.toggle('visible', totalItems > 0);
    }

    // Render Cart Drawer Items
    const cartItemsContainer = document.getElementById('cart-drawer-items');
    const subtotalEl = document.getElementById('cart-subtotal');
    const discountEl = document.getElementById('cart-discount');
    const totalEl = document.getElementById('cart-total');
    const freeShippingBar = document.getElementById('free-shipping-progress');
    const freeShippingText = document.getElementById('free-shipping-text');

    if (!cartItemsContainer) return;

    if (this.cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <div class="cart-empty-cauldron">🫕</div>
          <h4>Your Coven Cart is Empty</h4>
          <p>No cursed garments have been summoned yet. Browse the catalog to feed your nocturnal wardrobe.</p>
          <button class="spooky-btn-primary" onclick="app.closeCartDrawer()">Begin Summoning 🦇</button>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = '$0.00';
      if (discountEl) discountEl.textContent = '-$0.00';
      if (totalEl) totalEl.textContent = '$0.00';
      if (freeShippingBar) freeShippingBar.style.width = '0%';
      if (freeShippingText) freeShippingText.textContent = 'Add $99 for Free Cursed Shipping';
      return;
    }

    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = this.discountApplied ? (subtotal * this.discountRate) : 0;
    const total = Math.max(0, subtotal - discount);

    // Free shipping threshold: $99
    const threshold = 99;
    const progress = Math.min(100, (subtotal / threshold) * 100);
    if (freeShippingBar) freeShippingBar.style.width = `${progress}%`;
    if (freeShippingText) {
      if (subtotal >= threshold) {
        freeShippingText.innerHTML = `🎉 <strong>Unholy Blessing:</strong> You have unlocked FREE Cursed Shipping!`;
      } else {
        const remaining = (threshold - subtotal).toFixed(2);
        freeShippingText.innerHTML = `Add <strong>$${remaining}</strong> more for Free Cursed Shipping 🎃`;
      }
    }

    cartItemsContainer.innerHTML = this.cart.map((item, idx) => `
      <div class="cart-line-item">
        <img 
          src="${item.image}" 
          alt="${item.name}" 
          class="cart-item-thumb" 
          onerror="this.onerror=null; this.src='${item.fallbackImage}';"
        />
        <div class="cart-item-details">
          <h5 class="cart-item-name">${item.name}</h5>
          <div class="cart-item-specs">
            <span class="spec-pill">Size: ${item.size}</span>
            <span class="spec-pill">${item.color}</span>
          </div>
          <div class="cart-item-pricing">
            <span class="cart-price">$${item.price}</span>
            ${item.originalPrice ? `<span class="cart-original-price">$${item.originalPrice}</span>` : ''}
          </div>
          <div class="cart-item-controls">
            <div class="qty-control">
              <button class="qty-btn" onclick="app.updateCartQuantity(${idx}, -1)" aria-label="Decrease quantity">-</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" onclick="app.updateCartQuantity(${idx}, 1)" aria-label="Increase quantity">+</button>
            </div>
            <button class="remove-item-btn" onclick="app.removeFromCart(${idx})" title="Banish from cart">
              🗑️ Banish
            </button>
          </div>
        </div>
      </div>
    `).join('');

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (discountEl) discountEl.textContent = `-$${discount.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
  }

  applyPromoCode() {
    const input = document.getElementById('promo-input');
    if (!input) return;

    const code = input.value.trim().toUpperCase();
    if (code === 'BLOODMOON' || code === 'THREADCO') {
      this.discountApplied = true;
      this.updateCartUI();
      this.showToast('🔮 Incantation accepted! 20% Blood Moon discount applied!');
      input.disabled = true;
      const promoBtn = document.getElementById('apply-promo-btn');
      if (promoBtn) promoBtn.textContent = 'Applied ✓';
      if (window.halloweenFX) window.halloweenFX.playSpookySound('whisper');
    } else {
      this.showToast('⚠️ Invalid dark incantation. Try code "BLOODMOON"');
    }
  }

  openCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('modal-backdrop');
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('visible');
    document.body.classList.add('no-scroll');
    if (window.halloweenFX) window.halloweenFX.playSpookySound('modal-open');
  }

  closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('modal-backdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('visible');
    document.body.classList.remove('no-scroll');
    if (window.halloweenFX) window.halloweenFX.playSpookySound('modal-close');
  }

  /* ============================================================
     FILTERING & SEARCH
     ============================================================ */
  setCategory(cat) {
    this.activeCategory = cat;
    const buttons = document.querySelectorAll('.filter-tab-btn');
    buttons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-cat') === cat);
    });
    this.applyFilters();
  }

  setSort(sortType) {
    this.sortBy = sortType;
    this.applyFilters();
  }

  handleSearch(query) {
    this.searchQuery = query.toLowerCase().trim();
    this.applyFilters();
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(item => {
      const matchesCat = (this.activeCategory === 'all') || (item.category === this.activeCategory);
      const matchesSearch = !this.searchQuery || 
        item.name.toLowerCase().includes(this.searchQuery) ||
        item.description.toLowerCase().includes(this.searchQuery) ||
        item.categoryLabel.toLowerCase().includes(this.searchQuery) ||
        item.lore.toLowerCase().includes(this.searchQuery);
      return matchesCat && matchesSearch;
    });

    // Sorting
    if (this.sortBy === 'price-low') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'price-high') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'rating') {
      this.filteredProducts.sort((a, b) => b.rating - a.rating);
    }

    this.renderProducts();
  }

  resetFilters() {
    this.activeCategory = 'all';
    this.searchQuery = '';
    this.sortBy = 'featured';

    const searchInput = document.getElementById('catalog-search-input');
    if (searchInput) searchInput.value = '';

    const sortSelect = document.getElementById('catalog-sort-select');
    if (sortSelect) sortSelect.value = 'featured';

    this.setCategory('all');
  }

  /* ============================================================
     SIZE CHART & FIT ADVISOR
     ============================================================ */
  initSizeChart() {
    this.sizeUnit = 'in'; // 'in' or 'cm'
    this.sizeChartCat = 'hoodies';
  }

  openSizeChart(cat = 'hoodies', event) {
    if (event) event.stopPropagation();
    this.sizeChartCat = cat;
    const modal = document.getElementById('size-chart-modal');
    const backdrop = document.getElementById('modal-backdrop');

    this.renderSizeChartTable();

    if (modal) modal.classList.add('visible');
    if (backdrop) backdrop.classList.add('visible');
    document.body.classList.add('no-scroll');
    if (window.halloweenFX) window.halloweenFX.playSpookySound('modal-open');
  }

  closeSizeChart() {
    const modal = document.getElementById('size-chart-modal');
    const backdrop = document.getElementById('modal-backdrop');
    if (modal) modal.classList.remove('visible');
    if (backdrop) backdrop.classList.remove('visible');
    document.body.classList.remove('no-scroll');
    if (window.halloweenFX) window.halloweenFX.playSpookySound('modal-close');
  }

  toggleSizeUnit(unit) {
    this.sizeUnit = unit;
    const btnIn = document.getElementById('unit-btn-in');
    const btnCm = document.getElementById('unit-btn-cm');
    if (btnIn && btnCm) {
      btnIn.classList.toggle('active', unit === 'in');
      btnCm.classList.toggle('active', unit === 'cm');
    }
    this.renderSizeChartTable();
  }

  setSizeChartCategory(cat) {
    this.sizeChartCat = cat;
    const tabs = document.querySelectorAll('.size-chart-tab');
    tabs.forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-cat') === cat);
    });
    this.renderSizeChartTable();
  }

  renderSizeChartTable() {
    const container = document.getElementById('size-chart-table-container');
    if (!container) return;

    const data = SIZE_CHART_DATA[this.sizeUnit][this.sizeChartCat] || SIZE_CHART_DATA[this.sizeUnit]['hoodies'];
    const unitLabel = this.sizeUnit === 'in' ? 'inches' : 'cm';

    let headers = [];
    if (this.sizeChartCat === 'gowns') {
      headers = ['Size', `Bust (${unitLabel})`, `Waist (${unitLabel})`, `Hips (${unitLabel})`, `Length (${unitLabel})`, `Underbust (${unitLabel})`];
    } else if (this.sizeChartCat === 'streetwear') {
      headers = ['Size', `Waist (${unitLabel})`, `Hips (${unitLabel})`, `Inseam (${unitLabel})`, `Outseam (${unitLabel})`, `Thigh (${unitLabel})`];
    } else {
      headers = ['Size', `Chest (${unitLabel})`, `Shoulder (${unitLabel})`, `Length (${unitLabel})`, `Sleeve (${unitLabel})`, `Waist (${unitLabel})`];
    }

    const rowsMarkup = data.map(row => {
      const values = Object.values(row);
      return `
        <tr>
          <td class="size-col"><strong>${values[0]}</strong></td>
          ${values.slice(1).map(val => `<td>${val}</td>`).join('')}
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <table class="size-table">
        <thead>
          <tr>
            ${headers.map(h => `<th>${h}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${rowsMarkup}
        </tbody>
      </table>
    `;
  }

  initFitAdvisor() {
    const calcBtn = document.getElementById('calc-fit-btn');
    if (calcBtn) {
      calcBtn.addEventListener('click', () => {
        const heightInput = document.getElementById('advisor-height');
        const weightInput = document.getElementById('advisor-weight');
        const buildInput = document.getElementById('advisor-build');
        const resultEl = document.getElementById('advisor-result');

        const height = parseFloat(heightInput ? heightInput.value : 175);
        const weight = parseFloat(weightInput ? weightInput.value : 70);
        const build = buildInput ? buildInput.value : 'regular';

        if (!height || !weight) {
          if (resultEl) resultEl.innerHTML = `<span style="color:#ff5555">Please input your mortal height and mass.</span>`;
          return;
        }

        // Fit calculation algorithm
        let recommended = 'M';
        if (height < 165 && weight < 58) recommended = 'XS';
        else if (height < 172 && weight < 68) recommended = 'S';
        else if (height < 180 && weight < 80) recommended = 'M';
        else if (height < 188 && weight < 94) recommended = 'L';
        else if (height < 195 && weight < 108) recommended = 'XL';
        else recommended = 'XXL';

        if (build === 'oversized' && recommended !== 'XXL') {
          const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
          const nextIdx = Math.min(sizes.length - 1, sizes.indexOf(recommended) + 1);
          recommended = sizes[nextIdx];
        }

        if (resultEl) {
          resultEl.innerHTML = `
            <div class="fit-recommendation-card">
              <span class="spirit-icon">🔮</span>
              <div class="rec-text">
                <strong>Summoned Size: ${recommended}</strong>
                <p>Based on your vessel measurements (${height}cm, ${weight}kg, ${build} preference), Size <strong>${recommended}</strong> guarantees a devastatingly haunting fit.</p>
              </div>
            </div>
          `;
        }

        if (window.halloweenFX) {
          window.halloweenFX.playSpookySound('whisper');
        }
      });
    }
  }

  /* ============================================================
     QUICK VIEW MODAL
     ============================================================ */
  openQuickView(productId) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('quick-view-modal');
    const modalBody = document.getElementById('quick-view-body');
    const backdrop = document.getElementById('modal-backdrop');

    const selectedSize = this.selectedSizes[product.id] || product.defaultSize;
    const selectedColor = this.selectedColors[product.id] || product.colors[0].name;

    if (modalBody) {
      modalBody.innerHTML = `
        <div class="quick-view-grid">
          <div class="quick-view-media">
            <img 
              src="${product.image}" 
              alt="${product.name}" 
              class="quick-view-img"
              onerror="this.onerror=null; this.src='${product.fallbackImage}';"
            />
            <div class="quick-view-badge">${product.badge}</div>
          </div>
          
          <div class="quick-view-info">
            <span class="category-tag">${product.categoryLabel}</span>
            <h2 class="modal-product-title">${product.name}</h2>
            
            <div class="modal-pricing">
              <span class="current-price">$${product.price}</span>
              <span class="original-price">$${product.originalPrice}</span>
              <span class="discount-pill">Save ${Math.round((1 - product.price/product.originalPrice)*100)}%</span>
            </div>

            <div class="skull-rating">
              <span class="skulls">💀💀💀💀💀</span>
              <span class="rating-num">${product.rating} / 5.0</span>
              <span class="review-count">(${product.reviewsCount} Spirit Testimonials)</span>
            </div>

            <div class="modal-lore-box">
              <strong>📜 Nocturnal Lore:</strong>
              <p>${product.lore}</p>
            </div>

            <p class="modal-desc">${product.description}</p>
            
            <div class="modal-specs">
              <div class="spec-row"><span>Fabric:</span> <strong>${product.fabric}</strong></div>
              <div class="spec-row"><span>Fit Profile:</span> <strong>${product.fit}</strong></div>
            </div>

            <!-- Size Selector inside Modal -->
            <div class="modal-size-section">
              <div class="size-header">
                <span>Select Vessel Size:</span>
                <button class="size-chart-link-btn" onclick="app.openSizeChart('${product.category}', event)">
                  📏 Size Chart
                </button>
              </div>
              <div class="size-pills">
                ${product.sizes.map(s => `
                  <button 
                    class="size-pill ${s === selectedSize ? 'active' : ''}" 
                    onclick="app.selectSize('${product.id}', '${s}', event); app.refreshQuickViewSize('${product.id}', '${s}')"
                  >
                    ${s}
                  </button>
                `).join('')}
              </div>
            </div>

            <div class="modal-actions">
              <button class="spooky-btn-primary add-to-cart-large" onclick="app.addToCart('${product.id}', event); app.closeQuickView();">
                <span>🛒 Summon to Coven Cart ($${product.price})</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }

    if (modal) modal.classList.add('visible');
    if (backdrop) backdrop.classList.add('visible');
    document.body.classList.add('no-scroll');
    if (window.halloweenFX) window.halloweenFX.playSpookySound('modal-open');
  }

  refreshQuickViewSize(productId, newSize) {
    const modal = document.getElementById('quick-view-modal');
    if (!modal) return;
    const pills = modal.querySelectorAll('.size-pill');
    pills.forEach(p => p.classList.toggle('active', p.textContent.trim() === newSize));
  }

  closeQuickView() {
    const modal = document.getElementById('quick-view-modal');
    const backdrop = document.getElementById('modal-backdrop');
    if (modal) modal.classList.remove('visible');
    if (backdrop) backdrop.classList.remove('visible');
    document.body.classList.remove('no-scroll');
    if (window.halloweenFX) window.halloweenFX.playSpookySound('modal-close');
  }

  /* ============================================================
     OUIJA SPIRIT REVIEWS
     ============================================================ */
  renderReviews() {
    const list = document.getElementById('ouija-reviews-list');
    if (!list) return;

    list.innerHTML = this.reviews.map(rev => `
      <div class="ouija-review-card" id="rev-${rev.id}">
        <div class="review-orb-glow"></div>
        <div class="review-header">
          <div class="spirit-avatar-wrap">
            <img src="${rev.avatar || 'assets/images/avatar_vlad.jpg'}" alt="${rev.author}" class="spirit-avatar-img" />
          </div>
          <div class="spirit-author-meta">
            <h4 class="spirit-author">${rev.author}</h4>
            <span class="spirit-badge">${rev.spiritBadge}</span>
          </div>
          <div class="spirit-realm-tag">📍 ${rev.realm}</div>
        </div>

        <div class="review-product-tag">
          <span>Summoned Garment: <strong>${rev.garment}</strong></span>
        </div>

        <div class="review-skulls">
          ${'💀'.repeat(rev.skulls)}
          <span class="review-date">${rev.date}</span>
        </div>

        <blockquote class="spirit-quote">
          "${rev.quote}"
        </blockquote>

        <div class="spirit-verified-footer">
          <span class="verified-ghost-seal">👻 Astral Verified Purchase</span>
          <button class="echo-whisper-btn" onclick="app.whisperReview('${rev.id}')" title="Listen to ghostly whisper">
            🔊 Echo Whisper
          </button>
        </div>
      </div>
    `).join('');
  }

  whisperReview(reviewId) {
    if (window.halloweenFX) {
      window.halloweenFX.playSpookySound('whisper');
      this.showToast('🌫️ The spirit whispers through the ether...');
    }
  }

  submitNewReview(e) {
    e.preventDefault();
    const nameInput = document.getElementById('review-spirit-name');
    const realmInput = document.getElementById('review-realm');
    const garmentInput = document.getElementById('review-garment');
    const skullsInput = document.getElementById('review-skulls');
    const quoteInput = document.getElementById('review-quote');

    if (!nameInput || !quoteInput) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      author: nameInput.value.trim() || 'Anonymous Spectre',
      realm: realmInput.value.trim() || 'Astral Plane',
      spiritBadge: 'Newly Summoned Spirit 🕯️',
      garment: garmentInput.value || 'Runic Chaos Heavyweight Hoodie',
      skulls: parseInt(skullsInput.value || '5', 10),
      date: 'Just Now (All Hallows)',
      quote: quoteInput.value.trim(),
      verifiedSpirit: true
    };

    // Animate Ouija Planchette
    const planchette = document.getElementById('ouija-planchette');
    if (planchette) {
      planchette.classList.add('planchette-summoning');
      setTimeout(() => planchette.classList.remove('planchette-summoning'), 1800);
    }

    this.reviews.unshift(newRev);
    this.renderReviews();

    if (window.halloweenFX) {
      window.halloweenFX.playSpookySound('creak');
      window.halloweenFX.spawnBatBurst(window.innerWidth / 2, window.innerHeight / 2, 7);
    }

    this.showToast('📜 Your testimony has been carved into the Ouija records!');
    e.target.reset();
  }

  /* ============================================================
     CONTACT DISPATCH COLUMN
     ============================================================ */
  handleContactSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const dispatchType = document.getElementById('contact-type').value;
    const message = document.getElementById('contact-message').value;

    if (window.halloweenFX) {
      window.halloweenFX.playSpookySound('raven');
    }

    const ravenBtn = document.getElementById('send-raven-btn');
    if (ravenBtn) {
      ravenBtn.innerHTML = `<span>🦇 Dispatching Raven...</span>`;
      ravenBtn.disabled = true;
    }

    setTimeout(() => {
      if (ravenBtn) {
        ravenBtn.innerHTML = `<span>✓ Raven Airborne!</span>`;
        ravenBtn.disabled = false;
      }

      if (window.halloweenFX) {
        window.halloweenFX.spawnBatBurst(window.innerWidth * 0.75, window.innerHeight * 0.7, 8);
        window.halloweenFX.playSpookySound('bat');
      }

      this.showToast(`🦇 Hail ${name}! Your raven has taken flight to our Salem Sanctuary. Expect response at ${email} before midnight.`);
      e.target.reset();
    }, 1200);
  }

  /* ============================================================
     CHECKOUT FLOW & CREATIVE MESSAGE
     ============================================================ */
  openCheckoutModal() {
    if (this.cart.length === 0) {
      this.showToast('Your cart is empty! Add garments before proceeding.');
      return;
    }

    this.closeCartDrawer();
    const modal = document.getElementById('checkout-modal');
    const backdrop = document.getElementById('modal-backdrop');

    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = this.discountApplied ? (subtotal * this.discountRate) : 0;
    const total = Math.max(0, subtotal - discount);

    const summaryEl = document.getElementById('checkout-order-summary');
    if (summaryEl) {
      summaryEl.innerHTML = `
        <div class="checkout-summary-box">
          <div class="summary-line"><span>Garments Summoned:</span> <strong>${this.cart.reduce((a, b) => a + b.quantity, 0)} pieces</strong></div>
          <div class="summary-line"><span>Cursed Subtotal:</span> <strong>$${subtotal.toFixed(2)}</strong></div>
          ${this.discountApplied ? `<div class="summary-line discount"><span>Blood Moon Discount (20%):</span> <strong>-$${discount.toFixed(2)}</strong></div>` : ''}
          <div class="summary-line"><span>Spectral Shipping:</span> <strong style="color:var(--glow-green)">FREE</strong></div>
          <div class="summary-line total-line"><span>Total Due to Coven:</span> <strong>$${total.toFixed(2)}</strong></div>
        </div>
      `;
    }

    if (modal) modal.classList.add('visible');
    if (backdrop) backdrop.classList.add('visible');
    document.body.classList.add('no-scroll');
    if (window.halloweenFX) window.halloweenFX.playSpookySound('modal-open');
  }

  completeOrder(e) {
    if (e) e.preventDefault();

    const nameInput = document.getElementById('checkout-mortal-name');
    const addressInput = document.getElementById('checkout-crypt-address');
    const mortalName = nameInput ? nameInput.value.trim() || 'Brave Mortal' : 'Brave Mortal';

    const modalBody = document.getElementById('checkout-modal-body');
    if (!modalBody) return;

    // Clear cart
    const purchasedItems = [...this.cart];
    this.cart = [];
    this.saveCart();
    this.updateCartUI();

    if (window.halloweenFX) {
      window.halloweenFX.playSpookySound('lightning');
      setTimeout(() => {
        if (window.halloweenFX) window.halloweenFX.playSpookySound('bell');
      }, 400);
      window.halloweenFX.spawnBatBurst(window.innerWidth / 2, window.innerHeight / 2, 16);
    }

    modalBody.innerHTML = `
      <div class="order-success-screen">
        <div class="success-spooky-icon">🎃🦇✨</div>
        <h2 class="gothic-title glow-orange">THE PACT IS SEALED!</h2>
        <p class="order-id">Pact Tracking Hex: <strong>#HEX-666-${Math.floor(Math.random() * 90000 + 10000)}</strong></p>

        <!-- SPECIAL CREATIVE MESSAGE FOR THE SHOPPER -->
        <div class="shopper-creative-plaque">
          <div class="plaque-header">
            <span>📜 TO ${mortalName.toUpperCase()} — THE MASTER OF SHADOWS</span>
          </div>
          <div class="plaque-body">
            <p>
              "You walked boldly through the mist of the ThreadCo coven and emerged draped in immortal drip. 
              May your seams never unravel, your collar stay sharp as a vampire’s fang, and your silhouette turn heads in this realm and beyond. 
              Thank you for honoring our nocturnal artisans with your mortal coin. 
              Go forth, haunt your streets, and wear your darkness like royal velvet.
            </p>
            <p class="plaque-signature">
              — The Coven of ThreadCo & Chief Weaver of Shadows 🕯️🦇"
            </p>
          </div>
        </div>

        <div class="purchased-recap">
          <h4>Summoned Garments Being Prepared in the Crypt:</h4>
          <ul>
            ${purchasedItems.map(item => `
              <li>${item.quantity}x ${item.name} (${item.size} / ${item.color}) - $${item.price * item.quantity}</li>
            `).join('')}
          </ul>
        </div>

        <button class="spooky-btn-primary" onclick="app.closeCheckoutModal()">
          Return to the Coven Gates 🕷️
        </button>
      </div>
    `;
  }

  closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    const backdrop = document.getElementById('modal-backdrop');
    if (modal) modal.classList.remove('visible');
    if (backdrop) backdrop.classList.remove('visible');
    document.body.classList.remove('no-scroll');

    // Reset checkout form if it was swapped to success screen
    setTimeout(() => {
      this.resetCheckoutModalMarkup();
    }, 400);
  }

  resetCheckoutModalMarkup() {
    const modalBody = document.getElementById('checkout-modal-body');
    if (!modalBody) return;
    modalBody.innerHTML = `
      <div class="checkout-grid">
        <div class="checkout-form-col">
          <h3 class="gothic-title">Bind Your Delivery Pact</h3>
          <form id="checkout-form" onsubmit="app.completeOrder(event)">
            <div class="input-group">
              <label>Mortal Sovereign Name</label>
              <input type="text" id="checkout-mortal-name" required placeholder="e.g. Vladislav von Dracula">
            </div>
            <div class="input-group">
              <label>Astral Transmission Email</label>
              <input type="email" id="checkout-email" required placeholder="mortal@coven.dark">
            </div>
            <div class="input-group">
              <label>Crypt / Delivery Sanctuary Address</label>
              <input type="text" id="checkout-crypt-address" required placeholder="666 Cobweb Lane, Salem, MA">
            </div>
            <div class="input-row">
              <div class="input-group">
                <label>Realm Postal Hex</label>
                <input type="text" required placeholder="01970">
              </div>
              <div class="input-group">
                <label>Payment Token</label>
                <select>
                  <option>Soul Gems & Gold 💀</option>
                  <option>Crypt Apple Pay 🍎</option>
                  <option>Midnight Card (Visa/Mastercard) 💳</option>
                </select>
              </div>
            </div>

            <div id="checkout-order-summary"></div>

            <button type="submit" class="spooky-btn-primary checkout-seal-btn">
              <span>🔮 Seal Cursed Order</span>
            </button>
          </form>
        </div>
      </div>
    `;
  }

  /* ============================================================
     COUNTDOWN TIMER (Halloween Midnight)
     ============================================================ */
  initCountdown() {
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-minutes');
    const secsEl = document.getElementById('cd-seconds');

    if (!hoursEl || !minsEl || !secsEl) return;

    // Set countdown target to Halloween Midnight
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    targetDate.setHours(23, 59, 59, 999);

    const update = () => {
      const now = new Date().getTime();
      const dist = targetDate.getTime() - now;

      if (dist <= 0) {
        hoursEl.textContent = '00';
        minsEl.textContent = '00';
        secsEl.textContent = '00';
        return;
      }

      const hours = Math.floor((dist / (1000 * 60 * 60)) % 24) + Math.floor(dist / (1000 * 60 * 60 * 24)) * 24;
      const mins = Math.floor((dist / (1000 * 60)) % 60);
      const secs = Math.floor((dist / 1000) % 60);

      hoursEl.textContent = String(hours).padStart(2, '0');
      minsEl.textContent = String(mins).padStart(2, '0');
      secsEl.textContent = String(secs).padStart(2, '0');
    };

    update();
    setInterval(update, 1000);
  }

  /* ============================================================
     TOAST SYSTEM
     ============================================================ */
  showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'spooky-toast';
    toast.innerHTML = `
      <span class="toast-bat">🦇</span>
      <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('visible'), 20);

    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 400);
    }, 3800);
  }

  /* ============================================================
     EVENT LISTENERS
     ============================================================ */
  initEventListeners() {
    // Backdrop click to close modals
    const backdrop = document.getElementById('modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => {
        this.closeCartDrawer();
        this.closeQuickView();
        this.closeSizeChart();
        this.closeCheckoutModal();
      });
    }

    // Escape key closes modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeCartDrawer();
        this.closeQuickView();
        this.closeSizeChart();
        this.closeCheckoutModal();
      }
    });

    // Search bar input
    const searchInput = document.getElementById('catalog-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }

    // Sort selector
    const sortSelect = document.getElementById('catalog-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => this.setSort(e.target.value));
    }

    // Reviews Form
    const reviewForm = document.getElementById('ouija-review-form');
    if (reviewForm) {
      reviewForm.addEventListener('submit', (e) => this.submitNewReview(e));
    }

    // Contact Form
    const contactForm = document.getElementById('coven-contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => this.handleContactSubmit(e));
    }
  }
}

// Instantiate App
window.app = null;
window.addEventListener('DOMContentLoaded', () => {
  window.app = new ThreadCoApp();
});
