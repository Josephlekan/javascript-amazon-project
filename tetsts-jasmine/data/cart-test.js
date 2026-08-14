import{addToCart, cart, loadFromStorage,
     removeFromCart, updateCartDeliveryOption,
        notUpdateCartDeliveryOption} from "../../data/cart.js";
describe('test suite: addToCart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
    });
    it('adds an existing products to the cart', () => {
          
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: '04701903-bc79-49c6-bc11-1af7e3651358',
                productQtyValue: 1,
                deliveryOptionId: '1'
            }]);
        });
        
        loadFromStorage();
        addToCart('04701903-bc79-49c6-bc11-1af7e3651358');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: '04701903-bc79-49c6-bc11-1af7e3651358',
            productQtyValue: 2,
            deliveryOptionId: '1'
        }])); 
        expect(cart[0].productId).toEqual('04701903-bc79-49c6-bc11-1af7e3651358');
        expect(cart[0].productQtyValue).toEqual(2);
        
    });
    it('adds a new product to the cart', () => {
        
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();
        addToCart('04701903-bc79-49c6-bc11-1af7e3651358');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: '04701903-bc79-49c6-bc11-1af7e3651358',
            productQtyValue: 1,
            deliveryOptionId: '1'
        }]));
        expect(cart[0].productId).toEqual('04701903-bc79-49c6-bc11-1af7e3651358');
        expect(cart[0].productQtyValue).toEqual(1);
    });
}); 

describe('test suite: remove from cart', () => {
    beforeEach(() =>{
        spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([{
            productId: '04701903-bc79-49c6-bc11-1af7e3651358',
            productQtyValue: 1,
            deliveryOptionId: '1'
        }]);
    });
        spyOn(localStorage, 'setItem');
    });
    it('removes a productId', () => {
        loadFromStorage();
        removeFromCart('04701903-bc79-49c6-bc11-1af7e3651358');
        expect(cart.length).toEqual(0);
    });
    it('removes a productId that is not on the cart', () => {
        loadFromStorage();
        removeFromCart('04701903-bc79-49c6-bc11-1af7e3651358');
        expect(cart.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', '[]');
    });
});

describe('test suite: update delivery option', () => {
    beforeEach(() => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                productQtyValue: 1,
                deliveryOptionId: '1'
            }]);
        });
        spyOn(localStorage, 'setItem');
        loadFromStorage();
    });

    it('updates the delivery option for an item in the cart', () => {
        updateCartDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].deliveryOptionId).toEqual('3');
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'cart',
            JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                productQtyValue: 1,
                deliveryOptionId: '3'
            }]));
    });
    it('does not update delivery option for an item not in the cart', () => {
        notUpdateCartDeliveryOption('04701903-bc79-49c6-bc11-1af7e3651358', 3)
        expect(
            cart[0]
        ).not.toEqual('04701903-bc79-49c6-bc11-1af7e3651358');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
});


