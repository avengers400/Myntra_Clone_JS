let bagItemobjects;
onLoad()

function onLoad(){
 loadBagItems();
 displayBagItems();
 displayBagSummary();
}

function loadBagItems() {
    bagItemobjects = bagItems.map(itemId => {
        for (let i =0; i<items.length; i++){
            if (itemId == items[i].id){
                return items[i]
            }
        }
    });
    
}
function displayBagSummary() {
  let bagsummary = document.querySelector('.bag-summary')
  let totalItems = bagItemobjects.length;
  let totalprice = 0;
  let totalDiscount = 0;
  const concessionFee = 99
  let amountToBePaid = 0

  bagItemobjects.forEach((saman) => {
    totalprice += saman.current_price
    totalDiscount += saman.original_price - saman.current_price
    amountToBePaid = totalprice  + 99
  } )

  bagsummary.innerHTML = `<div class="bag-details-container">
  <div class="price-header">PRICE DETAILS (${totalItems}) </div>
  <div class="price-item">
    <span class="price-item-tag">Total MRP</span>
    <span class="price-item-value">Rs ${totalprice}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Discount on MRP</span>
    <span class="price-item-value priceDetail-base-discount">-Rs ${totalDiscount}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Convenience Fee</span>
    <span class="price-item-value">Rs ${concessionFee}</span>
  </div>
  <hr>
  <div class="price-footer">
    <span class="price-item-tag">Total Amount</span>
    <span class="price-item-value">Rs ${amountToBePaid}</span>
  </div>
</div>
<button class="btn-place-order">
  <div class="css-xjhrni">PLACE ORDER</div>
</button>`
}



function displayBagItems () {
    let containerElement = document.querySelector('.bag-items-container')
    // containerElement.innerHTML = `
    // `
    let innerHTML = ``
    bagItemobjects.forEach(element => {
        innerHTML += generateItemHTML(element)
        
    });
    containerElement.innerHTML = innerHTML;
}
function removeElement(value){
  bagItems = bagItems.filter(id => id != value)
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  loadBagItems()
  displayBagIcon()
 
  displayBagItems()


}

function generateItemHTML(item) {
    return `<div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="../${item.image}">
    </div>
    <div class="item-right-part">
      <div class="company">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price-container">
        <span class="current-price">Rs ${item.current_price}</span>
        <span class="original-price">Rs ${item.original_price}</span>
        <span class="discount-percentage">${item.discount_percentage}</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">${item.return_period}</span> return available
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${item.delivery_date}</span>
      </div>
    </div>
    <div onclick="removeElement(${item.id})" class="remove-from-cart">X</div>
    </div>

  </div>`
}