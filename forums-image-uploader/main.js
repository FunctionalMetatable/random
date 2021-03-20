// How this works:
// You can choose which image host you want via nice buttons.
// Most of this code in this script is by easrng. See https://scratch.mit.edu/discuss/topic/489839/?page=2#post-4968917
// load up scripts
if (!document.getElementById("forums-image-uploader-assetsScript")) {
    var assets = document.createElement("script");
    assets.src="//functionalmetatable.github.io/random/forums-image-uploader/assets.js";
    assets.id = "forums-image-uploader-assetsScript";
    document.body.appendChild(assets);
};

if (!document.getElementById("forums-image-uploader-cdn2Script")) {
    var cdn2 = document.createElement("script");
    cdn2.src="//functionalmetatable.github.io/random/forums-image-uploader/cdn2.js";
    cdn2.id = "forums-image-uploader-cdn2Script";
    document.body.appendChild(cdn2);
};


void(() => { // Make sure there is no result so the page isn't overwritten
    let messages = ["assets", "cdn2"]; // different image hosts
    var functions = {"assets": assets, "cdn2": cdn2};
    (menuItems => {
        let d = document.createElement("div"); // make the menu div
        d.setAttribute("data-uploader-menu", "1"); // let the CSS see it exists without clashing with on-page styles
        let s = document.createElement("style"); // make a style tag
        s.textContent = "[data-uploader-menubutton]:not(:root) { outline: none; margin: 0px; border: none; " + // add the CSS
                "border-radius: 0px; background: transparent; color: inherit; font: inherit; text" +
                "-align: left; padding: 5px 10px 5px 20px; display: block; user-select: none; max" +
                "-width: 300px; overflow: visible; height: fit-content; transition: none 0s ease " +
                "0s !important; }[data-uploader-menubutton]:not(:root):hover, [data-uploader-menubutt" +
                "on]:not(:root):focus { border: none; border-radius: 0px; background: rgb(200, 20" +
                "0, 201); color: inherit; font: inherit; }[data-uploader-menubutton]:not(:root):dis" +
                "abled { color: rgb(114, 119, 124); background: transparent; cursor: default; poi" +
                "nter-events: none; }[data-uploader-menu]:not(:root) { line-height: 1.45; border: 1" +
                "px solid rgb(218, 220, 224); position: fixed; top: 0px; left: 0px; z-index: 2147" +
                "483647; min-width: 135px; background: rgb(255, 255, 255); padding: 3px 0px; disp" +
                "lay: flex; flex-direction: column; text-align: left; color: rgb(0, 0, 0); font-f" +
                "amily: system-ui, sans-serif; font-size: 13px; box-shadow: rgba(0, 0, 0, 0.557) " +
                "3px 3px 2px -2px; }[data-uploader-blockbg] { position: fixed; top: 0px; left: 0px;" +
                " width: 100%; height: 100%; z-index: 2147483647; }";
        let c = _ => [...document.querySelectorAll("[data-uploader-menu],[data-uploader-blockbg]")].map(e => e.remove()); // this is a function that closes the menu
        d.append(...menuItems.map(e => { // this part turns the menu items into button tags
            let b = document.createElement("button"); // first we make the button
            b.setAttribute("data-uploader-menubutton", "1"); // let the CSS see it exists without clashing with on-page styles
            b.textContent = e.text; // make it have the right text
            b.onclick = a => { // when it is clicked
                a.preventDefault(); // don't reload the page
                a.stopPropagation(); // don't trigger other events
                a.bubbles = false; // don't trigger other events (iirc some browsers need this)
                c(); // close the menu
                e.action() // call the menu item's function
            };
            b.disabled = !e.action; // if there's no action, disable the button
            return b
        }), s);
        d.style.margin = "10px" // make the menu not be so close to the edge
        let b = document.createElement("div"); // make a div that covers the page so we can close the menu by clicking behind it
        b.setAttribute("data-uploader-blockbg", "1"); // let the CSS see it exists without clashing with on-page styles
        b.onclick = c; // when it's clicked, close the menu
        document
            .body
            .append(b, d); // add the menu and the thing that goes behind it to the document
    })(true
        ? [
            {
                text: "Which image host would you like to use?" // this is the menu title
            },
            ...messages.map(t => ({
                text: t,
                action: e => {
                  functions[t]();
                }
            }))
        ]
        : [
            {
                text: "For some reason it doesn't work :("
            }
        ]);
})()
