const express = require("express");
var cors = require("cors");
const app = express();
const fs = require("fs");
const ytdl = require("ytdl-core");

app.use(cors());
app.use(express.json());

app.get("/api/info", async (req, res) => {
  const { id } = req.query;
  if (id) {
    const url = "https://www.youtube.com/watch?v=" + id;
    const videoInfo = await ytdl.getInfo(url);
    res.status(200).send(videoInfo.videoDetails);
  }
});

app.get("/api/video", async (req, res) => {
  const { id } = req.query;
  if (id) {
    const url = "https://www.youtube.com/watch?v=" + id;
    const videoInfo = await ytdl.getInfo(url);
    const videoReadableStream = ytdl("https://www.youtube.com/watch?v=" + id, {
      filter: "audioandvideo",
    });
    res.set(
      "content-disposition",
      `attachment; filename="${videoInfo.videoDetails.title + ".mp4"}"`
    );
    videoReadableStream.pipe(res);
  } else {
    res.send("Id is not available");
  }
});

app.get("/api/audio", async (req, res) => {
  const { id } = req.query;
  if (id) {
    const url = "https://www.youtube.com/watch?v=" + id;
    const videoInfo = await ytdl.getInfo(url);
    const videoReadableStream = await ytdl(url, {
      filter: "audioonly",
    });
    res.set(
      "content-disposition",
      `attachment; filename="${videoInfo.videoDetails.title + ".mp3"}"`
    );
    videoReadableStream.pipe(res);
  } else {
    res.send("Id is not available");
  }
});

app.listen(3000, () => {
  console.log("Listening");
});
