# youtube-download-api

You can download ny video on youtube as .mp3 or .mp4 file

# Usage

You can use in HTML:

<a href="http://localhost:3000/api/{audio OR video}?id={VIDEO-ID}>Link</a>

Or you can use fetch in JavaScript:

fetch("http://localhost:3000/api/{audio OR video}?id={VIDEO-ID}", {
    method: "GET",
  })
  .then((res) => res.blob())
  .then(function(file){
    console.log(file)
  })
  
   
