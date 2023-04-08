class Story {
    author: string;
    title: string;
    story: string;
    blog_date: Date;
    blog_image: string;

    constructor(author: string, title: string, story: string, blog_date: Date, blog_image: string) {
        this.author = author;
        this.title = title;
        this.story = story;
        this.blog_date = blog_date;
        this.blog_image = blog_image;
    }
}

export { Story };