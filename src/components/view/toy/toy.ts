import ToyObject from '../../interfaces/interface';
import './toy.css';
class Toy {
  draw(data: Array<ToyObject>, chosen?: string | null) {
    const fragment = document.createDocumentFragment();
    const toy = document.querySelector('#toysTemp') as HTMLTemplateElement;

    data.forEach((item) => {
      const toysClone = toy.content.cloneNode(true) as HTMLElement;
      const toyTitle = toysClone.querySelector('.toy__title') as HTMLElement;
      const toyImage = toysClone.querySelector('.toy__image') as HTMLElement;
      const toyAmount = toysClone.querySelector('.toy__amount') as HTMLElement;
      const toyYear = toysClone.querySelector('.toy__year') as HTMLElement;
      const toyForm = toysClone.querySelector('.toy__form') as HTMLElement;
      const toyColor = toysClone.querySelector('.toy__color') as HTMLElement;
      const toySize = toysClone.querySelector('.toy__size') as HTMLElement;
      const toyFavorite = toysClone.querySelector('.toy__favorite') as HTMLElement;

      function insertNull(referenceNode: HTMLElement): HTMLElement {
        if (referenceNode !== null) {
          return referenceNode;
        }
        throw Error('ref node is null');
      }

      insertNull(toyTitle).textContent = item.name;
      insertNull(toyImage).style.backgroundImage = `url('./assets/toys/${item.num}.png')`;
      insertNull(toyAmount).textContent = 'Количество:' + item.count;
      insertNull(toyYear).textContent = 'Год покупки: ' + item.year;
      insertNull(toyForm).textContent = 'Форма игрушки: ' + item.shape;
      insertNull(toyColor).textContent = 'Цвет игрушки: ' + item.color;
      insertNull(toySize).textContent = 'Размер игрушки: ' + item.size;
      insertNull(toyFavorite).textContent = 'Любимая: ' + item.favorite;

      fragment.append(toysClone);
    });

    const toysElement = document.querySelector('.toys');
    if (toysElement !== null) {
      while (toysElement.firstChild) {
        toysElement.removeChild(toysElement.firstChild);
      }
      toysElement.append(fragment);
    }
    if (chosen) {
      const toys = document.querySelectorAll('.toy') ;
      const arrChosen = chosen.split(',');
      toys.forEach((toy) => {
        if (toy.children[0] !== undefined) {
          if (toy.children[0].textContent !== null) {
            if (arrChosen.includes(toy.children[0].textContent)) {
              toy.classList.add('toy-favorite');
            }
          }
        }
      });
    }
  }
}

export default Toy;
