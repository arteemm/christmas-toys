import Toy from './toy/toy';
import ToyObject from '../interfaces/interface';
import ChristmasTree from './Christmas-tree/christmas-tree';
import Garland from './Garland/garland';

class View {
  public toy;
  public christmasTree;
  public garland;
  constructor() {
    this.toy = new Toy();
    this.christmasTree = new ChristmasTree();
    this.garland = new Garland();
  }

  drawToys(data: Array<ToyObject>, chosen?: string | null) {
    if (data.length === 0) {
      this.drawErrorToys();
    } else {
      this.toy.draw(data, chosen);
    }
  }

  drawErrorToys() {
    const toys = document.querySelector('.toys') as HTMLElement;
    const error = document.createElement('p') as HTMLElement;
    error.classList.add('error-toys');
    error.textContent = 'Игрушек по данным параметрам не найдено!';
    if (toys !== null) {
      while (toys.firstChild) {
        toys.removeChild(toys.firstChild);
      }
      toys.appendChild(error);
    }
  }

  drawChristmasTree(data: Array<ToyObject>) {
    this.christmasTree.drawToys(data)
  }

  drawGarland() {
    this.garland.drawGarland();
  }

  deleteGarland() {
    this.garland.removeGarland();
  }
}

export default View;
