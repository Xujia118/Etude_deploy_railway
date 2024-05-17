import { useEffect, useState } from "react";

import { fetchTest } from "./service";

function App() {
  const [word, setWord] = useState("");

  function onFetchWord() {
    fetchTest()
      .then((data) => {
        setWord(data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    onFetchWord();
  }, []);

  return <h1>{word}</h1>;
}

export default App;
