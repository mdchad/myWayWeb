import { router } from "../trpc";
import { authRouter } from "./auth";
import { hadithsRouter } from "./hadiths";
import { booksRouter } from "./books";
import {volumesRouter} from "./volumes";
import {searchRouter} from "./search";

export const appRouter = router({
  auth: authRouter,
  hadiths: hadithsRouter,
  books: booksRouter,
  volumes: volumesRouter,
  search: searchRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
