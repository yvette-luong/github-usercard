import axios from 'axios';

/*

  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
const parentContainerCards = document.querySelector('.cards') //container card - step4

const myUserName = 'yvette-luong'
axios.get(`https://api.github.com/users/${myUserName}`)
.then(res => {
  parentContainerCards.appendChild(componentMaker(res))
  console.log(res)
})
.catch(err => {
  console.log(err)
})

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/


const followersArray = ['tetondan','dustinmyers','justsml','luishrd','bigknell'];
followersArray.forEach(follower => {
  axios
  .get(`http://api.github.com/users/${follower}`)
  .then(res =>{
    parentContainerCards.appendChild(componentMaker(res))
  })
  .catch(err=>{
    console.log(err)
  })
})

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
const componentMaker = (object) => {

  //Element creator
  const outerWrapper  = document.createElement('div');
  const innerWrapper  = document.createElement('div');
  const profilePic    = document.createElement('img');
  const subtitle      = document.createElement('h3');
  const paraUsername  = document.createElement('p');
  const paraLocation  = document.createElement('p');
  const paraProfile   = document.createElement('p');
  const paraFollowers = document.createElement('p');
  const paraFollowing = document.createElement('p');
  const paraBio       = document.createElement('p');
  const githubLink    = document.createElement('a');

  //ClassList att setup
  outerWrapper.classList.add('card');
  profilePic.setAttribute('src',object.data['avatar_url']);
  innerWrapper.classList.add('card-info');
  subtitle.classList.add('name')
  paraUsername.classList.add('username');
  githubLink.setAttribute('href',object.data['html_url'])

  //Text
  subtitle.textContent      = object.data.name;
  paraUsername.textContent  = object.data.login
  paraLocation.textContent  = `Location: ${object.data.location}`;
  paraProfile.textContent   = "Profile: "
  githubLink.textContent    = 'Link to Github'
  paraFollowers.textContent = `Followers : ${object.data.followers}`;
  paraFollowing.textContent = `Following: ${object.data.following}`;
  paraBio.textContent       = `Bio: ${object.data.bio}`;

  //creating structure
  outerWrapper.appendChild(profilePic);
  outerWrapper.appendChild(innerWrapper);
  innerWrapper.appendChild(subtitle);
  innerWrapper.appendChild(paraUsername);
  innerWrapper.appendChild(paraLocation);
  innerWrapper.appendChild(paraProfile);
  innerWrapper.appendChild(paraFollowers);
  innerWrapper.appendChild(paraFollowing);
  innerWrapper.appendChild(paraBio);
  paraProfile.appendChild(githubLink);

  return outerWrapper;
}

