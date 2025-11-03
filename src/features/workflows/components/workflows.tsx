"use client";

import { EntityContainer, EntityHeader } from "@/components/entity-components";
import { useSuspenseWorkflows , useCreateWorkflow } from "../hooks/use-workflows";
import { useUpgradeModel } from "@/hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";

export const WorkFlowsList = () => {
  const workflows = useSuspenseWorkflows();

  return (
    <div className="flex-1 flex justify-center items-center">
      <p>{JSON.stringify(workflows.data, null, 2)}</p>
    </div>
  );
};

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const createWorkflows = useCreateWorkflow();
  const {handleEroor,modal} = useUpgradeModel();
  const router = useRouter()

  const handleCreate = ()=>{
    createWorkflows.mutate(undefined,{
      onSuccess(data) {
        router.push(`/workflows/${data.id}`)
      },
      onError:(error)=>{
        handleEroor(error)
      }
    })
  }

  return(
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
  )
};

export const WorkflowContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer header={<WorkflowsHeader/>} search={<></>} pagination={<></>}>
      {children}
    </EntityContainer>
  );
};
