import { AppDataSource } from '../db/data-source';
import { SiteModel } from '../models/site.model';
import { CustomerModel } from '../models/customer.model';
import { createSiteDTO, updateSiteDTO } from '../types/types';
import { IsNull } from 'typeorm';
import { MeterModel } from '../models/meter.model';
import { CircuitModel } from '../models/circuit.model';
const Site = AppDataSource.getRepository(SiteModel);

export class SiteRepository {
  static async findOneByName(name: string) {
    return await Site.findOne({
      where: { name },
    });
  }

  static async findOneById(id: number) {
    return await Site.findOne({
      where: { id },
    });
  }

  static async save(createSiteDTO: createSiteDTO, findCustomer: CustomerModel) {
    const site = new SiteModel();
    site.name = createSiteDTO.name;
    site.coordinates = createSiteDTO.coordinates;
    site.post_code = createSiteDTO.post_code;
    site.address = createSiteDTO.address;
    site.customer = findCustomer;
    return await Site.save(site);
  }

  static async update(updateSiteDTO: updateSiteDTO, foundCustomer: SiteModel) {
    Object.assign(foundCustomer, updateSiteDTO);
    if (updateSiteDTO.isDelete) {
      foundCustomer.deletedAt = new Date();
    }
    return Site.save(foundCustomer);
  }

  static async findAllById(customerId: number) {
    return await Site.find({
      where: { customer: { id: customerId }, deletedAt: IsNull() },
    });
  }

  static async findAll() {
    return await Site.find({ where: { deletedAt: IsNull() } });
  }

  static async delete(siteId: number) {
    const siteRepository = AppDataSource.getRepository(SiteModel);

    const site = await siteRepository.findOne({
      where: { id: siteId },
    });

    if (site) {
      try {
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
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else {
      throw new Error(`Site not found`);
    }
  }
}
