import ky from "ky";
import { Song, NewSong } from "../types/Song";
import { Deserializer, Serializer } from "jsonapi-serializer";

export type SongResponse = {
  type: "songs";
  id: string;
  attributes: {
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
    artist: string;
    title: string;
    length: string;
  };
  relationships?: {
    album: {
      data: {
        type: "album";
        id: string;
      };
    };
    playlists?: {
      data: [
        {
          type: "playlists";
          id: string;
        }
      ];
    };
    likes?: {
      data: [
        {
          type: "likes";
          id: string;
        }
      ];
    };
  };
};

export type GetSongsResponse = {
  data: SongResponse[];
  included?: [
    {
      type: string;
      id: string;
      attributes: {
        createdBy: string;
        createdAt: string;
        updatedBy: string;
        updatedAt: string;
        name: string;
      };
      relationships: {
        songs: {
          data: [
            {
              type: string;
              id: string;
            }
          ];
        };
      };
    }
  ];
  links?: {
    first: string;
    last: string;
    prev: string;
    next: string;
  };
};

export type CreateSongResponse = {
  data: SongResponse;
};

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export async function getSongs(): Promise<Song[]> {
  const resp = (await ky(`${baseUrl}/v1/songs`, {
    headers: {
      accept: "application/vnd.api+json",
      prefer: "code=200, dynamic=true",
    },
  }).json()) as GetSongsResponse;

  const deserializer = new Deserializer({
    keyForAttribute: "camelCase",
  });
  const songs = await deserializer.deserialize(resp);
  return songs;
}

export async function createSong(
  newSong: NewSong
  // image: string
): Promise<Song> {
  // const updatedSongs: Song = {
  //   ...newSong,
  //   id: Math.floor(Math.random() * 1000).toString(),
  //   createdBy: "admin",
  //   createdAt: new Date().toISOString(),
  //   updatedBy: "admin",
  //   updatedAt: new Date().toISOString(),
  //   image: image ? image : "",
  // };

  const serializer = new Serializer("songs", {
    keyForAttribute: "camelCase",
    attributes: Object.keys(newSong),
  });

  const json = serializer.serialize(newSong);
  console.log(json);

  const resp = (await ky
    .post(`${baseUrl}/v1/songs`, {
      json,
      headers: {
        accept: "application/vnd.api+json",
        prefer: "code=201, dynamic=true",
      },
    })
    // .json()) as CreateSongResponse;
    .json()) as SongResponse[];

  const deserializer = new Deserializer({
    keyForAttribute: "camelCase",
  });

  const createdSong = await deserializer.deserialize(resp);
  console.log("createdSong: ", createdSong);
  return createdSong;
}
