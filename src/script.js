import "./style.css";
import { Octokit } from "@octokit/core";

//CHANGE THEME DARK TO LIGHT
let check = document.getElementById("button_wrap");
check.addEventListener("click", () => {
  darkMode();
}
);

//INITIATE THE PAGE WITH OCTOCAT PROFILE
getGithubUser('octocat');

//ADD SEARCH FORM FUNCTIONALITY
document.querySelector('#search').addEventListener('focus', () => {
  let error = document.getElementById('error');
  error.style.display = 'none';
});
document.querySelector('#search').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault()
    let input = document.getElementById("search").value
    if (input != null || input != "") {
      getGithubUser(input.toString());
    }
  }

});
document.getElementById("search_btn").addEventListener('click', () => {
  let input = document.getElementById("search").value
  if (input != null || input != "") {
    getGithubUser(input.toString());
  }

})








function darkMode() {
  let light = document.getElementById("light");
  let dark = document.getElementById("dark")
  let element = document.body;
  element.classList.toggle("dark_mode");
  if (element.className == "dark_mode") {
    //if in dark mode show light button and hide dark button
    light.style.display = "flex";
    dark.style.display = "none";
  } else {
    //if in light mode show dark btn and hide light button
    light.style.display = "none";
    dark.style.display = "flex";
  }

}


async function getGithubUser(username) {
  const octokit = new Octokit({
    auth: import.meta.env.API_KEY
  });

  await octokit.request('GET /users/{username}', {
    username: username,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  }).then(res => {

    if (res.status == 200) {
      displayUserData(res.data)
    }

  }).catch(err => {
    displayNotFound();
  })
}

function displayNotFound() {
  let error = document.getElementById('error');
  error.style.display = 'inline';
}

async function displayUserData(user) {
  let userSection = document.getElementById("user_section");
  // set avatar img
  let img = userSection.querySelector('#user_header img');
  img.src = user.avatar_url;
  // set name
  let name = userSection.querySelector('#user_header h2');
  let username = userSection.querySelector('#user_header h3');

  if (user.name == null) {
    name.textContent = user.login;
  } else {
    name.textContent = user.name;
  }
  username.textContent = `@${user.login}`;

  let joined = userSection.querySelector('#user_header p');
  let date = new Date(user.created_at);
  // Options for formatting the date
  // Manually format the date
  let day = date.getDate().toString().padStart(2, '0'); // Ensure two-digit day
  let month = date.toLocaleString('en-US', { month: 'short' }); // Short month name
  let year = date.getFullYear();
  joined.textContent = `Joined ${day} ${month} ${year}`;

  // set bio
  let bio = userSection.querySelector("#bio");
  if (user.bio == null) {
    bio.textContent = "This profile has no bio";
  } else {
    bio.textContent = user.bio;
  }

  // set stats section

  let repos = userSection.querySelector("#repos>p");
  let followers = userSection.querySelector("#followers>p");
  let following = userSection.querySelector("#following>p");
  repos.textContent = user.public_repos;
  followers.textContent = user.followers;
  following.textContent = user.following;

  //contact section
  let location = userSection.querySelector('#location>.p');

  if (user.location == null || user.location == "") {
    location.textContent = 'Not Available';
    location.parentElement.style.opacity = '0.5';
  } else {
    location.textContent = user.location;
    location.parentElement.style.opacity = '1';
  }

  // blog

  let blog = userSection.querySelector('#blog>.p');

  if (user.blog == null || user.blog == "") {
    blog.textContent = 'Not Available';
    blog.parentElement.style.opacity = '0.5';
    blog.href = '#';
    blog.classList.add('disabled');
  } else {
    blog.textContent = user.blog;
    blog.href = user.blog;
    blog.classList.remove('disabled');
    blog.parentElement.style.opacity = '1';
  }

  //twitter
  let twitter = userSection.querySelector('#twitter>.p');

  if (user.twitter_username == null || user.twitter_username == "") {
    twitter.textContent = 'Not Available';
    twitter.parentElement.style.opacity = '0.5';
    twitter.href = '#';
    twitter.classList.add('disabled');
  } else {
    twitter.textContent = user.twitter_username;
    twitter.href = `https://x.com/${user.twitter_username}`;
    twitter.classList.remove('disabled');
    twitter.parentElement.style.opacity = '1';
  }

  //company
  let company = userSection.querySelector('#company>.p');

  if (user.company == null || user.company == "") {
    company.textContent = 'Not Available';
    company.parentElement.style.opacity = '0.5';
    company.href = '#';
    company.classList.add('disabled');
  } else {
    company.textContent = user.company;
    company.href = `https://github.com/${user.company.slice(1)}`;
    company.classList.remove('disabled');
    company.parentElement.style.opacity = '1';
  }




  console.log(user)
  console.log(await user.blog);
  // displaying data

  // let bio = document.createElement('p')
  // bio.textContent = user.bio;
  // document.body.appendChild(bio)

}


