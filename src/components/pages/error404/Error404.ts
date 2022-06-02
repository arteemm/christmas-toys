import Error404Element from './Error404.html';
import './Error404.css';

export class Error404 {

  async render (): Promise<string> {
    return Error404Element;
  }

  async after_render() {}
}
