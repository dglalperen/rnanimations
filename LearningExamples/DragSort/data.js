const ALBUM_COVERS = {
  DISCOVERY:
    "https://upload.wikimedia.org/wikipedia/en/a/ae/Daft_Punk_-_Discovery.jpg",
  HUMAN_AFTER_ALL:
    "https://upload.wikimedia.org/wikipedia/en/0/0d/Humanafterall.jpg",
  HOMEWORK:
    "https://upload.wikimedia.org/wikipedia/en/9/9c/Daftpunk-homework.jpg",
  RANDOM_ACCESS_MEMORIES:
    "https://upload.wikimedia.org/wikipedia/en/a/a7/Random_Access_Memories.jpg",
};

const DAFT_PUNK = "Daft Punk";

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

function clamp(value, lowerBound, upperBound) {
  "worklet";
  return Math.max(lowerBound, Math.min(value, upperBound));
}

const SONGS = shuffle([
  {
    id: "one-more-time",
    title: "One More Time",
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.DISCOVERY,
  },
  {
    id: "digital-love",
    title: "Digital Love",
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.DISCOVERY,
  },
  {
    id: "nightvision",
    title: "Nightvision",
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.DISCOVERY,
  },
  {
    id: "something-about-us",
    title: "Something About Us",
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.DISCOVERY,
  },
  {
    id: "veridis-quo",
    title: "Veridis Quo",
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.DISCOVERY,
  },
  {
    id: "make-love",
    title: "Make Love",
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.HUMAN_AFTER_ALL,
  },
  {
    id: "television-rules-the-nation",
    title: "Television Rules the Nation",
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.HUMAN_AFTER_ALL,
  },
  {
    id: "phoenix",
    title: "Phoenix",
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.HOMEWORK,
  },
  {
    id: "revolution-909",
    title: "Revolution 909",
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.HOMEWORK,
  },
  {
    id: "around-the-world",
    title: "Around the World",
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.HOMEWORK,
  },
  {
    id: "within",
    title: "Within",
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: "touch",
    title: "Touch (feat. Paul Williams)",
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: "beyond",
    title: "Beyond",
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: "motherboard",
    title: "Motherboard",
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
]);

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

const SONG_HEIGHT = 70;
const SCROLL_HEIGHT_THRESHOLD = SONG_HEIGHT;

export {
  DAFT_PUNK,
  ALBUM_COVERS,
  SONGS,
  SCROLL_HEIGHT_THRESHOLD,
  SONG_HEIGHT,
  listToObject,
  clamp,
  objectMove,
};
