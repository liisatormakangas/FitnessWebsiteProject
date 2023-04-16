class StoryComment {
    id_response: number;
    id_story: number;
    id_user: number;
    content: string;
    date_added: Date;

    constructor(id: number, id_story: number, id_user: number, content: string, date_added: Date) {
        this.id_response = id;
        this.id_story = id_story;
        this.id_user = id_user;
        this.content = content;
        this.date_added = date_added;
    }
}
export { StoryComment };