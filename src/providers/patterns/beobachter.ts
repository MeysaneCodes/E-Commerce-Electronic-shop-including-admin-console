class Beobachter {
    private observers: (() => void)[] = [];
   
    constructor() {
        this.observers = [];
    }

    subscribe (func:(() => void)){
        this.observers.push(func);
    }

    unsubscribe(func:(() => void)){
        this.observers = this.observers.filter(observer => observer !== func);
    }

    notify(){
        this.observers.forEach((observer) => observer())
    }
}

export const cart_count_observer = new Beobachter();





//topbar update on every refresh.

//when user add object to the product, we also need to update.

//checkout page on delete, add => update.