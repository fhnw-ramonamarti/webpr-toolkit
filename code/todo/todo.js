// requires ./fortuneService.js
// requires ./observable.js

// imports 
import { fortuneService } from "./fortuneService";
import { Observable, ObservableList } from "./observable";

// Controller to manage todo tasks
const TodoController = () => {

    // The todo struct with text and completion state
    const Todo = () => {
        const textAttr = Observable("");
        const doneAttr = Observable(false);
        return {
            getDone: doneAttr.getValue,
            setDone: doneAttr.setValue,
            onDoneChanged: doneAttr.onChange,
            setText: textAttr.setValue,
            getText: textAttr.getValue,
            onTextChanged: textAttr.onChange,
        }
    };

    // Model to observe todos
    const todoModel = ObservableList([]);

    // Add new sync
    const addTodo = () => {
        const newTodo = Todo();
        todoModel.add(newTodo);
        return newTodo;
    };

    // Scheduler to handle order
    const scheduler = Scheduler();

    // Add random async with scheduler
    const addFortuneTodo = button => {
        const newTodo = Todo();
        todoModel.add(newTodo);
        newTodo.setText("...");

        scheduler.add(ok => {
            fortuneService(text => {
                newTodo.setText(text);
                ok();
            });
        });
        return newTodo;
    };

    return {
        numberOfTodo: todoModel.count,
        numberOfOpenTasks: () => todoModel.countIf(todo => !todo.getDone()),
        addTodo: addTodo,
        addFortuneTodo: addFortuneTodo,
        removeTodo: todoModel.del,
        onTodoAdd: todoModel.onAdd,
        onTodoRemove: todoModel.onDel,
        removeTodoRemoveListener: todoModel.removeDeleteListener, // only for the test case, not used below
    }
};

// View-specific parts of todo table
const TodoItemsView = (todoController, rootElement) => {
    const render = todo => {
        // HTML content of a todo
        function createElements() {
            const template = document.createElement('DIV'); // only for parsing
            template.innerHTML = `
                <button class="delete">&times;</button>
                <input type="text" size="36">
                <input type="checkbox"> 
            `;
            return template;
        }

        // Extract HTML elements 
        const container = createElements();
        const [deleteButton, inputElement, checkboxElement] = container.children;

        // Add event handlers to HTML elements
        checkboxElement.onclick = _ => todo.setDone(checkboxElement.checked);
        deleteButton.onclick = _ => todoController.removeTodo(todo);

        // Handle remove
        todoController.onTodoRemove((removedTodo, removeMe) => {
            if (removedTodo !== todo) return;
            rootElement.removeChild(container);
            removeMe();
        });

        // Handle change
        todo.onTextChanged(_ => inputElement.value = todo.getText());

        // Handle add
        rootElement.appendChild(container);
    };

    // Binding todo controller with content to render
    todoController.onTodoAdd(render);
};

// View-specific parts of all task text
const TodoTotalView = (todoController, numberOfTasksElement) => {
    // Content of all task text 
    const render = () =>
        numberOfTasksElement.innerText = "" + todoController.numberOfTodos();

    // Binding todo controller with content to render
    todoController.onTodoAdd(render);
    todoController.onTodoRemove(render);
};

// View-specific parts of opened task text
const TodoOpenView = (todoController, numberOfOpenTasksElement) => {
    // Content of task opened text
    const render = () =>
        numberOfOpenTasksElement.innerText = "" + todoController.numberOfopenTasks();

    // Binding todo controller with content to render
    todoController.onTodoAdd(todo => {
        render();
        todo.onDoneChanged(render);
    });
    todoController.onTodoRemove(render);
};
