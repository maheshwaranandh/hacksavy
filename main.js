// Get DOM elements
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const upGrid = document.getElementById('upGrid');
const inGrid = document.getElementById('inGrid');

// Initialize variables
let uppass = [];
let inpass = [];
let iteration = 1;
let selectedImagesUp = []; // Store selected images during signup
let selectedImagesIn = [];

// Event listeners for sign up and sign in buttons
signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

// Function to handle sign up process
function signup() {
    // Store email and selected images in session during sign up
    sessionStorage.setItem("upname", document.getElementById('upmail').value);
    sessionStorage.setItem("uppass", JSON.stringify(selectedImagesUp));
    alert("Account Created Successfully");
}

// Function to handle sign in process
function signin() {
    let str = document.getElementById('inmail').value;
    let array = JSON.parse(sessionStorage.getItem("uppass"));
    let check1 = JSON.stringify(selectedImagesIn) === JSON.stringify(array);
    if (check1) {
        alert("Login is successful");
        NewTab();
    } else {
        alert("Login Failed");
        sendMail3();
    }
}

// Function to send mail
function sendMail3() {
    emailjs.send('service_7q1sn6s', 'template_v7f98gs')
        .then(function (res) {
            alert("Mail sent successfully");
        });
}

// Function to open a new tab
function NewTab() {
    window.open("https://stjosephs.ac.in/index.html", "_blank");
}

// Function to create image grid
function createImageGrid(grid, folder, upOrin) {
    console.log("Current Folder:", folder);
    grid.innerHTML = '';
    const shuffledImageOrder = shuffleArray(Array.from({ length: 25 }, (_, i) => i + 1));
    for (let i = 0; i < 25; i++) {
        const img = document.createElement('img');
        img.src = `images/${folder}/image/${shuffledImageOrder[i]}.jpg`;
        img.alt = `Image ${shuffledImageOrder[i]}`;
        img.classList.add('grid-item');
        img.addEventListener('click', () => handleImageSelection(img, grid.id, folder, upOrin));
        grid.appendChild(img);
    }
}

// Function to handle image selection
function handleImageSelection(img, gridId, folder, upOrin) {
    const grid = document.getElementById(gridId);
    const maxPasswordLength = 5;
    let selectedImages = upOrin === "Up" ? selectedImagesUp : selectedImagesIn;
    selectedImages.push(img.alt);
    if (iteration < maxPasswordLength) {
        iteration++;
        createImageGrid(grid, `folder${iteration}`, upOrin);
    } else {
        console.log("Images clicked", selectedImages);
        alert("Done");
        iteration = 1;
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
createImageGrid(upGrid, 'folder1', "Up");
createImageGrid(inGrid, 'folder1', "In");
