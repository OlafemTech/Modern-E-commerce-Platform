// Animation helper function
function animate(element, keyframes, options) {
    return element.animate(keyframes, options);
}

// Animate elements when they come into view
document.addEventListener('DOMContentLoaded', () => {
    // Hero text animation
    const heroText = document.querySelector('.hero-text');
    animate(heroText, [
        { opacity: 0, transform: 'translateY(20px)' },
        { opacity: 1, transform: 'translateY(0)' }
    ], {
        duration: 800,
        fill: 'forwards',
        easing: 'ease-out'
    });

    // Hero image animation
    const heroImage = document.querySelector('.hero-image');
    animate(heroImage, [
        { opacity: 0, transform: 'scale(0.95)' },
        { opacity: 1, transform: 'scale(1)' }
    ], {
        duration: 800,
        fill: 'forwards',
        easing: 'ease-out'
    });

    // Shop Now button hover effect
    const shopNowBtn = document.querySelector('.shop-now-btn');
    shopNowBtn.addEventListener('mouseover', () => {
        animate(shopNowBtn, [
            { transform: 'scale(1)' },
            { transform: 'scale(1.05)' }
        ], {
            duration: 200,
            fill: 'forwards',
            easing: 'ease-out'
        });
    });

    shopNowBtn.addEventListener('mouseout', () => {
        animate(shopNowBtn, [
            { transform: 'scale(1.05)' },
            { transform: 'scale(1)' }
        ], {
            duration: 200,
            fill: 'forwards',
            easing: 'ease-out'
        });
    });

    // Cart functionality
    let cartItems = [];

    // Cart toggle
    const cartToggle = document.getElementById('cart-toggle');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCart = document.querySelector('.close-cart');

    cartToggle?.addEventListener('click', (e) => {
        e.preventDefault();
        cartSidebar.classList.add('active');
    });

    closeCart?.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });

    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (cartSidebar?.classList.contains('active') && 
            !cartSidebar.contains(e.target) && 
            !cartToggle.contains(e.target)) {
            cartSidebar.classList.remove('active');
        }
    });

    // Add to cart functionality
    function addToCart(product) {
        const existingItem = cartItems.find(item => 
            item.name === product.name && 
            item.size === product.size && 
            item.color === product.color
        );

        if (existingItem) {
            existingItem.quantity += product.quantity;
        } else {
            cartItems.push(product);
        }

        updateCart();
        updateCartIcon();
        showNotification(`${product.name} added to cart!`);
    }

    function updateCart() {
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartTotal = document.querySelector('.cart-total span');
        
        if (!cartItemsContainer) return;

        cartItemsContainer.innerHTML = '';
        let total = 0;

        cartItems.forEach((item, index) => {
            const itemTotal = parseFloat(item.price.replace('$', '')) * item.quantity;
            total += itemTotal;

            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p class="cart-item-price">${item.price}</p>
                        <div class="cart-item-quantity">
                            <button onclick="updateItemQuantity(${index}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateItemQuantity(${index}, 1)">+</button>
                            <button onclick="removeItem(${index})" class="remove-item">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        if (cartTotal) {
            cartTotal.textContent = `$${total.toFixed(2)}`;
        }
    }

    function updateItemQuantity(index, change) {
        cartItems[index].quantity += change;
        if (cartItems[index].quantity < 1) {
            cartItems.splice(index, 1);
        }
        updateCart();
        updateCartIcon();
    }

    function removeItem(index) {
        cartItems.splice(index, 1);
        updateCart();
        updateCartIcon();
        showNotification('Item removed from cart');
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('.product-card');
            const productName = product.querySelector('h3').textContent;
            const productPrice = product.querySelector('.price').textContent;
            
            addToCart({ name: productName, price: productPrice, quantity: 1 });
        });
    });

    function updateCartIcon() {
        const cartIcon = document.querySelector('.cart-icon');
        if (cartItems.length > 0) {
            cartIcon.setAttribute('data-count', cartItems.length);
            cartIcon.classList.add('has-items');
        } else {
            cartIcon.removeAttribute('data-count');
            cartIcon.classList.remove('has-items');
        }
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }

    // Product page functionality
    if (window.location.pathname.includes('product.html')) {
        // Thumbnail image click
        const thumbnails = document.querySelectorAll('.thumbnail-images img');
        const mainImage = document.getElementById('main-product-image');

        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                mainImage.src = this.src.replace('w=200', 'w=800');
            });
        });

        // Size selection
        const sizeButtons = document.querySelectorAll('.size-btn');
        sizeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                sizeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Color selection
        const colorButtons = document.querySelectorAll('.color-btn');
        colorButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                colorButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Quantity buttons
        const quantityInput = document.querySelector('.quantity-selector input');
        const minusBtn = document.querySelector('.quantity-btn.minus');
        const plusBtn = document.querySelector('.quantity-btn.plus');

        minusBtn?.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });

        plusBtn?.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue < 10) {
                quantityInput.value = currentValue + 1;
            }
        });

        // Add to cart from product page
        const addToCartBtn = document.querySelector('.add-to-cart-btn');
        addToCartBtn?.addEventListener('click', () => {
            const product = {
                name: document.querySelector('.product-info h1').textContent,
                price: document.querySelector('.current-price').textContent,
                image: document.getElementById('main-product-image').src,
                quantity: parseInt(quantityInput.value),
                size: document.querySelector('.size-btn.active')?.textContent || 'M',
                color: document.querySelector('.color-btn.active')?.classList[1] || 'white'
            };
            addToCart(product);
        });

        // Tab switching
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.dataset.tab;
                
                // Update active tab button
                tabButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Update active tab content
                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('active');
                });
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    contactForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the form data to a server
        const formData = new FormData(this);
        const formValues = Object.fromEntries(formData.entries());
        
        showNotification('Message sent successfully! We\'ll get back to you soon.');
        this.reset();
    });

    // Testimonial carousel
    const testimonials = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    function showSlide(index) {
        testimonials.forEach(slide => slide.classList.remove('active'));
        
        if (index >= testimonials.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = testimonials.length - 1;
        } else {
            currentSlide = index;
        }
        
        testimonials[currentSlide].classList.add('active');
    }

    prevBtn?.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn?.addEventListener('click', () => showSlide(currentSlide + 1));

    // Auto-advance testimonials
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm) {
            showNotification(`Searching for: ${searchTerm}`);
            // Here you would typically make an API call or filter products
        }
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Video Background Transition
    function setupVideoTransition() {
        const videos = document.querySelectorAll('.hero-video');
        let currentIndex = 0;

        function transitionVideo() {
            videos[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % videos.length;
            videos[currentIndex].classList.add('active');
        }

        // Change video every 8 seconds
        setInterval(transitionVideo, 8000);
    }

    setupVideoTransition();

    // Add some CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: -100px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--primary-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: 4px;
            transition: bottom 0.3s ease;
            z-index: 1000;
        }
        
        .notification.show {
            bottom: 20px;
        }
        
        .cart-icon {
            position: relative;
        }
        
        .cart-icon.has-items::after {
            content: attr(data-count);
            position: absolute;
            top: -8px;
            right: -8px;
            background: var(--secondary-color);
            color: white;
            font-size: 12px;
            padding: 2px 6px;
            border-radius: 50%;
        }
    `;
    document.head.appendChild(style);

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Chat Response System
    const chatToggle = document.querySelector('.chat-toggle');
    const chatContainer = document.querySelector('.chat-container');
    const closeChat = document.querySelector('.close-chat');
    const sendMessage = document.querySelector('.send-message');
    const messageInput = document.querySelector('.chat-input input');
    const chatMessages = document.querySelector('.chat-messages');
    const quickResponses = document.querySelectorAll('.response-btn');
    const notificationBadge = document.querySelector('.notification-badge');

    // Chat responses database
    const responses = {
        'products info': [
            "We offer a wide range of high-quality products including clothing, accessories, and electronics.",
            "All our products come with a 30-day money-back guarantee.",
            "Would you like to know about any specific product category?"
        ],
        'shipping': [
            "We offer free shipping on orders over $50.",
            "Standard shipping takes 3-5 business days.",
            "Express shipping (1-2 business days) is available for an additional fee."
        ],
        'returns': [
            "Our return policy allows returns within 30 days of purchase.",
            "Items must be unused and in original packaging.",
            "Would you like to initiate a return?"
        ],
        'payment': [
            "We accept all major credit cards, PayPal, and Apple Pay.",
            "All transactions are secure and encrypted.",
            "Need help with a payment issue?"
        ]
    };

    // Toggle chat window
    chatToggle?.addEventListener('click', () => {
        chatContainer.classList.toggle('active');
        notificationBadge.textContent = '0';
    });

    closeChat?.addEventListener('click', () => {
        chatContainer.classList.remove('active');
    });

    // Send message function
    function sendUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'user');
        messageElement.innerHTML = `
            <p>${message}</p>
            <span class="time">${new Date().toLocaleTimeString()}</span>
        `;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Receive bot message function
    function receiveBotMessage(message, delay = 1000) {
        setTimeout(() => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', 'bot');
            messageElement.innerHTML = `
                <p>${message}</p>
                <span class="time">${new Date().toLocaleTimeString()}</span>
            `;
            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Update notification if chat is not active
            if (!chatContainer.classList.contains('active')) {
                notificationBadge.textContent = parseInt(notificationBadge.textContent) + 1;
            }
        }, delay);
    }

    // Handle send message button
    sendMessage?.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            sendUserMessage(message);
            messageInput.value = '';

            // Simple response based on keywords
            let responded = false;
            for (const [key, value] of Object.entries(responses)) {
                if (message.toLowerCase().includes(key)) {
                    value.forEach((response, index) => {
                        receiveBotMessage(response, 1000 * (index + 1));
                    });
                    responded = true;
                    break;
                }
            }

            if (!responded) {
                receiveBotMessage("Thank you for your message. Our team will get back to you shortly.");
            }
        }
    });

    // Handle enter key in input
    messageInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage.click();
        }
    });

    // Handle quick response buttons
    quickResponses.forEach(btn => {
        btn.addEventListener('click', () => {
            const response = btn.textContent.toLowerCase();
            sendUserMessage(btn.textContent);
            
            if (responses[response]) {
                responses[response].forEach((msg, index) => {
                    receiveBotMessage(msg, 1000 * (index + 1));
                });
            }
        });
    });
});
