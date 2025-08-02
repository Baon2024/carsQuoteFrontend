'use client'

import { useState, useRef, useCallback } from "react";
import { Upload, X, Image as ImageIcon, FileImage, Check } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
//import { useToast } from "@/hooks/use-toast";


const ImageUpload = ({ uploadedFile, setUploadedFile }) => {
  //const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  //const { toast } = useToast();

  

  

  /*const handleFiles = useCallback((files) => {
    const validFiles = Array.from(files).filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      
      if (!isValidType) {
        /*toast({
          title: "Invalid file type",
          description: `${file.name} is not a valid image file.`,
          variant: "destructive",
        });
        return false;
      }
      
      if (!isValidSize) {
        /*toast({
          title: "File too large",
          description: `${file.name} is larger than 10MB.`,
          variant: "destructive",
        });
        return false;
      }
      
      return true;
    });

    const newFiles = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9),
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    if (newFiles.length > 0) {
      /*toast({
        title: "Upload successful",
        description: `${newFiles.length} image(s) uploaded successfully.`,
      });
    }
  }, [/*toast]);*/

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  

  const handleFileSelect = (e) => {
  const file = e.target.files[0];
  if (file) {
    const fileWithPreview = {
      file,
      preview: URL.createObjectURL(file),
    };
    setUploadedFile(fileWithPreview);
  }
};


  const handleDrop = useCallback((e) => {
  e.preventDefault();
  setIsDragOver(false);
  
  const file = e.dataTransfer.files[0];
  if (file) {
    const fileWithPreview = {
      file,
      preview: URL.createObjectURL(file),
    };
    setUploadedFile(fileWithPreview);
  }
}, []);


  const removeFile = (id) => {
    setUploadedFile(prev => null)
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      <Card 
        className={`relative overflow-hidden transition-all duration-300 ${
          isDragOver 
            ? 'border-blue-500 bg-blue-50 scale-[1.02]' 
            : 'border-dashed border-2 border-slate-300 hover:border-slate-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="p-12 text-center">
          <div className={`mx-auto w-16 h-16 mb-6 rounded-full flex items-center justify-center transition-all duration-300 ${
            isDragOver ? 'bg-blue-500 text-white scale-110' : 'bg-slate-100 text-slate-400'
          }`}>
            <Upload className="w-8 h-8" />
          </div>
          
          <h3 className="text-xl font-semibold text-slate-700 mb-2">
            {isDragOver ? 'Drop your images here' : 'Upload your images'}
          </h3>
          
          <p className="text-slate-500 mb-6">
            Drag and drop your files here, or{' '}
            <button 
              onClick={openFileDialog}
              className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2"
            >
              browse files
            </button>
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 text-sm text-slate-400 mb-6">
            <span className="px-3 py-1 bg-slate-100 rounded-full">JPG</span>
            <span className="px-3 py-1 bg-slate-100 rounded-full">PNG</span>
            <span className="px-3 py-1 bg-slate-100 rounded-full">Max 10MB</span>
          </div>
          
          <Button onClick={openFileDialog} className="animate-fade-in">
            <Upload className="w-4 h-4 mr-2" />
            Choose File
          </Button>
        </div>
        
        <input
          ref={fileInputRef}
          key={uploadedFile === null ? 'reset' : 'set'}
          type="file"
          /*multiple*/
          accept="image/*"//only acceot png or jpeg
          onChange={handleFileSelect}
          className="hidden"
        />
      </Card>

      {/* Uploaded Files */}
      {uploadedFile && (
  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in">
    <div className="relative aspect-video bg-slate-100">
     
        {uploadedFile ? (
  <img
    src={uploadedFile.preview}
    alt={uploadedFile.file.name}
    className="w-full h-full object-cover"
  />
) : (
  <div>No file uploaded yet.</div>
)}

      <Button
        variant="destructive"
        size="sm"
        className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 hover:opacity-100 transition-opacity"
        onClick={() => setUploadedFile(null)}
      >
        <X className="w-4 h-4" />
      </Button>
      <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
        <Check className="w-3 h-3" />
        Uploaded
      </div>
    </div>
    
    <div className="p-4">
      <h4 className="font-medium text-slate-700 truncate mb-1">
        {uploadedFile.file.name}
      </h4>
      <p className="text-sm text-slate-500">
        {formatFileSize(uploadedFile.file.size)}
      </p>
    </div>
  </Card>
)}
    </div>
  );
};

export default ImageUpload;