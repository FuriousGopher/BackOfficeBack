import { AppDataSource } from '../db/data-source';
import { SiteModel } from '../models/site.model';
import { createMeterDTO, updateMeterDTO } from '../types/types';
import { IsNull } from 'typeorm';
import { MeterModel } from '../models/meter.model';
import { CustomerModel } from '../models/customer.model';
import { CircuitModel } from '../models/circuit.model';

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
    return await Meter.find({ where: { deletedAt: IsNull() } });
  }

  static async delete(meterId: number) {
    const meterRepository = AppDataSource.getRepository(MeterModel);

    const meter = await meterRepository.findOne({
      where: { id: meterId },
    });

    if (meter) {
      try {
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
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else {
      throw new Error(`Meeter not found`);
    }
  }
}
