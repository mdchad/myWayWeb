import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const booksRouter = router({
  all: publicProcedure.query(({ ctx, input }) => {
    return ctx.prisma.books.findMany();
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.books.findUnique({ where: { id: input } });
  })
});
