class Cart {
    cartItems;
    localStorageKey;

    constructor (localStorageKey){
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    }
    loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
        if (!this.cartItems){
            this.cartItems =   [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                productQtyValue: 2,
                deliveryOptionId: '1'
            }, {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                productQtyValue: 1,
                deliveryOptionId: '2'
            }];

        }
}
    saveToStorage(){
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }

     addToCart(productId){
        const productQty = document.querySelector(`.productQty-${productId}`);
        const productQtyValue = Number(productQty?.value) || 1;
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId){
                matchingItem = cartItem;
            }
        });

        if (matchingItem){
            matchingItem.productQtyValue += productQtyValue;
        } else {
            this.cartItems.push({
                productId,
                productQtyValue,
                deliveryOptionId: '1',
            
        });
        
        }
        this.saveToStorage();
    }

     updateQuantity(productId, newQuantityValue){       
        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId){
                cartItem.productQtyValue = Number(newQuantityValue);  
                console.log(newQuantityValue);
                document.querySelector(`.quantity-label-${productId}`).innerHTML = Number(newQuantityValue);
        }
        });
            this.saveToStorage();
    }

    removeFromCart(productId){
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });
    this.cartItems = newCart;
    this.saveToStorage();
    }

    calculateCart(){
            let cartQuantity = 0;
            this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.productQtyValue;
            });
        return cartQuantity;
    }

    notUpdateCartDeliveryOption(productId, deliveryOptionId){
    let matchinItem = '';
    this.cartItems.forEach((cartItem) => {
        if(productId !== cartItem.productId){
            return;
        }
    });

}

    updateCartDeliveryOption(productId, deliveryOptionId){
    let matchingItem = '';
    this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
}

    formatQty(qty){
        return qty.toLocaleString('en-US');
}

}

const cart = new Cart('cart-oop');
const businessCart = new Cart('business-oop');


console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);
















