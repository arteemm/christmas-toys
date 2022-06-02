function removeClass(data: NodeListOf<HTMLElement>, className: string): void {
  data.forEach((item) => {
    item.classList.remove(className);
  });
}

function removeCheckbox(data: NodeListOf<HTMLInputElement>): void {
  data.forEach((item) => {
    item.checked = false;
  });
}

function insertNull(referenceNode: HTMLElement | HTMLInputElement | HTMLSelectElement): HTMLElement | HTMLInputElement | HTMLSelectElement {
  if (referenceNode !== null) {
    return referenceNode;
  }
  throw Error('ref node is null');
}


export { removeClass, removeCheckbox, insertNull };
