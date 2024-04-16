import { AppDataSource } from '../db/data-source';
import { CustomerModel } from '../models/customer.model';
import { updateCustomerDTO } from '../types/types';
import { SiteModel } from '../models/site.model';
import { MeterModel } from '../models/meter.model';
import { CircuitModel } from '../models/circuit.model';
import { IsNull } from 'typeorm';

const Customer = AppDataSource.getRepository(CustomerModel);

export class CustomerRepository {
  static async findOneByEmail(email: string, name: string) {
    return await Customer.createQueryBuilder('customer')
      .where('customer.email = :email OR customer.name = :name', {
        email,
        name,
      })
      .getOne();
  }

  static async findOneById(id: number) {
    return await Customer.findOne({
      where: { id: id },
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
    return Customer.save(foundCustomer);
  }

  static async delete(customerId: number) {
    const customerRepository = AppDataSource.getRepository(CustomerModel);

    const customer = await customerRepository.findOne({
      where: { id: customerId },
    });

    if (customer) {
      try {
        customer.deletedAt = new Date();
        await customerRepository.save(customer);

        const siteRepository = AppDataSource.getRepository(SiteModel);
        const sites = await siteRepository.find({
          where: { customer: { id: customerId } },
        });

        const updatePromises = sites.map(async (site) => {
          site.deletedAt = new Date();
          await siteRepository.save(site);

          const meterRepository = AppDataSource.getRepository(MeterModel);
          const meters = await meterRepository.find({
            where: { site: { id: site.id } },
          });

          const meterUpdatePromises = meters.map(async (meter) => {
            meter.deletedAt = new Date();
            await meterRepository.save(meter);

            const circuitRepository = AppDataSource.getRepository(CircuitModel);
            const circuits = await circuitRepository.find({
              where: { meter: { id: meter.id } },
            });

            const circuitUpdatePromises = circuits.map(async (circuit) => {
              circuit.deletedAt = new Date();
              await circuitRepository.save(circuit);
            });

            await Promise.all(circuitUpdatePromises);
          });

          await Promise.all(meterUpdatePromises);
        });

        await Promise.all(updatePromises);
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else {
      throw new Error(`Customer not found`);
    }
  }

  static async findAll() {
    return await Customer.find({ where: { deletedAt: IsNull() } });
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
