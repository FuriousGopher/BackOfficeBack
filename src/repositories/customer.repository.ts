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

  static update(
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

  static async findAllInfo(customerId: number) {
    const customers = await Customer.createQueryBuilder('customer')
      .leftJoinAndSelect('customer.sites', 'site')
      .leftJoinAndSelect('site.meters', 'meter')
      .leftJoinAndSelect('meter.circuits', 'circuit')
      .where('customer.id = :customerId', { customerId })
      .andWhere('customer.deleted_at IS NULL')
      .andWhere('site.deleted_at IS NULL')
      .andWhere('meter.deleted_at IS NULL')
      .andWhere('circuit.deleted_at IS NULL')
      .getMany();

    const customerInfo = customers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      vat_number: customer.vat_number,
      createdAt: customer.createdAt,
    }));

    const allSites = customers.flatMap((customer) =>
      customer.sites.map((site) => ({
        id: site.id,
        name: site.name,
        coordinates: site.coordinates,
        address: site.address,
        post_code: site.post_code,
        createdAt: site.createdAt,
      })),
    );

    const allMeters = customers.flatMap((customer) =>
      customer.sites.flatMap((site) =>
        site.meters.map((meter) => ({
          id: meter.id,
          name: meter.name,
          serialNumber: meter.serialNumber,
          installationDate: meter.installationDate,
          createdAt: meter.createdAt,
        })),
      ),
    );

    const allCircuits = customers.flatMap((customer) =>
      customer.sites.flatMap((site) =>
        site.meters.flatMap((meter) =>
          meter.circuits.map((circuit) => ({
            id: circuit.id,
            name: circuit.name,
            is_main: circuit.is_main,
            installationDate: circuit.installationDate,
            createdAt: circuit.createdAt,
          })),
        ),
      ),
    );

    return {
      customerInfo,
      allSites,
      allMeters,
      allCircuits,
    };
  }
}
