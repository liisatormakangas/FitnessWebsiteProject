import { Stories } from './backendCalls/handleStories.js';
const backendUrl = "http://localhost:3001/story";
const stories = new Stories(backendUrl);
const blogTitle = document.getElementById("storyTitle");
const blogImage = document.getElementById("storyImage");
const blogDate = document.getElementById("storyDate");
const blogAuthor = document.getElementById("storyAuthor");
const blogFullText = document.getElementById("storyFullText");
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
};
