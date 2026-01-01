console.info('JavaScript Loaded Successfully!')
onLoad();

function onLoad(){
  displayItemsOnHomePage();
  let bagItemsStr = localStorage.getItem('bagItems');
  // bagItemsStr Present ? If True : If False
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  displayBagIcon();
}

function displayItemsOnHomePage() {
  let itemsContainerElement = document.querySelector('.items-container');

  let innerHtml = '';
  items.forEach(item => {
    innerHtml += `
  <div class="item-container">
    <img class="item-image" src="${item.image}">
    <div class="rating">${item.rating.stars} ⭐️ | ${item.rating.reviews}</div>
    <div class="company-name">${item.company_name}</div>
    <div class="item-name">${item.item_name}</div>
    <div class="price">
        <span class="current-price">Rs. ${item.price.current_price}</span>
        <span class="original-price">Rs. ${item.price.original_price}</span>
        <span class="discount">(${item.price.discount_percentage}% OFF)</span>
    </div>
    <button class="btn-add-bag" onclick="addToBag(${item.id}); displayBagIcon();">Add To Bag</button>
  </div>
`
  })
  itemsContainerElement.innerHTML = innerHtml;
}

function addToBag(itemID) {
  bagItems.push(itemID);
  localStorage.setItem('bagItems', JSON.stringify(bagItems))
  displayBagIcon();
}

function displayBagIcon(){
  let bagItemCountElement = document.querySelector('.bag-item-count');
  if (bagItems.length>0){
    bagItemCountElement.style.visibility='visible';
    bagItemCountElement.innerText = bagItems.length;
  }
  else {
    bagItemCountElement.style.visibility='hidden';
  }
}