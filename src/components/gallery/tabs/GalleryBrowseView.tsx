
import React, { useState } from 'react';
import { Gallery, FileInfo } from '@/models/FileModel';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Edit, ArrowLeft, Share2, Plus } from 'lucide-react';
import { FileList } from '../FileList';
import { EditGalleryDialog } from '../EditGalleryDialog';
import { ShareDialog } from '../ShareDialog';

interface GalleryBrowseViewProps {
  selectedGallery: Gallery;
  onBackToGalleries: () => void;
  onAddFiles: () => void;
  files: FileInfo[];
  galleries: Gallery[];
  galleryFileTypes: Record<string, string[]>;
  onViewFile: (file: FileInfo) => void;
  onDeleteFile?: (file: FileInfo) => void;
  onMoveFile?: (file: FileInfo, toGalleryId: string) => void;
  onUpdateGallery: (gallery: Gallery) => void;
}

export const GalleryBrowseView: React.FC<GalleryBrowseViewProps> = ({
  selectedGallery,
  onBackToGalleries,
  onAddFiles,
  files,
  galleries,
  galleryFileTypes,
  onViewFile,
  onDeleteFile,
  onMoveFile,
  onUpdateGallery
}) => {
  const [isEditGalleryOpen, setIsEditGalleryOpen] = useState(false);
  const [isShareGalleryOpen, setIsShareGalleryOpen] = useState(false);
  
  const filteredFiles = files.filter(file => file.galleryId === selectedGallery.id);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onBackToGalleries}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h2 className="text-xl font-semibold">{selectedGallery.name}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsShareGalleryOpen(true)}
          >
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsEditGalleryOpen(true)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit Gallery
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onAddFiles}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Files
          </Button>
        </div>
      </div>
      
      {selectedGallery.description && (
        <Alert className="mb-4">
          <AlertDescription>{selectedGallery.description}</AlertDescription>
        </Alert>
      )}
      
      {filteredFiles.length > 0 ? (
        <FileList 
          files={filteredFiles}
          galleries={galleries}
          galleryFileTypes={galleryFileTypes}
          currentGalleryId={selectedGallery.id}
          onViewFile={onViewFile}
          onDeleteFile={onDeleteFile}
          onMoveFile={onMoveFile}
        />
      ) : (
        <div className="flex flex-col items-center justify-center p-12 border rounded-md">
          <p className="text-muted-foreground mb-4">No files in this gallery</p>
          <Button
            onClick={onAddFiles}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Files
          </Button>
        </div>
      )}
      
      <EditGalleryDialog
        open={isEditGalleryOpen}
        onOpenChange={setIsEditGalleryOpen}
        gallery={selectedGallery}
        onUpdateGallery={onUpdateGallery}
        files={files}
      />
      
      <ShareDialog
        open={isShareGalleryOpen}
        onOpenChange={setIsShareGalleryOpen}
        item={selectedGallery}
        itemType="gallery"
      />
    </>
  );
};
