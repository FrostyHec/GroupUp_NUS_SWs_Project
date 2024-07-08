import React from "react";
import FormElementsSidebar from "./FormElementsSidebar";

function DesignerSidebar() {
  return (
    // <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
    <aside className="w-[100px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      <FormElementsSidebar />
    </aside>
  );
}

export default DesignerSidebar;
