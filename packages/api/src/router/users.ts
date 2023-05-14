import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const userRouter = router({
  byId: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.users.findFirst({ where: { id: input } });
  }),
  create: protectedProcedure
    .input(z.object({ email: z.string(), notes: z.string().array().optional(), favourites:z.string().array().optional(), hadithRead: z.string().array().optional(), settings: z.object({ theme: z.string().optional(), language: z.string().optional(), fontSize: z.string().optional(), location: z.string().optional()}).optional() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.users.upsert({
        where: {
          email: input.email,
        },
        update: {},
        create: input
      });
    })
});
