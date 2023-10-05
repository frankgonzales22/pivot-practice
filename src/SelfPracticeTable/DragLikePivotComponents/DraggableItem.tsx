import React from 'react';
import { useDrag } from 'react-dnd';

interface DraggableItemProps {
  id: string;
  text: string;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ id, text }) => {
  const [, ref] = useDrag({
    type: "row",
    item: { id, text },
  });

  return (
    <div ref={ref}  style={{ padding: '8px', border: '1px solid pink', margin: '4px' }}>
      {text}
    </div>
  );
};

export default DraggableItem;
