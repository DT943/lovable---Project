
import React from 'react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FolderPlus, FileText } from 'lucide-react';

interface PageSelectorsProps {
  posOptions: string[];
  languageOptions: string[];
  selectedPOS: string;
  selectedLanguage: string;
  setSelectedPOS: (value: string) => void;
  setSelectedLanguage: (value: string) => void;
  loading: boolean;
}

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8 }
  }
};

const PageSelectors = ({
  posOptions,
  languageOptions,
  selectedPOS,
  selectedLanguage,
  setSelectedPOS,
  setSelectedLanguage,
  loading,
}: PageSelectorsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* POS Dropdown - Now first */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <FolderPlus className="h-4 w-4 text-green-500" />
            Select POS
          </label>
          <Select
            value={selectedPOS}
            onValueChange={setSelectedPOS}
          >
            <SelectTrigger className="w-full bg-white hover:border-green-400 transition-colors">
              <SelectValue placeholder="Select POS" />
            </SelectTrigger>
            <SelectContent>
              {posOptions.map((pos) => (
                <SelectItem key={pos} value={pos}>{pos}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Language Dropdown - Now second */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <FileText className="h-4 w-4 text-blue-500" />
            Select Language
          </label>
          <Select
            value={selectedLanguage}
            onValueChange={setSelectedLanguage}
          >
            <SelectTrigger className="w-full bg-white hover:border-blue-400 transition-colors">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((lang) => (
                <SelectItem key={lang} value={lang}>{lang}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default PageSelectors;
