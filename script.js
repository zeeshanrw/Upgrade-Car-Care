
const pricingData = {
    small: `
        <div class="pricing-table">
            <h3>Pricing for Small Car</h3>
            <table>
                <thead>
                    <tr><th>Package</th><th>Price</th><th>Time</th><th>Details</th></tr>
                </thead>
                <tbody>
                    <tr><td>Interior Detailing</td><td>$160</td><td>1–1.5 Hrs</td><td>Full interior clean, vacuum, windows</td></tr>
                    <tr><td>Exterior Detailing</td><td>$260</td><td>1.5–2 Hrs</td><td>Hand wash, tire clean, spray wax</td></tr>
                </tbody>
            </table>
        </div>
    `,
    sedan: `
        <div class="pricing-table">
            <h3>Pricing for Sedan</h3>
            <table>
                <thead>
                    <tr><th>Package</th><th>Price</th><th>Time</th><th>Details</th></tr>
                </thead>
                <tbody>
                    <tr><td>Interior Detailing</td><td>$180</td><td>1.5 Hrs</td><td>Interior + trunk shampoo, vacuum</td></tr>
                    <tr><td>Exterior Detailing</td><td>$280</td><td>2 Hrs</td><td>Exterior hand wash + rim polish</td></tr>
                </tbody>
            </table>
        </div>
    `,
    suv: `
        <div class="pricing-table">
            <h3>Pricing for Large SUV</h3>
            <table>
                <thead>
                    <tr><th>Package</th><th>Price</th><th>Time</th><th>Details</th></tr>
                </thead>
                <tbody>
                    <tr><td>Interior Detailing</td><td>$200</td><td>1.75 Hrs</td><td>Seats, carpets, leather conditioning</td></tr>
                    <tr><td>Exterior Detailing</td><td>$300</td><td>2.15 Hrs</td><td>Spray wax + clay bar</td></tr>
                </tbody>
            </table>
        </div>
    `,
    minivan: `
        <div class="pricing-table">
            <h3>Pricing for Minivan</h3>
            <table>
                <thead>
                    <tr><th>Package</th><th>Price</th><th>Time</th><th>Details</th></tr>
                </thead>
                <tbody>
                    <tr><td>Interior Detailing</td><td>$210</td><td>2 Hrs</td><td>Full cabin & trunk deep clean</td></tr>
                    <tr><td>Exterior Detailing</td><td>$320</td><td>2.5 Hrs</td><td>Wax + polish + tire dressing</td></tr>
                </tbody>
            </table>
        </div>
    `,
    pickup: `
        <div class="pricing-table">
            <h3>Pricing for Pickup Truck</h3>
            <table>
                <thead>
                    <tr><th>Package</th><th>Price</th><th>Time</th><th>Details</th></tr>
                </thead>
                <tbody>
                    <tr><td>Interior Detailing</td><td>$220</td><td>2.25 Hrs</td><td>Seats, windows, deep vacuum</td></tr>
                    <tr><td>Exterior Detailing</td><td>$350</td><td>2.75 Hrs</td><td>Full polish, clay bar, sealant</td></tr>
                </tbody>
            </table>
        </div>
    `
};

function showPrices(type) {
    document.getElementById('pricing-content').innerHTML = pricingData[type];
}
// Auto-load Small Car pricing on page load
window.onload = function () {
    showPrices('small');
  };
  