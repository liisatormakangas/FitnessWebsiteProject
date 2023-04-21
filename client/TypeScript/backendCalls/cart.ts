class ShoppingCart {
    id_cart: number;
    id_user: number;
    id_course: number;
    price: number;
    constructor(id_cart, id_user, id_course, price) {
        this.id_cart = id_cart;
        this.id_user = id_user;
        this.id_course = id_course;
        this.price = price;
    }
}
export { ShoppingCart };
