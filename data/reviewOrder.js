export const deliveryOptionCost = [{
    id: '1',
    priceCents: 0,
    deliveryDays: 1
}, {
    id: '2',
    priceCents: 499,
    deliveryDays: 2
}, {
    id: '3',
    priceCents: 999,
    deliveryDays: 3
}];


export function getDeliveryId(deliveryOptionId){
     let deliveryOption;
    deliveryOptionCost.forEach((option) => {
        if( option.id === deliveryOptionId){
            deliveryOption = option;
        }         
        });
        return deliveryOption || deliveryOptionCost [0];
}