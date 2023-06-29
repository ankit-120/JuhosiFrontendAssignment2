let userData = JSON.parse(sessionStorage.getItem('user'));
document.getElementById('company').value = userData.id;
document.getElementById('owner').value = userData.name;

let submit = document.getElementById('submit');
submit.onclick = async(e) =>{
    e.preventDefault();
    let orderDate = document.getElementById('orderDate').value;
    let item = document.getElementById('item').value;
    let count = document.getElementById('count').value;
    let weight = document.getElementById('weight').value;
    let request = document.getElementById('request').value;

    let orderItem = {
        order_date:orderDate,
        item:item,
        count:count,
        weight:weight,
        requests:request,
        userId:userData.id
    }

    let data=JSON.stringify(orderItem);
    let options={
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            },
        body:data
    }

    let response= await fetch(`http://localhost:8080/assignment2/orderitem/`,options);
    if(response.status == 201){
        let res = await response.json();
        console.log(res);
        alert("Order successfully added.")
        let myForm = document.getElementById('myForm');
        myForm.reset();
        document.getElementById('company').value = userData.id;
        document.getElementById('owner').value = userData.name;
    }

}

let options={
    method:'GET',
    headers: {
        'Content-Type': 'application/json',
        }
}

let mainDiv = document.getElementById('main-div');
let displayDetail = document.getElementById('display-detail');

function viewOrders(){
    let tblBody = document.getElementById("tableBody");
    while (tblBody.firstChild) {
      tblBody.removeChild(tblBody.firstChild);
    }
    getOrderDetails();
    mainDiv.style.display = "none";
    displayDetail.style.display = "block";
}

async function getOrderDetails(){
    let response = await fetch(`http://localhost:8080/assignment2/orderitem/${userData.id}`,options);
    let data = await response.json();
    let len = data.length;

    let tableBody = document.getElementById('tableBody');
    for(let i=0;i<len;i++){
        let tr = document.createElement('tr');
        let cols = '';
        cols += `<td>${data[i].order_date}</td>`;
        cols += `<td>${userData.id}</td>`;
        cols += `<td>${userData.name}</td>`;
        cols += `<td>${data[i].item}</td>`;
        cols += `<td>${data[i].count}</td>`;
        cols += `<td>${data[i].weight}</td>`;
        cols += `<td>${data[i].requests}</td>`;
        tr.innerHTML = cols;
        tableBody.appendChild(tr);
    }
}
getOrderDetails();

function exportTableToExcel() {
    var table = document.getElementById("myTable");
    var workbook = XLSX.utils.book_new();
    var worksheet = XLSX.utils.table_to_sheet(table);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    var excelData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    var blob = new Blob([excelData], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    var link = document.createElement("a");
    
    link.href = URL.createObjectURL(blob);

    link.download = "table_data.xlsx";
  
    link.click();
}

function back(){
    mainDiv.style.display = "flex";
    displayDetail.style.display = "none";
}

let logout = document.getElementById('logout');
logout.onclick = () =>{
    sessionStorage.removeItem('user');
    window.location.href = 'index.html';
}
  
