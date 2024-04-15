import { CustomerRepository } from '../repositories/customer.repository';
import { updateCustomerDTO } from '../types/types';

export class CustomerService {
  static async newCustomer(name: string, email: string, vatNumber: string) {
    const checkIfExist = await CustomerRepository.findOneByEmail(email, name);
    if (checkIfExist) {
      throw new Error(`Customer already exists`);
    }
    return await CustomerRepository.save(name, email, vatNumber);
  }

  static async updateCustomer(updateCustomerDTO: updateCustomerDTO) {
    const foundCustomer = await CustomerRepository.findOneById(
      updateCustomerDTO.id,
    );
    if (!foundCustomer) {
      throw new Error(`Customer not found`);
    }
    return await CustomerRepository.update(updateCustomerDTO, foundCustomer);
  }

  static async findAllInfoById(customerId: number) {
    const foundCustomer = await CustomerRepository.findOneById(customerId);
    if (!foundCustomer) {
      throw new Error(`Customer not found`);
    }
    return CustomerRepository.findAllInfo(customerId);
  }
}
