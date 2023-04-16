"use strict";
exports.__esModule = true;
exports.StoryComment = void 0;
var StoryComment = /** @class */ (function () {
    function StoryComment(id, id_story, id_user, content, date_added) {
        this.id_response = id;
        this.id_story = id_story;
        this.id_user = id_user;
        this.content = content;
        this.date_added = date_added;
    }
    return StoryComment;
}());
exports.StoryComment = StoryComment;
