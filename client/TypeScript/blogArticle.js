"use strict";
exports.__esModule = true;
var handleStories_js_1 = require("./backendCalls/handleStories.js");
var storyComment_1 = require("./backendCalls/storyComment");
var backendUrl = "http://localhost:3001/story";
var stories = new handleStories_js_1.Stories(backendUrl);
var blogTitle = document.getElementById("storyTitle");
var blogImage = document.getElementById("storyImage");
var blogDate = document.getElementById("storyDate");
var blogAuthor = document.getElementById("storyAuthor");
var blogFullText = document.getElementById("storyFullText");
var blogComments = document.getElementById("commentlist");
var commentInput = document.getElementById("newcomment");
// This is used to get the story id from the url:
var queryParams = new URLSearchParams(window.location.search);
var id_story = Number(queryParams.get('id'));
//get the story with given id from the database
stories.getStoryById(id_story).then(function (story) {
    renderStory(story);
})["catch"](function (error) {
    alert(error);
});
var renderStory = function (story) {
    blogTitle.innerText = story.title;
    blogImage.src = "./images/blog_images/".concat(story.image_name);
    blogFullText.innerText = story.story;
    blogDate.innerText = new Date(story.blog_date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    blogAuthor.innerText = "By: ".concat(story.author);
    renderComments(story.comments);
};
// render the comments
var renderComments = function (comments) {
    comments.forEach(function (comment) {
        var li = document.createElement("li");
        li.innerHTML = '<li><div class="comment"><div class="comment-author"><h3>' + comment.id_user + '</h3><div class="meta">' + new Date(comment.date_added).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) + '</div></div><div class="comment-content"><p>' + comment.content + '</p></div></div></li>';
        blogComments.appendChild(li);
    });
};
// add a new comment
commentInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        //TODO: fix user id
        var userId = 1;
        var comment_1 = new storyComment_1.StoryComment(0, id_story, userId, commentInput.value, new Date());
        stories.addComment(comment_1).then(function (result) {
            if (result) {
                renderComments([comment_1]);
                commentInput.value = "";
            }
        })["catch"](function (error) {
            alert(error);
        });
    }
});
