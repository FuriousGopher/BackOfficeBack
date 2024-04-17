import { CustomerRepository } from '../repositories/customer.repository';

export class ClientService {
  static checkCredentials = async (email: string, vatNumber: string) => {
    const client = await CustomerRepository.findByEmail(email);
    if (!client) return false;
    const checkCred = client.vat_number === vatNumber;
    if (checkCred) {
      return {
        id: client.id,
      };
    }
    return false;
  };
}
