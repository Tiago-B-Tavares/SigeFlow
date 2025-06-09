import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Schema base para datas 
export const dateSchema = z.string().refine(
  (val) => {
    const parsed = new Date(val);
    return !isNaN(parsed.getTime());
  },
  { message: "Formato de data inválido. Use YYYY-MM-DD ou DD/MM/YYYY" }
).transform(val => new Date(val));

// Schema base para contrato (campos comuns)
const contractBaseSchema = z.object({
  supplierId: z.string().uuid({
    message: "ID do fornecedor deve ser um UUID válido"
  }),
  number: z.string({
    required_error: "Número do contrato é obrigatório",
    invalid_type_error: "Número do contrato deve ser um texto"
  }).min(1, "Número do contrato não pode estar vazio")
    .max(20, "Número do contrato muito longo"),
});

// Validação assíncrona de número único
const checkUniqueNumber = async (number: string, id?: string) => {
  const existing = await prisma.contract.findFirst({
    where: {
      number,
      ...(id && { id: { not: id } }) 
    }
  });
  return !existing;
};

// Schema para criação
export const createContractSchema = contractBaseSchema.extend({
  startDate: dateSchema,
  endDate: dateSchema.optional()
}).refine(data => {
  if (data.endDate) {
    return data.startDate <= data.endDate;
  }
  return true;
}, {
  message: "Data de término deve ser posterior ou igual à data de início",
  path: ["endDate"]
}).refine(async (data) => {
  return await checkUniqueNumber(data.number);
}, {
  message: "Número de contrato já está em uso",
  path: ["number"]
});




// Schema para atualização
export const updateContractSchema = contractBaseSchema.partial().extend({
  id: z.string().uuid("ID do contrato inválido"),
  startDate: dateSchema.optional(),
  endDate: dateSchema.optional()
}).refine(data => {
  if (data.startDate && data.endDate) {
    return data.startDate <= data.endDate;
  }
  return true;
}, {
  message: "Data de término deve ser posterior ou igual à data de início",
  path: ["endDate"]
})



// Schema para atualização parcial
export const updateContractPartialSchema = contractBaseSchema.partial().extend({
  id: z.string().uuid("ID do contrato inválido").nonempty(),
  startDate: dateSchema.optional(),
  endDate: dateSchema.optional()
}).refine(data => {
  if (data.startDate && data.endDate) {
    return data.startDate <= data.endDate;
  }
  return true;
}, {
  message: "Data de término deve ser posterior ou igual à data de início",
  path: ["endDate"]
})

// Schema para resposta (opcional)
export const contractResponseSchema = contractBaseSchema.extend({
  id: z.string().uuid(),
  startDate: z.date(),
  endDate: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type CreateContractInput = z.infer<typeof createContractSchema>;
export type UpdateContractInput = z.infer<typeof updateContractSchema>;
export type ContractResponse = z.infer<typeof contractResponseSchema>;