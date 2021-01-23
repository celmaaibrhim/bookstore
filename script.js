
if (document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready (){
  var removeCartItemButtons =  document.getElementsByClassName('btn-danger')
for (var i=0; i<removeCartItemButtons.length;i++){
var button = removeCartItemButtons[i]
button.addEventListener('click', removeCartItem)
}
}

function removeCartItem(event){
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal()
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i]
    var priceElement = cartRow.getElementsByClassName('cart-price')[0]
    var quantityElmenet = cartRow.getElementsByClassName('cart-quantity-input')[0]
    var price = parseFloat(priceElement.innerText.replace('£',''))
    var quantity = quantityElmenet.value
    total = total + (price * quantity)
}
total = Math.round(total * 100 ) / 100 
 document.getElementsByClassName('cart-total-price')[0].innerText = '£' + total 
}


var quantityInputs = document.getElementsByClassName('cart-quantity-input')
for (var i=0 ; i<quantityInputs.length; i++){
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
}

function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <=0){
        input.value = 1
    }
    updateCartTotal()
}

var addToCartButtons = document.getElementsByClassName('btn-primary')
for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
}

function addToCartClicked(event){
 var button = event.target
 var shopItem = button.parentElement.parentElement
 var price = shopItem.getElementsByClassName('item-price')[0].innerText
 var imageSrc = shopItem.getElementsByClassName('image')[0].src
addItemToCart(price,imageSrc)
updateCartTotal()
    
}


function addItemToCart(price, imageSrc){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartRowContents = `
    <div class="cart-item cart-column">
    <img class="cart-item-image" src=${imageSrc}>
    </div>
    <span class="cart-price cart-column">${price}</span>
     <div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
    `
    cartRow.innerHTML = cartRowContents 
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)

}

document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

function purchaseClicked(){
alert('Thank you for your purchase!')
var cartItems = document.getElementsByClassName('cart-items')[0]
while (cartItems.hasChildNodes()){
    cartItems.removeChild(cartItems.firstChild)
}
updateCartTotal()
}

