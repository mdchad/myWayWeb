import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const notesRouter = router({
  byId: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.notes.findFirst({ where: { id: input } });
  }),
  create: protectedProcedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.notes.create({ data: input });
    })
});
