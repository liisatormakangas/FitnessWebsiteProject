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
const commentCount = document.getElementById("comment_count") as HTMLHeadElement;

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
/* const renderComments = (comments: StoryComment[]) => {
    commentCount.innerText = `Comments (${comments.length})`; // update the comment count

    comments.forEach((comment: StoryComment) => {
        const li = document.createElement("li");
        li.setAttribute('class', 'list-group-item');
        li.innerHTML = '<li><div class="comment"><div class="comment-author"><h3>' + comment.id_user + 
                        '</h3><div class="meta">' + new Date(comment.date_added).toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'} ) + 
                        '</div></div><div class="comment-content"><p>' + comment.content + '</p></div></div></li>';
        blogComments.appendChild(li);
    });
} */

const renderComments = (comments: StoryComment[]) => {
    commentCount.innerText = `Comments (${comments.length})`; // update the comment count

    comments.forEach((comment: StoryComment) => {
        const li = document.createElement("li");
        li.setAttribute('class', 'list-group-item');
        li.innerHTML = `
            <div class="comment">
                <div class="comment-author">
                    <h3>${comment.id_user}</h3>
                    <div class="meta">${new Date(comment.date_added).toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'})}</div>
                </div>
                <div class="comment-content">
                    <p>${comment.content}</p>
                </div>
                <button class="delete-comment-btn">
                    <i class="bi bi-trash"></i>
                </button>
            </div>`;
        blogComments.insertBefore(li, blogComments.firstChild);

        const deleteBtn = li.querySelector('.delete-comment-btn');
        deleteBtn.addEventListener('click', () => {
            // delete the comment from the database
            stories.deleteComment(comment.id_response).then((result: any) => {
                // remove the comment from the comments array
                const commentIndex = comments.indexOf(comment);
                comments.splice(commentIndex, 1);

                // remove the li element from the DOM
                li.remove();

                // update the comment count
                commentCount.innerText = `Comments (${comments.length})`;
            }).catch((error: any) => {
                alert(error);
            });
        });
    });
}
// add a new comment
commentInput.addEventListener("keypress", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        event.preventDefault();
        //TODO: fix user id
        const userId = 1;
        const comment = new StoryComment(0, id_story, userId, commentInput.value, new Date());
        stories.addComment(comment).then((result: any) => {
            if (result) {
                renderComments(result);
                commentInput.value = "";
            }
        })
        .catch((error: any) => {
            alert(error);
        });
    }
});

    //delete a comment


// Like/dislike buttons
const likeButton = document.getElementById("green") as HTMLButtonElement;
const dislikeButton = document.getElementById("red") as HTMLButtonElement;
const likeCountSpan = document.getElementById("num-likes") as HTMLSpanElement;
const dislikeCountSpan = document.getElementById("num-dislikes") as HTMLSpanElement;

let likeCount: number = 0;
let dislikeCount: number = 0;
let likeClicked: boolean = false;
let dislikeClicked: boolean = false;

likeButton.addEventListener("click", () => {
  if (!likeClicked) {
    likeCount++;
    likeCountSpan.textContent = likeCount.toString();
    likeButton.style.backgroundColor = "#03DAC6";
    likeClicked = true;
    if (dislikeClicked) {
      dislikeCount--;
      dislikeCountSpan.textContent = dislikeCount.toString();
      dislikeButton.style.backgroundColor = "transparent";
      dislikeClicked = false;
    }
  } else {
    likeCount--;
    likeCountSpan.textContent = likeCount.toString();
    likeButton.style.backgroundColor = "transparent";
    likeClicked = false;
  }
});

dislikeButton.addEventListener("click", () => {
  if (!dislikeClicked) {
    dislikeCount++;
    dislikeCountSpan.textContent = dislikeCount.toString();
    dislikeButton.style.backgroundColor = "#FF0266";
    dislikeClicked = true;
    if (likeClicked) {
      likeCount--;
      likeCountSpan.textContent = likeCount.toString();
      likeButton.style.backgroundColor = "transparent";
      likeClicked = false;
    }
  } else {
    dislikeCount--;
    dislikeCountSpan.textContent = dislikeCount.toString();
    dislikeButton.style.backgroundColor = "transparent";
    dislikeClicked = false;
  }
});