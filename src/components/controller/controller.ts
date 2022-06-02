import AppLoader from './appLoader';
import ToyObject from '../interfaces/interface';

class Controller extends AppLoader {
  getToysArray() {
    let toysArrayClone = [...this.toysArray];
    const storageData: Storage = this.getStorageData();
    toysArrayClone = this.sortByShape(toysArrayClone, storageData['shape']);
    toysArrayClone = this.sortByColor(toysArrayClone, storageData['color']);
    toysArrayClone = this.sortBySize(toysArrayClone, storageData['size']);
    toysArrayClone = this.sortBySelect(toysArrayClone, storageData['select']);
    toysArrayClone = this.sortByAmount(toysArrayClone, storageData['amount']);
    toysArrayClone = this.sortByYear(toysArrayClone, storageData['year']);
    toysArrayClone = this.sortByFavorite(toysArrayClone, storageData['favorite']);
    return toysArrayClone;
  }

  sortByShape(data: Array<ToyObject>, shape: string | undefined) {
    if (shape) {
      const sortData = shape.split(',').reduce((array: Array<ToyObject>, itemShape) => {
        const arr = data.filter((item) => item.shape === `${itemShape}`);
        array.push(...arr);
        return array;
      }, []);
      return sortData;
    }
    return data;
  }

  sortByColor(data: Array<ToyObject>, color: string | undefined) {
    if (color) {
      const sortData = color.split(',').reduce((array: Array<ToyObject>, itemColor) => {
        const arr = data.filter((item) => item.color === `${itemColor}`);
        array.push(...arr);
        return array;
      }, []);
      return sortData;
    }
    return data;
  }

  sortBySize(data: Array<ToyObject>, size: string | undefined) {
    if (size) {
      const sortData = size.split(',').reduce((array: Array<ToyObject>, itemSize) => {
        const arr = data.filter((item) => item.size === `${itemSize}`);
        array.push(...arr);
        return array;
      }, []);
      return sortData;
    }
    return data;
  }

  sortBySelect(data: Array<ToyObject>, select: string | undefined) {
    if (select) {
      if (select === 'increase') return data.sort((a, b) => (+a.year > +b.year ? 1 : -1));
      if (select === 'decrease') return data.sort((a, b) => (+a.year < +b.year ? 1 : -1));
      if (select === 'increaseWord') return data.sort((a, b) => (a.name > b.name ? 1 : -1));
      if (select === 'decreaseWord') return data.sort((a, b) => (a.name < b.name ? 1 : -1));
    }
    return data;
  }

  sortByAmount(data: Array<ToyObject>, amount: string | undefined) {
    if (amount) {
      return data.filter((item) => item.count === amount);
    }
    return data;
  }

  sortByYear(data: Array<ToyObject>, year: string | undefined) {
    if (year) {
      return data.filter((item) => item.year === year);
    }
    return data;
  }

  sortByFavorite(data: Array<ToyObject>, favorite: string | undefined) {
    if (favorite) {
      let bool: boolean;
      if (favorite === ',true' || favorite === 'true') bool = true;
      return data.filter((item) => item.favorite === bool);
    }
    return data;
  }

  setStorageData(key: string, value: string | undefined) {
    localStorage[key] !== undefined ? (localStorage[key] += `,${value}`) : (localStorage[key] = value);
  }

  sortSearch(data: Array<ToyObject>, search: string | undefined) {
    if (search === '') return data;
    if (search) {
      return data.filter((item) => {
        let name = item.name;
        let word = search;
        name = name.toLowerCase();
        word = word.toLowerCase();
        return name.indexOf(word) >= 0;
      });
    }
    return data;
  }

  getStorageData() {
    return { ...localStorage };
  }

  deleteStorageElement(key: string, attribute: string | undefined) {
    const keyStorage: Array<string> = localStorage[key].split(',');
    const test = keyStorage.filter((item) => item !== attribute);
    localStorage[key] = test.join(',');
  }

  getDefaultArray() {
    const toysArrayClone = [...this.toysArray];
    toysArrayClone.length = 20;
    return toysArrayClone;
  }

  getFavoriteToysArray(favoriteToys: string) {
    const toysArrayClone = [...this.toysArray];
    const sortData = favoriteToys.split(',').reduce((array: Array<ToyObject>, itemName) => {
      const arr = toysArrayClone.filter((item) => item.name === `${itemName}`);
      array.push(...arr);
      return array;
    }, []);
    return sortData;
  }

}

export default Controller;
