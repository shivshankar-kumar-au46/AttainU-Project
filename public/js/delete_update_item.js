const button_addon2 = document.getElementById("button-addon2")
const addTask = document.getElementById('newTask')
var targetDiv = document.getElementById('targetDiv')
const updateBtn = document.querySelector('.updateBtn')
var deleteBtn = document.querySelector('.deleteBtn')
const doneBtn = document.querySelector('.doneBtn')
const btn_clear = document.querySelector('#btn-clear')
.addEventListener('click',()=>{targetDiv.remove()})


    button_addon2.addEventListener('click',()=>{
        const newDiv = document.createElement('div')
        newDiv.className = "form-control my-2 justify-content-between icon"
        const innerNewDiv = document.createElement('div')
        innerNewDiv.className = 'innerDiv'
    
        const newTask = document.createElement('input')
        newTask.value = addTask.value
        newTask.className = 'taskText'
        newTask.setAttribute('readonly','readonly')
        
        const doneBtn = document.createElement('i')
        doneBtn.className = 'bi bi-check-square doneBtn'
        doneBtn.addEventListener('click',()=>{
            newTask.style.cssText += "text-decoration: line-through"
        })
    
        const updateBtn = document.createElement('i')
        updateBtn.className = 'bi bi-pencil-square updateBtn'
        let count = 0;
        updateBtn.addEventListener('click',()=>{
            count++;
            if(count%2==0){
                newTask.className = 'taskText'
                newTask.setAttribute('readonly','readonly');
            }else{
                newTask.classList.remove('taskText');
                newTask.removeAttribute('readonly','readonly');
            }
            
        })
    
        const delBtn = document.createElement('i')
        delBtn.className = 'bi bi-x-square deleteBtn'
        delBtn.addEventListener('click',()=>{
            newDiv.remove()
        })
        newDiv.appendChild(newTask)
        newDiv.appendChild(innerNewDiv)
        innerNewDiv.appendChild(doneBtn)
        innerNewDiv.appendChild(updateBtn)
        innerNewDiv.appendChild(delBtn)
        targetDiv.appendChild(newDiv)
        console.log(addTask.value)
    })


