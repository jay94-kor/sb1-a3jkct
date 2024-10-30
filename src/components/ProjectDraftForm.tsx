import { useState } from 'react';
import { Card, TextInput, DatePicker, Button, NumberInput } from '@tremor/react';
import { calculateProjectBudget } from '../utils/calculations';
import { DatePickerValue } from '@tremor/react';
import { projectAPI } from '../utils/api';

interface FormData {
  project_name: string;
  budget: number;
  start_date: string;
  end_date: string;
}

interface ProjectDraftFormProps {
  onSuccess: () => void;
}

export default function ProjectDraftForm({ onSuccess }: ProjectDraftFormProps) {
  const [formData, setFormData] = useState<FormData>({
    project_name: '',
    budget: 0,
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { total_budget } = calculateProjectBudget(
      formData.budget,
      formData.start_date,
      formData.end_date
    );

    try {
      await projectAPI.create({
        project_name: formData.project_name,
        project_manager: '기본 관리자',
        contract_amount: formData.budget,
        total_budget,
        used_budget: 0,
        start_date: formData.start_date,
        end_date: formData.end_date,
        status: 'draft',
        created_at: new Date().toISOString()
      });
      onSuccess();
    } catch (error) {
      console.error('프로젝트 생성 실패:', error);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          placeholder="프로젝트명"
          value={formData.project_name}
          onChange={(e) => setFormData({...formData, project_name: e.target.value})}
        />
        <NumberInput
          placeholder="예산"
          value={formData.budget}
          enableStepper={false}
          onValueChange={(value) => setFormData({
            ...formData,
            budget: value ?? 0
          })}
        />
        <DatePicker
          placeholder="계약 시작일"
          value={new Date(formData.start_date)}
          onValueChange={(date: DatePickerValue) => {
            if (date) {
              setFormData(prev => ({
                ...prev,
                start_date: date.toISOString().split('T')[0]
              }));
            }
          }}
        />
        <DatePicker
          placeholder="계약 마감일"
          value={new Date(formData.end_date)}
          onValueChange={(date: DatePickerValue) => {
            if (date) {
              setFormData(prev => ({
                ...prev,
                end_date: date.toISOString().split('T')[0]
              }));
            }
          }}
        />
        <Button type="submit" color="blue">초안 저장</Button>
      </form>
    </Card>
  );
} 