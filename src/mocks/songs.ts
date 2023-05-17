import { Song } from "../types/Song";

const initSongs: Song[] = [
  {
    id: "1",
    createdBy: "admin",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
    updatedBy: "admin",
    artist: "Pink Floyd",
    title: "Time",
    length: "6:53",
    image:
      "https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png",
  },
  {
    id: "2",
    createdBy: "admin",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
    updatedBy: "admin",
    artist: "The Beatles",
    title: "Here Comes the Sun",
    length: "3:05",
    image:
      "https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg",
  },
];

export default initSongs;
