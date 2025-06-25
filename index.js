const baseURL = "http://localhost:3000/posts";

function displayPosts() {
  fetch("https://blog-posts-m903.onrender.com/posts")
    .then(response => response.json())
    .then(posts => {
      const postListDiv = document.getElementById("post-list");
      postListDiv.innerHTML = ""; 

      posts.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.className = "post-item";
        postDiv.dataset.id = post.id;

        const postTitle = document.createElement("h3");
        postTitle.textContent = post.title;
        postTitle.style.cursor = "pointer";

        postDiv.appendChild(postTitle);
        postListDiv.appendChild(postDiv);

        postDiv.addEventListener("click", () => handlePostClick(post.id));
      });

      if (posts.length > 0) {
        handlePostClick(posts[0].id);
      }
    })
    .catch(error => {
      console.error("Error fetching posts:", error);
    });
}


function handlePostClick(postId) {
  fetch(`${baseURL}/${postId}`)
    .then(response => response.json())
    .then(post => {
      const postDetailDiv = document.getElementById("post-detail");
      postDetailDiv.innerHTML = `
        <h2>${post.title}</h2>
        <p><strong>Author:</strong> ${post.author}</p>
        <p>${post.content}</p>
      `;
    })
    .catch(error => {
      console.error("Error fetching post details:", error);
    });
}

function addNewPostListener() {
  const form = document.getElementById("new-post-form");
  form.addEventListener("submit", event => {
    event.preventDefault();

    const title = form.title.value.trim();
    const author = form.author.value.trim();
    const content = form.content.value.trim();

    if (!title || !author || !content) {
      alert("Please fill in all fields");
      return;
    }

    const newPost = { title, author, content };

fetch(baseURL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(newPost)
})
  .then(response => response.json())
  .then(savedPost => {

    const postListDiv = document.getElementById("post-list");
    const postDiv = document.createElement("div");
    postDiv.className = "post-item";
    postDiv.dataset.id = savedPost.id;

    const postTitle = document.createElement("h3");
    postTitle.textContent = savedPost.title;
    postDiv.appendChild(postTitle);
    postListDiv.appendChild(postDiv);

    postDiv.addEventListener("click", () => handlePostClick(savedPost.id));

    form.reset();
  })
  .catch(error => {
    console.error("Error adding new post:", error);
  });


    const postListDiv = document.getElementById("post-list");
    const postDiv = document.createElement("div");
    postDiv.className = "post-item";

    const postTitle = document.createElement("h3");
    postTitle.textContent = newPost.title;
    postDiv.appendChild(postTitle);
    postListDiv.appendChild(postDiv);

    form.reset();
  });
}

function main() {
  displayPosts();
  addNewPostListener();
}

document.addEventListener("DOMContentLoaded", main);
