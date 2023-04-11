import { Story } from './story.js';

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

    #readJson = (allStories: any) => {
        allStories.forEach((story: any) => {
            this.stories.push(new Story(story.id_story, story.author, story.title, story.story, story.blog_date, story.image_name));
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