import './toys.css';
import toys from './toys.html';
// import ToyObject from '../../interfaces/interface';
import View from '../../view/view';
import Controller from '../../controller/controller';
import { removeClass, removeCheckbox, insertNull } from '../../interfaces/functions'

export class Toys {
  public view;
  public controller;
  constructor() {
    this.view = new View();
    this.controller = new Controller();
  }

  async render():Promise<string> {
    return toys;
  }

  async after_render() {
    document.getElementById('header_container')?.classList.remove('none');
    this.drawPageToys();
  }
 
  drawPageToys() {

    const filterArrayToys = this.controller.getToysArray();
    this.view.drawToys(filterArrayToys, localStorage.getItem('chosen'));
    const settingShapes = document.querySelector('.settings__shapes') as HTMLElement;
    const settingColor = document.querySelector('.settings__color') as HTMLElement;
    const settingsSize = document.querySelector('.settings__size') as HTMLElement;
    const sortSelect = document.querySelector('.settings__sort') as HTMLSelectElement;
    const sortAmount = document.querySelector('.settings__amount') as HTMLInputElement;
    const sortYear = document.querySelector('.settings__year') as HTMLInputElement;
    const settingsFavorite = document.querySelector('.settings__favorite') as HTMLInputElement;
    const resetSettings = document.querySelector('.reset-settings') as HTMLElement;
    const resetFilters = document.querySelector('.reset-filters') as HTMLElement;
    const search = document.querySelector('.search') as HTMLInputElement;
    const toys = document.querySelector('.toys') as HTMLElement;
    insertNull(settingShapes).addEventListener('click', this.drawByShape.bind(this));
    insertNull(settingColor).addEventListener('click', this.drawByColor.bind(this));
    insertNull(settingsSize).addEventListener('click', this.drawBySize.bind(this));
    insertNull(sortSelect).addEventListener('input', this.drawBySelect.bind(this));
    insertNull(sortAmount).addEventListener('input', this.drawByAmount.bind(this));
    insertNull(sortYear).addEventListener('input', this.drawByYear.bind(this));
    insertNull(settingsFavorite).addEventListener('input', this.drawByFavorite.bind(this));
    insertNull(resetSettings).addEventListener('click', this.resetSettings.bind(this));
    insertNull(search).addEventListener('input', this.search.bind(this));
    insertNull(toys).addEventListener('click', this.addToysFavorite.bind(this));
    insertNull(resetFilters).addEventListener('click', this.resetFilters.bind(this));
  }

  drawByShape(e: Event) {
    if (e !== null && e.target !== null) {
      const element = e.target as HTMLElement;
      const parentElement = element.parentElement;

      if (parentElement !== null && parentElement.classList.contains('shape-ball')) {
        const getDataAttribute: string | undefined = parentElement.dataset['shape'];
        if (parentElement.classList.contains('shape-active')) {
          parentElement.classList.remove('shape-active');
          this.controller.deleteStorageElement('shape', getDataAttribute);
        } else {
          parentElement.classList.add('shape-active');
          this.controller.setStorageData('shape', getDataAttribute);
        }
        const filterArrayToys = this.controller.getToysArray();
        this.view.drawToys(filterArrayToys, localStorage.getItem('chosen'));
      }
    }
  }

  drawByColor(e: Event) {
    if (e !== null && e.target !== null) {
      const element = e.target as HTMLElement;

      if (element !== null && element.classList.contains('color-button')) {
        const getDataAttribute: string | undefined = element.dataset['color'];
        if (element.classList.contains('color-active')) {
          element.classList.remove('color-active');
          this.controller.deleteStorageElement('color', getDataAttribute);
        } else {
          element.classList.add('color-active');
          this.controller.setStorageData('color', getDataAttribute);
        }
        const filterArrayToys = this.controller.getToysArray();
        this.view.drawToys(filterArrayToys, localStorage.getItem('chosen'));
      }
    }
  }

  drawBySize(e: Event) {
    if (e !== null && e.target !== null) {
      const element = e.target as HTMLInputElement;

      if (element !== null && element.name === 'size') {
        const getDataAttribute: string | undefined = element.value;
        if (!element.checked) {
          this.controller.deleteStorageElement('size', getDataAttribute);
        } else {
          this.controller.setStorageData('size', getDataAttribute);
        }
        const filterArrayToys = this.controller.getToysArray();
        this.view.drawToys(filterArrayToys, localStorage.getItem('chosen'));
      }
    }
  }

  drawBySelect(e: Event) {
    if (e !== null && e.target !== null) {
      const element = e.target as HTMLInputElement;

      if (element !== null) {
        const getDataAttribute: string | undefined = element.value;
        localStorage['select'] = getDataAttribute;
        const filterArrayToys = this.controller.getToysArray();
        this.view.drawToys(filterArrayToys, localStorage.getItem('chosen'));
      }
    }
  }

  drawByAmount(e: Event) {
    if (e !== null && e.target !== null) {
      const element = e.target as HTMLInputElement;
      const value: number = ((+element.value - 1) / 11) * 100;
      this.rangeAmount(value, element);
      if (element !== null) {
        const getDataAttribute: string | undefined = element.value;
        localStorage['amount'] = getDataAttribute;
        const filterArrayToys = this.controller.getToysArray();
        this.view.drawToys(filterArrayToys, localStorage.getItem('chosen'));
      }
    }
  }

  rangeAmount(value: number, element: HTMLInputElement) {
    element.style.background = `linear-gradient(to right, #24C5DB 0%, #24C5DB ${value}%, 
      #C4C4C4 ${value}%, white 100%)`;
    const minCount = document.querySelector('.amount-text__min') as HTMLElement;
    if (minCount !== null) {
      minCount.textContent = element.value;
    }
  }

  drawByYear(e: Event) {
    if (e !== null && e.target !== null) {
      const element = e.target as HTMLInputElement;
      const value: number = ((+element.value - 1940) / 80) * 100;
      this.rangeYear(value, element);
      if (element !== null) {
        const getDataAttribute: string | undefined = element.value;
        localStorage['year'] = getDataAttribute;
        const filterArrayToys = this.controller.getToysArray();
        this.view.drawToys(filterArrayToys, localStorage.getItem('chosen'));
      }
    }
  }

  rangeYear(value: number, element: HTMLInputElement) {
    element.style.background = `linear-gradient(to right, #24C5DB 0%, #24C5DB ${value}%, 
      #C4C4C4 ${value}%, white 100%)`;
    const minCount = document.querySelector('.year-text__min') as HTMLElement;
    if (minCount !== null) {
      minCount.textContent = element.value;
    }
  }

  drawByFavorite(e: Event) {
    if (e !== null && e.target !== null) {
      const element = e.target as HTMLInputElement;

      if (element !== null) {
        const getDataAttribute: boolean | undefined = element.checked;
        if (!getDataAttribute) {
          localStorage['favorite'] = '';
        } else {
          this.controller.setStorageData('favorite', `${getDataAttribute}`);
        }
        const filterArrayToys = this.controller.getToysArray();
        this.view.drawToys(filterArrayToys, localStorage.getItem('chosen'));
      }
    }
  }

  resetSettings() {
    const favoriteToys = document.querySelector('.favorite-toys__count') as HTMLElement;
    if (favoriteToys !== null) {
      favoriteToys.textContent = '00';
    }
    localStorage.clear();
    this.resetFilters();
  }

  resetFilters() {
    const select: string | null = localStorage.getItem('select');
    const chosen: string | null = localStorage.getItem('chosen');
    localStorage.clear();
    if (select) {
      localStorage.setItem('select', select);
    }
    if (chosen) {
      localStorage.setItem('chosen', chosen);
    }
    const sortAmount = document.querySelector('.settings__amount') as HTMLInputElement;
    const sortYear = document.querySelector('.settings__year') as HTMLInputElement;
    const colorButtons: NodeListOf<HTMLElement> = document.querySelectorAll('.color-button') ;
    const shapeButton: NodeListOf<HTMLElement> = document.querySelectorAll('.shape-ball');
    const checkboxSize: NodeListOf<HTMLInputElement> = document.querySelectorAll('.size-checkbox') ;
    if (sortAmount !== null) {
      sortAmount.value = '0';
      this.rangeAmount(0, sortAmount);
    }
    if (sortYear !== null) {
      sortYear.value = '0';
      this.rangeYear(0, sortYear);
    }
    if (shapeButton !== null) {
      removeClass(shapeButton, 'shape-active');
    }
    if (colorButtons !== null) {
      removeClass(colorButtons, 'color-active');
    }
    if (checkboxSize !== null) {
      removeCheckbox(checkboxSize);
    }
    const filterArrayToys = this.controller.getToysArray();
    this.view.drawToys(filterArrayToys, localStorage.getItem('chosen'));
  }

  search(e: Event) {
    if (e !== null && e.target !== null) {
      const element = e.target as HTMLInputElement;
      const elementValue: string = element.value;
      const filterArrayToys = this.controller.getToysArray();
      const searchArrayToys = this.controller.sortSearch(filterArrayToys, elementValue);
      const searchError = document.querySelector('.search-error') as HTMLElement;
      if (searchArrayToys.length === 0) {
        if (searchError !== null) {
          searchError.classList.remove('none');
        }
      } else {
        if (searchError !== null) {
          searchError.classList.add('none');
        }
      }
      this.view.drawToys(searchArrayToys, localStorage.getItem('chosen'));
    }
  }

  addToysFavorite(e: Event) {
    if (e !== null && e.target !== null) {
      const element = e.target as HTMLInputElement;
      const favoriteToys = document.querySelector('.favorite-toys__count') as HTMLElement;
      const favoriteError = document.querySelector('.favorite-toy__error') as HTMLElement;
      if (favoriteToys !== null) {
        const favoriteToysCount = favoriteToys.textContent;
        if (element !== null && element.classList.contains('toy')) {
          if (element.classList.contains('toy-favorite') && favoriteToys !== null) {
            if (favoriteError !== null && favoriteError.classList.contains('favorite-toy__error')) {
              favoriteError.classList.add('hidden');
            }
            this.controller.deleteStorageElement('chosen', `${element.children[0]?.textContent}`);
            element.classList.remove('toy-favorite');
            favoriteToys.textContent = this.changeFavoriteCount(favoriteToysCount, 'down');
          } else {
            if (favoriteToysCount !== null && +favoriteToysCount < 20) {
              this.controller.setStorageData('chosen', `${element.children[0]?.textContent}`);
              element.classList.add('toy-favorite');
              favoriteToys.textContent = this.changeFavoriteCount(favoriteToysCount, 'up');
            } else {
              if (favoriteError !== null) {
                favoriteError.classList.remove('hidden');
              }
            }
          }
        } else if (element.parentElement?.classList.contains('toy')) {
          if (element.parentElement.classList.contains('toy-favorite') && favoriteToys !== null) {
            if (favoriteError !== null && favoriteError.classList.contains('favorite-toy__error')) {
              favoriteError.classList.add('hidden');
            }
            this.controller.deleteStorageElement('chosen', `${element.parentElement.children[0]?.textContent}`);
            element.parentElement.classList.remove('toy-favorite');
            favoriteToys.textContent = this.changeFavoriteCount(favoriteToysCount, 'down');
          } else {
            if (favoriteToysCount !== null && +favoriteToysCount < 20) {
              this.controller.setStorageData('chosen', `${element.parentElement.children[0]?.textContent}`);
              element.parentElement.classList.add('toy-favorite');
              favoriteToys.textContent = this.changeFavoriteCount(favoriteToysCount, 'up');
            } else {
              if (favoriteError !== null) {
                favoriteError.classList.remove('hidden');
              }
            }
          }
        }
      }
    }
  }

  changeFavoriteCount(count: string | null, change: 'up' | 'down') {
    if (change === 'down' && count === '00') return '00';
    if (change === 'up' && count === '20') {
      return '20';
    }
    if (count && change === 'down') {
      return `${+count - 1}`.padStart(2, '0');
    }
    if (count && change === 'up') {
      return `${+count + 1}`.padStart(2, '0');
    }
    return '';
  }

  getFavoriteArray() {
    const favoriteToys = localStorage.getItem('chosen');
    if(favoriteToys && favoriteToys !== '') {
      return this.controller.getFavoriteToysArray(favoriteToys);
    } else {
      return this.controller.getDefaultArray();
    }
  }
   
}