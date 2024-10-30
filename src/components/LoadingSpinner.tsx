import { Card, Text } from '@tremor/react';

export const LoadingSpinner = () => {
  return (
    <Card className="flex items-center justify-center h-32">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <Text className="ml-2">로딩중...</Text>
    </Card>
  );
};

export default LoadingSpinner;