import { saveAs } from "file-saver";
import FormTemplate from "../components/Form";
import { Buffer } from "buffer";

function InstagramPage() {
  function sendUrl(urlData) {
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
        }
      });
  }
  return (
    <div>
      <div>Instagram Page</div>
      <FormTemplate onSendUrl={sendUrl} />
    </div>
  );
}
export default InstagramPage;
