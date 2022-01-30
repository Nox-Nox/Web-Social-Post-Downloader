import { saveAs } from "file-saver";
import FormTemplate from "../components/Form";

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
        for (var i = 0; i < jsonData.length; i++) {
          saveAs(jsonData[i]["url"], jsonData[i]["title"]);
          console.log(jsonData[i]["url"]);
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
