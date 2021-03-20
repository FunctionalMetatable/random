// u lucky
function cdn2() {
  /* load deps */
if (!document.getElementById("jquery")) {
  var s = document.createElement("script")
  s.src = "https://code.jquery.com/jquery-3.6.0.min.js";
  s.id = "jquery";
  document.body.appendChild(s);
}
/* Credit to @jeffalo for the original code */
var input = document.createElement("input");
input.type = "file";
input.accept = "image/*";
input.style.display = "none";

input.addEventListener('change', (e) => {
  var file = input.files[0];
  var reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onloadend = function() {
    upload(reader.result)
  };
  reader.onerror = err => {
    console.log("Looks like we can't upload!")
  }
});

function getCookie(name) { 
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function deleteProject(projectId) {
  fetch(`https://scratch.mit.edu/site-api/projects/all/${projectId}/`, {
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-csrftoken": getCookie('scratchcsrftoken'),
      "x-requested-with": "XMLHttpRequest"
    },
    "referrer": "https://scratch.mit.edu/mystuff/",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": `{\"view_count\":0,\"favorite_count\":0,\"remixers_count\":0,\"creator\":{\"username\":\"Scratch\",\"pk\":53088961,\"thumbnail_url\":\"//uploads.scratch.mit.edu/users/avatars/default.png\",\"admin\":false},\"title\":\"Forums Image Uploader Autogenerated Project\",\"isPublished\":false,\"datetime_created\":\"2020-07-24T10:27:23\",\"thumbnail_url\":\"//uploads.scratch.mit.edu/projects/thumbnails/413641266.png\",\"visibility\":\"trshbyusr\",\"love_count\":0,\"datetime_modified\":\"2020-07-24T10:27:24\",\"uncached_thumbnail_url\":\"//cdn2.scratch.mit.edu/get_image/project/413641266_100x80.png\",\"thumbnail\":\"413641266.png\",\"datetime_shared\":null,\"commenters_count\":0,\"id\":413641266}`,
    "method": "PUT",
    "mode": "cors",
    "credentials": "include"
  })
}

async function upload(img) {
  var session = await fetch("https://scratch.mit.edu/session/", {
    credentials: "same-origin",
    headers : {"X-Requested-With":"XMLHttpRequest"}
  }).catch(err => {
    alert("We can't get authorisation! Are you even logged in?")
    
  });
  var sessionJSON = await session.json();
  var token = sessionJSON.user.token;
  fetch("https://projects.scratch.mit.edu/", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site"
    },
    "referrer": "https://scratch.mit.edu/projects/editor",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": "{\"targets\":[{\"isStage\":true,\"name\":\"Stage\",\"variables\":{\"`jEk@4|i[#Fk?(8x)AV.-my variable\":[\"my variable\",0]},\"lists\":{},\"broadcasts\":{},\"blocks\":{},\"comments\":{},\"currentCostume\":0,\"costumes\":[{\"assetId\":\"77582e3881becdac32ffd151dbb31f14\",\"name\":\"backdrop1\",\"bitmapResolution\":1,\"md5ext\":\"77582e3881becdac32ffd151dbb31f14.svg\",\"dataFormat\":\"svg\",\"rotationCenterX\":381.96246447447436,\"rotationCenterY\":351.7889839939939}],\"sounds\":[],\"volume\":100,\"layerOrder\":0,\"tempo\":60,\"videoTransparency\":50,\"videoState\":\"on\",\"textToSpeechLanguage\":null}],\"monitors\":[],\"extensions\":[],\"meta\":{\"semver\":\"3.0.0\",\"vm\":\"0.2.0-prerelease.20200720182258\",\"agent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36\"}}",
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
  }).catch(err=>{alert("my code is broken :(")}).then(e=>e.json())
    .then(data => {
    console.log("Created Project!");
    console.log(data);
    /* Set the Title for project */
    fetch(`https://api.scratch.mit.edu/projects/${data["content-name"]}`, {
      "headers": {
        "accept": "application/json",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "x-token": token
      },
      "referrer": `https://scratch.mit.edu/projects/${data["content-name"]}/`,
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": `{\"title\":\"Forums Image Uploader Autogenerated Project\"}`,
      "method": "PUT",
      "mode": "cors",
      "credentials": "omit"
    }).catch(e=>{alert("title didnt set :("); throw e})
      .then(titleJSON => {
      console.log("We successfully set the title!");
      $.ajax({
        type: "POST",
        url: "/internalapi/project/thumbnail/" + data["content-name"] + "/set/",
        data: img,
        headers: {
          "X-csrftoken": getCookie("scratchcsrftoken")
        },
        contentType: "",
        processData: false,
        success: function() {
          console.log("We set the thumbnail successfully!");
          document.getElementById("id_body").value += `[img]https://cdn2.scratch.mit.edu/get_image/project/${data["content-name"]}_9000x7200.png[/img]`
          uploadInput.value = null
          deleteProject(data["content-name"]);
        },
        error: function() {
          alert("We can't set the project thumbnail :(");
          deleteProject(data["content-name"]);
        }
      })
      
    })
  })
};
input.click() // start uploading
};
