import { AppDataSource } from '../db/data-source';
import { AdminModel } from '../models/admin.model';

const Admin = AppDataSource.getRepository(AdminModel);

export class AdminRepository {
  static async findByEmail(email: string): Promise<AdminModel | null> {
    return await Admin.findOne({ where: { email } });
  }

  static async findAdminById(adminId: number): Promise<AdminModel | null> {
    return await Admin.findOne({ where: { id: adminId } });
  }

  static async saveNewAdmin(passwordHash: string, email: string) {
    const admin = new AdminModel();
    admin.passwordHash = passwordHash;
    admin.email = email;
    return await Admin.save(admin);
  }

  static async removeAdmin(adminId: number) {
    return await Admin.delete({
      id: adminId,
    });
  }
}
