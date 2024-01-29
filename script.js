const form = document.querySelector('form');
const userInput = document.querySelector('input');
const submitBtn = document.querySelector('#submit');
const userCard = document.querySelector('#user-card');
const userImg = document.querySelector('#img');
const userName = document.querySelector('#name');
const userId = document.querySelector('#id');
const joinedData = document.querySelector('#joined-date');
const bio = document.querySelector('#bio');
const reposNum = document.querySelector('#repos-number');
const followersNum = document.querySelector('#followers-number');
const followingNum = document.querySelector('#following-number');
const userLocation = document.querySelector('#place');
const userHandle = document.querySelector('#handle');
const userMail = document.querySelector('#mail');
const userRepo = document.querySelector('#repos-link');
let userData;

function fetchUserData(username){
  const xhr = new XMLHttpRequest();
  let url = "https://api.github.com/users/" + username;
  xhr.open('GET', url);
  xhr.onload = function() {
    if(xhr.status === 200){
      userData = JSON.parse(xhr.responseText);
      console.log(userData);
    }
    else{
      console.log(xhr.status);
    }
  }
  xhr.send();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let userHandleInput = userInput.value;
  if(userHandleInput === ''){
    document.getElementById("user-id").placeholder = "Enter user_id first";
  }
  else{
    document.getElementById("user-id").placeholder = "Github user_id";
    fetchUserData(userHandleInput);
    console.log(userData);
  }  
})