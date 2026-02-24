


const hugo = {
    name: "Hugo, Destroyer of Worlds",
    class: "Cosmic Catastrophe",
    level: 1,
    health: 100,
    image: "images/cat.jpg",
    colors: {
        primary: '#be6a43',
        secondary: '#f7c780',
        dark: '#97593c'
    },
    attacked: function() {
        if (this.health > 0) {this.health -= 20;}
        renderCharacterInfo();
        if (this.health <= 0) {defeat();}
    },
    levelUp: function() {
        this.level++;
        renderCharacterInfo();
    }
}

const reginaldTheToad = {
    name: "Reginald, Toad of Eternal Damp",
    class: "Bog Sovereign",
    level: 1,
    health: 100,
    image: "images/toad.jpg",
    colors: {
        primary: '#2f6f2f',
        secondary: '#a3d49a',
        dark: '#1f4f1f'
    },
    attacked: function() {
        if (this.health > 0) { this.health -= 20; }
        renderCharacterInfo();
        if (this.health <= 0) { defeat(); }
    },
    levelUp: function() {
        this.level++;
        renderCharacterInfo();
    }
}

const professorBananas = {
    name: "Professor Bananas, Architect of Mayhem",
    class: "Primate Mastermind",
    level: 1,
    health: 100,
    image: "images/monkey.jpg",
    colors: {
        primary: '#f4c542',
        secondary: '#815611',
        dark: '#c08f2d'
    },
    attacked: function() {
        if (this.health > 0) { this.health -= 20; }
        renderCharacterInfo();
        if (this.health <= 0) { defeat(); }
    },
    levelUp: function() {
        this.level++;
        renderCharacterInfo();
    }
}

//select character
let selectedCharacter = hugo;

//render once at the beginning
renderCharacterInfo();




//listen
document.querySelector("#attacked").addEventListener("click", function() {
    selectedCharacter.attacked();
});

document.querySelector("#levelUp").addEventListener("click", function() {
    selectedCharacter.levelUp();
});


const characters = [hugo, reginaldTheToad, professorBananas];
let currentIndex = 1;
document.querySelector("#addParticipant").addEventListener("click", function() {
    selectedCharacter = characters[currentIndex];
    currentIndex = (currentIndex + 1) % characters.length;
    renderCharacterInfo();
});

//create the renderer
function renderCharacterInfo() {
    document.querySelector("#characterName").textContent = selectedCharacter.name;
    document.querySelector("#characterClass").textContent = selectedCharacter.class;
    document.querySelector("#characterLevel").textContent = selectedCharacter.level;
    document.querySelector("#characterHealth").textContent = selectedCharacter.health;
    document.querySelector("#characterImage").setAttribute("src", selectedCharacter.image);
    document.querySelector("#characterImage").setAttribute("alt", selectedCharacter.name);

    // apply character color schemes
    if (selectedCharacter.colors) {
        const root = document.documentElement;
        root.style.setProperty('--primary', selectedCharacter.colors.primary);
        root.style.setProperty('--secondary', selectedCharacter.colors.secondary);
        root.style.setProperty('--primary-dark', selectedCharacter.colors.dark);
    }
}

function defeat() {
    alert(`${selectedCharacter.name} has been defeated!`);
};