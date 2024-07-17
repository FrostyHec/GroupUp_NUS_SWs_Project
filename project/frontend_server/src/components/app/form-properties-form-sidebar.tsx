import React from "react";
import useDesigner from "../hooks/useDesigner";
import { FormElements } from "../../schemas/form";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function PropertiesFormSidebar() {
  const { selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) return null;

  const PropertiesForm =
    FormElements[selectedElement?.type].propertiesComponent;

  return (
    <Sheet defaultOpen>
      <SheetTrigger asChild></SheetTrigger>
      <SheetContent
        onCloseAutoFocus={() => {
          setSelectedElement(null);
        }}
        className="overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>Element Properties</SheetTitle>
          <SheetDescription>
            Make changes to your element properties here.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col p-2">
          <Separator className="mb-4" />
          <PropertiesForm elementInstance={selectedElement} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default PropertiesFormSidebar;
