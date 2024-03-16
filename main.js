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
    console.log("Current Folder:", folder); // Add this line to log the current folder
    grid.innerHTML = '';
    const shuffledImageOrder = shuffleArray(Array.from({ length: 25 }, (_, i) => i + 1));
    for (let i = 0; i < 25; i++) {
        const img = document.createElement('img');
        img.src = `images/${folder}/image/${shuffledImageOrder[i]}.jpg`;
        img.alt = `Image ${shuffledImageOrder[i]}`;
        img.classList.add('grid-item');
        img.addEventListener('click', () => handleImageSelection(img, grid.id, folder));
        grid.appendChild(img);
    }
}

 const maxPasswordLength = 4;


 function handleImageSelection(img, gridId, folder) {
    const grid = document.getElementById(gridId);
    const maxPasswordLength = 4; 
    const selectedImages = Array.from(grid.querySelectorAll('.selected'));

    // Toggle the 'selected' class on the clicked image
    img.classList.toggle('selected');

    // Update the selectedImages array after toggling the class
    const updatedSelectedImages = Array.from(grid.querySelectorAll('.selected'));
    console.log("Selected Images:", updatedSelectedImages);

    // Store the clicked image in session
    const imageName = img.alt;
    const sessionKey = `image${updatedSelectedImages.length}`;
    sessionStorage.setItem(sessionKey, imageName);

    // If max password length is reached, console log the created password array and return
    if (updatedSelectedImages.length === maxPasswordLength) {
        const password = updatedSelectedImages.map(img => img.alt);
        console.log("Password Array:", password);
        sessionStorage.setItem("password", JSON.stringify(password)); // Store password array in session storage
        console.log("Password stored in session storage:", sessionStorage.getItem("password"));
        return;
    }

    // Check if the next folder should be loaded
    if (updatedSelectedImages.length < maxPasswordLength) {
        setTimeout(() => {
            console.log("Change Folder");
            const nextFolder = getNextFolder(folder);
            createImageGrid(grid, nextFolder);
        }, 250); // Adjust the delay as needed
    }

    // If the selectedImages length exceeds maxPasswordLength, remove the selected class to prevent further selection
    if (updatedSelectedImages.length > maxPasswordLength) {
        img.classList.remove('selected');
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
 createImageGrid(upGrid, 'folder1');
 createImageGrid(inGrid, 'folder1');