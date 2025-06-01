import z from 'zod';

const contractSchema = z.object({
  
  supplierId: z.string().uuid(),
  number: z.string().nonempty("Número do contrato é obrigatório"),
  startDate: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: "Formato da data de início inválido",
  }),
  endDate: z.string().optional().refine(date => !isNaN(Date.parse(date as string)), {
    message: "Formato da data de término inválido",
  }),
}).refine(data => {
  if (data.endDate) {
    return new Date(data.startDate) <= new Date(data.endDate);
  }
  return true;
}, {
  message: "Data de término deve ser maior ou igual à data de início",
  path: ["endDate"], 
});




export default contractSchema;
