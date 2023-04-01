// validation
 (() => {
    'use strict'
  
    // Fetch the forms we want to apply custom Bootstrap validation 
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach((form: HTMLFormElement)=> {
        form.addEventListener('submit', (event: Event)=> {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false);
      });
  })();

// //   create class and functions to calculate bmi and bmi category
//   class bmi{
//     gender: number;
//     age: number;
//     height: number;
//     weight: number;
//     bmi: number;
//     category: string;

//     constructor(gender:number, age: number, height: number, weight: number) {
//         this.gender = gender;
//         this.age = age;
//         this.height = height;
//         this.weight = weight;
//         this.bmi = this.calculateBMI();
//         this.category = this.bmiCategory();
//     }
//     calculateBMI(): number {
//         let bmi = this.weight / Math.pow(this.height/100, 2);
//         return bmi;
//     }
//     bmiCategory(): string {
//         let bmi = this.calculateBMI();
//         let category: string;
//         if (bmi < 18.5) {
//             category = "Underweight";
//         } else if (bmi >= 18.5 && bmi <= 24.9) {
//             category = "Normal weight";
//         } else if (bmi >= 25 && bmi <= 29.9) {
//             category = "Overweight";
//         } else if (bmi >= 30) {
//             category = "Obesity";
//         }
//         return category;
//     }
   
// }
// // create object
// let gender = (document.querySelector('#gender') as HTMLInputElement).value;
// let age = (document.querySelector('#age') as HTMLInputElement).value;
// let height = (document.querySelector('#height')as HTMLInputElement).value;
// let weight = (document.querySelector('#weight')as HTMLInputElement).value;
// let result = (document.querySelector('#bmi')as HTMLInputElement).value;
// let category = (document.querySelector('#category')as HTMLInputElement).value;

// let bmiObj = new bmi(gender,age,height,weight);
