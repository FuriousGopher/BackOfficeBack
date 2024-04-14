import { AppDataSource } from '../db/data-source';
import { SiteModel } from '../models/site.model';
import { createMeterDTO, updateMeterDTO } from '../types/types';
import { IsNull } from 'typeorm';
import { MeterModel } from '../models/meter.model';

const Meter = AppDataSource.getRepository(MeterModel);

export class MeterRepository {
  static async findOneByName(name: string) {
    return await Meter.findOne({
      where: { name },
    });
  }

  static async findOneById(id: number) {
    return await Meter.findOne({
      where: { id },
    });
  }

  static async save(createMeterDTO: createMeterDTO, findSite: SiteModel) {
    const meter = new MeterModel();
    meter.name = createMeterDTO.name;
    meter.installationDate = createMeterDTO.installationDate;
    meter.serialNumber = createMeterDTO.serialNumber;
    meter.site = findSite;
    return await Meter.save(meter);
  }

  static async update(updateMeterDTO: updateMeterDTO, foundMeter: MeterModel) {
    Object.assign(foundMeter, updateMeterDTO);
    if (updateMeterDTO.isDelete) {
      foundMeter.deletedAt = new Date();
    }
    return Meter.save(foundMeter);
  }

  static async findAllById(siteId: number) {
    return await Meter.find({
      where: { site: { id: siteId }, deletedAt: IsNull() },
    });
  }

  static async findAll() {
    return await Meter.find();
  }
}
