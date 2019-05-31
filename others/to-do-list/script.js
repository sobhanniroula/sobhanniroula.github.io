$(document).ready(function () {
    let addButton = $('.add-button');
    let field = $('.add-field');
    let tasks = $('.tasks');
    let remove = $('.task-remove');
    let checkboxes = $('.task-checked input');


    //Add task
    addButton.on('click', function () {
        var elem = `<li class="task">
                        <div class="task-checked col-1">
                            <input type="checkbox">
                        </div>
                        <div class="task-text col-2">${field.val()}</div>
                        <div class="task-remove col-3">
                            <img src="img/trash-solid.svg" alt="Delete">
                        </div>
                    </li>`;
        tasks.append(elem);
        field.val('');
    })

    field.on('keypress', function (e) {
        var eleme = `<li class="task">
                        <div class="task-checked col-1">
                            <input type="checkbox">
                        </div>
                        <div class="task-text col-2">${field.val()}</div>
                        <div class="task-remove col-3">
                            <img src="img/trash-solid.svg" alt="Delete">
                        </div>
                    </li>`;
        if (e.keyCode === 13) {
            tasks.append(eleme);
            field.val('');
        }
    })



    // Remove task
    tasks.on('click', '.task-remove', function () {
        $(this).parent().remove();
    })


    // Checked
    tasks.on('change', '.task-checked input', function () {
        $(this).parent().next().toggleClass('checked');
    })


    // Sortable 
    $('#tasks-list').sortable();





})
