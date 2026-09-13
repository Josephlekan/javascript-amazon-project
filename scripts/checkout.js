import { renderOrderSummarry } from "./checkout/orderSummary.js";
import { paymentSummary } from "./checkout/paymentSummary.js";
import {cars} from "../data/car.js";
import {loadProducts} from "../data/products.js";
import "../data/backend-practice.js"

cars.forEach((car) => {
     car.go();
     car.brake();
     car.openTrunk();
     car.closeTrunk();
     car.displayInfo();
}); 
loadProducts(() => {
     renderOrderSummarry();
     paymentSummary();

});

