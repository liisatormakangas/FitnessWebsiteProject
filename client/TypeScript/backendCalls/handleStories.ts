import { Story } from './story.js';
import {Cookies} from './sendLoginData.js';


class Stories {
    stories: Story[];
    #backendUrl = "";

    constructor(backendUrl: string) {
        this.stories = [];
        this.#backendUrl = backendUrl;
    }

    getStories = async () => {
        return new Promise(async (resolve, reject) => {
            fetch(this.#backendUrl)
                .then(response => response.json())
                .then(response => {
                    this.#readJson(response);
                    resolve(this.stories);//returns an array of Story objects
                })
                .catch(error => {
                    reject(error);  
                });
        });
    };


    // getStoryById = async (id: number) => {
    //     // get token from local storage
    //     const token = localStorage.getItem('token');
    //     return new Promise(async (resolve, reject) => {
    //         fetch(this.#backendUrl + "/" + id, {
    //             headers: {
    //                 Authorization: `Bearer ${token}` 
    //                 // send token through Authorization header
    //             }
    //         })
    //             .then(response => {
    //                 if (response.status === 200){
    //                     return response.json();
    //                 } else {
    //                     throw new Error(`${response.statusText}.Please register or login`);
    //                 }
    //             })
    //             .then(response => {
    //                 resolve(response);//returns a single Story object
    //             })
    //             .catch(error => {
    //                 reject(error);  
    //             });
    //     });

    // };

    getStoryById = async (id: number) => {
        return new Promise(async (resolve, reject) => {
            fetch(this.#backendUrl + "/" + id)
                .then(response => response.json())
                .then(response => {
                    resolve(response);//returns a single Story object
                })
                .catch(error => {
                    reject(error);  
                });
        });
    };


    addComment = async (comment: any) => {
        return new Promise(async (resolve, reject) => {
            fetch(this.#backendUrl + "/newcomment", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(comment)
            })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    };


    #readJson = (allStories: any) => {
        allStories.forEach((story: any) => {
            this.stories.push(new Story(story.id_story, story.author, story.title, story.story, story.blog_date, story.image_name, story.comments));
        });
    };
    
    // This can be used, if we decide to add the ability to add stories to the website:

    // #addToStoryArray(author: string, title: string, stoory: string, blog_date: Date, image_name: string) {
    //     const story = new Story(author, title, stoory, blog_date, image_name);
    //     this.stories.push(story);
    //     return story;
    // }

}

export { Stories };

   
