{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        // tasks.push({
        //     content: newTaskContent,
        // });
        render();
    }

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        // tasks.splice(taskIndex, 1);
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        // console.log(tasks[taskIndex].done);
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex], done: !tasks[taskIndex].done
            },
            ...tasks.slice(taskIndex + 1)
        ];
        // console.log(tasks[taskIndex].done);

        // tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    }
    const allTasksDone=()=>{
        tasks=tasks.map(tasks=>{ return {...tasks, done:true};
            // tasks=tasks.map(({done})=> done)
            // tasks=tasks.map((tasks)=>{ return {content:task.content, done:true};

        });
     
    
        console.log(tasks);
        render();
        
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        ;
        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim()
        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }
        newTaskElement.focus();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                removeTask(index);
            });
        });
    }
    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");
        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }
    const bindButtonsEvents = () => {

        const allTasksDoneButton = document.querySelector(".js-allTasksDoneButton");
        console.log("dziala");
        if (tasks.length) {
            allTasksDoneButton.addEventListener("click", () => {
                console.log("jest buton");
               
                console.log(hideDoneTasks);
                allTasksDone(); 
               
            });
        }
       


    }

    const renderTasks = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
                <li class="tasks__item" >
                    <button class="tasks__button tasks__button--toggleDone js-done">
                        ${task.done ? "✓" : ""}
                    </button>
                    <span class="tasks__content ${task.done ? "tasks__content--done" : ""}">        
                         ${task.content} 
                    </span> 
                    <button class="tasks__button tasks__button--remove js-remove">
                         &#x1F5D1
                    </button> 
                </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };
    const renderButtons = () => {
        if (tasks.length) {
            let htmlButtonString = "";
            htmlButtonString += `
             Lista zadań 
                <button type="click" >Ukryj zrobione</button>
                <button type="click" class="js-allTasksDoneButton" ${tasks.every(({done})=>done)? "disabled": ""}>
                Ukończ wszystkie</button>
            `;
            document.querySelector(".js-tasksButton").innerHTML = htmlButtonString;
        }

    };


    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };
    init();
}