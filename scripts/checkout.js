    import { cart, removeFromCart, calculateCart, saveToStorage, updateQuantity} from "../data/cart.js";
    import { products } from "../data/products.js";
    import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
    import { formatCurrency} from "./utils/money.js";


    const todayDate = dayjs();
    const deliveryDate = todayDate.add(7, 'days');
    const deliveryDateExact = deliveryDate.format('dddd, MMMM D');
    console.log(deliveryDateExact);

  
    let cartSummaryHtml = '';
    cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;
    products.forEach((product) => {
        if(product.id === productId){
            matchingProduct = product;
        }
    
    });
    
    
     cartSummaryHtml +=
    
        `
            <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                    Delivery date: Tuesday, June 21
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src="${matchingProduct.image}">

                    <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity"
                        data-product-Id = ${matchingProduct.id}>
                        <span>
                        Quantity: <span class="quantity-label-${matchingProduct.id}">${cartItem.productQtyValue}</span>
                        </span>
                        <span class="update-quantity-link js-update-quantity-link link-primary"
                          data-product-Id = ${matchingProduct.id}>
                        Update
                        </span>
                        <input type="text" class="update-edit js-update-edit-${matchingProduct.id}">
                        <span class="save-quantity-link js-save-quantity-link link-primary"
                         data-product-Id = ${matchingProduct.id}>
                        Save
                        </span>
                        <span class="delete-quantity-link  js-delete-quantity-link 
                            link-primary" data-product-Id = ${matchingProduct.id} >
                        Delete
                        </span>
                    </div>
                    </div>

                    <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    <div class="delivery-option">
                        <input type="radio" checked
                        class="delivery-option-input"
                        name="delivery-option-${productId}">
                        <div>
                        <div class="delivery-option-date">
                            Tuesday, June 21
                        </div>
                        <div class="delivery-option-price">
                            FREE Shipping
                        </div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${productId}">
                        <div>
                        <div class="delivery-option-date">
                            Wednesday, June 15
                        </div>
                        <div class="delivery-option-price">
                            $4.99 - Shipping
                        </div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${productId}">
                        <div>
                        <div class="delivery-option-date">
                            Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                            $9.99 - Shipping
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            `
            
        });

        
        document.querySelector('.js-order-summary')
            .innerHTML = cartSummaryHtml;


        
            function deliveryDetail(){

            }
         
    
            document.querySelectorAll('.js-delete-quantity-link')
                .forEach((link) => {
                    link.addEventListener('click', () => {
                        const productId = link.dataset.productId;
                        const container = document.querySelector(`.js-cart-item-container-${productId}`);
                        container.remove();
                        removeFromCart(productId); 
                        updateCartQty();
                    });
                });
                
                
            
                document.querySelectorAll('.js-update-quantity-link')
                    .forEach((update) => {
                        const productId = update.dataset.productId;
                        update.addEventListener('click', () => {
                        const newQuantity = (document.querySelector(`.js-update-edit-${productId}`));
                        const oldQuantity = (document.querySelector(`.quantity-label-${productId}`));; 
                        newQuantity.value = Number(oldQuantity.innerHTML);
                        document.querySelector(`.js-cart-item-container-${productId}`)
                            .classList.add('is-editing');
                        });
                    });

                
                
                document.querySelectorAll('.js-save-quantity-link')
                    .forEach((save) => {
                        save.addEventListener('click', () => {
                        const productId = save.dataset.productId
                        console.log('I am working');
                        const newQuantity = (document.querySelector(`.js-update-edit-${productId}`));
                        const oldQuantity = document.querySelector(`.quantity-label-${productId}`);
                        let newQuantityValue = newQuantity.value;
                        let oldQuantityValue = Number(oldQuantity.innerHTML);
                        document.querySelector(`.js-cart-item-container-${productId}`)
                        .classList.remove('is-editing');
                        if(newQuantityValue < 1){
                            newQuantity.value = Number(oldQuantity.innerHTML);
                            alert(`Cart can't be empty`);
                            return;
                        }
                        else if(!Number(newQuantity.value)){
                            newQuantityValue = oldQuantityValue;
                            alert(`Cart can only be numbers`);
                            return;
                        }
                        updateQuantity(productId, newQuantityValue);
                        updateCartQty();
                        });
                    });

        
                
   export function updateCartQty(){
            const cartQuantity = calculateCart();
            document.querySelector('.js-cartQty').innerHTML = `${cartQuantity} items`;
        }
        updateCartQty();

       