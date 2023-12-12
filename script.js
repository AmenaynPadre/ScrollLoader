const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
let limit = 10
let page = 1
let maxPageCount = 0;
// Fetch posts from API 
async function getPosts(allPost){
    const url = allPost ?
    `https://jsonplaceholder.typicode.com/posts`:
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    const res = await fetch(url);
    const data = await res.json();
    if(allPost){
        maxPageCount = Math.ceil(data.length / limit);
        return
    }
    return data;
}
getPosts(true)
// show posts in DOM
async function showPosts() {
    const posts = await getPosts();
    posts.forEach(post => {
      const postEl = document.createElement('div');
      postEl.classList.add('post');
      postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">${post.body}</p>
        </div>
      `;
      postsContainer.appendChild(postEl);
    });
    window.addEventListener("scroll",handleScrollEvent);
  }
  // show loader & fetch more posts
  function showLoading(){
      loading.classList.add("show");
      setTimeout(() =>{
        loading.classList.remove("show");
        setTimeout(() =>{
            page++
            if (page <= maxPageCount){
                showPosts()
            }
        },300)
      },1000)
  }
  // show initial posts
  showPosts();
  function handleScrollEvent(){
      const {scrollTop ,scrollHeight , clientHeight} = document.documentElement;
      if(scrollTop + clientHeight >= scrollHeight-5){
          showLoading();
          window.removeEventListener("scroll",handleScrollEvent)
      }
  };
  window.addEventListener("scroll",handleScrollEvent);














