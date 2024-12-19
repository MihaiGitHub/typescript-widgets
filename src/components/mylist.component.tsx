import React, { useState, useEffect } from "react";
import MySearchbox from "./MySearchBox.tsx";

type User = {
  id: number;
  name: string;
};

const MyList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User>([]);
  const [isAscending, setIsAscending] = useState<Boolean>(true);
  const [searchQuery, setSearchQuery] = useState<String>("");
  const [input, setInput] = useState<String>("");
  const [response, setResponse] = useState<String>("");

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
        console.log("Error occurred: ", err);
      }
    };

    fetchUsers();
  }, []);

  const handleClick = () => {
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

  const handleSearch = (queryString: String) => {
    const fUsers = users.filter((user) => {
      return user.name.toLowerCase().includes(queryString);
    });

    setFilteredUsers(fUsers);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setInput(inputValue);
  };

  const handleInputButtonClick = async () => {
    try {
      const fetchPost = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${encodeURIComponent(
          input
        )}`
      );

      const response = await fetchPost.json();

      setResponse(response.body);
    } catch (err: unknown) {
      console.log("An error has occurred", err);
    }
  };

  return (
    <div>
      <div>
        <button onClick={handleClick}>
          Sort {isAscending ? "ascending" : "descending"}
        </button>
        <MySearchbox filterSearch={handleSearch} />
        <ul>
          {filteredUsers.map((user, index) => {
            return <li key={index}>{user.name}</li>;
          })}
        </ul>
      </div>
      <div>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter value to send"
        />
        <button onClick={handleInputButtonClick}>Send</button>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default MyList;
