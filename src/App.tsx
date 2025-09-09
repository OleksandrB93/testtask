import "./App.scss";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Team from "./components/Team/Team";
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
      <Hero />
      <Team />
      <Form />

      {/* <Spinner size="large" color="secondary" /> */}
      {/* <Tooltip content="This is a tooltip on bottom" position="bottom">
          <Button>Hover me (Bottom)</Button>
        </Tooltip> */}
    </div>
  );
}

export default App;
