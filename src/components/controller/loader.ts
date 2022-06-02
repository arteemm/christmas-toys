import ToyObject from '../interfaces/interface';

class Loader {
  constructor(protected toysArray: Array<ToyObject>) {
    this.toysArray = toysArray;
  }
}

export default Loader;
