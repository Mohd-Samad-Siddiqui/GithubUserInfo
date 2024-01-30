const form = document.querySelector('form');
const userInput = document.querySelector('input');
const submitBtn = document.querySelector('#submit');
const userCard = document.querySelector('#user-card');
const userImg = document.querySelector('#userImg');
const userName = document.querySelector('#name');
const userId = document.querySelector('#id');
const joinedData = document.querySelector('#joined-date');
const bio = document.querySelector('#bio');
const reposNum = document.querySelector('#repos-number');
const followersNum = document.querySelector('#followers-number');
const followingNum = document.querySelector('#following-number');
const userLocation = document.querySelector('#place');
const userTwitterHandle = document.querySelector('#handle');
const userMail = document.querySelector('#mail');
const userRepo = document.querySelector('#repos-link');
let userHandleInput, userData;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  userHandleInput = userInput.value;
  if (userHandleInput === '') {
    document.getElementById("user-id").placeholder = "Enter user_id first";
  }
  else {
    document.getElementById("user-id").placeholder = "Github user_id";
    fetchUserData(userHandleInput);
    userInput.value = '';
  }
})

function fetchUserData(username) {
  const xhr = new XMLHttpRequest();
  let url = "https://api.github.com/users/" + username;
  xhr.open('GET', url);
  xhr.onload = function() {
    if (xhr.status === 200) {
      userData = JSON.parse(xhr.responseText);
      console.log(userData);
      displayCard();
    }
    else {
      console.log("here")
      console.log(xhr.status);
      document.getElementById('user-id').placeholder = "Invalid_user_id";
      userInput.classList.add('error');
      setTimeout(() => {
        document.getElementById('user-id').placeholder = "Github_user_id";
        userInput.classList.remove('error');
      }, 10000)
      console.log("here2")
    }
  }
  xhr.send();
}

const dateConvertor = (createdDate) => {
  const originalDate = new Date(createdDate);
  const dateString = originalDate.toDateString();
  const [day, month, date, year] = dateString.split(" ");
  return `${date} ${month} ${year}`;
}

function displayCard() {
  userImg.src = userData.avatar_url;
  userName.innerHTML = userData.name;
  userId.innerHTML = userData.login;
  userId.href = userData.html_url;
  const date = dateConvertor(userData.created_at);
  joinedData.innerHTML = "Joined " + date;
  bio.innerHTML = userData.bio !== null ? userData.bio : "";
  reposNum.innerHTML = userData.public_repos;
  followersNum.innerHTML = userData.followers;
  followingNum.innerHTML = userData.following;

  if (userData.location) {
    userLocation.innerHTML = userData.location;
  } else {
    userLocation.innerHTML = "Not Available";
    userLocation.parentElement.style.opacity = 0.3;
  }

  if (userData.twitter_username) {
    userTwitterHandle.innerHTML = userData.twitter_username;
  } else {
    userTwitterHandle.innerHTML = "Not Available";
    userTwitterHandle.parentElement.style.opacity = 0.3;
  }

  if (userData.mail) {
    userMail.innerHTML = userData.mail;
  } else {
    userMail.innerHTML = "Not Available";
    userMail.parentElement.style.opacity = 0.3;
  }

  userRepo.href = userData.html_url + "?tab=repositories";
  userCard.style.display = 'block';
}
