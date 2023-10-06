
// getting the reference and variables
const input_task = document.querySelector("#input_text");
const button = document.querySelector("#btn1");
const main_div =document.querySelector('.task_manage')
const clear_all = document.querySelector('.clear_btn');
const filters = document.querySelectorAll('.filter span');
let editId;
let editedTask = false;

// getting data from localStorage
let local_store =JSON.parse(localStorage.getItem('todo_list'));

filters.forEach((btn) =>{
    btn.addEventListener('click', ()=>{
        btn.classList.add("active");
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        show_todo_list(btn.id)
    })
})

function show_todo_list(filter){
    let str = "";
   if(local_store){
    local_store.forEach((element, index) =>{
        // todo status is completed, set the isCompleted value to check
        let isCompleted = element.status == "completed" ? "checked" : "";
        if(filter == element.status || filter == "all"){
         str +=`<ul class="task_box">
        <li class="task">
            <label for="${index}">
        <input type="checkbox" onclick="task_update(this)" id="${index}" ${isCompleted}>
            <p class="${isCompleted}">${element.name}</p>
            </label>
        </li>
            <div class="setting">
                <i onclick="show_menu(this)" class="fa-solid fa-ellipsis"></i>
                <ul class="menu_task">
               <li onclick="editTask(${index}, '${element.name}')" ><i id="iconA" class="fa-solid fa-pen edit"></i>edit</li>   
               <li onclick="delete_task(${index})" ><i id="iconB" class="fa-solid fa-trash delete"></i>delete</li>  
                </ul>
            </div>
       </ul>`
    }
     })   
   }
   main_div.innerHTML = str || `<span class="noTask" >you don't have any task</span>`;
}
show_todo_list("all")

function show_menu(selectedTask){
    let menuTask = selectedTask.parentElement.lastElementChild;
    menuTask.classList.add('show');
    document.addEventListener('click', (e) =>{
        if(e.target.tagName != "I"||e.target != selectedTask){
            menuTask.classList.remove('show');
        }
    })
}

function task_update(selected_task){
    let paraName = selected_task.parentElement.lastElementChild;
    if(selected_task.checked){
        paraName.classList.add('checked');
        // update the status selected_task completed
        local_store[selected_task.id].status = "completed";
    }else{
        paraName.classList.remove('checked');
        // update the status selected_task completed
        local_store[selected_task.id].status = "pending";
    }
    localStorage.setItem('todo_list', JSON.stringify(local_store));
}

// clear all todo list
clear_all.addEventListener('click', () => {
    local_store.splice(0,local_store.length);
localStorage.setItem('todo_list', JSON.stringify(local_store));
show_todo_list("all");
})

// delete the selected todo list
function delete_task(delete_index){
    local_store.splice(delete_index,1);
    localStorage.setItem('todo_list', JSON.stringify(local_store));
    show_todo_list("all");
}

// edit the selected task
function editTask(workId, workName){
    input_task.value = workName;
    editedTask = true;
    editId=workId;
}

button.addEventListener('click', () =>{
 let input_val = input_task.value.trim();
 if(input_val == ""){
    alert("you must something write here")
 }else{
    if(!editedTask){ //if editedTask is't true;
        if(!local_store){
            local_store =[];
        }
            let task_info = {name:input_val, status:"pending"};
            local_store.push(task_info); //push the task_info in the empty array
    }else{
        editedTask = false;
        local_store[editId].name = input_val;
    }
    input_task.value = "";
   
    localStorage.setItem('todo_list', JSON.stringify(local_store));
show_todo_list("all")
 }
})
