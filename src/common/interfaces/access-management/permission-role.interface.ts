import { IPermissionModule } from './permission-module.interface';

export interface IPermissionRole {
  role: string;
  modules: IPermissionModule[];
}
