import React from 'react';
import BaseWidget, { BaseWidgetProps } from './BaseWidget';
import './BehanceWidget.scss';

interface BehanceWidgetProps extends Omit<BaseWidgetProps, 'widget'> {
  widget: BaseWidgetProps['widget'] & {
    type: 'behance';
    content: {
      title: string;
      subtitle?: string;
      stats: {
        followers: number;
        following: number;
      };
      image?: string;
      projectCount?: number;
      appreciations?: number;
    };
  };
}

const BehanceWidget: React.FC<BehanceWidgetProps> = ({ widget, ...props }) => {
  return (
    <div className={`behance-widget behance-widget--${widget.size}`}>
      <BaseWidget widget={widget} {...props} />
      {widget.content.image && (
        <div className="behance-widget__image-container">
          <img 
            src={widget.content.image} 
            alt={widget.content.title}
            className="behance-widget__image" 
          />
        </div>
      )}
      {(widget.content.projectCount || widget.content.appreciations) && (
        <div className="behance-widget__metrics">
          {widget.content.projectCount && (
            <div className="behance-widget__metric">
              <span className="behance-widget__metric-value">
                {widget.content.projectCount}
              </span>
              <span className="behance-widget__metric-label">
                Проектов
              </span>
            </div>
          )}
          {widget.content.appreciations && (
            <div className="behance-widget__metric">
              <span className="behance-widget__metric-value">
                {widget.content.appreciations}
              </span>
              <span className="behance-widget__metric-label">
                Оценок
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BehanceWidget; 