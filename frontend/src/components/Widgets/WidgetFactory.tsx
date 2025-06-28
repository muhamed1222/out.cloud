import React from 'react';
import type { Widget } from '../../types/Widget';
import BehanceWidget from './BehanceWidget';
import BaseWidget from './BaseWidget';

interface WidgetFactoryProps {
  widget: Widget;
  onEdit?: () => void;
  onDelete?: () => void;
}

const WidgetFactory: React.FC<WidgetFactoryProps> = ({ widget, ...props }) => {
  switch (widget.type) {
    case 'behance':
      return <BehanceWidget widget={widget as any} {...props} />;
      
    // Добавьте другие типы виджетов здесь
    
    default:
      return <BaseWidget widget={widget} {...props} />;
  }
};

export default WidgetFactory; 