const inputTitle = document.querySelector("#input_title");
const btnCreate = document.querySelector('#btn_create');
const btnReset = document.querySelector('#btn_reset');
const checkAll = document.querySelector("#checkAll");
const checkComplete = document.querySelector("#checkComplete");
const checkUnComplete = document.querySelector("#checkUncomplete");
const checkByDateOfCreate = document.querySelector("#checkDate");
const listOfItems = document.querySelector('ul');

let toDoItemsObjects = [];

class ToDoItem {
    time = "";

    constructor(title, id) {
        this.status = "active";
        this.title = title;
        this.id = id;
    }
}

function changeTextContentForCreateLi(toDoElement, status, textValueFirst, textValueSecond) {
    return `${toDoElement.status === status ? textValueFirst : textValueSecond}`
}

function createLi(itemObject) {
    const newItem = document.createElement("LI");

    newItem.classList.add("item", itemObject.status);
    newItem.setAttribute("id", `${itemObject.id}`);
    newItem.innerHTML =
        `
            <div class="item_content_top">
                <span class="title">${itemObject.title}</span>
                <span class="time">${changeTextContentForCreateLi(itemObject, "complete", "Время завершения: ", "")} ${itemObject.time.toLocaleString()}</span>
            </div>
            <div class="item_content_bottom">
                <div class="item_wrap_btns">
                    <button class="btn btn_complete">${changeTextContentForCreateLi(itemObject, "active", "Выполнить", "Восстановить")}</button>
                    <button class="btn btn_delete">Удалить</button>
                </div>
                <span>${changeTextContentForCreateLi(itemObject, "complete", "Выполнено", "Не выполнено")}</span>
            </div>
        `;

    newItem.querySelector(".btn_complete").addEventListener("click", () => {
        newItem.classList.add("hidden");
        const completeToDoItems = toDoItemsObjects.filter(el => el.status === "active");

        if (completeToDoItems.find(el => el.id === Number(newItem.getAttribute("id")))) {
            const date = new Date();
            itemObject.status = "complete";
            itemObject.time = date;
            newItem.querySelector(".time").innerText = itemObject.time.toLocaleString();

            hideFilterByDate();
            saveDataLocalStorage();
        } else {
            itemObject.status = "active";
            itemObject.time = "";
            newItem.querySelector(".time").innerText = itemObject.time;

            hideFilterByDate();
            saveDataLocalStorage();
        }

    })
    newItem.querySelector(".btn_delete").addEventListener("click", () => {
        newItem.classList.add("hidden");

        if (toDoItemsObjects.find(el => el.id === Number(newItem.getAttribute("id")))) {
            toDoItemsObjects.splice(itemObject.id)
            newItem.remove();
        }
    })
    return newItem;
}

function createToDoItem() {
    const [inputValue, id] = [inputTitle.value, toDoItemsObjects.length];
    const inputValueWithoutSpaces = inputValue.trim()

    if (inputValueWithoutSpaces !== "") {
        const newItemObject = new ToDoItem(inputValue, id);

        const newLi = createLi(newItemObject)

        listOfItems.append(newLi);
        toDoItemsObjects.push(newItemObject);
        saveDataLocalStorage()

        inputTitle.value = "";
    }

}

function hideFilterByDate() {
    if (toDoItemsObjects.filter(el => el.status === "complete").length === 0) {
        checkByDateOfCreate.closest("label").classList.add("hidden")
    } else {
        checkByDateOfCreate.closest("label").classList.remove("hidden")
    }
}

function saveDataLocalStorage() {
    localStorage.setItem('listsOfToDo', JSON.stringify(toDoItemsObjects));
}

function getDataLocalStorage() {
    const saveListsOfToDo = JSON.parse(localStorage.getItem('listsOfToDo'));

    if (!saveListsOfToDo) return;

    toDoItemsObjects = saveListsOfToDo;

    checkAll.click()

}

function checkAllToDoItems() {
    listOfItems.innerHTML = "";
    toDoItemsObjects.forEach(el => {
        listOfItems.append(createLi(el));
    });
}

function checkStatusOfToDoItem(status) {
    listOfItems.innerHTML = "";
    toDoItemsObjects.filter(el => el.status === status).forEach(el => listOfItems.append(createLi(el)));
}

function resetListOfToDo() {
    localStorage.removeItem("listsOfToDo");
    location.reload();
}

btnCreate.addEventListener('click', createToDoItem);

inputTitle.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        createToDoItem();
        saveDataLocalStorage()
    }
});

checkComplete.addEventListener("click", () => {
    checkStatusOfToDoItem("complete")
});

checkUnComplete.addEventListener("click", () => {
    checkStatusOfToDoItem("active")
});

checkAll.addEventListener('click', checkAllToDoItems);

checkByDateOfCreate.addEventListener('click', () => {
    let newArray = toDoItemsObjects.filter(el => el.status === "complete").map(el => {
        return {...el, time: new Date(el.time)};
    });

    newArray.sort((a, b) => b.time - a.time);

    listOfItems.innerHTML = "";

    for (const filtItem of newArray) {
        let filtereLiByTime = createLi({...filtItem, time: new Date(filtItem.time)});
        listOfItems.append(filtereLiByTime);
    }
});

btnReset.addEventListener("click", resetListOfToDo);

hideFilterByDate()

getDataLocalStorage();





