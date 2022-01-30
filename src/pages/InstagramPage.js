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
          console.log(jsonData[i]["bytes"]);
          let blob = new Blob([jsonData[i]["bytes"]], {
            type: jsonData[i]["type"],
          });
          console.log(blob);
          const url = URL.createObjectURL(blob);
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
