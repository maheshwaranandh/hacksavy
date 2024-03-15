const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
let uppass = [];
let inpass = [];

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});


signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});
// adding and removing border
function upimg(element) {
    var Image = element.querySelector('img');
    if (Image) {
        if (Image.classList.contains('clicked')) {
            Image.classList.remove('clicked');
            uppass.splice(uppass.indexOf(element.id), 1);
            // console.log(element.id);
            // console.log(uppass);
        }
        else {
            Image.classList.add('clicked');
            uppass.push(element.id);
            // console.log(element.id);
            // console.log(uppass);
        }
    }
}

function inimg(element) {
    var Image = element.querySelector('img');
    if (Image) {
        if (Image.classList.contains('clicked')) {
            Image.classList.remove('clicked');
            inpass.splice(inpass.indexOf(element.id), 1);
            // console.log(element.id);
            // console.log(inpass);
        }
        else {
            Image.classList.add('clicked');
            inpass.push(element.id);
            // console.log(element.id);
            // console.log(inpass);
        }
    }
}
// element image recognition
function signup() {
    sessionStorage.setItem("upname", document.getElementById('upmail').value);
    sessionStorage.setItem("uppass", uppass);
    var myText = "Account Created Succesfully";
    alert(myText);
}
// image pattern authentication
var v2 = new Boolean(false);
function signin() {
    let str = document.getElementById('inmail').value;
    let array = sessionStorage.getItem("uppass");
    let check1 = array.localeCompare(inpass.toString());
    if ((!str.localeCompare(sessionStorage.getItem("upname"))) && !check1) {
        var myText = "Login is successful";
        alert(myText);
        NewTab();
        
    }
    else{
        var myText = "Login Failed";
        alert(myText);
   
        sendMail3();
       

    }
}
 function sendMail3(){
    emailjs.send('service_7q1sn6s', 'template_v7f98gs')
    .then(function(res){
        // console.log("Success", res.status);
        alert("mail sent successfully");
    })
}
function sendMail2(){
    emailjs.send('service_7q1sn6s', 'template_ogw30ms')
    .then(function(res){
        // console.log("Success", res.status);
        alert("mail sent successfully");
    })
}

function NewTab() {
    window.open(
      "https://stjosephs.ac.in/index.html", "_blank");
}
 // Your JavaScript code goes here
 const upGrid = document.getElementById('upGrid');
 const inGrid = document.getElementById('inGrid');

 // Function to create image grid
 function createImageGrid(grid, folder) {
     grid.innerHTML = '';
     const shuffledImageOrder = shuffleArray(Array.from({ length: 25 }, (_, i) => i + 1));
     for (let i = 0; i < 25; i++) {
         const img = document.createElement('img');
         img.src = `images/${folder}/image/${shuffledImageOrder[i]}.jpg`;
         img.alt = `Image ${shuffledImageOrder[i]}`;
         img.classList.add('grid-item');
         img.addEventListener('click', () => handleImageSelection(img, grid.id));
         grid.appendChild(img);
     }
 }

 // Function to handle image selection
 function handleImageSelection(img, gridId) {
     const grid = document.getElementById(gridId);
     const selectedImages = grid.querySelectorAll('.selected');
     if (selectedImages.length < maxPasswordLength) {
         img.classList.toggle('selected');
     }
 }

 // Function to shuffle array
 function shuffleArray(array) {
     for (let i = array.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [array[i], array[j]] = [array[j], array[i]];
     }
     return array;
 }

 // Initialize grids with images from folder1
 createImageGrid(upGrid, 'folder1');
 createImageGrid(inGrid, 'folder1');