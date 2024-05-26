const Products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 },
  ];
  
  const cart = {};
  
  const productListElement = document.getElementById('productList');
  const cartItemsElement = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');
  
  // Function to render products
  function renderProducts() {
    Products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.className = 'product';
      productElement.innerHTML = `
        <span>${product.name}</span> 
        <span>${product.price}</span>
        <button onclick="addToCart(${product.id})">+</button>
        <span id="quantity-${product.id}">0</span>
        <button onclick="removeFromCart(${product.id})">-</button>
      `;
      
      productListElement.appendChild(productElement);
    });
  }
  
  // Function to update the cart display
  function updateCart() {
    cartItemsElement.innerHTML = '';
    let totalPrice = 0;
  
    if (Object.keys(cart).length === 0) {
      cartItemsElement.innerHTML = '<li>No Product added to the cart</li>';
    } else {
      Object.keys(cart).forEach(productId => {
        const product = Products.find(p => p.id === parseInt(productId));
        const quantity = cart[productId];
        totalPrice += product.price * quantity;
  
        const cartItemElement = document.createElement('li');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
          <span>${product.name}</span>
          <span> ${product.price} x ${quantity}</span>
        `;
        cartItemsElement.appendChild(cartItemElement);
  
        const quantityElement = document.getElementById(`quantity-${product.id}`);
        quantityElement.textContent = quantity;
      });
    }
  
    totalPriceElement.textContent = totalPrice;
  }
  
  // Function to add product to the cart
  function addToCart(productId) {
    if (!cart[productId]) {
      cart[productId] = 0;
    }
    cart[productId]++;
    updateCart();
  }
  
  // Function to remove product from the cart
  function removeFromCart(productId) {
    if (cart[productId]) {
      cart[productId]--;
      if (cart[productId] === 0) {
        delete cart[productId];
      }
      updateCart();
    }
  }
  
  // Initial render of products
  renderProducts();