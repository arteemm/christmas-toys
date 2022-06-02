import Loader from './loader';
import data from '../../data.js';

class AppLoader extends Loader {
  constructor() {
    super(data);
  }
}

export default AppLoader;
