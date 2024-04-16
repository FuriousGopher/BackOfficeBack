import { IsNull } from 'typeorm';
import { AppDataSource } from '../db/data-source';
import { CircuitModel } from '../models/circuit.model';
import { createCircuitDTO, updateCircuitDTO } from '../types/types';
import { MeterModel } from '../models/meter.model';

const Circuit = AppDataSource.getRepository(CircuitModel);

export class CircuitRepository {
  static async findOneByName(name: string) {
    return await Circuit.findOne({
      where: { name },
    });
  }

  static async findOneById(id: number) {
    return await Circuit.findOne({
      where: { id },
    });
  }

  static async save(
    createCircuitDTO: createCircuitDTO,
    foundMeter: MeterModel,
  ) {
    const circuit = new CircuitModel();
    circuit.name = createCircuitDTO.name;
    circuit.is_main = createCircuitDTO.is_main;
    circuit.installationDate = createCircuitDTO.installationDate;
    circuit.meter = foundMeter;
    return await Circuit.save(circuit);
  }

  static async update(
    updateCircuitDTO: updateCircuitDTO,
    foundCircuit: CircuitModel,
  ) {
    Object.assign(foundCircuit, updateCircuitDTO);
    if (updateCircuitDTO.isDelete) {
      foundCircuit.deletedAt = new Date();
    }

    if (updateCircuitDTO.hasOwnProperty('is_main')) {
      foundCircuit.is_main = updateCircuitDTO.is_main;
    }

    return Circuit.save(foundCircuit);
  }

  static async findAllById(meterId: number) {
    return await Circuit.find({
      where: { meter: { id: meterId }, deletedAt: IsNull() },
    });
  }

  static async findAll() {
    return await Circuit.find({ where: { deletedAt: IsNull() } });
  }
}
