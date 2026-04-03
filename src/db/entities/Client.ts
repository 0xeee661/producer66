import { EntitySchema } from 'typeorm';

export type Role = 'admin' | 'producer' | 'client';

export interface Client {
  id: number;
  created_at: Date;
  email: string;
  registration_type: string;
  role: Role;
  password: string | null;
  firstName: string | null;
  secondName: string | null;
  clerkId: string | null;
  imageUrl: string | null;
  username: string | null;
  orders?: Order[];
}

import type { Order } from './Order';

export const ClientEntity = new EntitySchema<Client>({
  name: 'Client',
  tableName: 'clients',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: 'increment',
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
    },
    email: {
      type: 'text',
      unique: true,
    },
    registration_type: {
      type: 'text',
    },
    role: {
      type: 'text',
      default: 'client',
    },
    password: {
      type: 'text',
      nullable: true,
    },
    firstName: {
      type: 'text',
      nullable: true,
    },
    secondName: {
      type: 'text',
      nullable: true,
    },
    clerkId: {
      type: 'text',
      unique: true,
      nullable: true,
    },
    imageUrl: {
      type: 'text',
      nullable: true,
    },
    username: {
      type: 'text',
      nullable: true,
    },
  },
  indices: [
    { columns: ['email'] },
    { columns: ['clerkId'] },
  ],
  relations: {
    orders: {
      type: 'one-to-many',
      target: 'Order',
      inverseSide: 'client',
    },
  },
});
