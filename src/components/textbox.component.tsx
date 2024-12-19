import React, { useState } from "react";

const GetRequest: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [responseBody, setResponseBody] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const url = `https://jsonplaceholder.typicode.com/posts/1?query=${encodeURIComponent(
        inputValue
      )}`;
      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }

      const data = await response.json();
      setResponseBody(data.body); // Extract only the "body" field
      setErrorMessage(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
      setResponseBody(null);
    }
  };

  return (
    <div>
      <h1>GET Request Example</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter query value"
      />
      <button onClick={handleButtonClick}>Send</button>
      {responseBody && (
        <p>
          <strong>Response Body:</strong> {responseBody}
        </p>
      )}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default GetRequest;
