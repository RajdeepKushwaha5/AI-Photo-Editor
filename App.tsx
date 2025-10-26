import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { EditControls } from './components/EditControls';
import { ImageViewer } from './components/ImageViewer';
import { ErrorAlert } from './components/ErrorAlert';
import { Cropper } from './components/Cropper';
import { LoadingModal } from './components/LoadingModal';
import { FilterControls } from './components/FilterControls';
import { editImageWithPrompt } from './services/geminiService';
import type { ImageState, BlurIntensity, FilterType } from './types';

const SESSION_STORAGE_KEY = 'aiPhotoEditorSession';

const App: React.FC = () => {
  const [imageState, setImageState] = useState<ImageState>({
    originalImage: null,
    mimeType: '',
  });
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState<boolean>(false);
  const [enhanceQuality, setEnhanceQuality] = useState<boolean>(false);
  const [blurIntensity, setBlurIntensity] = useState<BlurIntensity>('medium');
  const [activeFilter, setActiveFilter] = useState<FilterType>('none');

  // Effect to load session from localStorage on initial render
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem(SESSION_STORAGE_KEY);
      if (savedSession) {
        const { savedImageState, savedHistory, savedHistoryIndex, savedEnhanceQuality, savedActiveFilter } = JSON.parse(savedSession);
        if (savedImageState && savedImageState.originalImage) {
          setImageState(savedImageState);
          setHistory(savedHistory || []);
          setHistoryIndex(savedHistoryIndex ?? -1);
          setEnhanceQuality(savedEnhanceQuality ?? false);
          setActiveFilter(savedActiveFilter ?? 'none');
        }
      }
    } catch (e) {
      console.error("Failed to load session from localStorage:", e);
      localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, []);

  // Effect to save session to localStorage whenever state changes
  useEffect(() => {
    try {
        const sessionData = {
            savedImageState: imageState.originalImage ? imageState : undefined,
            savedHistory: imageState.originalImage ? history : undefined,
            savedHistoryIndex: imageState.originalImage ? historyIndex : undefined,
            savedEnhanceQuality: imageState.originalImage ? enhanceQuality : undefined,
            savedActiveFilter: imageState.originalImage ? activeFilter : undefined,
        };
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
    } catch (e) {
        console.error("Failed to save session to localStorage:", e);
    }
  }, [imageState, history, historyIndex, enhanceQuality, activeFilter]);

  const editedImage = historyIndex >= 0 ? history[historyIndex] : null;

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageState({
        originalImage: reader.result as string,
        mimeType: file.type,
      });
      setHistory([]);
      setHistoryIndex(-1);
      setError(null);
      setPrompt('');
      setIsCropping(false);
      setEnhanceQuality(false);
      setBlurIntensity('medium');
      setActiveFilter('none');
    };
    reader.onerror = () => {
      setError('Failed to read the image file.');
    };
    reader.readAsDataURL(file);
  };

  const processImageEdit = useCallback(async (editPrompt: string) => {
    if (!imageState.originalImage) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    const imageToEdit = historyIndex === -1 
      ? imageState.originalImage 
      : history[historyIndex];

    try {
      const base64Data = imageToEdit.split(',')[1];
      if (!base64Data) {
        throw new Error("Invalid image data URL.");
      }

      const editedImageBase64 = await editImageWithPrompt(
        base64Data,
        imageState.mimeType,
        editPrompt
      );
      
      const newEditedImage = `data:${imageState.mimeType};base64,${editedImageBase64}`;
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newEditedImage);
      
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);

    } catch (e: any) {
      console.error(e);
      setError(`An error occurred during editing: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [imageState.originalImage, imageState.mimeType, history, historyIndex]);

  const handleEdit = useCallback(async () => {
    if (!prompt) {
      setError('Please enter an editing prompt.');
      return;
    }
    const finalPrompt = enhanceQuality
      ? `Enhance the quality, details, and resolution of the image. Then, ${prompt}`
      : prompt;
    processImageEdit(finalPrompt);
  }, [prompt, enhanceQuality, processImageEdit]);

  const handleBlurBackground = useCallback(async () => {
    const blurPrompt = `Apply a ${blurIntensity} intensity photographic background blur, keeping the main subject in sharp focus.`;
    processImageEdit(blurPrompt);
  }, [blurIntensity, processImageEdit]);
  
  const handleReset = () => {
      setImageState({ originalImage: null, mimeType: '' });
      setHistory([]);
      setHistoryIndex(-1);
      setPrompt('');
      setError(null);
      setIsLoading(false);
      setIsCropping(false);
      setEnhanceQuality(false);
      setBlurIntensity('medium');
      setActiveFilter('none');
      localStorage.removeItem(SESSION_STORAGE_KEY);
  };

  const handleUndo = () => {
    if (historyIndex >= 0) {
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
    }
  };

  const handleCropComplete = (croppedImageUrl: string) => {
    setImageState({
      originalImage: croppedImageUrl,
      mimeType: 'image/png', // Canvas output is PNG
    });
    setHistory([]);
    setHistoryIndex(-1);
    setIsCropping(false);
    setActiveFilter('none');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <Header />
       {isCropping && imageState.originalImage && (
        <Cropper
          imageSrc={imageState.originalImage}
          onCropComplete={handleCropComplete}
          onCancel={() => setIsCropping(false)}
        />
      )}
      {isLoading && <LoadingModal />}
      <main className="w-full max-w-6xl flex flex-col items-center flex-grow">
        {!imageState.originalImage ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <div className="w-full flex flex-col items-center gap-8 md:gap-10">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ImageViewer 
                    title="Original" 
                    imageUrl={imageState.originalImage} 
                    onCropClick={() => setIsCropping(true)}
                />
                <ImageViewer title="Edited" imageUrl={editedImage} activeFilter={activeFilter} />
            </div>
            {error && <ErrorAlert message={error} />}
            <EditControls
              prompt={prompt}
              onPromptChange={setPrompt}
              onEdit={handleEdit}
              onReset={handleReset}
              onUndo={handleUndo}
              onRedo={handleRedo}
              isLoading={isLoading}
              isImageLoaded={!!imageState.originalImage}
              editedImage={editedImage}
              canUndo={historyIndex >= 0}
              canRedo={historyIndex < history.length - 1}
              enhanceQuality={enhanceQuality}
              onEnhanceChange={setEnhanceQuality}
              blurIntensity={blurIntensity}
              onBlurIntensityChange={setBlurIntensity}
              onBlur={handleBlurBackground}
            />
            <FilterControls 
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              isDisabled={!editedImage || isLoading}
            />
          </div>
        )}
      </main>
      <footer className="text-center p-4 mt-8 md:mt-12 text-slate-500 text-sm">
        <p>Powered by Gemini. Built for amazing visual creations.</p>
      </footer>
    </div>
  );
};

export default App;