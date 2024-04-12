import bcrypt from 'bcrypt';
import { CreateAdminDTO } from '../types/types';
import { _generateHash } from '../helpers/helpFunction';
import { AdminRepository } from '../repositories/admin.repository';

export class AdminService {
  static async createNewAdmin(newAdmin: CreateAdminDTO) {
    const passwordSalt = await bcrypt.genSalt(4);
    const passwordHash = await _generateHash(newAdmin.password, passwordSalt);
    return await AdminRepository.saveNewAdmin(passwordHash, newAdmin.email);
  }
}
