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
                    resolve(this.stories);//returns an array of stories
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
                    resolve(response);//returns a single story
                })
                .catch(error => {
                    reject(error);  
                });
        });
    };

    #readJson = (allStories: any) => {
        allStories.forEach((story: any) => {
            this.stories.push(new Story(story.author, story.title, story.story, story.blog_date, story.blog_image));
        });
    };
    #addToStoryArray(author: string, title: string, stoory: string, blog_date: Date, blog_image: string) {
        const story = new Story(author, title, stoory, blog_date, blog_image);
        this.stories.push(story);
        return story;
    }

}

export { Stories };