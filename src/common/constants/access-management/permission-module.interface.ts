import { IPermissionSubModule } from './permission-sub-module.interface';

export interface IPermissionModule {
  module: string;
  subModules: IPermissionSubModule[];
}
