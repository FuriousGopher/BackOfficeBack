import { createSiteDTO, updateSiteDTO } from '../types/types';
import { SiteRepository } from '../repositories/site.repository';
import { CustomerRepository } from '../repositories/customer.repository';

export class SiteService {
  static async newSite(createSiteDTO: createSiteDTO) {
    const checkIfExist = await SiteRepository.findOneByName(createSiteDTO.name);
    if (checkIfExist) {
      throw new Error(`Site already exists`);
    }
    const findCustomer = await CustomerRepository.findOneById(
      createSiteDTO.customerId,
    );
    if (!findCustomer) {
      throw new Error(`Customer not found`);
    }
    return await SiteRepository.save(createSiteDTO, findCustomer);
  }

  static async updateSite(updateSiteDTO: updateSiteDTO) {
    const foundSite = await SiteRepository.findOneById(updateSiteDTO.id);
    if (!foundSite) {
      throw new Error(`Site not found`);
    }
    if (updateSiteDTO.isDelete) {
      return await SiteRepository.delete(updateSiteDTO.id);
    }
    return await SiteRepository.update(updateSiteDTO, foundSite);
  }
}
