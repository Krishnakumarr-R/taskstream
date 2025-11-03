import { workflowsRouter } from '@/features/workflows/server/routers';
import { createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';

export const appRouter = createTRPCRouter({
 workflows:workflowsRouter,
});

export type AppRouter = typeof appRouter;
