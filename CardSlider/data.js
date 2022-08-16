function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

function listToObject(list) {
  const values = Object.values(list);
  const object = {};

  for (let i = 0; i < values.length; i++) {
    object[values[i].id] = i;
  }
  return object;
}

function objectMove(object, from, to) {
  "worklet";
  const newObject = Object.assign({}, object);

  for (const id in object) {
    if (object[id] === from) {
      newObject[id] = to;
    }

    if (object[id] === to) {
      newObject[id] = from;
    }
  }

  return newObject;
}

const cards = [
  {
    id: "joechamps",
    title: "Joechamps Cologne",
    color: "pink",
  },
  {
    id: "7ieben",
    title: "7ieben Cologne",
    color: "lightgreen",
  },
  {
    id: "cafedesol",
    title: "Cafe De Sol",
    color: "tomato",
  },
  {
    id: "burgerking",
    title: "Burger King",
    color: "blue",
  },
  {
    id: "mcdonalds",
    title: "McDonalds",
    color: "purple",
  },
];

export { cards, listToObject };
