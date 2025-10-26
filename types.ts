export interface ImageState {
  originalImage: string | null;
  mimeType: string;
}

export type BlurIntensity = 'low' | 'medium' | 'high';

export type FilterType = 'none' | 'grayscale' | 'sepia' | 'invert';
