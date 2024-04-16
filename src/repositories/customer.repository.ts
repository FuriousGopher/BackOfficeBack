import { AppDataSource } from '../db/data-source';
import { CustomerModel } from '../models/customer.model';
import { updateCustomerDTO } from '../types/types';
import { SiteModel } from '../models/site.model';
import { MeterModel } from '../models/meter.model';
import { CircuitModel } from '../models/circuit.model';
import { IsNull } from 'typeorm';
import { SiteRepository } from './site.repository';
import { MeterRepository } from './meter.repository';
import { CircuitRepository } from './circuit.repository';

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
    const customer = await Customer.find({
      where: { id: customerId, deletedAt: IsNull() },
    });

    const sites = await SiteRepository.findAllById(customerId);
    const siteIds = sites.map((site) => site.id);
    const metersPromises = siteIds.map(async (siteId) => {
      return await MeterRepository.findAllById(siteId);
    });

    const metersArrays = await Promise.all(metersPromises);
    const meters = metersArrays.flat();
    const metersIds = meters.map((meter) => meter.id);

    const circuitsPromises = metersIds.map(async (meterId) => {
      return await CircuitRepository.findAllById(meterId);
    });
    const circuitsArrays = await Promise.all(circuitsPromises);
    const circuits = circuitsArrays.flat();

    return {
      customer,
      sites,
      meters,
      circuits,
    };
  }
}
