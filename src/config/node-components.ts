import { InitialNode } from "@/components/inital-node";
import { NodeType } from "@/generated/prisma/enums";
import type { NodeTypes } from "@xyflow/react";

export const nodeComponents ={
    [NodeType.INITAL] : InitialNode,

} as const satisfies NodeTypes

export type RegisteredNodeType = keyof typeof nodeComponents