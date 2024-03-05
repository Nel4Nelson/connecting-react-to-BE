import { useState } from "react";
import EffectDeps from "./components/EffectDeps";

const App = () => {
  const [color, setColors] = useState("");

  return (
    <div className="container mt-5 mb-7">
      <h2>Importance of useEffect Dependancies</h2>
      <label className="mb-2" htmlFor="color">
        Please select a color
      </label>
      <select
        id="color"
        className="form-select"
        onChange={(event) => setColors(event.target.value)}
      >
        <option value=""></option>
        <option value="red">Red</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
      </select>
      <EffectDeps color={color} />
    </div>
  );
};

export default App;
