// validation
(() => {
    'use strict';
    // Fetch the forms we want to apply custom Bootstrap validation 
    var forms = document.querySelectorAll('.needs-validation');
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach((form) => {
        form.addEventListener('submit', (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
})();
//   create class and functions to calculate bmi and bmi category
class bmi {
    constructor(gender, age, height, weight) {
        this.gender = gender;
        this.age = age;
        this.height = height;
        this.weight = weight;
        this.bmi = this.calculateBMI();
        this.category = this.bmiCategory();
    }
    calculateBMI() {
        let bmi = this.weight / Math.pow(this.height / 100, 2);
        return bmi;
    }
    bmiCategory() {
        let bmi = this.calculateBMI();
        let category;
        if (bmi < 18.5) {
            category = "Underweight";
        }
        else if (bmi >= 18.5 && bmi <= 24.9) {
            category = "Normal weight";
        }
        else if (bmi >= 25 && bmi <= 29.9) {
            category = "Overweight";
        }
        else if (bmi >= 30) {
            category = "Obesity";
        }
        return category;
    }
}
// create object
let gender = document.querySelector('#gender').value;
let age = document.querySelector('#age').value;
let height = document.querySelector('#height').value;
let weight = document.querySelector('#weight').value;
let result = document.querySelector('#bmi').value;
let category = document.querySelector('#category').value;
let bmiObj = new bmi(gender, age, height, weight);
