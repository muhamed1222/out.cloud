import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import type { Widget } from '../../types/Widget';
import WidgetFactory from '../Widgets/WidgetFactory';
import './BentoGridItem.scss';

interface BentoGridItemProps {
  widget: Widget;
  index: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

const BentoGridItem: React.FC<BentoGridItemProps> = ({
  widget,
  index,
  onEdit,
  onDelete
}) => {
  return (
    <Draggable draggableId={widget.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bento-grid__item bento-grid__item--${widget.size} ${
            snapshot.isDragging ? 'bento-grid__item--dragging' : ''
          }`}
        >
          <WidgetFactory
            widget={widget}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      )}
    </Draggable>
  );
};

export default BentoGridItem; 