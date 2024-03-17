const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
let uppass = [];
let inpass = [];
let iteration=1;
let selectedImagesUp = []; // Store selected images during signup
let selectedImagesIn = [];
signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});


signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

// Element image recognition
function signup() {
    sessionStorage.setItem("upname", document.getElementById('upmail').value);
    sessionStorage.setItem("uppass", JSON.stringify(selectedImagesUp)); // Store selected images in session
    var myText = "Account Created Successfully";
    alert(myText);
}

// Image pattern authentication
var v2 = new Boolean(false);
function signin() {
    let str = document.getElementById('inmail').value;
    let array = JSON.parse(sessionStorage.getItem("uppass")); // Retrieve stored array during signin
    let check1 = JSON.stringify(selectedImagesIn) === JSON.stringify(array); // Compare arrays
    console.log(JSON.stringify(selectedImagesIn));
    console.log(JSON.stringify(array));
    if (check1) {
        var myText = "Login is successful";
        alert(myText);
        NewTab();
    }
    else {
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
function createImageGrid(grid, folder,upOrin) {
    console.log("Current Folder:", folder); // Add this line to log the current folder
    grid.innerHTML = '';
    const shuffledImageOrder = shuffleArray(Array.from({ length: 25 }, (_, i) => i + 1));
    for (let i = 0; i < 25; i++) {
        const img = document.createElement('img');
        img.src = `images/${folder}/image/${shuffledImageOrder[i]}.jpg`;
        img.alt = `Image ${shuffledImageOrder[i]}`;
        img.classList.add('grid-item');
        img.addEventListener('click', () => handleImageSelection(img, grid.id, folder,upOrin));
        grid.appendChild(img);
    }
}

const maxPasswordLength = 5;

function handleImageSelection(img, gridId, folder,upOrin) {
    const grid = document.getElementById(gridId);
    const maxPasswordLength = 5;
    if(upOrin=="Up"){
        selectedImagesUp.push(img.alt);
        if (iteration < maxPasswordLength) {
            iteration++;
            createImageGrid(grid, `folder${iteration}`,upOrin);
        } else {
            console.log("images clicked", selectedImagesUp);
            alert("done");
            iteration=1;
            
        }
    }
    else{
        selectedImagesIn.push(img.alt);
        if (iteration < maxPasswordLength) {
            iteration++;
            createImageGrid(grid, `folder${iteration}`,upOrin);
        } else {
            console.log("images clicked", selectedImagesIn);
            alert("done");
            iteration=1;
            
        }
    }
}

// Function to get the next folder name
function getNextFolder(currentFolder) {
    const folders = [];
    for (let i = 1; i <= maxPasswordLength; i++) {
        folders.push(`folder${i}`);
    }
    const currentIndex = folders.indexOf(currentFolder);
    const nextIndex = (currentIndex + 1) % folders.length;
    return folders[nextIndex];
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
createImageGrid(upGrid, 'folder1',"Up");
createImageGrid(inGrid, 'folder1',"In");
