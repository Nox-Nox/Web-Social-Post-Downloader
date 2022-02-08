import FormTemplate from "../components/Form/Form";
import { Box } from "@mui/material";
import { saveAs } from "file-saver";

function TwitterPage() {
  function sendUrl(urlData) {
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
      });
  }

  return (
    <div>
      <Box textAlign={"center"} sx={{ marginBottom: "4rem" }}>
        <img src={require("../Images/twitter.png")} alt=" " width="100px" />
      </Box>
      <FormTemplate onSendUrl={sendUrl} />
    </div>
  );
}
export default TwitterPage;
