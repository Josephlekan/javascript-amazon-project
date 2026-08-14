import { cart, calculateCart, updateQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { getDeliveryId } from "../../data/reviewOrder.js";

export function paymentSummary(){

    updateQuantity();
        const cartQuantity = calculateCart();
        let productPriceCent = 0;
        let shippingCostCent = 0;
        let totalBeforeTax;
        let totalTax;
        let totalCost;
        cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCent += product.priceCents * cartItem.productQtyValue;
        const deliveryOption = getDeliveryId(cartItem.deliveryOptionId);
        shippingCostCent += deliveryOption.priceCents;
        totalBeforeTax = productPriceCent + shippingCostCent;
        totalTax = totalBeforeTax * 0.1;
        totalCost = totalBeforeTax + totalTax;
    });
    console.log(formatCurrency(productPriceCent));
    console.log(formatCurrency(shippingCostCent));
    console.log(formatCurrency(totalBeforeTax));
    console.log(formatCurrency(totalTax));
    console.log(formatCurrency(totalCost));

      const paymentHtml = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCent)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money
            js-payment-shipping">$${formatCurrency(shippingCostCent)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(totalTax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money
            js-total-cost">$${formatCurrency(totalCost)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `

    document.querySelector('.js-payment-summary').innerHTML = paymentHtml;
}

