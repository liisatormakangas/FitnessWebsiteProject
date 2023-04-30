import { ShoppingCart } from "./cart.js";//need to think about to get cart or get order
import { Course } from "./course.js";

class Order {
    orders: Order[];
    #backendUrl= "";
    constructor(backendUrl: string) {
        this.orders = [];
        this.#backendUrl = backendUrl;
    }
    getOrders = async () => {
        return new Promise(async(resolve, reject) => {
            fetch(this.#backendUrl, {
                .then(response => response.json())
                .then(response => {
                    this.#readJson(response);
                    resolve(this.orders);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    

    
}


export { Order };
