import  { Story } from './backendCalls/story.js';
import { Stories } from './backendCalls/handleStories.js';

const backendUrl = "http://localhost:3001/story";

const stories = new Stories(backendUrl);

const selectedStory = document.getElementById("selectedStory") as HTMLDivElement;

//get all stories from the database
stories.getStories().then((stories: Story[]) => {
    stories.forEach((story: Story) => {
        renderStories(story);
    });
})
.catch((error: any) => {
    alert(error);
});

const storyId = null;//this will be the id of the story that the user clicks on
selectedStory.addEventListener("click", (event: Event) => {
    event.preventDefault();
});

stories.getStoryById(storyId).then((story: Story) => {
    rendeStoryById(story);

})

const renderStories = (story: Story) => {

}

const rendeStoryById = (story: Story) => {

}