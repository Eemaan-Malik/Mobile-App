import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js"
import {getDatabase,
  ref, 
  push,
onValue} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js"

const firebaseConfig = {
databaseURL: "https://leads-tracker-app-a1cbe-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabs = [{ url: "https://www.linkedin.com/in/per-harald-borgen/" }];

function renderLeads(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `<li>
      <a target = '_blank' href = '${leads[i]}'>
      ${leads[i]}
       </a>
      </li>`;
  }
  ulEl.innerHTML = listItems;
}

onValue(referenceInDB, function(snapshot){
  const snapshotDoesExists = snapshot.exists()
  if(snapshotDoesExists){
  const snapshotValues = snapshot.val()
  const leads = Object.values(snapshotValues)
  renderLeads(leads)
  }
})

inputBtn.addEventListener("click", function () {
  push(referenceInDB,inputEl.value)
  inputEl.value = "";
});

deleteBtn.addEventListener("dblclick", function () {
  this.remove(referenceInDB)
  ulEl.innerHTML= ""
});


