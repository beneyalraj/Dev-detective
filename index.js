const searchbar = document.querySelector(".searchbar-container");
const profileContainer = document.querySelector(".profile-container");
const root = document.documentElement.style;
const noresults = document.querySelector("#no-results");
const btnmode = document.querySelector("#btn-mode");
const modetext = document.querySelector("#mode-text");
const modeicon = document.querySelector("#mode-icon");
const btnsubmit = document.querySelector("#submit");
const input = document.querySelector("#input");
const avatar = document.querySelector("#avatar");
const userName = document.querySelector("#name");
const user = document.querySelector("#user");
const date = document.querySelector("#date");
const bio = document.querySelector("#bio");
const repos = document.querySelector("#repos");
const followers = document.querySelector("#follwers");
const following = document.querySelector("#following");
const user_location = document.querySelector("#location");
const page = document.querySelector("#page");
const twitter = document.querySelector("#twitter");
const company = document.querySelector("#company");
const err = document.querySelector(".error");
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const get = (param) => document.getElementById(`${param}`);
const url = `https://api.github.com/users/`;
let darkMode = false;

let username = "beneyalraj";

async function getUserData(username) {
  let final = url + username;
  // console.log(final)
  const data = await fetch(final);
  const response = await data.json();
  console.log(response);

  if (response.message === "Not Found") {
    err.classList.add("active");
  } else {
    err.classList.remove("active");
    updateProfile(response);
  }
}

getUserData(username);
// lightModeProperties();
darkModeProperties();

btnsubmit.addEventListener("click", function () {
  err.classList.remove("active");
  if (input.value !== "") {
    getUserData(input.value);
  }
});

input.addEventListener(
  "keydown",
  function (e) {
    if (e.key == "Enter") {
      if (input.value !== "") {
        getUserData(input.value);
      }
    }
  },
  false
);

btnmode.addEventListener("click", function () {
  if (darkMode == false) {
    darkModeProperties();
  } else {
    lightModeProperties();
  }
});


function darkModeProperties(){
  root.setProperty("--lm-bg", "#141D2F");
  root.setProperty("--lm-bg-content", "#1E2A47");
  root.setProperty("--lm-text", "white");
  root.setProperty("--lm-text-alt", "white");
  root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
  modetext.innerText = "LIGHT";
  modeicon.src = "./assets/images/sun-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(1000%)");
  darkMode = true;
  console.log("darkmode changed to " + darkMode);
  localStorage.setItem("dark-mode", true);  console.log("setting dark mode to false");

  console.log("setting dark mode to true");
}

function lightModeProperties(){
  root.setProperty("--lm-bg", "#F6F8FF");
  root.setProperty("--lm-bg-content", "#FEFEFE");
  root.setProperty("--lm-text", "#4B6A9B");
  root.setProperty("--lm-text-alt", "#2B3442");
  root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
  modetext.innerText = "DARK";
  modeicon.src = "./assets/images/moon-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(100%)");
  darkMode = false;
  console.log("darkmode changed to " + darkMode);

  localStorage.setItem("dark-mode", false);
  console.log("setting dark mode to false");
}

function updateProfile(data) {
  avatar.src = `${data.avatar_url}`;
  userName.innerText = data.name === null ? data.login : data.name;
  user.innerText = `@${data.login}`;
  user.href = `${data.html_url}`;
  datesegments = data.created_at.split("T").shift().split("-");
  date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${
    datesegments[0]
  }`;
  bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;
  repos.innerText = `${data.public_repos}`;
  followers.innerText = `${data.followers}`;
  following.innerText = `${data.following}`;
  user_location.innerText = check_isNull(data.location, user_location)
    ? data.location
    : "Not Available";
  page.innerText = check_isNull(data.blog, page) ? data.blog : "Not Available";
  page.href = check_isNull(data.blog, page) ? data.blog : "#";
  twitter.innerText = check_isNull(data.twitter_username, twitter)
    ? data.twitter_username
    : "Not Available";
  twitter.href = check_isNull(data.twitter_username, twitter)
    ? `https://twitter.com/${data.twitter_username}`
    : "#";
  company.innerText = check_isNull(data.company, company)
    ? data.company
    : "Not Available";
  searchbar.classList.toggle("active");
  profileContainer.classList.toggle("active");
}

function check_isNull(param1, param2) {
  if (param1 === "" || param1 === null) {
    param2.style.opacity = 0.5;
    param2.previousElementSibling.style.opacity = 0.5;
    return false;
  } else {
    return true;
  }
}
