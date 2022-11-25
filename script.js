const inputTitle = document.querySelector(".input_title");
const btnCreate = document.querySelector('.btn_create');
const checkAll = document.querySelector(".check_all");
const checkComplete = document.querySelector(".check_complete");
const checkUnComplete = document.querySelector(".check_uncomplete");
const checkDate = document.querySelector(".check_date");
const listOfItems = document.querySelector('ul');

const arr = [];

class toDoItem {
    time = "";

    constructor(title, id) {
        this.status = "active";
        this.title = title;
        this.id = id;
    }
}

function creatToDoItem() {
    const [inputValue, id] = [inputTitle.value, arr.length];
    const newItemObject = new toDoItem(inputValue, id);
    createLi(newItemObject)
    arr.push(newItemObject);
}

function createLi(itemObject) {
    const newItem = document.createElement("LI");
    newItem.classList.add("item");
    newItem.setAttribute("id", `${itemObject.id}`);
    newItem.innerHTML =
        `
            <div class="item_content">
                <span class="title">${itemObject.title}</span>
                <span class="time">${itemObject.time.toLocaleString()}</span>
            </div>
            <div class="item_wrap_btns">
                <button class="btn btn_complete">Добавить</button>
                <button class="btn btn_delete">Удалить</button>
            </div>
        `;
    listOfItems.append(newItem);
}

function checkStatus(status) {
    listOfItems.innerHTML = "";
    for (const item of arr) {
        if (item.status == status) {
            createLi(item)
        }
    }
}

btnCreate.addEventListener('click', creatToDoItem);
listOfItems.addEventListener('click', (e) => {
    let target = e.target;
    if (target.classList.contains("btn_complete")) {
        let targetLi = target.closest("li");
        targetLi.classList.add("hidden")
        for (const item of arr) {
            if (Number(targetLi.getAttribute("id")) === item.id && item.status !== "complete") {
                const newDate = new Date()
                item.status = "complete";
                item.time = Date.parse(newDate);
                targetLi.querySelector(".time").innerText = item.time.toLocaleString();
            } else if (Number(targetLi.getAttribute("id")) === item.id && item.status === "complete") {
            } else if (Number(targetLi.getAttribute("id")) === item.id && item.status === "complete") {
                item.status = "active";
                item.time = "";
                targetLi.querySelector(".time").innerText = item.time;
            }
        }
    }
})

checkComplete.addEventListener("click", () => {
    checkStatus("complete");

});

checkUnComplete.addEventListener("click", () => {
    checkStatus("active")
})

checkAll.addEventListener('click', () => {
    listOfItems.innerHTML = "";
    for (const item of arr) {
        createLi(item);
    }
})

checkDate.addEventListener('click', () => {
    const filteredLists = [];
    for (const item of arr) {
        if (item.status === "complete") {
            filteredLists.push(item)
        }
    }
    console.log(filteredLists)
    const a = filteredLists.sort((a, b) => a.time - b.time) //------------------ НЕ СОРТИРУЕТ
    console.log(a)
})

