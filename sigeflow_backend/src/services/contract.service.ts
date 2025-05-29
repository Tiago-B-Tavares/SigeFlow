import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


interface Contract {
    number: string;
    startDate: Date;
    endDate: Date;
    supplierId: string;
}

const contractService = {

    async createContract({ number, startDate, endDate, supplierId }: Contract) {
        try {
            const contractAlreadyExists = await prisma.contract.findUnique({
                where: { number },
            });
            if (contractAlreadyExists) {
                throw new Error('Contract with this number already exists');
            }
            const createdContract = await prisma.contract.create({
                data: { number, startDate, endDate , supplierId },
            });
            return createdContract;
        } catch (error: any) {
            throw new Error( error.message);
        }
    },

};
export default contractService;