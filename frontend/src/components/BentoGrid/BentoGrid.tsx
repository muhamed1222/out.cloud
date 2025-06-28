import React, { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import type { Widget } from '../../types/Widget';
import BentoGridItem from './BentoGridItem';
import './BentoGrid.scss';

interface BentoGridProps {
  widgets: Widget[];
  onWidgetsChange: (widgets: Widget[]) => void;
  onEditWidget?: (widget: Widget) => void;
  onDeleteWidget?: (widgetId: string) => void;
}

const BentoGrid: React.FC<BentoGridProps> = ({
  widgets,
  onWidgetsChange,
  onEditWidget,
  onDeleteWidget
}) => {
  // Вычисляем размеры сетки на основе виджетов
  const calculateGridSize = (widgets: Widget[]) => {
    let maxX = 0;
    let maxY = 0;

    widgets.forEach(widget => {
      if (widget.position) {
        const widgetWidth = widget.size === 'large' ? 2 : 1;
        const widgetHeight = widget.size === 'large' ? 2 : widget.size === 'medium' ? 2 : 1;
        
        maxX = Math.max(maxX, widget.position.x + widgetWidth);
        maxY = Math.max(maxY, widget.position.y + widgetHeight);
      }
    });

    return { columns: maxX, rows: maxY };
  };

  // Проверяем, свободна ли позиция для виджета
  const isPositionAvailable = (
    x: number,
    y: number,
    size: Widget['size'],
    currentWidgets: Widget[],
    excludeWidgetId?: string
  ) => {
    const width = size === 'large' ? 2 : 1;
    const height = size === 'large' ? 2 : size === 'medium' ? 2 : 1;

    for (let i = x; i < x + width; i++) {
      for (let j = y; j < y + height; j++) {
        const isOccupied = currentWidgets.some(widget => {
          if (widget.id === excludeWidgetId || !widget.position) return false;

          const widgetWidth = widget.size === 'large' ? 2 : 1;
          const widgetHeight = widget.size === 'large' ? 2 : widget.size === 'medium' ? 2 : 1;

          return (
            i >= widget.position.x &&
            i < widget.position.x + widgetWidth &&
            j >= widget.position.y &&
            j < widget.position.y + widgetHeight
          );
        });

        if (isOccupied) return false;
      }
    }

    return true;
  };

  // Находим ближайшую свободную позицию
  const findNearestAvailablePosition = (
    startX: number,
    startY: number,
    size: Widget['size'],
    currentWidgets: Widget[],
    excludeWidgetId?: string
  ) => {
    const { columns } = calculateGridSize(currentWidgets);
    const maxAttempts = 50; // Предотвращаем бесконечный цикл
    let attempts = 0;

    // Спиральный поиск от стартовой позиции
    let layer = 0;
    while (attempts < maxAttempts) {
      for (let i = -layer; i <= layer; i++) {
        for (let j = -layer; j <= layer; j++) {
          const newX = startX + i;
          const newY = startY + j;

          if (
            newX >= 0 &&
            newY >= 0 &&
            newX < columns &&
            isPositionAvailable(newX, newY, size, currentWidgets, excludeWidgetId)
          ) {
            return { x: newX, y: newY };
          }

          attempts++;
        }
      }
      layer++;
    }

    // Если не нашли место, добавляем в конец
    return { x: 0, y: calculateGridSize(currentWidgets).rows };
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    // Если позиция не изменилась
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Находим перемещаемый виджет
    const draggedWidget = widgets.find(w => w.id === draggableId);
    if (!draggedWidget) return;

    // Создаем новый массив виджетов
    const newWidgets = Array.from(widgets);
    
    // Вычисляем новую позицию
    const dropX = Math.floor(destination.index % 4);
    const dropY = Math.floor(destination.index / 4);
    
    // Проверяем доступность позиции и находим ближайшую свободную
    const newPosition = findNearestAvailablePosition(
      dropX,
      dropY,
      draggedWidget.size,
      newWidgets,
      draggedWidget.id
    );

    // Обновляем позицию виджета
    const updatedWidgets = newWidgets.map(widget => {
      if (widget.id === draggableId) {
        return {
          ...widget,
          position: newPosition
        };
      }
      return widget;
    });

    onWidgetsChange(updatedWidgets);
  };

  const { columns, rows } = calculateGridSize(widgets);
  const totalCells = columns * rows;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="bento-grid" direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="bento-grid"
            style={{
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`
            }}
          >
            {widgets.map((widget, index) => (
              <BentoGridItem
                key={widget.id}
                widget={widget}
                index={index}
                onEdit={onEditWidget ? () => onEditWidget(widget) : undefined}
                onDelete={onDeleteWidget ? () => onDeleteWidget(widget.id) : undefined}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default BentoGrid; 