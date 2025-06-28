import React from 'react';
import type { Widget } from '../../types/Widget';
import './BaseWidget.scss';

export interface BaseWidgetProps {
  widget: Widget;
  onEdit?: () => void;
  onDelete?: () => void;
}

const BaseWidget: React.FC<BaseWidgetProps> = ({ 
  widget,
  onEdit,
  onDelete
}) => {
  const { type, content } = widget;

  return (
    <div className="widget">
      <div className="widget__header">
        <div className={`widget__icon widget__icon--${type}`} />
        <div className="widget__actions">
          {onEdit && (
            <button 
              className="widget__action-btn widget__action-btn--edit"
              onClick={onEdit}
            >
              <span className="sr-only">Редактировать</span>
            </button>
          )}
          {onDelete && (
            <button 
              className="widget__action-btn widget__action-btn--delete"
              onClick={onDelete}
            >
              <span className="sr-only">Удалить</span>
            </button>
          )}
        </div>
      </div>

      <div className="widget__content">
        <h3 className="widget__title">{content.title}</h3>
        {content.subtitle && (
          <p className="widget__subtitle">{content.subtitle}</p>
        )}
        {content.stats && (
          <div className="widget__stats">
            <span className="widget__stat">
              Подписчиков {content.stats.followers}
            </span>
            <span className="widget__stat">
              Подписок {content.stats.following}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseWidget; 