
function startTodo() {

}

function addTodo() {
    const container = document.getElementById("todoContainer");
    container.innerHTML += `
        <tr>
            <td> <input type="text"></td>
        </tr>`;
}
