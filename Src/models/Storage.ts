// storage.ts
import { Dragon } from "./Dragon.js";

export class Storage {
  static load(): Dragon[] {
    const data = localStorage.getItem("dragons");
    return data ? JSON.parse(data) : [];
  }

  static save(dragon: Dragon) {
    const dragons = this.load();
    dragons.push(dragon);
    localStorage.setItem("dragons", JSON.stringify(dragons));
  }

  static delete(id: number) {
    const dragons = this.load().filter((d) => d.id !== id);
    localStorage.setItem("dragons", JSON.stringify(dragons));
  }
}

