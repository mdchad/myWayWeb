import { router } from "../trpc";
import { authRouter } from "./auth";
import { userRouter } from "./users";
import { notesRouter } from "./notes";
import { hadithsRouter } from "./hadiths";
import { booksRouter } from "./books";
import {volumesRouter} from "./volumes";

export const appRouter = router({
  auth: authRouter,
  users: userRouter,
  notes: notesRouter,
  hadiths: hadithsRouter,
  books: booksRouter,
  volumes: volumesRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
