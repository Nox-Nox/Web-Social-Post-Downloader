import { useRef, useState } from "react";
import { Input } from "@mui/material";
import { createTheme, ThemeProvider, Button } from "@mui/material";
import { Box } from "@mui/material";
import FormTheme from "../Themes/FormTheme";

const theme = FormTheme;

function FormTemplate(props) {
  const [isButtonPressed, setButtonPressed] = useState(false);
  const url = useRef();
  function submitHandler(event) {
    event.preventDefault();
    const enteredUrl = url.current.value;
    const urlData = {
      url: enteredUrl,
    };
    props.onSendUrl(urlData);
    if (isButtonPressed === false) setButtonPressed(true);
    document.getElementById("input-form").reset();
  }

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={submitHandler} id="input-form">
        <Input
          type="url"
          required
          id="link-input"
          inputRef={url}
          placeholder="paste link"
        />
        <Box textAlign={"center"}>
          <Button type="submit">ok</Button>
        </Box>
      </form>
    </ThemeProvider>
  );
}
export default FormTemplate;
