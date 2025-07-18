const todoList = [{ name: 'make dinner', duedate: '2022-12-22' },
{ name: 'wash dishes', duedate: '2022-12-22' }];  //here aaray is an object

renderTodoList();
function renderTodoList() {
    let todoListHTML = '';
    for (let i = 0; i < todoList.length; i++) {
        const todoObject = todoList[i];//get each element in an array
        //const name=todoObject.name;  //give the name and dedate out to the object
        // const duedate=todoObject.duedate;
        const { name, duedate } = todoObject;//destructuring  - same as the above two lines -get name out from the todoObject property and put it into the variable name
        const html = `
        <div class="todo-grid">
        <div> ${name} </div>
        <div> ${duedate}</div>
     
        <button onclick="
        todoList.splice(${i},1);                   //delete the delete button when click   
                                                 //(${i},1) remove only one value starting index 0, of we remove first value then its removed but the next value is at 0 index now when we again delete the value then this value deleted and next value  at 0 index.
        renderTodoList();                         //display the todoList after removing values
        " class="delete-button">Delete</button>
        </div>
        `;  //generating the html
        todoListHTML += html;
    }
    console.log(todoListHTML);

    document.querySelector('.js-todo-list')
        .innerHTML = todoListHTML;

}


function addTodo() {
    const inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value;

    const dateInputElement = document.querySelector('.js-due-date-input');
    const date = dateInputElement.value;


    todoList.push({
        // name:name,
        name,
        duedate: date
    }); //if property and variavle name are same then we write once
    //console.log(todoList);
    document.querySelector('.display-list');
    inputElement.value = '';//make the text into textbox empyt after adding into todoList
    renderTodoList();
}