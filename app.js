const client_id = "54cef386125fa5871c57";
const client_secret = "88ca112a7ba009d86a41d784b0fce8555a7c7c7b";

document.getElementById("search").addEventListener("keyup",displayData);

async function displayData(e) {
 // console.log(e.target.value);
  if (e.target.value != "")
   {
      const profile = await fetch(
      `https://api.github.com/users/${e.target.value}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

     const repo = await fetch(
      `https://api.github.com/users/${e.target.value}/repos?per_page=${5}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

      const data = await profile.json();
      const repos = await repo.json();

    // console.log(repos);

    document.getElementById("img").innerHTML = `
                 <img src="${data.avatar_url}" width="250px"  />
                <a href="${data.html_url}" class="btn btn-primary btn-block mt-5 mb-4">More Detail</a>`;

    document.getElementById("btns").innerHTML = `
        <span class="badge badge-primary">Public Repository: ${data.public_repos}</span>
        <span class="badge badge-secondary">Public Gists: ${data.public_gists}</span>
        <span class="badge badge-success">Followers: ${data.followers}</span>
        <span class="badge badge-info">Following: ${data.following}</span>
        `;
    
    document.getElementById("detail").innerHTML = `
    <ul class="list-group mt-4">
    <li class="list-group-item">Name : ${data.name}</li>
    <li class="list-group-item">Company : ${data.company}</li>
    <li class="list-group-item">Blog: ${data.blog}</li>
    <li class="list-group-item">Location : ${data.location}</li>
    <li class="list-group-item">Member Since : ${data.created_at}</li>
    </ul> `;

    //console.log(repos);

    let output = `<h2>Latest Repos</h2>`;

    repos.forEach(function(repo) {
      output += `
      <ul class="list-group mt-3">
      <li class="list-group-item">
      <a href="${repo.html_url}" target="_blank">${repo.name}</a>
          <button class="btn btn-primary btn-sm ml-3 float-right">Stars: ${repo.stargazers_count}</button>
          <button class="btn btn-secondary btn-sm ml-2 float-right">Watchers: ${repo.watchers_count}</button >
          <button class="btn btn-success btn-sm ml-2 float-right">Forks: ${repo.forms_count}</button>
      </li>
     </ul>
         
        `;
    });

    // Output repos
    document.getElementById("rep").innerHTML = `${output}</ul>`;
  } else {
    document.getElementById("img").innerHTML = "";
    document.getElementById("btns").innerHTML = "";
    document.getElementById("detail").innerHTML = "";
    document.getElementById("rep").innerHTML = "";
  }
}