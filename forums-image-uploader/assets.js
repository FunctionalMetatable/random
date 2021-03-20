function uploadr() {
if (!document.getElementById("_meta_md5")) {
  var scr = document.createElement("script");
  scr.src = "https://raw.githubusercontent.com/emn178/js-md5/master/build/md5.min.js"
  scr.id = "_meta_md5"; // name the script so it knows we dont need to load it in anymore
  document.body.appendChild(scr); // parent dependency to body
};
async function upload(image, extension) {
  var hash = md5(image); // get hash of image
  var type = extension; // file extension
  try {
    var res = await fetch("https://assets.scratch.mit.edu/"+ hash + "." + type, {
      body: image,
      method: "POST",
      mode: "cors",
      credentials: "include",
    }); // upload image to server
    var data = await res.json();
    if (data.status === "ok") { // yay we got it
      if (document.getElementById("id_body")) { // if we are on a forum page
        document.getElementById("id_body").value = document.getElementById("id_body").value + "[img]https://assets.scratch.mit.edu/get_image/\x2e\x25\x32\x45/" + data["content-name"] + "[/img]"; // add image to post
      } else {
        prompt("Your image has been uploaded!", "https://assets.scratch.mit.edu/get_image/\x2e\x25\x32\x45/" + data["content-name"]); // or just prompt the user with a editable text box
      }
    } else {
      alert("The scratch servers didn't accept your image for some reason :("); // notify the user that it didnt work
    };
  } catch (err) {
    alert("Error on uploading image! Errors:" + err) // notify the user that the whole thing didnt work (rare)
  };
 };
var input = document.createElement("input"); // create file input
input.type = "file"; // set input type to file
input.accept = "image/*"; // set input accept to image
input.style.display = "none"; // hide
input.click(); // click!
input.addEventListener("change", (e) => {
  var file = input.files[0]; // get the file
  var extension = input.files[0].name.split(".").pop().toLowerCase(); // get file extension
  var reader = new FileReader(); // get a file reader
  reader.readAsArrayBuffer(file); // read our file
  reader.onloadend = function(){
    upload(reader.result, extension); // upload the image via our function
    input.remove() // delete input
  }
  reader.onerror = (err) => {
    alert("We can't upload your file at the moment.") // rip the image doesnt work so we just tell the user
  };
})
}
uploadr();
