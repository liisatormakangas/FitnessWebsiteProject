"use strict";
exports.__esModule = true;
exports.Story = void 0;
var Story = /** @class */ (function () {
    function Story(id, author, title, story, blog_date, image_name, comments) {
        this.id_story = id;
        this.author = author;
        this.title = title;
        this.story = story;
        this.blog_date = blog_date;
        this.image_name = image_name;
        this.comments = comments;
    }
    return Story;
}());
exports.Story = Story;
