console.info('JavaScript Loaded Successfully!')
let bagItemObjects;
onLoad();

function onLoad() {
  let bagItemsStr = localStorage.getItem('bagItems');
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  displayBagIcon();
  loadBagItemObjects();
  displayBagItems();
  displayBagSummary()
}

function displayBagIcon() {
  let bagItemCountElement = document.querySelector('.bag-item-count');
  if (bagItems.length > 0) {
    bagItemCountElement.style.visibility = 'visible';
    bagItemCountElement.innerText = bagItems.length;
  }
  else {
    bagItemCountElement.style.visibility = 'hidden';
  }
}

function loadBagItemObjects() {
  bagItemObjects = bagItems.map(x => {
    for (let i = 0; i < items.length; i++) {
      if (x == items[i].id) {
        return items[i];
      }
    }
  })
}

function displayBagItems() {
  let containerElement = document.querySelector('.bag-item-container');
  let innerHTML = '';
  bagItemObjects.forEach(item => {
    innerHTML += generateItemHTML(item);
  });
  containerElement.innerHTML = innerHTML;
}

function displayBagSummary() {
  let bagSummaryElement = document.querySelector('.bag-summary');
  let totalItem = bagItemObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;
  bagItemObjects.forEach(item => {
    totalMRP += item.price.original_price
    totalDiscount += item.price.original_price - item.price.current_price
  })
  const CONVENIENCE_FEE = 99;
  let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEE;
  bagSummaryElement.innerHTML = `
    <div class="bag-details-container">
        <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
        <div class="price-item">
            <span class="price-item-tag">Total MRP</span>
            <span class="price-item-value">₹${totalMRP}</span>
        </div>
        <div class="price-item">
            <span class="price-item-tag">Discount on MRP</span>
            <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
        </div>
        <div class="price-item">
            <span class="price-item-tag">Convenience Fee</span>
            <span class="price-item-value">₹99</span>
        </div>
        <hr>
        <div class="price-footer">
            <span class="price-item-tag">Total Amount</span>
            <span class="price-item-value">₹${finalPayment}</span>
        </div>
    </div>
    <button class="btn-place-order" onclick="placeOrder()">
        <div class="place-order">PLACE ORDER</div>
    </button>
    `
}

function removeFromBag(itemID) {
  bagItems = bagItems.filter(bagItemID => bagItemID != itemID); // array without ids which were removed
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  loadBagItemObjects();
  displayBagItems();
  displayBagIcon();
  displayBagSummary();
}

function generateItemHTML(item) {
  return `
  <div class="bag-item-container">
    <div class="item-left-part">
        <img class="bag-item-img" src="/${item.image}">
    </div>
    <div class="item-right-part">
        <div class="company">${item.company_name}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price-container">
            <div class="current-price">₹${item.price.current_price}</div>
            <div class="original-price">₹${item.price.original_price}</div>
            <div class="discount-percentage">(${item.price.discount_percentage}% OFF)</div>
        </div>
        <div class="return-period">
            <span class="return-period-days">${item.return_period} days</span> return available
        </div>
        <div class="delivery-details">
            Delivery by <span class="delivery-details-days">${item.delivery_date}</span>
        </div>
    </div>
        <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
  </div>`
}

function placeOrder(){
  alert('Feature Not Available Yet ☹️')
}