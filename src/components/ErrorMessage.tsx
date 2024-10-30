import { Card, Text } from '@tremor/react';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <Card className="bg-red-50 border-red-100">
      <Text className="text-red-700">{message}</Text>
    </Card>
  );
}