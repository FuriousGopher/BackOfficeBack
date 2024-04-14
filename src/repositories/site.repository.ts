import { AppDataSource } from '../db/data-source';
import { SiteModel } from '../models/site.model';
import { CustomerModel } from '../models/customer.model';
import { createSiteDTO, updateSiteDTO } from '../types/types';
import { IsNull } from 'typeorm';
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
    return await Site.find();
  }
}
