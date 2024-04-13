import { AppDataSource } from '../db/data-source';
import { CustomerModel } from '../models/customer.model';
import { updateCustomerDTO } from '../types/types';

const Customer = AppDataSource.getRepository(CustomerModel);

export class CustomerRepository {
  static async findOneByEmail(email: string) {
    return await Customer.findOne({
      where: { email },
    });
  }

  static async findOneById(id: number) {
    return await Customer.findOne({
      where: { id },
    });
  }

  static async save(name: string, email: string, vatNumber: string) {
    const customer = new CustomerModel();
    customer.name = name;
    customer.email = email;
    customer.vat_number = vatNumber;
    return await Customer.save(customer);
  }

  static async update(
    updateCustomerDTO: updateCustomerDTO,
    foundCustomer: CustomerModel,
  ) {
    Object.assign(foundCustomer, updateCustomerDTO);
    if (updateCustomerDTO.isDelete) {
      foundCustomer.deletedAt = new Date();
    }
    return Customer.save(foundCustomer);
  }

  static async findAll() {
    return await Customer.find();
  }
}
