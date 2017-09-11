var database = firebase.database().ref("/")
var input = document.getElementById("demo");
var list = document.getElementById("list");
// var key ;
function add() {
    if (input.value.length === 0) {
        document.getElementById('error').innerHTML = "<div class='alert alert-danger' role='alert'> Please Enter Work !! </div>";

    } else {
        var todo = {
            item: input.value,
        }
        database.child("todos").push(todo);
        document.getElementById('error').innerHTML = "<div class='alert alert-success' role='alert'> Successfully added !! </div>";

        input.value = '';

    }
}


database.child("todos").on("child_added", function (snapshot) {
    var obj = snapshot.val();
    obj.id = snapshot.key;
    render(obj);
})

function render(todo) {
    var li = document.createElement("LI");
    var label = document.createElement("LABEL");
    var text = document.createTextNode(todo.item);
    label.appendChild(text);
    li.appendChild(label);
    li.setAttribute("class", "list-group-item");
    li.setAttribute("id", todo.id);

    var deleteBtn = document.createElement("BUTTON");
    var btnText = document.createTextNode("Delete");
    deleteBtn.appendChild(btnText);
    deleteBtn.setAttribute("class", "btn btn-danger float-right");
    deleteBtn.onclick = function () {
        remove(user.id);
    }

    li.appendChild(deleteBtn);

    var editBtn = document.createElement("BUTTON");
    var btnText = document.createTextNode("Edit");
    editBtn.appendChild(btnText);
    editBtn.setAttribute("class", "btn btn-warning float-right");
    editBtn.onclick = function () {
        edit(todo.id);
    }
    li.appendChild(editBtn);


    list.appendChild(li);
}


function remove(key) {
    database.child("todos/" + key).remove();
}
database.child("todos").on("child_removed", function (data) {
    var deletedLi = document.getElementById(data.key);
    deletedLi.remove();  //Javascript buil-in method for deleting element
})



function edit(key) {
    
    console.log(key);
    console.log(document.getElementById(key).innerHTML);
    var list = document.getElementById(key).innerHTML;
    var text = document.getElementById(key).children[0].innerHTML;
    var action = "update(\'' + key + '\')";
    // var btn = '<button id="btn" onClick="update(\'' + key+ '\')">Update</button>';
    var btn = '<button id="btn" >Update</button>';
    var form = '<input type="text" id="inputItem" value = ' + text + '></input> ' + btn + ' ';
    //  console.log(document.getElementById('btn'));
    //  document.getElementById('btn').onclick = function () {
    //     update(key,list);
    // }
    //    document.getElementById('inputItem').value = key.innerHTML;
    document.getElementById(key).innerHTML = form;
    //  document.getElementById(key).innerHTML= list;
    // console.log(document.getElementById("btn"))
    document.getElementById("btn").addEventListener("click", function () {
        update(key,list);
    });
    // database.child("todos/" + key).remove();

}


// database.child("todos").on("child_removed", function (data) {
//     var deletedLi = document.getElementById(data.key);
//     deletedLi.remove();
// })
function update(key, list) {
    // alert(key)
    console.log(list);
    console.log(key);
    console.log(document.getElementById('inputItem').value);
    var todo = {
        item: document.getElementById('inputItem').value,
    }
    // console.log(item)
    database.child("todos/" + key).set(todo);

        var itemUpdated = document.getElementById("inputItem");
      list.children[0].innerHTML = itemUpdated;
      document.getElementById(key).innerHTML = list;
}


database.child("todos").on("child_changed", function (data) {
       
        var obj = data.val();
        obj.id = data.key;
        document.getElementById(obj.id)


    })


    