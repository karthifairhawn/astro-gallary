import React, { useState, useMemo } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { photos } from './data/photos';
import type { Photo } from './types';

function App() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    photos.forEach(photo => photo.tags.forEach(tag => tags.add(tag)));
    return ['all', ...Array.from(tags)];
  }, []);

  const filteredPhotos = useMemo(() => {
    if (selectedTag === 'all') return photos;
    return photos.filter(photo => photo.tags.includes(selectedTag));
  }, [selectedTag]);

  const openModal = (photo: Photo) => {
    setSelectedPhoto(photo);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setCurrentImageIndex(0);
  };

  const navigateImages = (direction: 'prev' | 'next') => {
    if (!selectedPhoto) return;
    const newIndex = direction === 'prev'
      ? (currentImageIndex - 1 + selectedPhoto.images.length) % selectedPhoto.images.length
      : (currentImageIndex + 1) % selectedPhoto.images.length;
    setCurrentImageIndex(newIndex);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="py-6 px-4 bg-gray-800 sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold">AstroGallery</h1>
          </div>

          {/* Tag Filter */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span className="capitalize">{selectedTag}</span>
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg overflow-hidden">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSelectedTag(tag);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-600 transition-colors ${
                      selectedTag === tag ? 'bg-gray-600' : ''
                    }`}
                  >
                    <span className="capitalize">{tag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="bg-gray-800 rounded-lg overflow-hidden transform transition-all hover:scale-[1.02] cursor-pointer group"
              onClick={() => openModal(photo)}
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                <img
                  src={photo.images[0]}
                  alt={photo.title}
                  className="w-full h-64 object-cover"
                />
                {photo.images.length > 1 && (
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 px-2 py-1 rounded-md">
                    <span className="text-xs">+{photo.images.length - 1}</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{photo.title}</h3>
                <p className="text-gray-400">{photo.description}</p>
                <div className="mt-2 text-sm text-gray-500">
                  <p>📅 {photo.date}</p>
                  <p>📍 {photo.location}</p>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {photo.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-6xl mx-4">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="bg-gray-800 rounded-lg overflow-hidden">
              {/* Image Container */}
              <div className="relative">
                <img
                  src={selectedPhoto.images[currentImageIndex]}
                  alt={selectedPhoto.title}
                  className="w-full max-h-[70vh] object-contain"
                />
                
                {/* Image Navigation */}
                {selectedPhoto.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateImages('prev');
                      }}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateImages('next');
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    
                    {/* Navigation Dots */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {selectedPhoto.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(index);
                          }}
                          className={`w-2 h-2 rounded-full transition-all ${
                            currentImageIndex === index
                              ? 'bg-white w-4'
                              : 'bg-gray-500'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{selectedPhoto.title}</h2>
                <p className="text-gray-300 mb-4">{selectedPhoto.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                  <div>
                    <p><strong>Date:</strong> {selectedPhoto.date}</p>
                    <p><strong>Location:</strong> {selectedPhoto.location}</p>
                  </div>
                  <div>
                    <p><strong>Equipment:</strong> {selectedPhoto.equipment}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedPhoto.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;