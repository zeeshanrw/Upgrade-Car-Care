/**
 * Upgrade Car Care - Main JavaScript File
 * 
 * Features:
 * - Pricing table functionality
 * - Form submissions with validation
 * - Smooth scrolling
 * - Mobile menu handling
 * - Popup management
 */

// Constants
const CAR_TYPES = {
  small: 'Small Car',
  sedan: 'Sedan',
  suv: 'Large SUV',
  minivan: 'Minivan',
  pickup: 'Pickup Truck'
};

const PRICING_DATA = {
  small: {
    packages: [
      {
        name: 'Interior Detailing',
        price: '$160',
        time: '1–2 Hrs',
        description: 'Full interior clean, vacuum, windows'
      },
      {
        name: 'Exterior Detailing',
        price: '$260',
        time: '1.5–2 Hrs',
        description: 'Hand wash, tire clean'
      }
    ]
  },
  // Other car types follow same structure
  sedan: {
    packages: [
      {
        name: 'Interior Detailing',
        price: '$180',
        time: '1.5-2 Hrs',
        description: 'Interior + trunk shampoo, vacuum'
      },
      {
        name: 'Exterior Detailing',
        price: '$280',
        time: '2-2.5 Hrs',
        description: 'Exterior hand wash + rim polish'
      }
    ]
  },
  suv: {
    packages: [
      {
        name: 'Interior Detailing',
        price: '$200',
        time: '1.75 Hrs',
        description: 'Seats, carpets, leather conditioning'
      },
      {
        name: 'Exterior Detailing',
        price: '$300',
        time: '2.15 Hrs',
        description: 'Spray wax + clay bar'
      }
    ]
  },
  minivan: {
    packages: [
      {
        name: 'Interior Detailing',
        price: '$210',
        time: '2 Hrs',
        description: 'Full cabin & trunk deep clean'
      },
      {
        name: 'Exterior Detailing',
        price: '$320',
        time: '2.5 Hrs',
        description: 'Wax + polish + tire dressing'
      }
    ]
  },
  pickup: {
    packages: [
      {
        name: 'Interior Detailing',
        price: '$220',
        time: '2.25 Hrs',
        description: 'Seats, windows, deep vacuum'
      },
      {
        name: 'Exterior Detailing',
        price: '$350',
        time: '2.75 Hrs',
        description: 'Full polish, clay bar, sealant'
      }
    ]
  }
};

// DOM Elements
const elements = {
  pricingContent: document.getElementById('pricing-content'),
  bookingForm: document.getElementById('booking-form-element'),
  callbackForm: document.getElementById('callbackForm'),
  contactForm:   document.getElementById('contact-form'),
  mobileMenuToggle: document.getElementById('menuToggle'),
  mobileMenu: document.getElementById('mobileMenu'),
  springPopup: document.getElementById('springPopup'),
  thankyouPopup: document.getElementById('thankyouPopup')
};

// Utility Functions
const utils = {
  /**
   * Smooth scroll to target position
   * @param {number} targetY - Target scroll position
   * @param {number} duration - Animation duration in ms
   */
  smoothScrollTo(targetY, duration = 1000) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    function scrollStep(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

      window.scrollTo(0, startY + distance * ease);

      if (elapsed < duration) {
        requestAnimationFrame(scrollStep);
      }
    }

    requestAnimationFrame(scrollStep);
  },

  /**
   * Show a temporary popup message
   * @param {string} message - Message to display
   * @param {string} type - Type of message (success, error, info)
   * @param {number} duration - How long to show the message in ms
   */
  showPopupMessage(message, type = 'success', duration = 3000) {
    const popup = document.createElement('div');
    popup.className = `popup-message ${type}`;
    popup.textContent = message;
    document.body.appendChild(popup);

    setTimeout(() => {
      popup.remove();
    }, duration);
  },

  /**
   * Format phone number for display
   * @param {string} phone - Raw phone number
   * @returns {string} Formatted phone number
   */
  formatPhoneNumber(phone) {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
};

// Pricing Module
const pricingModule = {
  /**
   * Generate HTML for pricing table
   * @param {string} carType - Type of car
   * @returns {string} HTML string
   */
  generatePricingTable(carType) {
    const packages = PRICING_DATA[carType].packages;
    
    let tableHTML = `
      <div class="pricing-table">
        <h3>Pricing for ${CAR_TYPES[carType]}</h3>
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Package</th>
              <th>Price</th>
              <th>Time</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
    `;

    packages.forEach(pkg => {
      tableHTML += `
        <tr>
          <td>
            <input type="checkbox" 
                   class="package-checkbox" 
                   value="${pkg.name} (${pkg.price})"
                   data-price="${pkg.price.replace('$', '')}"
                   aria-label="Select ${pkg.name} package">
          </td>
          <td>${pkg.name}</td>
          <td>${pkg.price}</td>
          <td>${pkg.time}</td>
          <td>${pkg.description}</td>
        </tr>
      `;
    });

    tableHTML += `
          </tbody>
        </table>
      </div>
    `;

    return tableHTML;
  },

  /**
   * Show pricing for specific car type
   * @param {string} type - Car type key
   */
  showPrices(type) {
    if (!elements.pricingContent) return;

    const pricingHTML = this.generatePricingTable(type);
    const bookingFormHTML = `
      <div id="booking-form" class="styled-booking-form">
        <div class="form-left">
          <h3>Book Your Service</h3>
          <form id="booking-form-element" action="https://formsubmit.co/upgradecarcare9@gmail.com" method="POST">
            <input type="hidden" name="_next" value="thankyou.html">
            <input type="hidden" name="_captcha" value="false">
            <input type="hidden" name="car_size" id="selected-car" value="${CAR_TYPES[type]}">
            <input type="hidden" name="selected_packages" id="selected-packages">

            <input type="text" name="name" placeholder="Your Name" required aria-label="Your Name">
            <input type="tel" name="phone" placeholder="Phone Number" required aria-label="Phone Number">
            <textarea name="message" placeholder="Additional Message (Optional)" aria-label="Additional Message"></textarea>
            <button type="submit">Submit Booking</button>
          </form>
         
        </div>
        <div class="form-right">
          <h4>Need Help?</h4>
          <p>📞 Call us directly:</p>
          <a href="tel:6476416424" class="call-now">${utils.formatPhoneNumber('6476416424')}</a>
        </div>
      </div>
    `;

    elements.pricingContent.innerHTML = pricingHTML + bookingFormHTML;
    document.getElementById('booking-form').style.display = 'none';

        // —— ADD THIS: attach the submit handler now that the form exists ——
    const bookingEl = document.getElementById('booking-form-element');
   if (bookingEl) {
      bookingEl.addEventListener(
        'submit',
       formModule.handleBookingSubmit.bind(formModule)
      );
    }
    // — end patch —
    
    this.attachCheckboxEvents();
  },

  /**
   * Attach event listeners to package checkboxes
   */
  attachCheckboxEvents() {
    const form = document.getElementById('booking-form');
    const checkboxes = document.querySelectorAll('.package-checkbox');

    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const selectedPackages = Array.from(checkboxes)
          .filter(cb => cb.checked)
          .map(cb => cb.value);

        const packagesInput = document.getElementById('selected-packages');
        if (packagesInput) packagesInput.value = selectedPackages.join(', ');

        if (selectedPackages.length > 0) {
          form.style.display = 'block';
          const yOffset = -300;
          const y = form.getBoundingClientRect().top + window.pageYOffset + yOffset;
          utils.smoothScrollTo(y, 1200);
        } else {
          form.style.display = 'none';
          const pricingTop = elements.pricingContent.getBoundingClientRect().top + window.pageYOffset - 335;
          utils.smoothScrollTo(pricingTop, 600);
        }
      });
    });
  },

  /**
   * Initialize pricing module
   */
  init() {
    const carButtons = document.querySelectorAll('.car-select button');
    if (!carButtons.length) return;

    carButtons.forEach(button => {
      button.addEventListener('click', () => {
        carButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        const type = button.dataset.type;
        if (type) this.showPrices(type);
      });
    });

    // Auto-select 'small' on load
    const defaultBtn = document.querySelector('.car-select button[data-type="small"]');
    if (defaultBtn) {
      defaultBtn.classList.add('selected');
      this.showPrices('small');
    }
  }
};

// Form Handling Module
const formModule = {
  /**
   * Handle booking form submission
   * @param {Event} e - Form submit event
   */
  handleBookingSubmit(e) {
    e.preventDefault();
    const form = e.target;

    // Validate form
    if (!this.validateForm(form)) return;

    const formData = new FormData(form);
    const selectedCar = document.querySelector('.car-select button.selected')?.textContent || '';
    formData.set('car_size', selectedCar);

    fetch(form.action, {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      if (response.ok) {
        form.reset();
        this.showThankYouPopup();
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(error => {
      console.error('Form submission error:', error);
      //utils.showPopupMessage('⚠️ Failed to submit form. Please try again.', 'error');
    });
  },

  /**
   * Handle callback form submission
   * @param {Event} e - Form submit event
   */
  handleCallbackSubmit(e) {
    e.preventDefault();
    const form = e.target;

    if (!this.validateForm(form)) return;

    const formData = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      if (response.ok) {
        form.reset();
        this.showThankYouPopup();
      } else {
        throw new Error('Callback submission failed');
      }
    })
    .catch(error => {
      console.error('Callback submission error:', error);
      //utils.showPopupMessage('⚠️ Failed to submit callback request.', 'error');
    });
  },

  /**
 * Handle Contact Us form submission
 * @param {Event} e
 */
handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  if (!this.validateForm(form)) return;

  const formData = new FormData(form);
  fetch(form.action, {
    method: 'POST',
    body: formData,
  })
  .then(response => {
    if (response.ok) {
      form.reset();
      this.showThankYouPopup();
    } else {
      throw new Error('Contact form submission failed');
    }
  })
  .catch(err => console.error(err));
},


  /**
   * Validate form inputs
   * @param {HTMLFormElement} form - Form to validate
   * @returns {boolean} True if form is valid
   */
  validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        field.classList.add('error');
        isValid = false;
      } else {
        field.classList.remove('error');
      }
    });

    // Special phone validation
    const phoneField = form.querySelector('input[type="tel"]');
    if (phoneField && phoneField.value) {
      const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      if (!phoneRegex.test(phoneField.value)) {
        phoneField.classList.add('error');
        isValid = false;
      }
    }

    if (!isValid) {
     // utils.showPopupMessage('Please fill all required fields correctly', 'error');
    }

    return isValid;
  },

  /**
   * Show success message after booking
   */
 

  /**
   * Show thank you popup
   */
  showThankYouPopup() {
    // If the callback sheet is open, close both it and the blur
    const cb = document.getElementById('callbackPopup');
    if (cb) cb.style.display = 'none';
    const blur = document.getElementById('blur-overlay');
    if (blur) blur.style.display = 'none';
  
    // Show the unified thank‑you overlay
    if (elements.thankyouPopup) {
      elements.thankyouPopup.style.display = 'flex';
      setTimeout(() => {
        elements.thankyouPopup.style.display = 'none';
      }, 3000);
    }
  
    // Optionally hide the booking panel
    const booking = document.getElementById('booking-form');
    if (booking) booking.style.display = 'none';
  },
  

  /**
   * Initialize form handlers
   */
  init() {
    if (elements.bookingForm) {
      elements.bookingForm.addEventListener('submit', (e) => this.handleBookingSubmit(e));
    }

    if (elements.callbackForm) {
      elements.callbackForm.addEventListener('submit', (e) => this.handleCallbackSubmit(e));
    }
    if (elements.contactForm) {
         elements.contactForm.addEventListener('submit', (e) => this.handleContactSubmit(e));
      }
  }
};

// UI Module (popups, menus, etc.)
const uiModule = {
  /**
   * Initialize mobile menu
   */
  initMobileMenu() {
    if (!elements.mobileMenuToggle || !elements.mobileMenu) return;

    document.addEventListener('click', (e) => {
      const isMenuClick = elements.mobileMenuToggle.contains(e.target);
      const isInsideMenu = elements.mobileMenu.contains(e.target);

      if (isMenuClick) {
        elements.mobileMenu.style.display = (elements.mobileMenu.style.display === 'flex') ? 'none' : 'flex';
      } else if (!isInsideMenu) {
        elements.mobileMenu.style.display = 'none';
      }
    });
  },

  /**
   * Initialize popups
   */
  initPopups() {
    // Spring popup - Only show once per user
    if (elements.springPopup) {
      // Check if we've shown the popup before
      if (!localStorage.getItem('springPopupShown')) {
        setTimeout(() => {
          elements.springPopup.style.display = "flex";
          elements.springPopup.style.opacity = "0";
          setTimeout(() => elements.springPopup.style.opacity = "1", 10);
          
          // Mark as shown in localStorage
          localStorage.setItem('springPopupShown', 'true');
          
          // Optional: Set expiration (e.g., show again after 30 days)
          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + 30);
          localStorage.setItem('springPopupExpiry', expiryDate.getTime());
        }, 5000); // Show after 5 seconds
      }

      const closeBtn = elements.springPopup.querySelector(".close-popup");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          elements.springPopup.style.display = "none";
        });
      }
    }

    // Callback popup controls
    window.openCallbackPopup = function() {
      if (elements.springPopup) elements.springPopup.style.display = 'none';
      document.getElementById('callbackPopup').style.display = 'flex';
      document.getElementById('blur-overlay').style.display = 'block';
    };

    window.closeCallbackPopup = function() {
      document.getElementById('callbackPopup').style.display = 'none';
      document.getElementById('blur-overlay').style.display = 'none';
    };

    // Thank you popup controls
    window.showThankYouPopup = function() {
      document.getElementById('thankyouPopup').style.display = 'flex';
      setTimeout(() => {
        document.getElementById('thankyouPopup').style.display = 'none';
      }, 3000);
    };
  },



  /**
   * Initialize about us slideshow
   */
  initSlideshow() {
    const aboutSlides = document.querySelectorAll('.about-us-slideshow img');
    if (!aboutSlides.length) return;

    let currentAbout = 0;
    setInterval(() => {
      aboutSlides[currentAbout].classList.remove('active');
      currentAbout = (currentAbout + 1) % aboutSlides.length;
      aboutSlides[currentAbout].classList.add('active');
    }, 3000);
  },

  /**
   * Initialize nav link active states
   */
  initNavLinks() {
    const navLinks = document.querySelectorAll('.navbar .nav-link');
    if (!navLinks.length) return;

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }
};

// Main Initialization
document.addEventListener('DOMContentLoaded', () => {
  pricingModule.init();
  formModule.init();
  uiModule.initMobileMenu();
  uiModule.initPopups();
  uiModule.initSlideshow();
  uiModule.initNavLinks();
});
