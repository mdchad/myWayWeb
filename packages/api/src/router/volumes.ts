import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const volumesRouter = router({
  byBookId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.volumes.findUnique({ where: { book_id: input } });
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.volumes.findUnique({ where: { id: input } });
  })
});
