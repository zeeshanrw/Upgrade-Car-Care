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
    pricingContainer.innerHTML = pricingData[type] + `
      <div id="booking-form" class="styled-booking-form">
    <div class="form-left">
      <h3>Book Your Service</h3>
      <form>
        <input type="text" placeholder="Your Name" required><br>
        <input type="tel" placeholder="Phone Number" required><br>
        <textarea placeholder="Additional Message (Optional)"></textarea><br>
        <button type="submit">Submit Booking</button>
      </form>
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
  
  function attachCheckboxEvents() {
    const checkboxes = document.querySelectorAll('.package-checkbox');
    const form = document.getElementById('booking-form');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        if (Array.from(checkboxes).some(cb => cb.checked)) {
          form.style.display = 'block';
          form.scrollIntoView({ behavior: 'smooth', block: 'start' });

        } else {
          form.style.display = 'none';
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
  });