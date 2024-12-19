import React from "react";
import "./App.css";
import FetchUsers from "./components/list.component.tsx";
import GetRequest from "./components/textbox.component.tsx";
import MyList from "./components/mylist.component.tsx";

function App() {
  return (
    <div className="App">
      <MyList />
    </div>
  );
}

export default App;
