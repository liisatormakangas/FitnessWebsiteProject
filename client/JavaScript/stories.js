import { Stories } from './backendCalls/handleStories.js';
const backendUrl = "http://localhost:3001/story";
const stories = new Stories(backendUrl);
const selectedStory = document.getElementById("selectedStory");
//get all stories from the database
stories.getStories().then((stories) => {
    stories.forEach((story) => {
        renderStories(story);
    });
})
    .catch((error) => {
    alert(error);
});
const storyId = null; //this will be the id of the story that the user clicks on
selectedStory.addEventListener("click", (event) => {
    event.preventDefault();
});
stories.getStoryById(storyId).then((story) => {
    rendeStoryById(story);
});
const renderStories = (story) => {
};
const rendeStoryById = (story) => {
};
