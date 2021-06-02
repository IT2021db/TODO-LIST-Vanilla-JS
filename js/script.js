{
    let tasks = [];
    let hideDoneTasks = false;

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex], done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [...tasks, { content: newTaskContent }];
        render();
    };

    const markAllTasksDoneDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    }

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    }



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

        const markAllDoneButton = document.querySelector(".js-markAllDone");

        if (markAllDoneButton) {
            markAllDoneButton.addEventListener("click", markAllTasksDoneDone);
        }

        const toggleHideTaskButton = document.querySelector(".js-toggleHideDoneTask");

        if (toggleHideTaskButton) {
            toggleHideTaskButton.addEventListener("click", toggleHideDoneTasks);
        }

    }

    const renderTasks = () => {
        const taskToHTML = task => `
            <li class="tasks__item ${task.done && hideDoneTasks ? "tasks__item--hidden" : ""}">
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

        tasksElement = document.querySelector(".js-tasks");
        tasksElement.innerHTML = tasks.map(taskToHTML).join("");
    };

    const renderButtons = () => {
        const buttonElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonElement.innerHTML = "";
            return;
        }

        buttonElement.innerHTML = `
                <button class="buttons__button js-toggleHideDoneTask">
                    ${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"}
                    </button>
                <button 
                    class="buttons__button js-markAllDone"
                    ${tasks.every(({ done }) => done) ? "disabled" : ""}
                    >
                    Ukończ wszystkie
                    </button>
            `;




    };


    const render = () => {
        renderTasks();
        bindRemoveEvents();
        bindToggleDoneEvents();

        renderButtons();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }
        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };
    init();
}