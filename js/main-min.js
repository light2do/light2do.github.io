"use strict";function saveToDoLocalHelp(e,t){e.length>0?localStorage.setItem(t,JSON.stringify(e)):localStorage.removeItem(t)}function saveToDoLocal(){saveToDoLocalHelp(toDoList,toDoListName),saveToDoLocalHelp(alreadyDoneList,alreadyDoneListName)}function getFromLocal(e,t){if(localStorage.getItem(t)){var o=JSON.parse(localStorage.getItem(t));if(o.length>0)for(var n=0;n<o.length;n++){var a=JSON.parse(localStorage.getItem(t))[n].text,i=JSON.parse(localStorage.getItem(t))[n].date,s=new Date(i);e.push(new ToDoItem(a,s))}}}function ToDoItem(e,t){this.text=e,this.date=t}function addItem(){var e=new Date;toDoList.unshift(new ToDoItem(inputText,e)),mainInput.value="",setInputWidth(mainInput,100),mainInput.focus(),inputText="",saveToDoLocal(),drawToDoList()}function setInputWidth(e,t){e.style.width=t+"%"}function createItemContent(e,t,o){var n="";n=t==toDoListName?"OK":"DO";return'\n        <div class="toDoList-Container">\n            <div class="toDoList-content">\n                <p class="toDoDate">'+daysName[e[o].date.getDay()]+" - "+e[o].date.toLocaleDateString()+" - "+e[o].date.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})+'</p>\n                <p class="toDoText">'+e[o].text+'</p>\n            </div>\n            <div class="toDoList-controlContainer">\n                <div class="toDoList-controlItem danger" id="'+t+"_delete_"+o+'">X</div>\n                <div class="toDoList-controlItem" id="'+t+"_done_"+o+'">'+n+"</div>\n            </div>\n        </div>\n    "}function drawToDoList(){if(clearListView(toDoListView),toDoList.length>0)for(var e=0;e<toDoList.length;e++)!function(e){var t=document.createElement("li");t.innerHTML=createItemContent(toDoList,toDoListName,e),toDoListView.appendChild(t);var o=toDoListName+"_delete_"+e;document.getElementById(o).addEventListener("click",function(){toDoList.splice(e,1),drawToDoList(),saveToDoLocal()});var n=toDoListName+"_done_"+e;document.getElementById(n).addEventListener("click",function(){alreadyDoneList.unshift(toDoList[e]),toDoList.splice(e,1),drawToDoList(),drawAlreadyDoneList(),saveToDoLocal()})}(e);else toDoListView.innerHTML=isMyStorage?"<h3>Great, everything is done :)</h3>":"<h3>Sorry, your browser does not support local storage :(</h3>"}function drawAlreadyDoneList(){if(clearListView(alreadyDoneListView),alreadyDoneList.length>0){alreadyDoneHeading.style.display="block";for(var e=0;e<alreadyDoneList.length;e++)!function(e){var t=document.createElement("li");t.innerHTML=createItemContent(alreadyDoneList,alreadyDoneListName,e),alreadyDoneListView.appendChild(t);var o=alreadyDoneListName+"_delete_"+e;document.getElementById(o).addEventListener("click",function(){alreadyDoneList.splice(e,1),drawAlreadyDoneList(),saveToDoLocal()});var n=alreadyDoneListName+"_done_"+e;document.getElementById(n).addEventListener("click",function(){toDoList.unshift(alreadyDoneList[e]),alreadyDoneList.splice(e,1),drawToDoList(),drawAlreadyDoneList(),saveToDoLocal()})}(e)}else alreadyDoneHeading.style.display="none"}function clearListView(e){for(;e.firstChild;)e.removeChild(e.firstChild)}var mainInput=document.getElementById("mainTextInput"),submitInput=document.getElementById("submitInput"),toDoListView=document.getElementById("toDoListView"),alreadyDoneListView=document.getElementById("alreadyDoneListView"),alreadyDoneHeading=document.getElementById("alreadyDoneHeading"),mainContainer=document.getElementById("mainContainer"),inputText="",daysName=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],toDoList=new Array,alreadyDoneList=new Array,toDoListName="toDoList",alreadyDoneListName="alreadyDoneList",isMyStorage=!1;window.localStorage&&(console.log("local storage in use"),isMyStorage=!0,getFromLocal(toDoList,toDoListName),getFromLocal(alreadyDoneList,alreadyDoneListName)),mainInput.addEventListener("input",function(e){(inputText=this.value).length>0?(setInputWidth(this,80),setInputWidth(submitInput,18)):(setInputWidth(this,100),setInputWidth(submitInput,5))}),window.addEventListener("keypress",function(e){13==e.keyCode&&inputText.length>0&&addItem()}),submitInput.addEventListener("click",function(){addItem()}),drawToDoList(),drawAlreadyDoneList();