import { IRoute } from '../../shared/models';

export type SortDirection = 'asc' | 'desc';
export type SortColumn = 'address' | 'gateway' | 'interface';

export const ROUTE: IRoute[] = [
  {
    uuid: '1',
    address: '0.0.0.0',
    mask: '0.0.0.0',
    gateway: '193.0.174.1',
    interface: 'Подключение Ethernet',
  },
  {
    uuid: '2',
    address: '10.1.30.0',
    mask: '255.255.255.0',
    gateway: '0.0.0.0',
    interface: 'Гостевая сеть',
  },
  {
    uuid: '3',
    address: '192.168.1.0',
    mask: '255.255.255.0',
    gateway: '0.0.0.0',
    interface: 'Домашняя сеть',
  },
  {
    uuid: '4',
    address: '193.0.174.0',
    mask: '255.255.255.128',
    gateway: '0.0.0.0',
    interface: 'Подключение Ethernet',
  },
  {
    uuid: '5',
    address: '193.0.175.0',
    mask: '255.255.255.128',
    gateway: '193.0.174.10',
    interface: 'Подключение Ethernet',
  },
  {
    uuid: '6',
    address: '193.0.175.22',
    mask: '255.255.255.255',
    gateway: '193.0.174.1',
    interface: 'Подключение Ethernet',
  },
  {
    uuid: '7',
    address: '192.168.2.0',
    mask: '255.255.255.0',
    gateway: '0.0.0.0',
    interface: 'Локальная сеть',
  },
  {
    uuid: '8',
    address: '10.0.0.0',
    mask: '255.0.0.0',
    gateway: '193.0.174.1',
    interface: 'Основная сеть',
  },
  {
    uuid: '9',
    address: '172.16.0.0',
    mask: '255.240.0.0',
    gateway: '0.0.0.0',
    interface: 'Приватная сеть',
  },
  {
    uuid: '10',
    address: '172.16.0.0',
    mask: '255.255.255.0',
    gateway: '193.0.175.1',
    interface: 'Локальная сеть',
  },
];
