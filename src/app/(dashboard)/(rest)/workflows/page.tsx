import {
  WorkflowContainer,
  WorkFlowsList,
} from "@/features/workflows/components/workflows";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";

const page = async () => {
  await requireAuth();

  prefetchWorkflows();
  return (
    <WorkflowContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<p>error</p>}>
          <Suspense fallback={<p>loading...</p>}>
            <WorkFlowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowContainer>
  );
};

export default page;
