"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { authClient } from "@/lib/auth-client"

interface UpgradeModelProps{
    open:boolean;
    onOpenChange:(open : boolean) => void;
}

export const UpgradeModal = ({open,onOpenChange}:UpgradeModelProps)=>{
return(
    <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
            <AlertDialogHeader>Upgrade to pro</AlertDialogHeader>
             <AlertDialogDescription>you need an active subscription to perfrom action.</AlertDialogDescription>
               <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={()=>authClient.checkout({slug:"pro"})}>Upgrade now</AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
)
}