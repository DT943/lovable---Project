
export interface ImageDimensions {
  width: number;
  height: number;
}

export interface FileMetadata {
  title?: string;
  altText?: string;
  caption?: string;
  description?: string;
  dimensions?: ImageDimensions;
}

export interface FileInfo {
  id: string;
  name: string;
  type: string;
  size: number; // in KB
  url: string;
  uploadedBy: string;
  uploadedOn: string;
  galleryId: string; // Gallery this file belongs to
  galleryName?: string; // Name of the gallery
  metadata?: FileMetadata;
}

export interface Gallery {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  createdOn: string;
  coverImageUrl?: string;
  fileCount: number;
}
