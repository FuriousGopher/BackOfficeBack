import { AppDataSource } from '../db/data-source';
import { Admin } from '../models/admin';

const AdminModal = AppDataSource.getRepository(Admin);

export class AdminRepository {
  static async findByEmail(email: string): Promise<Admin | null> {
    return await AdminModal.findOne({ where: { email } });
  }

  static async findAdminById(adminId: number): Promise<Admin | null> {
    return await AdminModal.findOne({ where: { id: adminId } });
  }

  static async saveNewAdmin(passwordHash: string, email: string) {
    const admin = new Admin();
    admin.passwordHash = passwordHash;
    admin.email = email;
    await AdminModal.save(admin);
  }
}
