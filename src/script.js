import "./style.css";
import { Octokit } from "@octokit/core";
// require('dotenv-webpack').config();

console.log("Hello there");




let check = document.getElementById("button_wrap");
check.addEventListener("click", () => {
  darkMode();
}
);


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
getGithubUser();


async function getGithubUser() {
  const octokit = new Octokit({
    auth: import.meta.env.API_KEY
  });

  await octokit.request('GET /users/{username}', {
    username: 'octocat',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  }).then(res => {

    if (res.status == 200) {
      displayUserData(res.data)
    }

  }).catch(err => {
    displayNotFound();
    console.log(err);
    //Style user not found in the search box
  })
}

function displayNotFound() {
  console.log('not found')
}
// async function getGithubUser() {
//   const octokit = new Octokit({
//     auth: `${process.env.API_KEY}`
//   });

//   await octokit.request('GET /users/{username}', {
//     username: 'octocat',
//     headers: {
//       'X-GitHub-Api-Version': '2022-11-28'
//     }
//   }).then(res => {
//     console.log(res.data);
//     if (res.status == 200) {
//       displayUserData(res.data);
//     }

//   }).catch(err => {
//     console.log(err);
//     //Style user not found in the search box
//   })
// }

async function displayUserData(user) {
  console.log(user)
  console.log(await user.blog);
  // displaying data

  // let bio = document.createElement('p')
  // bio.textContent = user.bio;
  // document.body.appendChild(bio)

}


