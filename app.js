function request() {
  fetch("http://localhost:3000/api/audio?id=lJa7WTqgIl8", {
    method: "GET",
  }).then(function (response) {
    response.blob().then(function (file) {
      console.log(file);
      const a = document.createElement("a");
      a.setAttribute("download", "file.mp4");
      const download = window.URL.createObjectURL(file);
      a.href = download;
      a.click();
    });
  });
}
