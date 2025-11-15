import {
  WorkflowContainer,
  WorkflowsError,
  WorkFlowsList,
  WorkflowsLoading,
} from "@/features/workflows/components/workflows";
import { workflowsParamsLoader } from "@/features/workflows/server/params-loader";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import type{ SearchParams } from "nuqs/server";
import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";

type Props ={
  searchParams : Promise<SearchParams>
}

const page = async ({searchParams}:Props) => {
  const params = await workflowsParamsLoader(searchParams)
  await requireAuth();

  prefetchWorkflows(params);
  return (
    <WorkflowContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<WorkflowsError/>}>
          <Suspense fallback={<WorkflowsLoading/>}>
            <WorkFlowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowContainer>
  );
};

export default page;
