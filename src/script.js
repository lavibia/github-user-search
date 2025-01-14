import "./style.css";
import { Octokit } from "@octokit/core";



console.log("Hello there");




let check = document.getElementById("button_wrap");
check.addEventListener("click", () => {
  darkMode();
}
);


function darkMode() {
  let element = document.body;
  element.classList.toggle("dark-mode");
}

getGithubUser()
async function getGithubUser() {
  const octokit = new Octokit({
    auth: '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'
  });

  await octokit.request('GET /users/{username}', {
    username: 'octocat',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  }).then(res => {
    console.log(res.data);
    if (res.status == 200) {
      displayUserData(res.data);
    }

  }).catch(err => {
    console.log(err);
    //Style user not found in the search box
  })
}

function displayUserData(user) {
  // displaying data

  // let bio = document.createElement('p')
  // bio.textContent = user.bio;
  // document.body.appendChild(bio)

}


