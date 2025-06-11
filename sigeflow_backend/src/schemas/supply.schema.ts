import { number, string, z } from 'zod';

export  const supplySchema = z.object({
    id: string().uuid({
        message: "ID do fornecedor deve ser um UUID válido"
    }).optional(),
    name: string({
        required_error: "Deve ser informado um nome para o cadastrar um novo insumo",
        invalid_type_error: "O nome deve ser um texto"
    }),
    unit: string({
        required_error:"Deve ser informado a unidade de medida para cadastrar um novo insumo",
         invalid_type_error: "A unidade de medida deve ser um texto"
    }),
    minStock: number({
        required_error: "Deve ser informado um valor mínimo para cadastrar um novo insumo",
         invalid_type_error: "O valor do estoque mínimo deve ser um"
    }),
    contractId:string().uuid({
        message: "ID do fornecedor deve ser um UUID válido"
    })
})



