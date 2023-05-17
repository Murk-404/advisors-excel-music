// src/mocks/handlers.js
import { rest } from "msw";
import songs from "./songs.js";
export const handlers = [
  rest.get("/v1/songs", (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem("is-authenticated", "true");
    return res(ctx.status(200), ctx.json([...songs]), ctx.delay(2000));
  }),
];
