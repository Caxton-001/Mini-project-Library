/**
 * Created Caxton, the dev.
 */


var textToMp3 = require("./index");
var fs = require('fs');


var text = "";
var fn = "";

if (process.argv.includes("-?")) {
  console.log("Using the Google Translate API for text-to-speech conversion");
  console.log("-t \t\t\t Write your text enclosed in double quotes");
  console.log("-f \t\t\t Create a name for the file");
  console.log("");
  ;
}


if(process.argv.indexOf("-t")!== -1)
  text=process.argv[process.argv.indexOf("-t")+1];

if(process.argv.indexOf("-f")!== -1)
  fn=process.argv[process.argv.indexOf("-f")+1];

text = text.replace(/ +(?= )/g,'');

if(typeof text ===  "undefined" || text === ""
  || typeof fn === "undefined" || fn === "") {
  console.log("Some arguments are missing.");
}
if(text.length > 200){ 
  console.log("The text should not exceed 200 words.")
}

settings = {
  tl: 'it'
}

textToMp3.getMp3(text, settings, function(err, data){
  if(err){
    console.log(err);
    return;
  }

  if(fn.substring(fn.length-4, fn.length) !== ".mp3"){ 
    fn+=".mp3";
  }
  var file = fs.createWriteStream(fn);
  file.write(data);
  file.end();
  console.log("Text converted successfully!");
});
