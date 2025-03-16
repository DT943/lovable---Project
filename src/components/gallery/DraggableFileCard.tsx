
import React from 'react';
import { FileInfo } from '@/models/FileModel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Download, Trash2, Share2, Move } from 'lucide-react';
import { FilePreview } from './FilePreview';
import { useDrag } from '@/hooks/gallery/useDragAndDrop';

interface DraggableFileCardProps {
  file: FileInfo;
  onView: () => void;
  onShare: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

export const DraggableFileCard: React.FC<DraggableFileCardProps> = ({ 
  file, 
  onView, 
  onShare,
  onDelete 
}) => {
  const { dragRef, isDragging } = useDrag<FileInfo>(file);

  return (
    <Card 
      ref={dragRef}
      className={`overflow-hidden h-full flex flex-col transition-all ${
        isDragging ? 'opacity-50 shadow-lg scale-95' : ''
      }`}
      data-file-id={file.id}
      draggable="true"
    >
      <div className="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
        <FilePreview file={file} />
        {isDragging && (
          <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
            <Move className="h-12 w-12 text-primary/80" />
            <div className="absolute bottom-2 left-0 right-0 text-center text-xs font-medium text-primary">
              Drop onto a gallery
            </div>
          </div>
        )}
      </div>
      <CardContent className="p-3 flex-1 flex flex-col">
        <div className="mb-2 flex-1">
          <h3 className="font-medium text-sm truncate" title={file.metadata?.title || file.name}>
            {file.metadata?.title || file.name}
          </h3>
          <p className="text-xs text-gray-500 truncate">{file.name}</p>
        </div>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">{file.size} KB</span>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onView}>
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onShare}>
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
