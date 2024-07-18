import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';

type FieldProps = {
  label: string;
  value: string;
  placeholder: string;
  editMode: boolean;
  onChange: (newValue: string) => void;
};

const FieldForm: React.FC<FieldProps> = ({ label, value, placeholder, editMode, onChange }) => {
  return (
    <div className="flex flex-row items-center m-2">
  <Label className="w-1/4 mr-2">{label}</Label>
  {editMode ? (
    <Input 
      type="text" 
      value={value} 
      placeholder={placeholder} 
      onChange={e => onChange(e.target.value)} 
      className="w-3/4 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
    />
  ) : (
    <Badge 
      className="w-3/4 p-2 border-gray-300 overflow-clip text-ellipsis"
    >
      {value}
    </Badge>
  )}
</div>

  );
};

export default FieldForm;
