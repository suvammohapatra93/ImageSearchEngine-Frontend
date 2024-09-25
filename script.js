const accessKey = "kFlScu6HUkNcoeK1XMWa_tK-rKfnQcwHH0lH7iwulR8";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");
const loadingIndicator = document.getElementById("loading");
const themeToggleBtn = document.getElementById("theme-toggle");

let keyword = "";
let page = 1;

async function searchImages() {
  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  // Show loading indicator
  loadingIndicator.classList.remove("hidden");

  const response = await fetch(url);
  const data = await response.json();

  // Hide loading indicator
  loadingIndicator.classList.add("hidden");

  if (page === 1) {
    searchResult.innerHTML = "";
  }

  const results = data.results;

  results.forEach((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.appendChild(image);

    searchResult.appendChild(imageLink);
  });

  showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  if (document.body.classList.contains("light-mode")) {
    themeToggleBtn.textContent = "🌑 Toggle Dark Mode";
  } else {
    themeToggleBtn.textContent = "🌙 Toggle Light Mode";
  }
});

// Initial call to ensure theme is correctly applied
if (document.body.classList.contains("light-mode")) {
  themeToggleBtn.textContent = "🌑 Toggle Dark Mode";
} else {
  themeToggleBtn.textContent = "🌙 Toggle Light Mode";
}
