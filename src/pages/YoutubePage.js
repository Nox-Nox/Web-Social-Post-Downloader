import FormTemplate from "../components/Form/Form";
import { Box } from "@mui/material";
import { saveAs } from "file-saver";
import { useState } from "react";
import YoutubeSpinner from "../components/Spinner/YoutubeSpinner";

function YoutubePage() {
  const [isDownlaoded, setDownloaded] = useState(true);

  function sendUrl(urlData) {
    setDownloaded(false);
    fetch("http://localhost:5000/download_twitter", {
      method: "POST",
      body: JSON.stringify(urlData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((jsonData) => {
        console.log(jsonData);
        saveAs(jsonData["url"], jsonData["title"]);
        setDownloaded(true);
      });
  }

  if (isDownlaoded === false) {
    return (
      <section>
        <YoutubeSpinner />
      </section>
    );
  }

  return (
    <div>
      <Box textAlign={"center"} sx={{ marginBottom: "4rem" }}>
        <img src={require("../Images/youtube.png")} alt=" " width="100px" />
      </Box>
      <FormTemplate onSendUrl={sendUrl} />
    </div>
  );
}
export default YoutubePage;
