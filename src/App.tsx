import "./App.scss";
import { lazy, Suspense } from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Spinner from "./components/ui/Spinner/Spinner";
import SEOHead from "./components/SEO/SEOHead";

// Lazy load heavy components
const Team = lazy(() => import("./components/Team/Team"));
const Form = lazy(() => import("./components/ui/Form/Form"));

function App() {
  return (
    <div className="app">
      <SEOHead />
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<Spinner size="large" color="primary" />}>
          <Team />
        </Suspense>
        <Suspense fallback={<Spinner size="large" color="primary" />}>
          <Form />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
