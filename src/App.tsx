import React from "react";
import "./App.css";
import Main from "./components/main.component.tsx";
import { Employee } from "./components/class.component.tsx";
import { MyPerson } from "./components/personclass.component.tsx";

function App() {
  const myperson = new MyPerson(1, "Mihai", "S", "emaili@asdf.com");

  console.log(myperson);

  console.log(myperson.sayHello());
  // const employee = new Employee(
  //   1,
  //   "John Doe",
  //   "john.doe@example.com",
  //   "Software Engineer"
  // );

  // console.log(employee.getDetails());

  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
