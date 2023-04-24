import { Course } from './course.js';

class Courses {
    courses: Course[];
    #backendUrl = "";

    constructor(backendUrl: string) {
        this.courses = [];
        this.#backendUrl = backendUrl;
    }
    getCourseById = async (id: number) => {
        return new Promise(async (resolve, reject) => {
            fetch(this.#backendUrl + "/" + id)
                .then(response => response.json())
                .then(response => {
                    resolve(response);//returns a single Course object
                })
                .catch(error => {
                    reject(error);  
                });
        });
    };
}
export { Courses };