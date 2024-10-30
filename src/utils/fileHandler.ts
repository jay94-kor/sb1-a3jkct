export function handleFileUpload(
  event: React.ChangeEvent<HTMLInputElement>,
  fileType: string,
  setFormData: React.Dispatch<React.SetStateAction<any>>
) {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prevData: any) => ({
        ...prevData,
        [`${fileType}_file`]: reader.result
      }));
    };
    reader.readAsDataURL(file);
  }
} 