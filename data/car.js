class Car {
    #brand;
    #model;
    #speed;
    #isTrunk;
    constructor(carDetails){
        this.brand = carDetails.brand,
        this.model = carDetails.model,
        this.speed = 0,
        this.isTrunk = '';
    }

    displayInfo(){
        console.log(`${this.brand} ${this.model} ${this.speed}km/hr ${this.isTrunk}`);
    }

    go(){

        this.speed += 5;
        if(this.speed > 200){
            this.speed = 200;
            
        }
        this.isTrunk ='Trunk is closed'
    }

    brake(){
        this.speed -= 5;
        if(this.speed < 0){
            this.speed = 0;
        }
        
    }

    openTrunk(){
        this.isTrunk ='true'
        if(this.isTrunk === 'true'){
            this.isTrunk = 'Trunk is opened';
        }
        this.brake();
    }

    closeTrunk(){
        this.isTrunk = 'false';
        if(this.isTrunk === 'false'){
            this.isTrunk = 'Trunk is closed';
        }
    }

   
}

class RaceCar extends Car {
    acceleration;
    constructor(carDetails){
        super(carDetails);
        this.acceleration = carDetails.acceleration;
    }
    go(){
        this.speed += this.acceleration;
        if(this.speed > 300){
            this.speed = 300
        }
    }
    brake(){
        this.speed -= this.acceleration;
        if(this.speed < 0){
            this.speed = 0;
        }
    }
    openTrunk(){
        return '';
    }
    closeTrunk(){
        return '';
    }
}

export const cars = [{
    brand: 'Toyota',
    model: 'Corolla'
}, {
    brand: 'Tesla',
    model: 'Model 3'
},  {
    brand: 'McLauren',
    model: 'F1',
    acceleration: 20,
    type: 'RaceCar'
}].map((carDetails) => {
    if(carDetails.type === 'RaceCar'){
        return new RaceCar(carDetails);
    }
    return new Car(carDetails);
});