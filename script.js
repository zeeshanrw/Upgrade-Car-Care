const pricingData = {
    small: `
      <div class="pricing-table">
        <h3>Pricing for Small Car</h3>
        <table>
          <thead>
            <tr><th>Select</th><th>Package</th><th>Price</th><th>Time</th><th>Details</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="checkbox" class="package-checkbox" value="Interior Detailing ($160)" /></td>
              <td>Interior Detailing</td><td>$160</td><td>1–1.5 Hrs</td><td>Full interior clean, vacuum, windows</td>
            </tr>
            <tr>
              <td><input type="checkbox" class="package-checkbox" value="Exterior Detailing ($260)" /></td>
              <td>Exterior Detailing</td><td>$260</td><td>1.5–2 Hrs</td><td>Hand wash, tire clean, spray wax</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    sedan: `
      <div class="pricing-table">
        <h3>Pricing for Sedan</h3>
        <table>
          <thead>
            <tr><th>Select</th><th>Package</th><th>Price</th><th>Time</th><th>Details</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="checkbox" class="package-checkbox" value="Interior Detailing ($180)" /></td>
              <td>Interior Detailing</td><td>$180</td><td>1.5 Hrs</td><td>Interior + trunk shampoo, vacuum</td>
            </tr>
            <tr>
              <td><input type="checkbox" class="package-checkbox" value="Exterior Detailing ($280)" /></td>
              <td>Exterior Detailing</td><td>$280</td><td>2 Hrs</td><td>Exterior hand wash + rim polish</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    suv: `
      <div class="pricing-table">
        <h3>Pricing for Large SUV</h3>
        <table>
          <thead>
            <tr><th>Select</th><th>Package</th><th>Price</th><th>Time</th><th>Details</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="checkbox" class="package-checkbox" value="Interior Detailing ($200)" /></td>
              <td>Interior Detailing</td><td>$200</td><td>1.75 Hrs</td><td>Seats, carpets, leather conditioning</td>
            </tr>
            <tr>
              <td><input type="checkbox" class="package-checkbox" value="Exterior Detailing ($300)" /></td>
              <td>Exterior Detailing</td><td>$300</td><td>2.15 Hrs</td><td>Spray wax + clay bar</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    minivan: `
      <div class="pricing-table">
        <h3>Pricing for Minivan</h3>
        <table>
          <thead>
            <tr><th>Select</th><th>Package</th><th>Price</th><th>Time</th><th>Details</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="checkbox" class="package-checkbox" value="Interior Detailing ($210)" /></td>
              <td>Interior Detailing</td><td>$210</td><td>2 Hrs</td><td>Full cabin & trunk deep clean</td>
            </tr>
            <tr>
              <td><input type="checkbox" class="package-checkbox" value="Exterior Detailing ($320)" /></td>
              <td>Exterior Detailing</td><td>$320</td><td>2.5 Hrs</td><td>Wax + polish + tire dressing</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    pickup: `
      <div class="pricing-table">
        <h3>Pricing for Pickup Truck</h3>
        <table>
          <thead>
            <tr><th>Select</th><th>Package</th><th>Price</th><th>Time</th><th>Details</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="checkbox" class="package-checkbox" value="Interior Detailing ($220)" /></td>
              <td>Interior Detailing</td><td>$220</td><td>2.25 Hrs</td><td>Seats, windows, deep vacuum</td>
            </tr>
            <tr>
              <td><input type="checkbox" class="package-checkbox" value="Exterior Detailing ($350)" /></td>
              <td>Exterior Detailing</td><td>$350</td><td>2.75 Hrs</td><td>Full polish, clay bar, sealant</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  };
  
  function showPrices(type) {
    const pricingContainer = document.getElementById('pricing-content');
  
    // Car size label mapping
    const carTypeLabels = {
      small: 'Small Car',
      sedan: 'Sedan',
      suv: 'Large SUV',
      minivan: 'Minivan',
      pickup: 'Pickup Truck'
    };
  
    pricingContainer.innerHTML = pricingData[type] + `
      <div id="booking-form" class="styled-booking-form">
        <div class="form-left">
          <h3>Book Your Service</h3>
          <form id="booking-form-element" action="https://formsubmit.co/upgradecarcare9@gmail.com" method="POST">
  <input type="hidden" name="_next" value="thankyou.html">
  <input type="hidden" name="_captcha" value="false">
  <input type="hidden" name="car_size" id="selected-car">
  <input type="hidden" name="selected_packages" id="selected-packages">

  <input type="text" name="name" placeholder="Your Name" required><br>
  <input type="tel" name="phone" placeholder="Phone Number" required><br>
  <textarea name="message" placeholder="Additional Message (Optional)"></textarea><br>

  <button type="submit">Submit Booking</button>
</form>

<p id="success-msg" style="display:none; color:green; margin-top:15px; font-weight:bold;">
  🎉 Thank you! Your booking has been sent successfully.
</p>

        </div>
        <div class="form-right">
          <h4>Need Help?</h4>
          <p>📞 Call us directly:</p>
          <a href="tel:6477416424" class="call-now">647-741-6424</a>
        </div>
      </div>
    `;
  
    attachCheckboxEvents();
    document.getElementById('booking-form').style.display = 'none';
  }



  function smoothScrollTo(targetY, duration = 1000) {
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
  }


  function attachCheckboxEvents() {
    const form = document.getElementById('booking-form');
    const checkboxes = document.querySelectorAll('.package-checkbox');
  
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const selected = Array.from(checkboxes)
          .filter(cb => cb.checked)
          .map(cb => cb.value)
          .join(', ');
  
        // 🔥 Move this inside the event listener to avoid null reference
        const packagesInput = document.getElementById('selected-packages');
        if (packagesInput) packagesInput.value = selected;
  
        if (selected) {
          form.style.display = 'block';
          const yOffset = -300;
          const y = form.getBoundingClientRect().top + window.pageYOffset + yOffset;
          smoothScrollTo(y, 1200); // you can tweak duration (ms)

        } else {
          form.style.display = 'none';
          const pricingTop = document.getElementById('pricing-content').getBoundingClientRect().top + window.pageYOffset - 335;
          smoothScrollTo(pricingTop, 600); // Scrolls back up to the top of pricing
          }
      });
    });
  }
  
  
  
  document.addEventListener('DOMContentLoaded', () => {
    const carButtons = document.querySelectorAll('.car-select button');
    carButtons.forEach(button => {
      button.addEventListener('click', () => {
        carButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        const type = button.dataset.type;
        if (type) showPrices(type);
      });
    });
  
    // Auto-select 'small' on load
    const defaultBtn = document.querySelector('.car-select button[data-type="small"]');
    if (defaultBtn) {
      defaultBtn.classList.add('selected');
      showPrices('small');
    }


    
    const callbackForm = document.getElementById('callbackForm');
if (callbackForm) {
  callbackForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    fetch(this.action, {
      method: 'POST',
      body: formData,
    }).then(response => {
      if (response.ok) {
        this.reset();
        closeCallbackPopup();
        const thankyouPopup = document.getElementById('thankyouPopup');
        thankyouPopup.style.display = 'flex';

        setTimeout(() => {
          thankyouPopup.style.display = 'none';
        }, 3000);
      } else {
        alert("❌ Something went wrong. Please try again.");
      }
    }).catch(error => {
      console.error('Form submission error:', error);
      alert("⚠️ Network error. Please try again later.");
    });
  });
}


  });


  document.addEventListener('submit', function (e) {
    const formElement = document.getElementById('booking-form-element');
    const popup = document.getElementById('popup-message');
    const bookingSection = document.querySelector('body');
  
    if (e.target === formElement) {
      e.preventDefault();
  
      const selectedPackages = Array.from(document.querySelectorAll('.package-checkbox:checked'))
        .map(cb => cb.value)
        .join(', ');
      const selectedCar = document.querySelector('.car-select button.selected')?.textContent || '';
  
      document.getElementById('selected-packages').value = selectedPackages;
      document.getElementById('selected-car').value = selectedCar;
  
      const formData = new FormData(formElement);
      fetch(formElement.action, {
        method: 'POST',
        body: formData,
      }).then(res => {
        if (res.ok) {
          formElement.reset();
          const thankyouPopup = document.getElementById('thankyouPopup');
          thankyouPopup.style.display = 'flex';
          setTimeout(() => {
            thankyouPopup.style.display = 'none';
          }, 3000);



          document.getElementById('booking-form').style.display = 'none';
  
          // ✅ Show popup and blur background
          document.getElementById('popup-message').style.display = 'block';
          document.getElementById('blur-overlay').style.display = 'block';

  
          // ✅ Hide popup after 2s and remove blur
          setTimeout(() => {
            document.getElementById('popup-message').style.display = 'none';
            document.getElementById('blur-overlay').style.display = 'none';
          }, 2000);
          
        } else {
          alert('Oops! Something went wrong.');
        }
      });
    }
  });
  
  

  
  const navLinks = document.querySelectorAll('.navbar .nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  
  function closeSpringPopup() {
    const popup = document.getElementById("springPopup");
    if (popup) popup.style.display = "none";
    sessionStorage.setItem("springPopupClosed", "true"); // This hides it for current visit
  }
  
  window.addEventListener("load", () => {
    const hasClosed = sessionStorage.getItem("springPopupClosed");
  
    if (!hasClosed) {
      setTimeout(() => {
        const popup = document.getElementById("springPopup");
        if (popup) {
          popup.style.display = "flex";
popup.style.opacity = "0";
setTimeout(() => popup.style.opacity = "1", 10);

        }
      }, 1500); // Delay optional
    }
  
    // Attach click event to the close button
    const closeBtn = document.querySelector(".close-popup");
    if (closeBtn) {
      closeBtn.addEventListener("click", closeSpringPopup);
    }
  });
  
  const menuIcon = document.getElementById('menuToggle');
  const navMenu = document.getElementById('mainNav');

  menuIcon.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });

  // Request a call back button 
  function openCallbackPopup() {
    document.getElementById('callbackPopup').style.display = 'flex';
  }
  
  function closeCallbackPopup() {
    document.getElementById('callbackPopup').style.display = 'none';
  }
  
  // Optionally handle form submit
 
  
  