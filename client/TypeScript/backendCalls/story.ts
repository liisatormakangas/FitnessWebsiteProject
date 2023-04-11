class Story {
    id_story: number;
    author: string;
    title: string;
    story: string;
    blog_date: Date;
    image_name: string;

    constructor(id: number, author: string, title: string, story: string, blog_date: Date, image_name: string) {
        this.id_story = id;
        this.author = author;
        this.title = title;
        this.story = story;
        this.blog_date = blog_date;
        this.image_name = image_name;
    }
}

export { Story };