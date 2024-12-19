import React from "react";

type MySearchboxProps = {
  filterSearch: (query: String) => void;
};

const MySearchbox: React.FC<MySearchboxProps> = ({ filterSearch }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    filterSearch(event.target.value);
  };

  return (
    <div>
      <input type="text" onChange={handleChange} placeholder="Search by name" />
    </div>
  );
};

export default MySearchbox;
