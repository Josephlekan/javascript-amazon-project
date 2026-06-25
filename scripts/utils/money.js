
export function formatCurrency(priceCents){
   return (priceCents / 100).toFixed(2);
}

export function amountByProductQty(matchingProduct, cartItem){
   return ((matchingProduct.priceCents / 100) * cartItem.productQtyValue).toFixed(2);
}

export function totalBeforeTax(matchingProduct, cartItem, shippingFee){
   return (((matchingProduct.priceCents / 100) * cartItem.productQtyValue) + shippingFee).toFixed(2);
}

export function totalTax(matchingProduct, cartItem, shippingFee, taxFee){
   return ((((matchingProduct.priceCents / 100) * cartItem.productQtyValue) + shippingFee)* taxFee).toFixed(2);
}


export function orderTotal(){
   return(amountByProductQty(matchingProduct,cartItem) + totalBeforeTax(matchingProduct,cartItem, shippingFee) + totalTax(matchingProduct,cartItem, shippingFee, taxFee)).toFixed(2);
}


