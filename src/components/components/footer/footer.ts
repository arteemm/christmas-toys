import footerElement from './footer.html';
import './footer.css';

export class Footer {
  async render(): Promise<string> {
    return footerElement;
  }

  async after_render() {}
}