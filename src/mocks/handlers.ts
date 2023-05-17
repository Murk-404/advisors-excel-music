// src/mocks/handlers.js
import { rest } from "msw";
import { songs } from "./songs";
// import { NewSong } from "../types/Song";
import { CreateSongResponse, SongResponse } from "../services/songService";
// import { GetSongsResponse } from "../services/songService";
export const handlers = [
  rest.get("/v1/songs", (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem("is-authenticated", "true");
    return res(ctx.status(200), ctx.json(songs), ctx.delay(0));
  }),

  rest.post("/v1/songs", async (req, res, ctx) => {
    const newSong = (await req.json()) as CreateSongResponse;
    newSong.data.id = (songs.data.length + 1).toString();
    newSong.data.attributes.createdAt = new Date().toISOString();
    newSong.data.attributes.updatedAt = new Date().toISOString();
    newSong.data.attributes.createdBy = "admin";
    newSong.data.attributes.updatedBy = "admin";

    // HACK: Add song to in-memory database
    songs.data.push(newSong.data);
    return res(ctx.status(201), ctx.json(newSong), ctx.delay(0));
  }),
];

// rest.post("/v1/songs", async (req, res, ctx) => {
//   // Persist user's authentication in the session
//   sessionStorage.setItem("is-authenticated", "true");
//   const newSong = (await req.json()) as CreateSongResponse;
//   const song: SongResponse = {
//     type: "songs",
//     id: Math.floor(Math.random() * 1000).toString(),
//     attributes: {
//       ...newSong.data.attributes,
//       createdBy: "admin",
//       createdAt: new Date().toISOString(),
//       updatedBy: "admin",
//       updatedAt: new Date().toISOString(),
//       // image: "",
//     },
//   };
//   console.log("song", song);
//   songs.data.push(song);
//   return res(ctx.status(201), ctx.json(song), ctx.delay(0));
// }),
