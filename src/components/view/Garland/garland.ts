class Garland {
  drawGarland() {
    this.removeGarland();
    const garlandContainerOne = document.getElementById('garland-tree1') as HTMLElement;
    const garlandContainerTwo = document.getElementById('garland-tree2') as HTMLElement;
    const garlandContainerThree = document.getElementById('garland-tree3') as HTMLElement;
    let i = 0;
    let countListItem = 5;
    while (i < 3) {
      const list = document.createElement('ul');
      list.classList.add('lightrope');
      let j = 0;
      while (j < countListItem) {
        const listItem = document.createElement('li');
        listItem.classList.add('lightropeItem');
        list.appendChild(listItem);
        j += 1;
      }
      i++;
      countListItem++;
      if (i === 1) {
        garlandContainerOne.appendChild(list);
      } else if (i === 2) {
        garlandContainerTwo.appendChild(list);
      } else {
        garlandContainerThree.appendChild(list);
      }
    }
  }

  removeGarland() {
    const garlandContainerOne = document.getElementById('garland-tree1') as HTMLElement;
    const garlandContainerTwo = document.getElementById('garland-tree2') as HTMLElement;
    const garlandContainerThree = document.getElementById('garland-tree3') as HTMLElement;
    while (garlandContainerOne.firstChild) {
      garlandContainerOne.removeChild(garlandContainerOne.firstChild);
    }
    while (garlandContainerTwo.firstChild) {
      garlandContainerTwo.removeChild(garlandContainerTwo.firstChild);
    }
    while (garlandContainerThree.firstChild) {
      garlandContainerThree.removeChild(garlandContainerThree.firstChild);
    }

  }
}

export default Garland;