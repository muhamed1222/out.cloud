import React, { useState, useCallback } from 'react';
import BentoGrid from '../BentoGrid/BentoGrid';
import type { Widget, WidgetType } from '../../types/Widget';
import './Editor.scss';

const DEMO_WIDGETS: Widget[] = [
  {
    id: '1',
    type: 'behance',
    size: 'small',
    content: {
      title: 'Behance',
      subtitle: 'UI/UX Designer',
      stats: {
        followers: 268,
        following: 195
      },
      projectCount: 24,
      appreciations: 1205
    },
    position: { x: 0, y: 0 }
  },
  {
    id: '2',
    type: 'github',
    size: 'medium',
    content: {
      title: 'GitHub',
      subtitle: 'Frontend Developer',
      stats: {
        followers: 142,
        following: 89
      }
    },
    position: { x: 1, y: 0 }
  },
  {
    id: '3',
    type: 'text',
    size: 'large',
    content: {
      title: 'Обо мне',
      text: 'Привет! Я UI/UX дизайнер и frontend разработчик с 5-летним опытом создания красивых и функциональных интерфейсов.'
    },
    position: { x: 2, y: 0 }
  }
];

const Editor: React.FC = () => {
  const [widgets, setWidgets] = useState<Widget[]>(DEMO_WIDGETS);
  const [deviceType, setDeviceType] = useState<'desktop' | 'mobile'>('desktop');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleWidgetsChange = useCallback((newWidgets: Widget[]) => {
    setWidgets(newWidgets);
    // Здесь можно добавить сохранение в localStorage или на сервер
  }, []);

  const handleEditWidget = useCallback((widget: Widget) => {
    setIsEditing(widget.id);
  }, []);

  const handleDeleteWidget = useCallback((widgetId: string) => {
    setWidgets(prev => prev.filter(w => w.id !== widgetId));
  }, []);

  const handleAddWidget = (type: WidgetType) => {
    const newWidget: Widget = {
      id: Date.now().toString(),
      type,
      size: 'small',
      content: {
        title: type.charAt(0).toUpperCase() + type.slice(1),
        stats: {
          followers: 0,
          following: 0
        }
      },
      position: { x: 0, y: widgets.length }
    };

    setWidgets(prev => [...prev, newWidget]);
  };

  const handleDeviceSwitch = (device: 'desktop' | 'mobile') => {
    setDeviceType(device);
  };

  return (
    <div className={`editor editor--${deviceType}`}>
      <div className="editor__header">
        <div className="editor__tools">
          <div className="editor__device-switch">
            <button 
              className={`editor__device-button ${deviceType === 'desktop' ? 'editor__device-button--active' : ''}`}
              onClick={() => handleDeviceSwitch('desktop')}
            >
              Desktop
            </button>
            <button 
              className={`editor__device-button ${deviceType === 'mobile' ? 'editor__device-button--active' : ''}`}
              onClick={() => handleDeviceSwitch('mobile')}
            >
              Mobile
            </button>
          </div>
          
          <div className="editor__actions-primary">
            <button className="editor__action-button">
              Отменить
            </button>
            <button className="editor__action-button">
              Повторить
            </button>
          </div>
        </div>

        <div className="editor__view-actions">
          <button className="editor__action-button">
            Предпросмотр
          </button>
          <button className="editor__action-button editor__action-button--primary">
            Опубликовать
          </button>
        </div>
      </div>

      <div className="editor__content">
        <div className="editor__sidebar">
          <div className="editor__widgets-list">
            <h3 className="editor__sidebar-title">Виджеты</h3>
            <div className="editor__widgets-grid">
              {['behance', 'github', 'instagram', 'twitter', 'text', 'image', 'link'].map((type) => (
                <button
                  key={type}
                  className="editor__widget-button"
                  onClick={() => handleAddWidget(type as WidgetType)}
                >
                  <div className={`editor__widget-icon editor__widget-icon--${type}`} />
                  <span className="editor__widget-label">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="editor__canvas">
          <BentoGrid
            widgets={widgets}
            onWidgetsChange={handleWidgetsChange}
            onEditWidget={handleEditWidget}
            onDeleteWidget={handleDeleteWidget}
          />
        </div>
      </div>

      <div className="editor__footer">
        <div className="editor__profile">
          <div className="editor__profile-avatar">
            <img src="/avatar-placeholder.png" alt="Profile" />
          </div>
          <div className="editor__profile-info">
            <h3 className="editor__profile-name">@username</h3>
            <p className="editor__profile-url">outcloud.io/@username</p>
          </div>
        </div>
        
        <div className="editor__actions">
          <button className="editor__action-button">
            Настройки
          </button>
          <button className="editor__action-button editor__action-button--share">
            Поделиться
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editor; 