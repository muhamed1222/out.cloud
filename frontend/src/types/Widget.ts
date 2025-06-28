export type WidgetSize = 'small' | 'medium' | 'large';

export type WidgetType = 
  | 'behance'
  | 'dribbble'
  | 'github'
  | 'instagram'
  | 'twitter'
  | 'youtube'
  | 'text'
  | 'image'
  | 'link';

interface BaseWidgetContent {
  title: string;
  subtitle?: string;
  image?: string;
}

interface SocialWidgetContent extends BaseWidgetContent {
  stats: {
    followers: number;
    following: number;
  };
}

interface BehanceWidgetContent extends SocialWidgetContent {
  projectCount?: number;
  appreciations?: number;
}

interface TextWidgetContent extends BaseWidgetContent {
  text: string;
}

interface ImageWidgetContent extends BaseWidgetContent {
  imageUrl: string;
  caption?: string;
}

interface LinkWidgetContent extends BaseWidgetContent {
  url: string;
  description?: string;
  thumbnail?: string;
}

export type WidgetContent =
  | BehanceWidgetContent
  | TextWidgetContent
  | ImageWidgetContent
  | LinkWidgetContent
  | SocialWidgetContent;

export interface Widget {
  id: string;
  type: WidgetType;
  size: WidgetSize;
  content: WidgetContent;
  position?: {
    x: number;
    y: number;
  };
}

export interface DraggableWidget extends Widget {
  isDragging: boolean;
} 