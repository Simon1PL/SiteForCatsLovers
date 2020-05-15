const userList = document.querySelector(".user-list");
const formAddingUser = document.querySelector(".form");
const formEditingUser = document.querySelector(".editUserForm");
const formAddingCat = document.querySelector(".addCatForm");

const users = [];

function showMainPage() {
    document.querySelector(".mainPage").style.display = "block";
    document.querySelector(".editUserPage").style.display = "none";
    document.querySelector(".addCatPage").style.display = "none";
}

class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.cats = [];
        this.node = document.createElement("li");
        users.push(this);

        this.addNewUserInHtml();
        this.addUserEditingFunctionality()
        this.catAddingFunctionality();
        this.hideCatFunctionality();
    }

    addCat(cat) {
        if(cat instanceof Cat) {
            this.cats.push(cat);
        }
        else console.log("it isn't cat");
    }

    changeName(name) {
        this.name = name;
        this.node.firstElementChild.firstElementChild.innerHTML = name;
    }

    changeAge(age) {
        this.age = age;
        this.node.firstElementChild.children[1].innerHTML = age;
    }

    showEditUserPage() {
        document.querySelector(".mainPage").style.display = "none";
        document.querySelector(".editUserPage").style.display = "block";
        editName.value = this.name;
        editAge.value = this.age;
        editName.focus();
    }

    addUserEditingFunctionality() {
        this.node.firstElementChild.children[2].onclick = () => {
            this.showEditUserPage();
            formEditingUser.onsubmit = () => {
                nameAndSurname.style.borderColor = "#bbb"; //Dlaczego zmienia mi kolor ramki po edycji w tym miejscu
                age.style.borderColor = "#bbb"; //Dlaczego zmienia mi kolor ramki po edycji
                if(chcekElement(editName, /^[\w\s"]{3,40}$/) && chcekElement(editAge,/^[1-9][0-9]$/)) {
                    if(editName.value != this.name)
                        this.changeName(editName.value);
                    if(editAge.value != this.age)
                        this.changeAge(editAge.value);
                    showMainPage();
                }
                return false;
            }
        } 
    }

    addNewUserInHtml() { 
        this.node.classList.add("user");
        const userHTML = `<div class="user-data">
            <div class="user-name">${this.name}</div>
            <div class="user-age">${this.age}</div>
            <i class="fa fa-pencil-square user-edit" aria-hidden="true"></i>
            <i class="hideCats fa fa-eye-slash" aria-hidden="true"></i>  
        </div>
        <div class="cats-list"></div>
        <i class="cat-add fa fa-plus-square" aria-hidden="true"></i>
        <button type="button" class="user-delete btn">Usuń</button>`;
        this.node.innerHTML = userHTML;
        userList.appendChild(this.node);
        this.node.lastChild.onclick = () => {
            this.node.remove();
        }
    }

    showAddCatPage() {
        document.querySelector(".mainPage").style.display = "none";
        document.querySelector(".addCatPage").style.display = "block";
        catName.value = "Pan Kot";
        catPhoto.value = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSApnzhrKBg0JhXPHeUu_w1NmMjXsK4qG9vCI1b8j0CEytoze_H&usqp=CAU";
        catName.focus();
    }

    catAddingFunctionality() {
        this.node.children[2].onclick = () => {
            this.showAddCatPage();
            formAddingCat.onsubmit = () => {
                if(chcekElement(catName, /^[\w\s"]{1,40}$/) && chcekElement(catPhoto,/^[\w\.\/\:_\-;,?%=&"]+$/)) {
                    this.addCat(new Cat(catName.value, catPhoto.value, this));
                    showMainPage();
                }
                return false;
            }
        } 
    }

    hideCatFunctionality() {
        this.node.firstElementChild.children[3].onclick = () => {
            if(this.node.children[1].style.visibility == "hidden")
                this.node.children[1].style.visibility = "visible";
            else
                this.node.children[1].style.visibility = "hidden";
        } 
    }
}

class Cat {
    constructor(name, photo, user) {
        this.photo = photo;
        this.name = name;
        this.user = user;
        this.node = document.createElement("div");
        this.addNewCatInHtml();
    }

    addNewCatInHtml() {
        this.node.classList.add("cat");
        const userHTML = `<div class="cat-name">${this.name}</div>
        <i class="fa fa-times remove-cat" aria-hidden="true"></i>
        <img src=${this.photo} alt="AryaPhoto" class="cat-photo">`;
        this.node.innerHTML = userHTML;
        this.user.node.children[1].appendChild(this.node);
        this.node.children[1].onclick = () => {
            this.node.remove();
        }
    }
}

formAddingUser.onsubmit = () => {
    if(chcekElement(nameAndSurname, /^[\w\s"]{3,40}$/) && chcekElement(age,/^[1-9][0-9]{1}$/)) {
        new User(nameAndSurname.value, age.value);
        formAddingUser.reset();
    }
    return false;
}

function chcekElement(element, regex) {
    if(!element.value.match(regex)) {
        element.style.borderColor = "#7200da";
        return false;
    }
    else {
        element.style.borderColor = "#bbb";
        return true;
    }
}

age.addEventListener("blur", () => { chcekElement(age, /^[1-9][0-9]$/) });
nameAndSurname.addEventListener("blur", () => { chcekElement(nameAndSurname, /^[\w\s"]{3,40}$/) });
editAge.addEventListener("blur", () => { chcekElement(age, /^[1-9][0-9]$/) });
editName.addEventListener("blur", () => { chcekElement(nameAndSurname, /^[\w\s"]{3,40}$/) });

document.querySelector(".minMaxAgeForm").onsubmit = () => {
    for (const user of users) {
        let min = ownerMinAge.value;
        let max = ownerMaxAge.value;
        if(min == "") min = 0;
        if(max == "") max = 500;
        user.node.style.display = "none";
        if(user.age >= min && user.age <= max){
            user.node.style.display = "flex";
        }
    }
    return false;
};

const Alaska = new User("Alaska Young", 21);
const Miles = new User('Miles "Pudge" Halter', 20);
const Takumi = new User("Takumi Hikohito", 22);
new Cat("Arya", "https://www.koty.pl/wp-content/uploads/2018/06/shutterstock_128617400-864x575.jpg", Alaska);
new Cat("Lusia", "https://www.pbzz.pl/wp-content/uploads/2019/09/11.jpg", Alaska);
new Cat("Ruda", "https://www.koty.pl/wp-content/uploads/2018/11/trojkolorowy-kot-spi-e1541427296332.jpg", Alaska);
new Cat("Pan", "https://img.besty.pl/upload/file/2612004.jpg", Miles);
new Cat("Mistrzunio", "https://www.colorland.pl/sites/default/files/article-image/kot1_1.jpg", Miles);
new Cat("Smigol", "https://stressfree.pl/wp-content/uploads/2012/07/czarny_kot_1-6-1.jpg", Takumi);
new Cat("Zgredosław", "https://schronisko.ustronet.pl/files/kety-zaginal-kot-mailik!.jpg", Takumi);

