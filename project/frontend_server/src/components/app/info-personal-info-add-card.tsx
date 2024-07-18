import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IoIosAdd} from "react-icons/io";
import {
  FieldsDispatchContext,
} from "./info-personal-info-change-cards";

export default function AddField() {
  const [label, setLabel] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const dispatch = useContext(FieldsDispatchContext);
  return (
    <div className="flex columns-3">
      <Input
        placeholder="Field Name."
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        className="m-1 w-2/5"
      />
      <Input
        placeholder="Placeholder."
        value={placeholder}
        onChange={(e) => setPlaceholder(e.target.value)}
        className="m-1 w-2/5"
      />
      <Button
        onClick={() => {
          setLabel("");
          setPlaceholder("");
          dispatch({
            type: "added",
            label: label,
            placeholder: placeholder,
          });
        }}
        className="m-1 w-1/5"
      >
        <IoIosAdd />
      </Button>
    </ div>
  );
}
