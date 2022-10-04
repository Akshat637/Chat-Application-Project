let listofgrps=document.querySelector('.listofgrps');
let token=localStorage.getItem('token');


let gname=document.querySelector('#grpname');
let crtgrp=document.querySelector('#crtgrp');
crtgrp.addEventListener('click',()=>{
let namegrp=gname.value;

    let obj={
        grpname:namegrp
    }
    axios.post("http://localhost:8400/creategrp", obj, {
      headers: { authorization: token }
    }).then(result=>{
        console.log(result);
        grps();
        gname.value = '';
    })
    .catch(err=>{
        console.log(err);
    })

})

function grps(){


    axios.get("http://localhost:8400/getallgroups", {
      headers: { authorization: token }
    }).then(result=>{
        let gt='';
        if(result.data.length==0){
        listofgrps.innerHTML='SORRY no groups available ';
        }
        else{
for(let i=0;i<result.data.length;i++){
    gt+=`<div style="border-bottom:1px solid white; padding:6px;">
    <a style="color:white; text-decoration:none;" href="groupchat.html?g=${result.data[i].groupId}">${result.data[i].groupname}</a>
    </div>`;
}  
listofgrps.innerHTML=gt;   
        }   
    })
    .catch(err=>{
        console.log(err);
    })

}

grps();