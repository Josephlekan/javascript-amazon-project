    import { cart, removeFromCart, calculateCart, saveToStorage, updateQuantity, updateCartDeliveryOption, formatQty} from "../../data/cart.js";
    import { products, getProduct } from "../../data/products.js";
    import { deliveryOptionCost, getDeliveryId} from "../../data/reviewOrder.js";
    import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
    import { formatCurrency} from "../utils/money.js";
    import { paymentSummary } from "./paymentSummary.js";

  export function renderOrderSummarry(){
        let cartSummaryHtml = '';
        cart.forEach((cartItem) => {
            const productId = cartItem.productId;
            const matchingProduct = getProduct(productId);
            const deliveryOptionId = cartItem.deliveryOptionId;
            const deliveryOption = getDeliveryId(deliveryOptionId);
            const todayDate = dayjs();
            const deliveryDate = todayDate.add(deliveryOption.deliveryDays, 'days');
            const preferredDeliveryDate = deliveryDate.format('dddd, MMMM D');
        
        cartSummaryHtml +=
        
            `
                <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                    <div class="delivery-date"
                    data-deliver-id = ${deliveryOptionId}>
                        Delivery date: ${preferredDeliveryDate};
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
                            data-product-id = ${matchingProduct.id}>
                            <span>
                            Quantity: <span class="quantity-label-${matchingProduct.id}">${cartItem.productQtyValue}</span>
                            </span>
                            <span class="update-quantity-link js-update-quantity-link link-primary"
                            data-product-id = ${matchingProduct.id}>
                            Update
                            </span>
                            <input type="text" class="update-edit js-update-edit-${matchingProduct.id}">
                            <span class="save-quantity-link js-save-quantity-link link-primary"
                            data-product-id = ${matchingProduct.id}>
                            Save
                            </span>
                            <span class="delete-quantity-link  js-delete-quantity-link 
                                link-primary" data-product-id = ${matchingProduct.id} >
                            Delete
                            </span>
                        </div>
                        </div>
                        <div class="delivery-options">
                            ${orderSummary(matchingProduct, cartItem)}
                        </div>
                    </div>
                    </div>
                `
                
            });

            
            document.querySelector('.js-order-summary')
                .innerHTML = cartSummaryHtml;


            
                function orderSummary(matchingProduct, cartItem){
                    let orderSummaryHtml = '';
                    deliveryOptionCost.forEach((deliveryOption) => {
                        const todayDate = dayjs();
                        const deliveryDate = todayDate.add(deliveryOption.deliveryDays, 'days');
                        const preferredDeliveryDate = deliveryDate.format('dddd, MMMM D');
                        const shippingCost = deliveryOption.priceCents === 0 ? 'Free-' : `$${formatCurrency(deliveryOption.priceCents)}-`
                        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
                        console.log(isChecked);
                        
                        orderSummaryHtml += `
                        
                            <div class="delivery-option js-delivery-option"
                                data-product-id = "${matchingProduct.id}"
                                data-delivery-option-id = "${deliveryOption.id}">
                                <input type="radio" 
                                ${(isChecked ? 'checked' : '')}
                                class="delivery-option-input"
                                name="${matchingProduct.id}">
                                <div>
                                <div class="delivery-option-date">
                                    ${preferredDeliveryDate}
                                </div>
                                <div class="delivery-option-price">
                                ${shippingCost} Shipping
                                </div>
                                </div>
                            </div>
                    `
                    });
                    return orderSummaryHtml;
                }


                document.querySelectorAll('.js-delete-quantity-link')
                    .forEach((link) => {
                        link.addEventListener('click', () => {
                            const productId = link.dataset.productId;
                            const container = document.querySelector(`.js-cart-item-container-${productId}`);
                            container.remove();
                            removeFromCart(productId); 
                            updateCartQty();
                            paymentSummary();
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
                            paymentSummary();
                            });
                        });

        
                    
            function updateCartQty(){
                const cartQuantity = calculateCart();
                document.querySelector('.js-cartQty').innerHTML = `${formatQty(cartQuantity)} items`;
                    }
                updateCartQty();

                document.querySelectorAll('.js-delivery-option')
                    .forEach((elements) => {
                        elements.addEventListener('click', () => {
                            const {productId, deliveryOptionId, deliverId} = elements.dataset;
                            updateCartDeliveryOption(productId, deliveryOptionId);
                            renderOrderSummarry();
                            paymentSummary();
                        });       
                    });
                }
                
        renderOrderSummarry();