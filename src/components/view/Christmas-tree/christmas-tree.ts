import ToyObject from '../../interfaces/interface';

class ChristmasTree {

  drawToys(data: Array<ToyObject>) {
    const toysContainer = document.querySelector('.toys-container') as HTMLElement;

    data.forEach((item, index:number) => {
      const toyContainer = document.createElement('div');
      const toyCount = document.createElement('div');

      toyContainer.classList.add('toy-container');
      toyContainer.dataset['parentNum'] = `${index + 1}`
      toyCount.classList.add('toy-count');
      toyCount.textContent = `${item.count}`;
      toyCount.id = `${index + 1}-count`;
      let i = 0;
      while(i < +item.count) {
        const toyImage = document.createElement('img');
        toyImage.classList.add('toy-image');
        toyImage.draggable = true;
        toyImage.alt = 'toy image';
        toyImage.src = `./assets/toys/${item.num}.png`;
        toyImage.dataset['imgNum'] = `${index + 1}`;
        toyContainer.appendChild(toyImage);
        i = i + 1;
      }

      toyContainer.appendChild(toyCount);
      toysContainer.appendChild(toyContainer);
    })
  }
}

export default ChristmasTree;