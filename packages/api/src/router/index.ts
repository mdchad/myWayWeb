import { router } from "../trpc";
import { authRouter } from "./auth";
import { userRouter } from "./users";
import { notesRouter } from "./notes";

export const appRouter = router({
  auth: authRouter,
  users: userRouter,
  notes: notesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
