//-----------------------------------------------------------------------------------------------------
function allowDrop(event) {
    event.preventDefault(); // Allows the drop
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id); // Store the task id
}

let orignal_child;
let inputbox;
let parent;
function drop(event) {
    event.preventDefault(); 
    let taskId = event.dataTransfer.getData("text"); // Retrieve the task id
    let task = document.getElementById(taskId); // Get the task element

    // Append task to the new "tasks" section
    let dropTarget = event.target;
    // Ensure the drop happens in the correct container (class="tasks")
    while (!dropTarget.classList.contains("tasks") && dropTarget !== document.body) {
        dropTarget = dropTarget.parentElement;
    }

    if (dropTarget.classList.contains("tasks")) {
        dropTarget.appendChild(task);
    }

    // After dropping, reassign the delete functionality
    let taskDel = task.querySelector("i");
    taskDel.onclick = function () {
        dropTarget.removeChild(task);
    };
}
//-----------------------------------------------------------------------------------------------------
function add(ind){
    inputbox=document.createElement("div");
    inputbox.classList="task";
    let buttons=document.createElement("div");
    buttons.id="inpbtn";

    let addbtn=document.createElement("i");
    let delbtn=document.createElement("i");
    addbtn.classList.add('fas', 'fa-check');
    delbtn.classList.add('fas', 'fa-times');

    buttons.appendChild(addbtn);
    buttons.appendChild(delbtn);

    addbtn.style.color="#00FF40";
    delbtn.style.color="#FF0800";
    addbtn.style.fontSize="30px";
    delbtn.style.fontSize="30px";
    addbtn.style.cursor="pointer";
    delbtn.style.cursor="pointer";

    let input=document.createElement("input");
    input.classList="in";
    let detail=document.createElement("input");
    detail.classList="in";

    let priority=document.createElement("div");
    let op1 = document.createElement("input");
    let op2 = document.createElement("input");
    let op3 = document.createElement("input");
    let label1 = document.createElement("label");
    let label2 = document.createElement("label");
    let label3 = document.createElement("label");

    let deadline=document.createElement("input");
    deadline.classList="in";

    op1.type = "radio";
    op2.type = "radio";
    op3.type = "radio";
    op1.name = "priority";
    op2.name = "priority";
    op3.name = "priority";
    op1.value = "Low";
    op2.value = "Medium";
    op3.value = "High";
    label1.innerHTML = "Low";
    label2.innerHTML = "Medium";
    label3.innerHTML = "High";

    let heading=document.createElement("div");
    heading.innerHTML="Priority of the task: ";
    heading.id="hd";
    priority.appendChild(heading);
    priority.appendChild(op1);
    priority.appendChild(label1);
    priority.appendChild(document.createElement("br"));
    priority.appendChild(op2);
    priority.appendChild(label2);
    priority.appendChild(document.createElement("br"));
    priority.appendChild(op3);
    priority.appendChild(label3);
    priority.appendChild(document.createElement("br"));
    priority.appendChild(document.createElement("br"));
    priority.appendChild(deadline);
    label1.style.color="rgb(195, 191, 191)";
    label2.style.color="rgb(195, 191, 191)";
    label3.style.color="rgb(195, 191, 191)";
    
    let category=document.getElementsByClassName("tasks")[ind];
    parent=document.body;
    orignal_child=document.getElementById("box2");
    parent.replaceChild(inputbox,orignal_child);
    inputbox.appendChild(input);
    inputbox.appendChild(detail);
    inputbox.appendChild(priority);
    inputbox.appendChild(buttons);

    input.placeholder="Task Name";
    detail.placeholder="Task Details";
    deadline.placeholder="End Date";


    addbtn.onclick=function(){
        let text=input.value;
        let detailText=detail.value;
        let priority=0;
        if(op1.checked) priority="Low";
        else if(op2.checked) priority="Medium";
        else  if(op3.checked) priority="High";
        let date=deadline.value; 
        if(text.length==0 || priority===0 || detailText.length==0 || date.length==0){
            alert("Please Enter the details");
        } 
        else{
            
//-----------------------------------------------------------------------------------------------------
            let taskBox = document.createElement("div");
            taskBox.classList = "task1";
            taskBox.id = "task-" + Math.random().toString(36).substr(2, 9); // Unique ID for each task
            taskBox.draggable = true; // Make it draggable
            taskBox.ondragstart = drag; // Add drag event listener
//-----------------------------------------------------------------------------------------------------

            let taskName=document.createElement("div");
            taskName.id="tn";
            let taskDetail=document.createElement("div");
            taskDetail.id="td";
            let box=document.createElement("div");
            box.id="bx";
            let taskPriority=document.createElement("div");
            taskPriority.id="tp";
            if(priority=='Low'){
                taskPriority.style.backgroundColor="#00FF40";
            }
            else if(priority=='Medium'){
                taskPriority.style.backgroundColor="#FEBE10";
            }
            else if(priority=='High'){
                taskPriority.style.backgroundColor="#FF0800";
            }
            let taskDate=document.createElement("div");
            taskDate.style.color="rgb(195, 191, 191)";
            let taskDel=document.createElement("div");
            let trashIcon = document.createElement("i");
            trashIcon.classList.add("fas", "fa-trash", "trash-icon");
            trashIcon.style.fontSize="25px"
            taskDel.appendChild(trashIcon);
            taskDel.style.cursor="pointer";
            box.appendChild(taskPriority);
            box.appendChild(taskDate);
            box.appendChild(taskDel);

            taskBox.appendChild(taskName);
            taskBox.appendChild(document.createElement("br"));
            taskBox.appendChild(taskDetail);
            taskBox.appendChild(document.createElement("br"));
            taskBox.appendChild(box);
            category.appendChild(taskBox,inputbox);
            parent.replaceChild(orignal_child,inputbox);
            taskName.innerHTML=text;
            taskDetail.innerHTML=detailText;
            taskPriority.innerHTML=priority;
            taskDate.innerHTML=date;
            taskDel.style.color="red";
            taskDel.onclick=function(){
                category.removeChild(taskBox);
            }
        }
    }
    delbtn.onclick=function(){
        parent.replaceChild(orignal_child,inputbox);
        parent.removeChild(inputbox);
    }
}