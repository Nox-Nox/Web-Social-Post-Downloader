import FormTemplate from "../components/Form";
import { useNavigate } from "react-router-dom";
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
      <div>Twitter Page</div>
      <FormTemplate onSendUrl={sendUrl} />
    </div>
  );
}
export default TwitterPage;
