//import { Course } from './course';
class ShoppingCart {
    constructor(id_cart, id_user, courses) {
        this.id_cart = id_cart;
        this.id_user = id_user;
        this.courses = courses;
    }
    getTotalPrice() {
        return this.courses.reduce((total, course) => total + course.course_price, 0);
    }
    addCourse(course) {
        this.courses.push(course);
    }
    removeCourse(id_course) {
        const index = this.courses.findIndex(course => course.id_course === id_course);
        if (index !== -1) {
            this.courses.splice(index, 1);
        }
    }
}
