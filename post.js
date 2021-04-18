var projectId = 508924470;
if (!document.getElementById("jquery")) {
  var s = document.createElement("script");
  s.src = "https://code.jquery.com/jquery-3.6.0.min.js";
  s.id = "jquery";
  document.body.appendChild(s)
}
// We need to:
// Create an image => Copy the image => Paste the image as a blob => upload it to project
async function getImage(user) {
  var d = await fetch("https://scratchdb.lefty.one/v3/forum/user/info/" + user);
  var res = await d.json()
  if (true) {
    // Get the SVG image
    console.log("User posts: " + res.counts.total.count)
    return ("https://NodeJS-badges.9gr.repl.co/forum%20posts/" + (res.counts.total.count || "0") + "/brightgreen/image.svg")
  }
}
getImage("9gr")
.then((url) => {
  fetch(url)
  .catch(err => {
    console.log("We cannot find the image from " + toUpload + ", we got an error: " + err)
  })
  .then(res => res.arrayBuffer())
  .then((blob) => {
    upload(blob)
  })
})

async function upload(imageBlob) {
  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  };
  imageBlob.arrayBuffer()
  .then(arrayBuffer => {
    $.ajax({type:"POST",url:"https://scratch.mit.edu/internalapi/project/thumbnail/"+projectId+"/set/",data:arrayBuffer,headers:{"X-csrftoken":getCookie("scratchcsrftoken")},contentType:"",processData:false,success:(e)=>{console.log("Success on uploading image :D")}});
  })
}
