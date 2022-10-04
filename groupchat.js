let token = localStorage.getItem("token");
let listofgrps = document.querySelector(".listofgrps");
let personemail=document.querySelector('#personemail');
let adminvalue=document.querySelector('#adminvalue');
let inptxt=document.querySelector('#inptext');
let pangrpname = document.querySelector("#grpname");

let nam = "";
axios.get("http://localhost:8400/user", {
    headers: { authorization: token },
  })
  .then((result) => {
    console.log(result);
    nam += result.data[0].name;
    console.log(nam);
  })
  .catch((err) => {
    console.log(err);
  });



function grps() {
  axios.get("http://localhost:8400/getallgroups", {
      headers: { authorization: token },
    })
    .then((result) => {
      let gt = "";
      if (result.data.length == 0) {
        listofgrps.innerHTML = "you are not part of any group! ";
      } else {
        for (let i = 0; i < result.data.length; i++) {
          gt += `<div style="border-bottom:1px solid black; padding:6px;">
    <a style="color:blue; text-decoration:none;" href="groupchat.html?g=${result.data[i].groupId}">${result.data[i].groupname}</a>
    </div>`;
        }
        listofgrps.innerHTML = gt;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

grps();


let addtogroup=document.querySelector('#addtogroup');
addtogroup.addEventListener('click',()=>{

 let id= location.href.split("g=")[1];

 let obj={
  mail:personemail.value,
  admin:adminvalue.value
 }

 axios.post(`http://localhost:8400/addparticipants/${id}`, obj, {
   headers: { authorization: token },
 }).then(result=>{

  alert(result.data);
  personemail.value="";
  location.reload();
 })
 .catch(err=>{
  console.log(err);
 })

});

let sendmessage=document.querySelector('.sendmsg');
sendmessage.addEventListener('click',()=>{
 let id = location.href.split("g=")[1];

  let inptxtvalue=inptxt.value;
  let obj={
msg:inptxtvalue
  }

  axios.post(`http://localhost:8400/postgroupmsgs/${id}`, obj, {
      headers: { authorization: token },
    })
    .then((result) => {
      console.log(result);
      inptxt.value="";
    })
    .catch((err) => {
      console.log(err);
    });
})

let groupmessages=document.querySelector('.groupmessages');
setInterval(() => {
   let id = location.href.split("g=")[1];

  axios.get(`http://localhost:8400/getgrpmsgs/${id}`, {
    headers: { authorization: token }
  }).then(result=>{
    let klu="";
    for(let i=0;i<result.data.length;i++){
if (result.data[i].username == nam) {
  klu += `<div class="p-2 indimsg " style="background-image:linear-gradient( rgb(109,39,239), rgb(40,100,221)); color:snow; border-radius:3px; ">
            <span style="margin-left:10%;" >you : 
        </span>
            <span>${result.data[i].message}</span>
            </div>`;
} else {
  klu += `<div class="p-2 indimsg " style="background-image:linear-gradient( rgb(109,39,239), rgb(40,100,221)); color:snow; border-bottom:1px solid white; border-radius:3px; ">
            <span  >${result.data[i].username} : 
        </span>
            <span>${result.data[i].message}</span>
            </div>`;
}

    }
    groupmessages.innerHTML=klu;
  })
  .catch(err=>{
    console.log(err);
  })

}, 700);


document.addEventListener('DOMContentLoaded',()=>{
   let id = location.href.split("g=")[1];


  axios.get(`http://localhost:8400/grpparticipants/${id}`, {
    headers: { authorization: token },
  }).then(result=>{
    let listpar="";
    console.log(result.data[0].name);

    for(let i=0;i<result.data.length;i++){


     let nameusershort=result.data[i].name.split(" ")[0];
      if(result.data[i].admin==true){
listpar += `<div style="border-bottom:1px solid black; padding:6px; display:flex;">
    <h6 style="color:blue; text-decoration:none;">${nameusershort}</h6>
   <h6 style="color:green; margin-left:17px;">group admin</h6>
    </div>`;

      }
      else{
        listpar += `<div style="border-bottom:1px solid black; padding:6px; display:flex;">
    <h6 style="color:blue; text-decoration:none;">${nameusershort}</h6>
    <button style="border:none;background-color:green;color:white;padding:4px; border-radius:5px; margin-left:10px;" class=" makeadmin" id="${result.data[i].userId}">make admin</button>
       <button style="border:none;background-color:red;color:white; padding:3px; border-radius:5px; margin-left:8px;" class="rempeople" id="${result.data[i].userId}">remove</button>
    </div>`;
      }
    }

    groupparticipants.innerHTML=listpar;
    })
  .catch(err=>{
    console.log(err);
  })
});


function grpdat(){
     let id = location.href.split("g=")[1];

  axios.get(`http://localhost:8400/getgrpname/${id}`, {
    headers: { authorization: token },
  }).then(result=>{
   pangrpname.innerHTML= result.data.groupname;

  })
  .catch(err=>{
    console.log(err);
  })
}
grpdat();

let groupparticipants=document.querySelector('.grpparticipants');
groupparticipants.addEventListener('click',(e)=>{
     let id = location.href.split("g=")[1];


  if(e.target.classList.contains('makeadmin')){

    let idd=e.target.id;
    let obj={
      useridupdate:idd
    }

    axios.post(`http://localhost:8400/makeuseradmin/${id}`, obj, {
      headers: { authorization: token },
    }).then(result=>{
alert(result.data);
location.reload();
    })
    .catch(err=>{
      console.log(err);
    })
  }

    if (e.target.classList.contains("rempeople")) {
      let iddd = e.target.id;
      let obj = {
        useriddel: iddd,
      };

      axios.post(`http://localhost:8400/removepart/${id}`, obj, {
          headers: { authorization: token },
        })
        .then((result) => {
          alert(result.data);
          location.reload();
        })
        .catch((err) => {
          console.log(err.data);
        });
    }



});

let signout = document.querySelector("#signoutgrp");
signout.addEventListener("click", () => {
  localStorage.clear();
  location.replace("login.html");
});