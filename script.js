const inputTitle = document.querySelector(".input_title");
const btnCreate = document.querySelector('.btn_create');
const btnSort = document.querySelector(".btn_sort");
const checkAll = document.querySelector(".check_all");
const checkComplete = document.querySelector(".check_complete");
const checkUnComplete = document.querySelector(".check_uncomplete");
const listOfItems = document.querySelector('ul');


function createToDoItem(value) {
    const item = document.createElement("LI");
    item.setAttribute("data-status", "active");
    item.classList.add("item")
    item.innerHTML =
        `
    <div class="item_content">
        <span class="title">${value}</span>
        <span class="time"></span>
    </div>
    </div class="item_wrap_btns">
        <button class="btn btn_complete">Выполнено</button>
        <button class="btn btn_delete">Удалить</button>
    </div>
    `
    listOfItems.append(item);
}


btnCreate.addEventListener('click', () => {
    const inputTitleValue = (inputTitle.value).trim();
    if (inputTitleValue !== "" && inputTitleValue) {
        createToDoItem(inputTitleValue);
    }
})

listOfItems.addEventListener('click', (e) => {
    const target = e.target;
    let targetLi = target.closest(".item");

    if (target.classList.contains("btn_complete")) {
        const date = new Date();
        const timeOfCreate = date.toLocaleString();
        if (targetLi.getAttribute("data-status") !== "complete") {
            targetLi.setAttribute("data-status", "complete");
            targetLi.setAttribute("data-time", `${date}`)
            targetLi.querySelector(".time").innerHTML = timeOfCreate;
            targetLi.classList.add("hidden");
        } else {
            targetLi.setAttribute("data-status", "active");
            targetLi.removeAttribute("data-time");
            targetLi.querySelector(".time").innerHTML = "";
            targetLi.classList.remove("hidden");
        }
    }

    if (target.classList.contains("btn_delete")) {
        targetLi.remove();
    }
})

checkComplete.addEventListener('click', () => {
    if (checkComplete.checked) {
        for (const item of document.querySelectorAll(".item")) {
            item.classList.remove("hidden")
            if (item.getAttribute("data-status") !== "complete") {
                item.classList.add("hidden")
            } else {
                item.classList.remove("hidden")
            }
        }
    } else {
        for (const item of document.querySelectorAll(".item")) {
            item.classList.remove("hidden")
            if (item.getAttribute("data-status") !== "active") {
                item.classList.add("hidden")
            }
        }
    }
})

checkUnComplete.addEventListener('click', () => {
    if (checkUnComplete.checked) {
        for (const item of document.querySelectorAll(".item")) {
            item.classList.remove("hidden")
            if (item.getAttribute("data-status") !== "active") {
                item.classList.add("hidden")
            }
        }
    }
})

checkAll.addEventListener('click', () => {
    if (checkAll.checked) {
        for (const item of document.querySelectorAll(".item")) {
            item.classList.remove("hidden")
        }
    } else {
        for (const item of document.querySelectorAll(".item")) {
            if (item.getAttribute("data-status") === 'complete') {
                item.classList.add("hidden")
            }
        }
    }
})

btnSort.addEventListener('click', () => {
    const completeItems = document.querySelectorAll('.item[data-status="complete"]');
    const filterTimeArr = []
    for (const item of completeItems) {
        filterTimeArr.push(item.outerHTML);
    }


})