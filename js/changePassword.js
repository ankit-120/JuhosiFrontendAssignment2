let update = document.getElementById('update');
update.onclick = async(e) =>{
    e.preventDefault();
    let mobile = document.getElementById('mobile').value;
    let newPassword = document.getElementById('new-password').value;
    let confirmPassword = document.getElementById('confirm-password').value;

    let options1={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            }
    }

    let response1 = await fetch(`http://localhost:8080/assignment2/user/${mobile}`,options1);
    if(response1.status == 200){
        let res1 = await response1.json();
        console.log(res1);
        sessionStorage.setItem('user',JSON.stringify(res1));
    }
    else{
        alert("Enter correct mobile number");
        return;
    }

    if(newPassword != confirmPassword){
        alert("Password do not match")
        return;
    }

    let userData = JSON.parse(sessionStorage.getItem('user'));
    
    let user={
        id:userData.id,
        password:newPassword,
    };
    console.log(user);
    let data=JSON.stringify(user);
    let options2={
        method:'PUT',
        headers: {
            'Content-Type': 'application/json',
            },
        body:data
    }

    let response2= await fetch(`http://localhost:8080/assignment2/user/update/${user.id}`,options2);
    if(response2.status == 200){
        let res2= await response2.json();
        console.log(res2);
        alert("Password Updated Successfully!!");
        window.location.href = "index.html";
    }

}