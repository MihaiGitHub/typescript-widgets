export interface Person {
  id: number;
  fname: string;
  lname: string;

  sayHello(): string;
}

export class MyPerson implements Person {
  id: number;
  fname: string;
  lname: string;
  email: string;

  constructor(id: number, fname: string, lname: string, email: string) {
    this.id = id;
    this.fname = fname;
    this.lname = lname;
    this.email = email;
  }

  sayHello(): string {
    return `Hello ${this.fname}`;
  }
}
