import { Story } from './backendCalls/story.js';
import { Stories } from './backendCalls/handleStories.js';
import { StoryComment } from './backendCalls/storyComment.js';

const backendUrl = "http://localhost:3001/story";

const stories = new Stories(backendUrl);

const blogTitle = document.getElementById("storyTitle") as HTMLHeadingElement;
const blogImage = document.getElementById("storyImage") as HTMLImageElement;
const blogDate = document.getElementById("storyDate") as HTMLParagraphElement;
const blogAuthor = document.getElementById("storyAuthor") as HTMLParagraphElement;
const blogFullText = document.getElementById("storyFullText") as HTMLParagraphElement;
const blogComments = document.getElementById("commentlist") as HTMLUListElement;
const commentInput = document.getElementById("newcomment") as HTMLInputElement;

// This is used to get the story id from the url:
const queryParams = new URLSearchParams(window.location.search);
const id_story = Number(queryParams.get('id'));

//get the story with given id from the database
stories.getStoryById(id_story).then((story: Story) => {    
    renderStory(story);
})
.catch((error: any) => {
    alert(error);
});

const renderStory = (story: Story) => {
    blogTitle.innerText = story.title;
    blogImage.src = `./images/blog_images/${story.image_name}`;
    blogFullText.innerText = story.story;
    blogDate.innerText = new Date(story.blog_date).toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'} );
    blogAuthor.innerText = `By: ${story.author}`;
    renderComments(story.comments);
}

// render the comments
const renderComments = (comments: StoryComment[]) => {
    comments.forEach((comment: StoryComment) => {
        const li = document.createElement("li");
        li.innerHTML = '<li><div class="comment"><div class="comment-author"><h3>' + comment.id_user + '</h3><div class="meta">' + new Date(comment.date_added).toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'} ) + '</div></div><div class="comment-content"><p>' + comment.content + '</p></div></div></li>';
        blogComments.appendChild(li);
    });
}

// add a new comment
commentInput.addEventListener("keypress", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        //TODO: fix user id
        const userId = 1;
        const comment = new StoryComment(0, id_story, userId, commentInput.value, new Date());
        stories.addComment(comment).then((result: any) => {
            if (result) {
                renderComments([comment]);
                commentInput.value = "";
            }
        })
        .catch((error: any) => {
            alert(error);
        });
    }
});

