import { createElement as $ } from "react";
import Advice from "./Advice";
function App() {
  return $(
    "div", null, $(Advice)
  );
}

export default App;
