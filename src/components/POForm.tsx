import { useState } from 'react';
import { Card, Title, TextInput, NumberInput, Select, SelectItem, Button, Textarea } from '@tremor/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectAPI, poAPI } from '../utils/api';
import { PO } from '../types';
import { handleFileUpload } from '../utils/fileHandler';

type PaymentType = 'advance' | 'balance';

interface POFormProps {
  onSuccess: () => void;
}

export default function POForm({ onSuccess }: POFormProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    project_id: 0,
    project_name: '',
    supplier_name: '',
    description: '',
    detailed_memo: '',
    total_amount: 0,
    category: '부가세 10%',
    advance_rate: 0.5,
    payment_type: 'advance' as PaymentType,
    po_number: `PO-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    status: 'pending' as const,
    created_at: new Date().toISOString(),
    contract_file: null,
    estimate_file: null,
    business_cert_file: null,
    bank_file: null
  });

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: projectAPI.getAll
  });

  const createPOMutation = useMutation({
    mutationFn: (newPO: Omit<PO, 'id'>) => poAPI.create(newPO),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pos'] });
      onSuccess();
      // 폼 초기화
      setFormData({
        project_id: 0,
        project_name: '',
        supplier_name: '',
        description: '',
        detailed_memo: '',
        total_amount: 0,
        category: '부가세 10%',
        advance_rate: 0.5,
        payment_type: 'advance',
        po_number: `PO-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        status: 'pending',
        created_at: new Date().toISOString(),
        contract_file: null,
        estimate_file: null,
        business_cert_file: null,
        bank_file: null
      });
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.project_id || !formData.supplier_name || !formData.total_amount || !formData.contract_file || !formData.estimate_file || !formData.business_cert_file || !formData.bank_file) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const selectedProject = projects?.find(p => p.project_id === formData.project_id);
    
    const newPO: Omit<PO, 'id'> = {
      project_id: formData.project_id,
      project_name: selectedProject?.project_name || '',
      po_number: formData.po_number,
      supplier: formData.supplier_name,
      amount: formData.total_amount,
      payment_type: formData.payment_type,
      status: formData.status,
      created_at: new Date().toISOString(),
      description: formData.description,
      detailed_memo: formData.detailed_memo,
      category: formData.category,
      advance_rate: formData.advance_rate,
      contract_file: formData.contract_file,
      estimate_file: formData.estimate_file,
      business_cert_file: formData.business_cert_file,
      bank_file: formData.bank_file
    };

    createPOMutation.mutate(newPO);
  };

  return (
    <Card>
      <Title>PO 발행</Title>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <Select
            value={String(formData.project_id)}
            onValueChange={(value: string) => setFormData({
              ...formData,
              project_id: Number(value)
            })}
            placeholder="프로젝트 선택"
          >
            {projects?.map((project) => (
              <SelectItem key={project.project_id} value={String(project.project_id)}>
                {project.project_name}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div>
          <TextInput
            placeholder="공급자명"
            value={formData.supplier_name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({
              ...formData,
              supplier_name: e.target.value
            })}
          />
        </div>

        <div>
          <Textarea
            placeholder="거래 내용"
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({
              ...formData,
              description: e.target.value
            })}
            minLength={10}
            required
          />
        </div>

        <div>
          <NumberInput
            placeholder="총액"
            value={formData.total_amount}
            onValueChange={(value: number | undefined) => setFormData({
              ...formData,
              total_amount: value || 0
            })}
            min={0}
          />
        </div>

        <div>
          <Textarea
            placeholder="상세 메모"
            value={formData.detailed_memo}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({
              ...formData,
              detailed_memo: e.target.value
            })}
          />
        </div>

        <div>
          <Select
            value={formData.category}
            onValueChange={(value: string) => setFormData({
              ...formData,
              category: value
            })}
            placeholder="거래 분류"
          >
            <SelectItem value="부가세 10%">부가세 10%</SelectItem>
            <SelectItem value="원천세 3.3%">원천세 3.3%</SelectItem>
            <SelectItem value="강사 인건비 8.8%">강사 인건비 8.8%</SelectItem>
            <SelectItem value="면세 사업자 0%">면세 사업자 0%</SelectItem>
          </Select>
        </div>

        <div>
          <label>선금 비율 (%)</label>
          <input
            type="range"
            value={formData.advance_rate * 100}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({
              ...formData,
              advance_rate: Number(e.target.value) / 100
            })}
            min={0}
            max={100}
            step={1}
          />
        </div>

        <div>
          <div>필요 서류</div>
          <div>
            <div>계약서</div>
            <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleFileUpload(e, 'contract', setFormData)} />
          </div>
          <div>
            <div>견적서</div>
            <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleFileUpload(e, 'estimate', setFormData)} />
          </div>
          <div>
            <div>사업자등록증</div>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileUpload(e, 'business_cert', setFormData)} />
          </div>
          <div>
            <div>통장사본</div>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileUpload(e, 'bank', setFormData)} />
          </div>
        </div>

        <Button
          type="submit"
          loading={createPOMutation.isPending}
          className="w-full"
        >
          PO 발행
        </Button>
      </form>
    </Card>
  );
}

