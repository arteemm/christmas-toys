import headerElement from './header.html';
import './header.css';

export class Header {
  async render(): Promise<string> {
    return headerElement;
  }

  async after_render() {}
}