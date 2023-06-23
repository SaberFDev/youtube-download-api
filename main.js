const express = require("express");
var cors = require("cors");
const app = express();
const fs = require("fs");
const ytdl = require("ytdl-core");

app.use(cors());
app.use(express.json());

app.get("/api/info", async (req, res) => {
  const { id } = req.query;
  const videoInfo = await ytdl.getInfo("https://www.youtube.com/watch?v=" + id);
  res.send(200, videoInfo.videoDetails);
});

app.get("/api/video", (req, res) => {
  const { id } = req.query;
  const videoReadableStream = ytdl("https://www.youtube.com/watch?v=" + id, {
    filter: "audioandvideo",
  });
  res.set(
    "content-disposition",
    `attachment; filename="${
      Math.floor(Math.random() * 999).toString() + ".mp4"
    }"`
  );
  videoReadableStream.pipe(res);
});

app.get("/api/audio", async (req, res) => {
  const { id } = req.query;
  const url = "https://www.youtube.com/watch?v=" + id;
  const videoReadableStream = await ytdl(url, {
    filter: "audioonly",
  });
  res.set(
    "content-disposition",
    `attachment; filename="${
      Math.floor(Math.random() * 999).toString() + ".mp4"
    }"`
  );
  videoReadableStream.pipe(res);
});

app.listen(3000, () => {
  console.log("listening");
});
