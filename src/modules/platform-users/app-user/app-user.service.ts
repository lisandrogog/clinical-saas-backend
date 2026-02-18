import { Injectable } from '@nestjs/common';
import { CreateAppUserDto } from './dto/create-app-user.dto';
import { UpdateAppUserDto } from './dto/update-app-user.dto';
import { PrismaService } from '@core/prisma.service';
import { HashService } from '@modules/utils/services/hash.service';
import { uuidv7 } from 'uuidv7';
import { AppUserStatus } from '@enums/app-user-status.enum';

@Injectable()
export class AppUserService {
  constructor(
    private prisma: PrismaService,
    private hashService: HashService,
  ) {}

  async create(dto: CreateAppUserDto, tenantId: string, userId?: string) {
    const partner = await this.prisma.business_partner.findUnique({
      where: {
        id: dto.businessPartnerId,
        tenant_id: tenantId,
        removed_at: null,
      },
    });

    if (!partner) {
      throw new Error('Business partner not found');
    }

    const existingUser = await this.prisma.app_user.findFirst({
      where: {
        business_partner_id: partner.id,
        business_partner: {
          tenant_id: tenantId,
          removed_at: null,
        },
        removed_at: null,
      },
    });

    if (existingUser) {
      throw new Error('User already exists for this business partner');
    }

    const existsUsername = await this.prisma.app_user.count({
      where: {
        username: dto.username,
        removed_at: null,
        business_partner: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
    });

    if (existsUsername > 0) {
      throw new Error('Username already exists');
    }

    // TODO: status should be set to "pending" and an email should be sent to the user,
    // with a link to set the password or verify email. For now, we will set the status to active to allow login.

    const statusActive = await this.prisma.app_user_status.findFirst({
      where: {
        code: AppUserStatus.ACTIVE,
      },
    });

    if (!statusActive) {
      throw new Error('Active status not found');
    }

    // TODO: (licensing) verify if role exists and is valid for the tenant
    const role = await this.prisma.role.findUnique({
      where: {
        id: dto.roleId,
        removed_at: null,
      },
    });

    if (!role) {
      throw new Error('Role not found');
    }

    const hashedPassword = await this.hashService.hashPassword(dto.password);
    const id = uuidv7();

    return await this.prisma.app_user.create({
      data: {
        id,
        business_partner_id: partner.id,
        role_id: role.id,
        status_id: statusActive.id,
        username: dto.username,
        password_hash: hashedPassword,
        profile_data: dto.profileData,
        created_at: new Date(),
        created_by: userId,
      },
    });
  }

  async findAll(tenantId: string) {
    return await this.prisma.app_user.findMany({
      where: {
        removed_at: null,
        business_partner: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findOne(id: string, tenantId: string) {
    return await this.prisma.app_user.findFirst({
      where: {
        id,
        removed_at: null,
        business_partner: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
    });
  }

  async getByUsername(username: string, tenantId: string) {
    return await this.prisma.app_user.findFirst({
      where: {
        username,
        removed_at: null,
        business_partner: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
    });
  }

  async getByEmail(email: string, tenantId: string) {
    return await this.prisma.app_user.findFirst({
      where: {
        removed_at: null,
        business_partner: {
          tenant_id: tenantId,
          email: email,
          removed_at: null,
        },
      },
    });
  }

  async update(
    id: string,
    dto: UpdateAppUserDto,
    tenantId: string,
    userId?: string,
  ) {
    if (dto.username) {
      const existsUsername = await this.prisma.app_user.count({
        where: {
          username: dto.username,
          removed_at: null,
          business_partner: {
            tenant_id: tenantId,
            removed_at: null,
          },
          NOT: {
            id,
          },
        },
      });

      if (existsUsername > 0) {
        throw new Error('Username already exists for another user');
      }
    }

    let newHashedPassword: string | undefined = undefined;

    if (dto.password) {
      newHashedPassword = await this.hashService.hashPassword(dto.password);
    }

    if (dto.appUserStatusId) {
      const statusExists = await this.prisma.app_user_status.count({
        where: { id: dto.appUserStatusId },
      });

      if (!statusExists) {
        throw new Error('Status not found');
      }
    }

    if (dto.roleId) {
      const roleExists = await this.prisma.role.count({
        where: { id: dto.roleId, removed_at: null },
      });

      if (!roleExists) {
        throw new Error('Role not found');
      }
    }

    return await this.prisma.app_user.update({
      where: {
        id,
        removed_at: null,
        business_partner: {
          tenant_id: tenantId,
          removed_at: null,
        },
        readonly: false,
      },
      data: {
        username: dto.username,
        status_id: dto.appUserStatusId,
        role_id: dto.roleId,
        profile_data: dto.profileData,
        ...(newHashedPassword && { password_hash: newHashedPassword }),
        updated_at: new Date(),
        updated_by: userId,
      },
    });
  }

  async remove(id: string, tenantId: string, userId?: string) {
    return await this.prisma.app_user.update({
      where: {
        id,
        removed_at: null,
        business_partner: {
          tenant_id: tenantId,
          removed_at: null,
        },
        readonly: false,
      },
      data: {
        removed_at: new Date(),
        removed_by: userId,
      },
    });
  }
}
