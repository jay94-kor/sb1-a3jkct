import { Card, Text } from '@tremor/react';
import { useState } from 'react';

interface FileUploadProps {
  accept?: string;
  maxSize?: number;
  onUpload: (file: File) => Promise<void>;
}

export default function FileUpload({ 
  accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png", 
  maxSize = 10 * 1024 * 1024,
  onUpload 
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>();

  const validateFile = (file: File) => {
    if (file.size > maxSize) {
      setError('파일 크기는 10MB를 초과할 수 없습니다.');
      return false;
    }
    
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const allowedExts = accept.split(',').map(ext => ext.replace('.', ''));
    
    if (!fileExt || !allowedExts.includes(fileExt)) {
      setError('허용되지 않는 파일 형식입니다.');
      return false;
    }
    
    return true;
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (!file || !validateFile(file)) return;
    
    try {
      await onUpload(file);
      setError(undefined);
    } catch (err) {
      setError('파일 업로드에 실패했습니다.');
    }
  };

  return (
    <Card 
      className={`
        p-6 border-2 border-dashed 
        ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
        ${error ? 'border-red-500 bg-red-50' : ''}
      `}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <div className="text-center">
        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file && validateFile(file)) {
              onUpload(file);
            }
          }}
          id="file-upload"
        />
        <label 
          htmlFor="file-upload"
          className="cursor-pointer text-blue-600 hover:text-blue-800"
        >
          파일을 선택하거나
        </label>
        <Text>이 영역에 파일을 끌어다 놓으세요.</Text>
        {error && (
          <Text className="text-red-500 mt-2">{error}</Text>
        )}
      </div>
    </Card>
  );
} 