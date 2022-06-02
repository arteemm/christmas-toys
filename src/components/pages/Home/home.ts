import HomeElement from './home.html';
import './home.css';

export class Home {
  async render(): Promise<string> {
    return HomeElement;
  }

  async after_render() {
    document.getElementById('header_container')?.classList.add('none');
  }
}