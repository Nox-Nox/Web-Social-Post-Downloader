import { useRef } from "react";
import { Button } from "@mui/material";
import { FormControl, Input } from "@mui/material";

function FormTemplate(props) {
  const url = useRef();
  function submitHandler(event) {
    event.preventDefault();

    const enteredUrl = url.current.value;
    const urlData = {
      url: enteredUrl,
    };
    props.onSendUrl(urlData);
  }
  return (
    <FormControl>
      <form onSubmit={submitHandler}>
        <label htmlFor="link-input">Paste link</label>
        <Input
          style={{ width: "150%" }}
          type="url"
          required
          id="link-input"
          inputRef={url}
        />
        <Button style={{ left: "60%" }} type="submit">
          ok
        </Button>
      </form>
    </FormControl>
  );
}
export default FormTemplate;
