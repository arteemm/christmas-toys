import './tree.css';
import treeElement from './tree.html';
import ToyObject from '../../interfaces/interface';
import { Toys } from '../toys';
import View from '../../view/view';
import { removeCheckbox } from '../../interfaces/functions';
export class Tree {
  private toys;
  private view;
  protected audio;
  protected isPlay;
  protected documentClick;
  constructor() {
    this.toys = new Toys();
    this.view = new View();
    this.audio = new Audio();
    this.isPlay = false;
    this.audio.src = './assets/audio/audio.mp3';
    this.documentClick = this.playAudioAfterLoad.bind(this);
  }

  async render(): Promise<string> {
    return treeElement;
  }
  
  async after_render() {
    this.drawToys();
    const draggable:NodeListOf<HTMLElement> = document.querySelectorAll('[draggable]');
    setInterval(this.createSnowFlake, 50);
    draggable.forEach((item) => {
      item.onmousedown = function(event: MouseEvent) {
        const itemParent = item.parentElement as HTMLElement;
        if (itemParent.classList.contains('toy-container')){
          const countElement = document.getElementById(`${item.getAttribute('data-img-num')}-count`);
          if (countElement !== null) {
            const count = countElement?.textContent;
            if (count !== null) {
              countElement.textContent = `${+count - 1}`
            }
          }
        }
        const shiftX = event.clientX - item.getBoundingClientRect().left;
        const shiftY = event.clientY - item.getBoundingClientRect().top;
        item.style.position = 'absolute';
        item.style.zIndex = '1000';
        document.body.append(item);

        moveAt(event.pageX, event.pageY);

        function moveAt(pageX: number, pageY: number) {
          item.style.left = `${pageX - shiftX}` + 'px';
          item.style.top = `${pageY - shiftY}` + 'px';
        }

        let currentDroppable: HTMLElement | null = null;

        function onMouseMove(event: MouseEvent) {
          moveAt(event.pageX, event.pageY);
          item.hidden = true;
          const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
          item.hidden = false;
          if (!elemBelow) return;
         
          const droppableBelow = elemBelow.closest('.droppable') as HTMLElement;

          if (currentDroppable != droppableBelow) {
            if (currentDroppable) {
              document.body.append(item);
            }
            currentDroppable = droppableBelow;
            if (currentDroppable) {
              droppableBelow.append(item);
            }
          }
        }
        document.addEventListener('mousemove', onMouseMove);
        item.onmouseup = function() {
          if (item.parentElement === document.body) {
            const itemsParent = document.querySelectorAll('[data-parent-num]');
              itemsParent.forEach((parent) => {
                if (parent.getAttribute('data-parent-num') === `${item.getAttribute('data-img-num')}`) {
                  parent.append(item);
                  item.style.removeProperty("z-index");
                  item.style.removeProperty("left");
                  item.style.removeProperty("top");
                }
              })
              const countElement = document.getElementById(`${item.getAttribute('data-img-num')}-count`);
              if (countElement !== null) {
                const count = countElement?.textContent;
                if (count !== null) {
                  countElement.textContent = `${+count + 1}`
                }
              }
          }
          document.removeEventListener('mousemove', onMouseMove);
          item.onmouseup = null;
        };
      
      };
      
      item.ondragstart = function() {
        return false;
      };
    });
  }

  drawToys() {
    document.getElementById('header_container')?.classList.remove('none');
    document.querySelector('.search')?.classList.add('hidden');
    const arrayToys: Array<ToyObject> = this.toys.getFavoriteArray();
    this.view.drawChristmasTree(arrayToys);
    window.addEventListener('beforeunload', this.writeStorage.bind(this));
    document.body.addEventListener('click', this.documentClick);
    const backgroundContainer = document.querySelector('.background-container') as HTMLElement;
    const treeContainer = document.querySelector('.trees') as HTMLElement;
    const garlandButtons = document.querySelector('.garland-container') as HTMLElement;
    const switchGarland = document.querySelector('.switch-garland') as HTMLElement;
    const buttonPlayAudio= document.querySelector('.button-volume') as HTMLElement;
    const buttonSnowFlake= document.querySelector('.button-snow') as HTMLElement;
    backgroundContainer.addEventListener('click', this.changeBackground.bind(this));
    treeContainer.addEventListener('click', this.changeMainTree.bind(this));
    garlandButtons.addEventListener('click', this.drawGarland.bind(this));
    switchGarland.addEventListener('click', this.toggleGarland.bind(this));
    buttonPlayAudio.addEventListener('click', this.playAudio.bind(this));
    buttonSnowFlake.addEventListener('click', this.toggleSnowFlake.bind(this));
  }

  changeBackground(e: Event) {
    const element = e.target as HTMLElement;
    const numberBackground =  element.getAttribute('data-background');
    const treeSection = document.querySelector('.tree-section') as HTMLElement;
    const img = new Image();
    if (numberBackground !== null) {
      img.src = `./assets/bg/${numberBackground}.jpg`;
      img.onload = () => {
        treeSection.style.backgroundImage = `url('./assets/bg/${numberBackground}.jpg')`;
      };
    }
  }

  changeMainTree(e: Event) {
    const element = e.target as HTMLElement;
    const numberTree =  element.getAttribute('data-tree');
    const mainTree = document.querySelector('.main-tree') as HTMLImageElement;
    const img = new Image();
    if (numberTree !== null) {
      img.src = `./assets/tree/${numberTree}.png`;
      img.onload = () => {
        mainTree.src = `./assets/tree/${numberTree}.png`;
      };
    }
  }

  drawGarland(e: Event) {
    const element = e.target as HTMLInputElement;
    const switchGarland = document.querySelector('.switch-garland') as HTMLInputElement;
    switchGarland.checked = true;
    if (element.name === 'garland') {
      const color = element.parentElement?.children.namedItem('garland')?.getAttribute('data-garland');
      if (color) {
        this.view.drawGarland();
        const items: NodeListOf<HTMLElement> = document.querySelectorAll('.lightropeItem');
        items.forEach((item) => item.classList.add(color));
      }
    }
  }

  toggleGarland(e: Event) {
    const element = e.target as HTMLInputElement;
    if(element.checked) {
      this.view.drawGarland();
      const items: NodeListOf<HTMLElement> = document.querySelectorAll('.lightropeItem');
      items.forEach((item) => item.classList.add('multicolored'));
      const checkElement = document.querySelector('.garland-multicolor') as HTMLInputElement;
      checkElement.checked = true;

    } else {
      const checkGarlands: NodeListOf<HTMLInputElement> = document.querySelectorAll('.radio-garland');
      this.view.deleteGarland();
      removeCheckbox(checkGarlands);
    }
  }

  playAudio(e?: Event) {
    if (e) {
      const element = e.target as HTMLElement;
      this.toggleAudioImage(element);
    }
    if (this.isPlay) {
      this.isPlay = false;
      this.audio.pause();
    } else {
      this.isPlay = true;
      this.audio.loop = true;
      this.audio.play();
    }
  }

  toggleAudioImage(element: HTMLElement) {
    if (element.classList.contains('audio-play')) {
      element.classList.remove('audio-play');
    } else {
      element.classList.add('audio-play');
    }
  }

  writeStorage() {
    localStorage.setItem('audio', `${this.isPlay}`);
  }

  playAudioAfterLoad() {
    const checkAudio = localStorage.getItem('audio');
    if (checkAudio === 'true') {
      const buttonPlayAudio= document.querySelector('.button-volume') as HTMLElement;
      this.playAudio();
      this.toggleAudioImage(buttonPlayAudio);
    } 
    document.body.removeEventListener('click', this.documentClick);
  }

  toggleSnowFlake() {
    const snowFlakeContainer = document.querySelector('.snowFlakeContainer') as HTMLElement;
    snowFlakeContainer.classList.toggle('hidden');
  }

  createSnowFlake() {
    const snowFlakeContainer = document.querySelector('.snowFlakeContainer') as HTMLElement;
    const snow_flake = document.createElement('i');
    snow_flake.classList.add('fas');
    snow_flake.classList.add('fa-snowflake-o');
    snow_flake.style.left = `${Math.random() * window.innerWidth}` + 'px';
    snow_flake.style.animationDuration = `${Math.random() * 3 + 2}` + 's'; // between 2 - 5 seconds
    snow_flake.style.opacity = `${Math.random()}`;
    snow_flake.style.fontSize = `${Math.random() * 10 + 10}` + 'px';
    
    snowFlakeContainer.appendChild(snow_flake);
    setTimeout(() => {
      snow_flake.remove();
    }, 5000)
  }
}