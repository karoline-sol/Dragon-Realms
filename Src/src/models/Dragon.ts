// models/Dragon.ts

export class Dragon {
  id: string;
  name: string;
  type: string;
  age: number;
  element: string;
  abilities: string;

  constructor(name: string, type: string, age: number, element: string, abilities: string) {
    
    this.id = Date.now().toString();
    this.name = name;
    this.type = type;
    this.age = age;
    this.element = element;
    this.abilities = abilities;
  }
}
