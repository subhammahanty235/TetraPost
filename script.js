//utility function to get elements from strings
function getelementfromstring(string) {
    let div = document.createElement('div')
    div.innerHTML = string;
    return div.firstChild;
}













addedparamcount = 0;
// hide parameter box initially
let parameterbox = document.getElementById('parameterbox');
parameterbox.style.display = 'none';
// if the user clicks on params box , hide the json box
let paramsradio = document.getElementById('cusradio');
paramsradio.addEventListener('click', function () {
    document.getElementById('jsonbox').style.display = 'none';
    document.getElementById('parameterbox').style.display = 'block'
})
// if the user clicks on json box , hide the params box
let jsonradio = document.getElementById('jsonradio');
jsonradio.addEventListener('click', function () {
    document.getElementById('parameterbox').style.display = 'none';
    document.getElementById('jsonbox').style.display = 'block';
})
let addbtn = document.getElementById('addbtn')
// let template = ` <div class="row my-3">
// <label for="url" class="col-sm-1 col-form-label">Parameter${addedparamcount+2} </label>
// <div class="col-md-5">
//   <input type="text" class="form-control " placeholder="key" aria-label="key" id="parameterkey${addedparamcount+2}">
// </div>
// <div class="col-md-5">
//   <input type="text" class="form-control" placeholder="value" aria-label="value" id="parametervalue${addedparamcount+2}">
// </div>

// </div>`
// // addbtn.addEventListener('click',function(){
// //     document.getElementById('parameterbox').innerHTML += template;
// // })
// function addtemplate (){
//     document.getElementById('parameterbox').innerHTML += template;
//     addedparamcount++;
// }
addbtn.addEventListener('click', () => {
    let moreparams = document.getElementById('moreparams');
    let string = `<div class="row my-3">
        <label for="url" class="col-sm-1 col-form-label">Parameter${addedparamcount + 2} </label>
        <div class="col-md-5">
        <input type="text" class="form-control " placeholder="key" aria-label="key" id="parameterkey${addedparamcount + 2}">
        </div>
        <div class="col-md-5">
        <input type="text" class="form-control" placeholder="value" aria-label="value" id="parametervalue${addedparamcount + 2}">
        </div>
        <button class="btn btn-primary col-sm-1 removeparam">-</button>
        </div>`
    //convert the element string to dom
    let paramelement = getelementfromstring(string);
    // console.log(paramelement)
    moreparams.appendChild(paramelement);
    //add a event listenor to delete the elements
    let deleteparam = document.getElementsByClassName('removeparam')
    for (item of deleteparam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove()
        })
    }
    addedparamcount++;
})

//if the user clicks on submit
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    document.getElementById('resjsontext').innerHTML = "Fetching please wait"
    //fetch all the values user have entered
    let url = document.getElementById('url').value;
    let requesttype = document.querySelector("input[name='requesttype']:checked").value
    let contenttype = document.querySelector("input[name='contenttype']:checked").value


    //if user has used params option instead of json , collect all the parameters as an object
    if (contenttype == 'params') {
        data = {}
        for (i = 0; i < addedparamcount + 1; i++) {
            if (document.getElementById("parameterkey" + (i + 1)) != undefined) {
                let key = document.getElementById("parameterkey" + (i + 1)).value
                let value = document.getElementById("parametervalue" + (i + 1)).value
                data[key] = value;
               

            }
            
        }
        data = JSON.stringify(data)
    }
    else {
        data = document.getElementById('reqjsontext').value
    }
    console.log('url is ', url)
    console.log("request type ", requesttype)
    console.log("content type ", contenttype)
    console.log("data is ", data)



    // if requesr type is post , invoke fetch api to create a post request
    if(requesttype == 'GET'){
        fetch(url , {
            method : 'GET'

        })
        .then(responce => responce.text())
        .then((text)=>{
            let responce = document.getElementById('resjsontext').value = text
        })

    }
    else{
        fetch(url ,{
            method :'POST',
            body : data,
            headers: {
                'Content-type': "application/json; charset=UTF-8"
              }
        })
        .then(responce => responce.text())
        .then((text)=>{
            let responce = document.getElementById('resjsontext').value = text;
        })

    }
})