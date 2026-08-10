import{addToCart, cart, loadFromStorage} from "../../data/cart.js";
describe('test suite: addToCart', () => {
    it('adds an existing products to the cart', () => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: '04701903-bc79-49c6-bc11-1af7e3651358',
                productQtyValue: 1,
                deliveryOptonId: 1
            }]);
        });
        loadFromStorage();
        addToCart('04701903-bc79-49c6-bc11-1af7e3651358');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('04701903-bc79-49c6-bc11-1af7e3651358');
        expect(cart[0].productQtyValue).toEqual(2);
        
    });
    it('adds a new product to the cart', () => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();
        addToCart('04701903-bc79-49c6-bc11-1af7e3651358');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('04701903-bc79-49c6-bc11-1af7e3651358');
        expect(cart[0].productQtyValue).toEqual(1);
    });
}); 


