import React from "react";

type SearchboxProps = {
  filterUsers: (query: string) => void;
};

const Searchbox: React.FC<SearchboxProps> = ({ filterUsers }) => {
  const handleChange = (event: React.changeHandle<HTMLInputElement>) => {
    filterUsers(event.target.value);
  };
  return <input type="text" placeholder="Search" onChange={handleChange} />;
};

export default Searchbox;
