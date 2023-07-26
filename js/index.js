// document.body.addEventListener("mousemove", function(e){
//   document.querySelector("img").style.left = e.clientX 
//   document.querySelector("img").style.top = e.clientY 
// }
// )

// var posts = []
// var httpReq = new XMLHttpRequest()
// httpReq.open("GET", "https://jsonplaceholder.typicode.com/posts")
// httpReq.send()
// httpReq.addEventListener("readystatechange", function (){

// if (httpReq.readyState == 4 && httpReq.status == 200) {
//   console.log(JSON.parse(httpReq.response));
//   displayPosts(JSON.parse(httpReq.response))
// }

// })
// function displayPosts(postsArr) {
//   var contant = ""
//   for (var i = 0; i < postsArr.length; i++) {
//     contant += `
  
//     <div class="col-12 gy-2">
//     <div class="post shadow p-2 rounded-2">
//       <h3 class="text-center">${postsArr[i].title}</h3>
//       <p>${postsArr[i].body}</p>
//     </div>
//   </div>
//     `
//   }
//   document.querySelector(".row").innerHTML = contant
 
// }







var signupName = document.getElementById('signupName')
var signupEmail = document.getElementById('signupEmail')
var signupPassword = document.getElementById('signupPassword')
var signinEmail = document.getElementById('signinEmail')
var signinPassword = document.getElementById('signinPassword')
var pathparts = location.pathname.split('/');
var baseURL = ''
var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
var passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
for (var i = 0; i < pathparts.length - 1; i++) {
    baseURL += '/' + pathparts[i]
}
console.log(baseURL);

var username = localStorage.getItem('sessionUsername')
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username
}

var signUpArray = []
if (localStorage.getItem('users') == null) {
    signUpArray = []
} else {
    signUpArray = JSON.parse(localStorage.getItem('users'))
}




function isEmpty() {

    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return false
    } else {
        return true
    }
}





function isEmailExist() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false
        }
    }
}





function signUp() {
    if (isEmpty() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    var signUp = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    }
    if (signUpArray.length == 0) {
        signUpArray.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpArray))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
        return true
    }
    if (isEmailExist() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">email already exists</span>'

    } else {
        signUpArray.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpArray))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'

    }


}




function isLoginEmpty() {

    if (signinPassword.value == "" || signinEmail.value == "") {
        return false
    } else {
        return true
    }
}

function login() {
    if (isLoginEmpty() == false) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    var password = signinPassword.value
    var email = signinEmail.value
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == email.toLowerCase() && signUpArray[i].password.toLowerCase() == password.toLowerCase()) {
            localStorage.setItem('sessionUsername', signUpArray[i].name)
            if (baseURL == '/') {
                location.replace('https://' + location.hostname + '/home.html')

            } else {
                location.replace(baseURL + '/home.html')

            }
        } else {
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
        }
    }

}




function logout() {
    localStorage.removeItem('sessionUsername')
}


signupName.addEventListener("input", function () {
  validate(signupName, nameRegex);
});

signupEmail.addEventListener("input", function () {
  validate(signupEmail, urlRegex);
});
signupPassword.addEventListener("input", function () {
  validate(signupPassword, passRegex);
});

function validate(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    console.log(regex)
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    console.log(regex)
  }
}
