import { createCircuitDTO, updateCircuitDTO } from '../types/types';
import { CircuitRepository } from '../repositories/circuit.repository';
import { MeterRepository } from '../repositories/meter.repository';

export class CircuitService {
  static async newCircuit(createCircuitDTO: createCircuitDTO) {
    const checkIfExist = await CircuitRepository.findOneByName(
      createCircuitDTO.name,
    );
    if (checkIfExist) {
      throw new Error(`Circuit already exists`);
    }
    const foundMeter = await MeterRepository.findOneById(
      createCircuitDTO.meterId,
    );
    if (!foundMeter) {
      throw new Error(`Meter not found`);
    }
    return await CircuitRepository.save(createCircuitDTO, foundMeter);
  }

  static async updateCircuit(updateCircuitDTO: updateCircuitDTO) {
    const foundCircuit = await CircuitRepository.findOneById(
      updateCircuitDTO.id,
    );
    if (!foundCircuit) {
      throw new Error(`Meter not found`);
    }
    return await CircuitRepository.update(updateCircuitDTO, foundCircuit);
  }
}
