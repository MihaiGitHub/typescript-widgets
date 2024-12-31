export interface Person {
  id: number;
  name: string;
  email: string;

  getDetails(): string; // Method signature
}

export class Employee implements Person {
  id: number;
  name: string;
  email: string;
  position: string;

  constructor(id: number, name: string, email: string, position: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.position = position;
  }

  // Implementing the getDetails method from the interface
  getDetails(): string {
    return `ID: ${this.id}, Name: ${this.name}, Position: ${this.position}`;
  }
}

// Using the class
// const employee = new Employee(
//   1,
//   "John Doe",
//   "john.doe@example.com",
//   "Software Engineer"
// );

// console.log(employee.getDetails());
// Output: ID: 1, Name: John Doe, Position: Software Engineer
