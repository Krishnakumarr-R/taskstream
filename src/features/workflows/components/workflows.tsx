"use client";

import {
  EmptyView,
  EntityContainer,
  EntityHeader,
  EntityItem,
  EntityList,
  EntityPagination,
  EntitySearch,
  ErrorView,
  LoadingView,
} from "@/components/entity-components";
import {
  useSuspenseWorkflows,
  useCreateWorkflow,
  useRemoveWorkflow,
} from "../hooks/use-workflows";
import { useUpgradeModel } from "@/hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import type{ Workflow } from "@/generated/prisma/client";
import { WorkflowIcon } from "lucide-react";
import {formatDistanceToNow} from "date-fns"

export const WorkflowSearch = () => {
  const [params, setParams] = useWorkflowsParams();
  const { searchValue, onSearchChange } = useEntitySearch({
    params,
    setParams,
  });
  return (
    <EntitySearch
      value={searchValue}
      onChange={onSearchChange}
      placeholder="Search workflows"
    />
  );
};

export const WorkFlowsList = () => {
  const workflows = useSuspenseWorkflows();

  return (
    <EntityList
      items={workflows.data.items}
      getKey={(workflows) => workflows.id}
      renderItem={(workflow) => <WorkflowItem data={workflow}></WorkflowItem>}
      emptyView={<WorkflowsEmpty />}
    />
  );
};

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const createWorkflows = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModel();
  const router = useRouter();

  const handleCreate = () => {
    createWorkflows.mutate(undefined, {
      onSuccess(data) {
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        handleError(error);
      },
    });
  };

  return (
    <>
      {modal}
      <EntityHeader
        title="Workflows"
        description="Create and manage your workflows"
        onNew={handleCreate}
        newButtonLabel="New Workflow"
        disabled={disabled}
        isCreating={createWorkflows.isPending}
      />
    </>
  );
};

export const WorkflowsPagination = () => {
  const workflows = useSuspenseWorkflows();
  const [params, setParams] = useWorkflowsParams();

  return (
    <EntityPagination
      disabled={workflows.isFetching}
      totalpage={workflows.data.totalPages}
      page={workflows.data.page}
      onPageChange={(page) => setParams({ ...params, page })}
    />
  );
};

export const WorkflowContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<WorkflowSearch />}
      pagination={<WorkflowsPagination />}
    >
      {children}
    </EntityContainer>
  );
};

export const WorkflowsLoading = () => {
  return <LoadingView message="Loading workflows..." />;
};

export const WorkflowsError = () => {
  return <ErrorView message="Error Loading workflows..." />;
};

export const WorkflowsEmpty = () => {
  const createWorkflows = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModel();
  const router = useRouter();

  const handleCreate = () => {
    createWorkflows.mutate(undefined, {
      onSuccess(data) {
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        handleError(error);
      },
    });
  };
  return (
    <>
      {modal}
      <EmptyView
        onNew={handleCreate}
        message="You have't create a workflow yet."
      />
    </>
  );
};

export const WorkflowItem = ({ data }: { data: Workflow }) => {
  const  removeWorkflow  = useRemoveWorkflow();
  const handleRemove = ()=>{
    removeWorkflow.mutate({id:data.id})
  }
  return (
    <EntityItem
      href={`/workflows/${data.id}`}
      title={data.name}
      subtitle={
        <>
          Updated {formatDistanceToNow(data.updatedAt,{addSuffix:true})}{" "}
          &bull; Created{" "}
          {formatDistanceToNow(data.createdAt,{addSuffix:true})}
        </>
      }
      image={
        <div className="size-8 flex items-center justify-center">
          <WorkflowIcon className="size-5 text-muted-foreground" />
        </div>
      }
      onRemove={handleRemove}
      isRemoving={removeWorkflow.isPending}
    />
  );
};
