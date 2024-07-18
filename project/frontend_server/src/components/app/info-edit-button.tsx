import React from 'react';
import { Button } from '../ui/button';

type EditButtonProps = {
  editMode: boolean;
  onClick: () => void;
};

const EditButton: React.FC<EditButtonProps> = ({ editMode, onClick }) => {
  return (
    <Button onClick={onClick}>
      {editMode ? 'Save' : 'Edit'}
    </Button>
  );
};

export default EditButton;
