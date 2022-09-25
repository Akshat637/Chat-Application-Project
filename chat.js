let txt = document.querySelector('#inptext');
let sendmsg = document.querySelector('.sendmsg');
let allmsgs = document.querySelector('.messages');
let token = localStorage.getItem('token');
let welc = document.querySelector('#welcomeuser');
let nam = '';
axios.get('http://localhost:8400/user', {
    headers: { authorization: token },
})
    .then(result => {
        nam += result.data[0].name;
        console.log(nam);
        welc.innerHTML = `Welcome ${result.data[0].name}`;

    })
    .catch(err => {
        console.log(err);
    })

sendmsg.addEventListener('click', (e) => {
    let token = localStorage.getItem('token');

    let msg = txt.value;

    let obj = {
        message: msg
    }
    axios.post("http://localhost:8400/chatmessage", obj, {
        headers: { authorization: token },
    }).then(result => {
        console.log(result);
        txt.value = "";
    })
        .catch(err => {
            console.log(err);
        })
})

// setInterval(() => {
    axios
        .get("http://localhost:8400/getmessages", {
            headers: { authorization: token },
        })
        .then((result) => {
            let res = "";

            for (let i = 0; i < result.data.result.length; i++) {
                console.log(result.data.result[i].username == nam);
                if (result.data.result[i].username == nam) {
                    res += `
            <div class="p-2 indimsg " style=" background-image:linear-gradient( rgb(109,39,239), rgb(40,100,221));color:white; ">
            <span style="margin-left:20%;" >you : 
        </span>
            <span>${result.data.result[i].msg}</span>
            </div>
            `;
                }
                else {
                    res += `
            <div class="p-2 indimsg " style="background-image:linear-gradient( rgb(109,39,239), rgb(40,100,221)); color:white; ">
            <span  >${result.data.result[i].username} : 
        </span>
            <span>${result.data.result[i].msg}</span>
            </div>
            `;
                }
            }
            allmsgs.innerHTML = res;
        })
        .catch((err) => {
            console.log(err);
        });

// }, 800);

let signout = document.querySelector('#signout');
signout.addEventListener('click', () => {

    localStorage.clear();
    location.replace('login.html')
})