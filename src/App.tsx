import "./App.scss";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Team from "./components/Team/Team";
import Form from "./components/ui/Form/Form";

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <Team />
      <Form />
    </div>
  );
}

export default App;
