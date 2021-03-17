async function bookmarklet() {
  var res = await fetch("https://functionalmetatable.github.io/random/tolors/bookmarklet.json");
  var data = await res.json();
  function search(query) {
    var results = [];
    var keys = Object.keys(data);
    var values = Object.values(data);
    for (let sectionIter = 0; sectionIter < keys.length; sectionIter++) {
      if (!keys[sectionIter] == "settings") {
        var sectionKeys = Object.keys(values[sectionIter]);
        var sectionValues = Object.values(values[sectionIter]);
        for (let itemIter = 0; itemIter < sectionValues.length; itemIter++) {
          var stringMatch = sectionValues[itemIter].text.indexOf(query);
          if (!stringMatch == -1) {
            results.push(sectionValues[itemIter])
          }
          var titleMatch = sectionValues[itemIter].title.indexOf(query);
          if (!titleMatch == -1) {
           results.push(sectionValues[itemIter])
         }
        }
      }
    }
    return results
  };
  search(prompt("e"))
}
