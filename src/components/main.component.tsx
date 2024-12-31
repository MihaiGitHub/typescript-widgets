import React, { useState, useEffect } from "react";
import Searchbox from "./searchbox.component.tsx";

type User = {
  id: number;
  name: string;
};

const Main: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [input, setInput] = useState<Number>("");
  const [message, setMessage] = useState<String>("");
  const [isAscending, setIsAscending] = useState<Boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err: unknown) {
        console.log("An error has occurred ", err);
      }
    };

    fetchUsers();
  }, []);

  const inputChangeHandler = (event: React.changeHandle<HTMLInputElement>) => {
    const value = event.target.value;

    setInput(value);
  };

  const inputButtonClick = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${input}`
      );
      const data = await response.json();
      setMessage(data.body);
    } catch (err: unknown) {
      console.log("An unknown error has occurred ", err);
    }
  };

  const handleSortCick = () => {
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      let compare = 0;

      if (isAscending) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          compare = 1;
        } else {
          compare = -1;
        }
      } else {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          compare = 1;
        } else {
          compare = -1;
        }
      }

      setIsAscending(!isAscending);

      return compare;
    });

    setFilteredUsers(sortedUsers);
  };

  const filterUsers = (query: string) => {
    const fUsers = users.filter((user) =>
      user.name.toLowerCase().includes(query)
    );

    setFilteredUsers(fUsers);
  };

  return (
    <div>
      <div>
        <h1>List</h1>
        <Searchbox filterUsers={filterUsers} />
        <button onClick={handleSortCick}>
          Sort {isAscending ? "ascending" : "descending"}
        </button>
        <ul>
          {filteredUsers.map((user, index) => (
            <li key={index}>{user.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h1>Posts</h1>
        <input
          type="text"
          placeholder="Get Post"
          onChange={inputChangeHandler}
        />
        <button onClick={inputButtonClick}>Get Post</button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Main;
