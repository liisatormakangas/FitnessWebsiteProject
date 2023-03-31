class bmi{
    gender: number;
    age: number;
    height: number;
    weight: number;
    bmi: number;

    constructor(gender:number, age: number,height: number, weight: number) {
        this.gender = gender;
        this.age = age;
        this.height = height;
        this.weight = weight;
    }
}
export { bmi };