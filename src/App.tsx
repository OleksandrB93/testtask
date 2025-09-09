import "./App.scss";
import Header from "./components/Header/Header";
import Form from "./components/ui/Form/Form";
// import Input from "./components/ui/Input/Input";
// import { useState } from "react";

function App() {
  // const [radioValue, setRadioValue] = useState("checked");
  // const [uploadValue, setUploadValue] = useState("");
  //
  // const radioOptions = [
  //   { value: "checked", label: "Checked" },
  //   { value: "unchecked", label: "Unchecked" },
  // ];

  // const handleFileSelect = (file: File | null) => {
  //   if (file) {
  //     setUploadValue(file.name);
  //     console.log("Selected file:", file.name);
  //   }
  // };

  // const handleUploadChange = (value: string) => {
  //   setUploadValue(value);
  // };

  return (
    <div className="app">
      <Header />

      <Form />

      {/* <Input
          type="radio"
          label="Radio Options"
          radioOptions={radioOptions}
          radioValue={radioValue}
          onRadioChange={setRadioValue}
          helperText="Select an option"
        /> */}

      {/* <Input
          type="upload"
          label="Photo Upload"
          placeholder="Upload your photo"
          value={uploadValue}
          onChange={handleUploadChange}
          onFileSelect={handleFileSelect}
          uploadButtonText="Upload"
          helperText="Select an image file"
        /> */}
      {/* <Spinner size="large" color="secondary" /> */}
      {/* <Tooltip content="This is a tooltip on bottom" position="bottom">
          <Button>Hover me (Bottom)</Button>
        </Tooltip> */}
    </div>
  );
}

export default App;
