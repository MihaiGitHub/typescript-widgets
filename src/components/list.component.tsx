import React, { useEffect, useState } from "react";
import SearchBox from "./SearchBox.tsx"; // Import the child component

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};

const FetchUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAscending, setIsAscending] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }
        const data: User[] = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSort = () => {
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      return isAscending
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
    setFilteredUsers(sortedUsers);
    setIsAscending(!isAscending);
  };

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const searchResults = users.filter((user) =>
      user.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredUsers(searchResults);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Users</h1>
      <SearchBox onSearch={handleSearch} />
      <button onClick={handleSort}>
        Sort {isAscending ? "Descending" : "Ascending"}
      </button>
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.username}) - {user.email},
            Phone: {user.phone}, Website: {user.website}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchUsers;
