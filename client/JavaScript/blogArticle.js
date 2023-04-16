import { Stories } from './backendCalls/handleStories.js';
import { StoryComment } from './backendCalls/storyComment.js';
const backendUrl = "http://localhost:3001/story";
const stories = new Stories(backendUrl);
const blogTitle = document.getElementById("storyTitle");
const blogImage = document.getElementById("storyImage");
const blogDate = document.getElementById("storyDate");
const blogAuthor = document.getElementById("storyAuthor");
const blogFullText = document.getElementById("storyFullText");
const blogComments = document.getElementById("commentlist");
const commentInput = document.getElementById("newcomment");
// This is used to get the story id from the url:
const queryParams = new URLSearchParams(window.location.search);
const id_story = Number(queryParams.get('id'));
//get the story with given id from the database
stories.getStoryById(id_story).then((story) => {
    renderStory(story);
})
    .catch((error) => {
    alert(error);
});
const renderStory = (story) => {
    blogTitle.innerText = story.title;
    blogImage.src = `./images/blog_images/${story.image_name}`;
    blogFullText.innerText = story.story;
    blogDate.innerText = new Date(story.blog_date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    blogAuthor.innerText = `By: ${story.author}`;
    renderComments(story.comments);
};
// render the comments
const renderComments = (comments) => {
    comments.forEach((comment) => {
        const li = document.createElement("li");
        li.innerHTML = '<li><div class="comment"><div class="comment-author"><h3>' + comment.id_user + '</h3><div class="meta">' + new Date(comment.date_added).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) + '</div></div><div class="comment-content"><p>' + comment.content + '</p></div></div></li>';
        blogComments.appendChild(li);
    });
};
// add a new comment
commentInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        //TODO: fix user id
        const userId = 1;
        const comment = new StoryComment(0, id_story, userId, commentInput.value, new Date());
        stories.addComment(comment).then((result) => {
            if (result) {
                renderComments([comment]);
                commentInput.value = "";
            }
        })
            .catch((error) => {
            alert(error);
        });
    }
});
