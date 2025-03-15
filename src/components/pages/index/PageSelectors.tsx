
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, FolderPlus, PlusCircle } from 'lucide-react';

interface PageSelectorsProps {
  posOptions: string[];
  languageOptions: string[];
  selectedPOS: string;
  selectedLanguage: string;
  setSelectedPOS: (value: string) => void;
  setSelectedLanguage: (value: string) => void;
  loading: boolean;
  onAddPageClick?: () => void;
}

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8 }
  }
};

const buttonVariants = {
  hover: { 
    scale: 1.03,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10
    }
  },
  tap: { 
    scale: 0.97
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
  onAddPageClick
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

      {/* Add Page button appears right after selecting language and POS */}
      {selectedPOS && selectedLanguage && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="mb-6"
        >
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button 
              onClick={onAddPageClick}
              className="w-full gap-2 shadow-md bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition-all"
              disabled={loading || !selectedPOS || !selectedLanguage}
            >
              <PlusCircle className="h-5 w-5" />
              Add Page
            </Button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default PageSelectors;
