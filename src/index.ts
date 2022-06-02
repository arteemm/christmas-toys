'use strict';

import './style.css';

import { Home } from './components/pages/Home';
import { Utils } from './utils/Utils';
import { Toys } from './components/pages/toys';
import { Tree } from './components/pages/tree';
import { Error404 } from './components/pages/error404';

import { Header } from './components/components/header';
import { Footer } from './components/components/footer';

const homeInstance = new Home();
const toysInstance = new Toys();
const treeInstance = new Tree();
const error404Instance = new Error404();

const headerInstance = new Header();
const footerInstance = new Footer();

enum routes {
  home = '/' ,
  toys = '/toys',
  tree = '/tree'
};

const router = async () => {
  const header = null || document.getElementById('header_container') as HTMLElement;
  const content = null || document.getElementById('page_container') as HTMLElement;
  const footer = null || document.getElementById('footer_container') as HTMLElement;


  header.innerHTML = await headerInstance.render();
  await headerInstance.after_render();

  footer.innerHTML = await footerInstance.render();
  await footerInstance.after_render();

  const request = Utils.parseRequestURL();

  const parsedURL:string = (request.resource ? `/${request.resource}` : '/') + (request.id ? '/:id' : '') + (request.verb ? `/${request.verb}` : '');

  let page;

  switch (parsedURL) {
    case routes.home:
      page = homeInstance;
      break;
    case routes.toys:
      page = toysInstance;
      break;
    case routes.tree:
      page = treeInstance;
      break;
    default:
      page = error404Instance;
  }

  if ( typeof page !== 'undefined') {
    content.innerHTML = await page.render();
    await page.after_render();
  }
  
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);