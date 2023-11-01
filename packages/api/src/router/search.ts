import { router, publicProcedure } from "../trpc";
import { z } from "zod";

const searchIndex = [
  {
    $search: {
      index: "content",
      text: {
        query: "",
        path: ["content.ms", "content.ar"]
      }
    }
  }
]

export const searchRouter = router({
  search: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.books.$executeRaw({ where: { id: input } });
  })
});
