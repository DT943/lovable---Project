
import React from 'react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FolderTree, FolderDown, Link } from 'lucide-react';

interface PathSelectorsProps {
  availableSlugs: string[];
  selectedSlug: string;
  setSelectedSlug: (value: string) => void;
  subSlugs: string[];
  selectedSubSlug: string;
  setSelectedSubSlug: (value: string) => void;
  loading: boolean;
  handleFetchData: () => void;
  selectedPOS: string;
  selectedLanguage: string;
}

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8 }
  }
};

const PathSelectors = ({
  availableSlugs,
  selectedSlug,
  setSelectedSlug,
  subSlugs,
  selectedSubSlug,
  setSelectedSubSlug,
  loading,
  handleFetchData,
  selectedPOS,
  selectedLanguage
}: PathSelectorsProps) => {
  
  // Generate dynamic URL for display - Now POS comes first, then language
  const dynamicUrl = selectedPOS && selectedLanguage ? 
    `${selectedPOS.toLowerCase()}/${selectedLanguage.toLowerCase()}${selectedSlug ? '/' + selectedSlug : ''}${selectedSubSlug ? '/' + selectedSubSlug : ''}` 
    : '';
  
  return (
    <>
      {/* Dynamic URL Display */}
      {(selectedPOS && selectedLanguage) && (
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="mb-6 overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-1">
            <Link className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Dynamic URL Path</span>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-sm text-gray-800 font-mono overflow-x-auto">
            {dynamicUrl || "URL will appear here as you make selections"}
          </div>
        </motion.div>
      )}

      {availableSlugs.length > 0 && (
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="mb-6"
        >
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FolderTree className="h-4 w-4 text-purple-500" />
              Select Parent Path
            </label>
            <Select
              value={selectedSlug}
              onValueChange={setSelectedSlug}
            >
              <SelectTrigger className="w-full bg-white hover:border-purple-400 transition-colors">
                <SelectValue placeholder="-- Select Parent --" />
              </SelectTrigger>
              <SelectContent>
                {availableSlugs.map((slug) => (
                  <SelectItem key={slug} value={slug}>{slug}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>
      )}

      {subSlugs.length > 0 && (
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="mb-6"
        >
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FolderDown className="h-4 w-4 text-amber-500" />
              Select Sub Path
            </label>
            <Select
              value={selectedSubSlug}
              onValueChange={setSelectedSubSlug}
            >
              <SelectTrigger className="w-full bg-white hover:border-amber-400 transition-colors">
                <SelectValue placeholder="-- Select Sub Path --" />
              </SelectTrigger>
              <SelectContent>
                {subSlugs.map((slug) => (
                  <SelectItem key={slug} value={slug}>{slug}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>
      )}

      {/* Fetch Data button has been removed as requested */}
    </>
  );
};

export default PathSelectors;
