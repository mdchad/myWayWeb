import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const hadithsRouter = router({
  all: publicProcedure.query(({ ctx, input }) => {
    return ctx.prisma.hadiths.findMany();
  }),
  byVolumeId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.hadiths.findMany({ where: { volume_id: input } });
  })
});
