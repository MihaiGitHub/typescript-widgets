import React from "react";

type SearchBoxProps = {
  onSearch: (query: string) => void;
};

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search by name"
      onChange={handleChange}
      style={{ marginRight: "10px", padding: "5px" }}
    />
  );
};

export default SearchBox;
