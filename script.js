const inputText = document.querySelector("input[type='text']");
const btnAdd = document.querySelector(".btn_create");
const checkAll = document.querySelector("input[type='checkbox']");
const listOfItems = document.querySelector("ul");

function createToDoItem(value) {
  let item = document.createElement('LI');
  let itemContainer = document.createElement('DIV');
  item.setAttribute("data-status", "active")
  itemContainer.classList.add("item_wrap")
  itemContainer.innerHTML =
      `
  <div class="item_descr">
    <span>${value}</span>
    <span></span>
  </div>
  <div class='item_wrap_btns'>
    <button class='btn btn_complete'>Выполнено</button> 
    <button class='btn btn_delete'>Удалить</button> 
  </div>
  `
  item.append(itemContainer)
  listOfItems.append(item);
}

btnAdd.addEventListener("click", () => {
  if (inputText.value !== "") {
    createToDoItem(inputText.value)
  }
})

listOfItems.addEventListener("click", (e) => {
  let target = e.target;
  let targetLi = target.closest("li");

  if (target.closest(".btn_complete")) {
    targetLi.setAttribute("data-status", "complete");
  }

  if (target.closest(".btn_delete")) {
    targetLi.remove()
  }
})

checkAll.addEventListener('click', () => {
  const toDoItems = document.querySelectorAll("li")
  toDoItems.forEach(el => {
    if (el.getAttribute("data-status") === 'completed') {
      console.log(el)
    }
  })
  if (checkAll.checked && toDoItems.length !== 0) {


    // const completedItems = toDoItems.filter(el => )
    // console.log(completedItems)

  }
})
