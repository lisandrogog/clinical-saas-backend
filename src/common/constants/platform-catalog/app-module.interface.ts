import { IAppSubModule } from './app-sub-module.interface';

export interface IAppModule {
  name: string;
  code: string;
  itemOrder: number;
  subModules: IAppSubModule[];
}
