import { _generateHash } from '../helpers/helpFunction';
import { AdminRepository } from '../repositories/admin.repository';

export class AuthService {
  static checkCredentials = async (email: string, password: string) => {
    const user = await AdminRepository.findByEmail(email);
    if (!user) return false;
    const passwordHash = await _generateHash(password, user.passwordHash);
    const checkCred = user.passwordHash === passwordHash;
    if (checkCred) {
      return {
        id: user.id,
        email: user.email,
      };
    }
    return false;
  };
}
