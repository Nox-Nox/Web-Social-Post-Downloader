import FormTemplate from "../components/Form/Form";
import { Box } from "@mui/material";
import { useState } from "react";
import InstagramSpinner from "../components/Spinner/InstagramSpinner";

function InstagramPage() {
  const [isDownlaoded, setDownloaded] = useState(true);

  function sendUrl(urlData) {
    setDownloaded(false);
    fetch("http://localhost:5000/download_instagram", {
      method: "POST",
      body: JSON.stringify(urlData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((jsonData) => {
        console.log(jsonData);
        for (var i = 0; i < jsonData.length; i++) {
          const url = `data:${jsonData[i]["type"]};base64,${jsonData[i]["bytes"]}`;
          const link = document.createElement("a");
          link.href = url;
          link.download = jsonData[i]["title"];
          link.click();
          setDownloaded(true);
        }
      });
  }
  if (isDownlaoded === false) {
    return (
      <section>
        <InstagramSpinner />
      </section>
    );
  }
  return (
    <div>
      <Box textAlign={"center"} sx={{ marginBottom: "4rem" }}>
        <img src={require("../Images/instagram.png")} alt=" " width="100px" />
      </Box>
      <FormTemplate onSendUrl={sendUrl} />
    </div>
  );
}
export default InstagramPage;
