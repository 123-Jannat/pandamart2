   // Toggle mobile menu
   const menuBtn = document.getElementById('menu-btn');
   const mobileMenu = document.getElementById('mobile-menu');
   
   menuBtn.addEventListener('click', () => {
       mobileMenu.classList.toggle('hidden');
   });
   
   // Toggle search bar
   const searchBtn = document.getElementById('search-btn');
   const searchBar = document.getElementById('search-bar');
   
   searchBtn.addEventListener('click', () => {
       searchBar.classList.toggle('hidden');
   });
   
   // Shopping cart functionality
   const cartBtn = document.getElementById('cart-btn');
   const cartSidebar = document.getElementById('cart-sidebar');
   const closeCart = document.getElementById('close-cart');
   const overlay = document.getElementById('overlay');
   const cartCount = document.getElementById('cart-count');
   const cartItemsContainer = document.getElementById('cart-items');
   const emptyCartMessage = document.getElementById('empty-cart-message');
   const cartSubtotal = document.getElementById('cart-subtotal');
   const cartTotal = document.getElementById('cart-total');
   
   let cart = [];
   
   // Toggle cart sidebar
   cartBtn.addEventListener('click', () => {
       cartSidebar.classList.add('active');
       overlay.style.display = 'block';
       document.body.style.overflow = 'hidden';
   });
   
   closeCart.addEventListener('click', () => {
       cartSidebar.classList.remove('active');
       overlay.style.display = 'none';
       document.body.style.overflow = 'auto';
   });
   
   overlay.addEventListener('click', () => {
       cartSidebar.classList.remove('active');
       overlay.style.display = 'none';
       document.body.style.overflow = 'auto';
   });
   
   // Add to cart functionality
   const addToCartButtons = document.querySelectorAll('.add-to-cart');
   
   addToCartButtons.forEach(button => {
       button.addEventListener('click', () => {
           const id = button.getAttribute('data-id');
           const name = button.getAttribute('data-name');
           const price = parseFloat(button.getAttribute('data-price'));
           const image = button.getAttribute('data-image');
           
           // Check if item already exists in cart
           const existingItem = cart.find(item => item.id === id);
           
           if (existingItem) {
               existingItem.quantity += 1;
           } else {
               cart.push({
                   id,
                   name,
                   price,
                   image,
                   quantity: 1
               });
           }
           
           updateCart();
           
           // Show cart sidebar when adding first item
           if (cart.length === 1) {
               cartSidebar.classList.add('active');
               overlay.style.display = 'block';
               document.body.style.overflow = 'hidden';
           }
           
           // Button feedback
           button.innerHTML = '<i class="fas fa-check"></i> Added';
           button.style.backgroundColor = '#15803d';
           
           setTimeout(() => {
               button.innerHTML = '<i class="fas fa-cart-plus"></i> Add';
               button.style.backgroundColor = '#22c55e';
           }, 1500);
       });
   });
   
   // Update cart UI
   function updateCart() {
       // Update cart count
       const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
       cartCount.textContent = totalItems;
       
       // Update cart items
       if (cart.length === 0) {
           emptyCartMessage.style.display = 'block';
           cartItemsContainer.innerHTML = '';
       } else {
           emptyCartMessage.style.display = 'none';
           
           let itemsHTML = '';
           let subtotal = 0;
           
           cart.forEach(item => {
               const itemTotal = item.price * item.quantity;
               subtotal += itemTotal;
               
               itemsHTML += `
                   <div class="cart-item">
                       <div class="cart-item-image">
                           <img src="${item.image}" alt="${item.name}">
                       </div>
                       <div class="cart-item-details">
                           <h4>${item.name}</h4>
                           <div class="flex items-center justify-between">
                               <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                               <div class="cart-item-quantity">
                                   <button class="quantity-button decrease-quantity" data-id="${item.id}">
                                       <i class="fas fa-minus"></i>
                                   </button>
                                   <span class="quantity-value">${item.quantity}</span>
                                   <button class="quantity-button increase-quantity" data-id="${item.id}">
                                       <i class="fas fa-plus"></i>
                                   </button>
                               </div>
                               <span class="cart-item-total">$${itemTotal.toFixed(2)}</span>
                           </div>
                       </div>
                       <button class="remove-item" data-id="${item.id}">
                           <i class="fas fa-trash"></i>
                       </button>
                   </div>
               `;
           });
           
           cartItemsContainer.innerHTML = itemsHTML;
           
           // Update totals
           cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
           cartTotal.textContent = `$${subtotal.toFixed(2)}`;
           
           // Add event listeners to new buttons
           document.querySelectorAll('.decrease-quantity').forEach(button => {
               button.addEventListener('click', (e) => {
                   const id = e.currentTarget.getAttribute('data-id');
                   const item = cart.find(item => item.id === id);
                   
                   if (item.quantity > 1) {
                       item.quantity -= 1;
                   } else {
                       cart = cart.filter(item => item.id !== id);
                   }
                   
                   updateCart();
               });
           });
           
           document.querySelectorAll('.increase-quantity').forEach(button => {
               button.addEventListener('click', (e) => {
                   const id = e.currentTarget.getAttribute('data-id');
                   const item = cart.find(item => item.id === id);
                   item.quantity += 1;
                   updateCart();
               });
           });
           
           document.querySelectorAll('.remove-item').forEach(button => {
               button.addEventListener('click', (e) => {
                   const id = e.currentTarget.getAttribute('data-id');
                   cart = cart.filter(item => item.id !== id);
                   updateCart();
               });
           });
       }
   }
   
   // Checkout button
   document.getElementById('checkout-btn').addEventListener('click', () => {
       if (cart.length > 0) {
           alert('Thank you for your order! This is a demo, so no actual purchase was made.');
           cart = [];
           updateCart();
           cartSidebar.classList.remove('active');
           overlay.style.display = 'none';
           document.body.style.overflow = 'auto';
       }
   });