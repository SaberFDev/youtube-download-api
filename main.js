const express = require("express");
var cors = require("cors");
const app = express();
const fs = require("fs");
const ytdl = require("ytdl-core");

app.use(cors());
app.use(express.json());
app.get("/api/video", (req, res) => {
  const { id } = req.query;
  const videoReadableStream = ytdl("https://www.youtube.com/watch?v=" + id, {
    filter: "audioandvideo",
  });
  res.set(
    "content-disposition",
    `attachment; filename="${"videoReadableStream" + ".mp4"}"`
  );
  videoReadableStream.pipe(res);
});

app.get("/api/audio", async (req, res) => {
  const { id } = req.query;
  const url = "https://www.youtube.com/watch?v=" + id;
  const info = await ytdl.getInfo(url);

  const videoReadableStream = await ytdl(url, {
    filter: "audioonly",
  });
  res.header("Content-Disposition", 'attachment; filename="Audio.mp3');
  res.send("Downloading");
  const downloadFile = videoReadableStream.pipe(res);
});

app.listen(3000, () => {
  console.log("listening");
});
