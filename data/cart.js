export let cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart){
        [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        productQtyValue: 0
    }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        productQtyValue: 0
    }];

    }

    

    function saveToStorage(){
        localStorage.setItem('cart', JSON.stringify(cart));
    }

export function addToCart(productId){
          const productQty = document.querySelector(`.productQty-${productId}`).value;

          const productQtyValue = Number(productQty);

          let matchingItem;

         cart.forEach((cartItem) => {
              if (productId === cartItem.productId){
                  matchingItem = cartItem;
              }
            });

            if (matchingItem){
                matchingItem.productQtyValue += productQtyValue;
            } else {
                cart.push({
                productId,
                productQtyValue
            });
            
          }
          saveToStorage();
    }

  export  function removeFromCart(productId){
      const newCart = [];
      cart.forEach((cartItem) => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
      });
      cart = newCart;
      saveToStorage();
    }

  export  function calculateCart(){
        let cartQuantity = 0;
        cart.forEach((cartItem) => {
           cartQuantity += cartItem.productQtyValue;
        });
       return cartQuantity;
    }

   
