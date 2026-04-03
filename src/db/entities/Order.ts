import { EntitySchema } from 'typeorm';

export interface Order {
  id: string;
  order_id: string;
  platform_type: string;
  subtotal: number;
  tax: number;
  transaction_id: string | null;
  is_paid: boolean;
  paid_at: Date | null;
  created_at: Date;
  clientId: number | null;
  client?: import('./Client').Client;
  items?: import('./OrderItem').OrderItem[];
}

export const OrderEntity = new EntitySchema<Order>({
  name: 'Order',
  tableName: 'orders',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    order_id: {
      type: 'text',
    },
    platform_type: {
      type: 'text',
      default: 'paypal',
    },
    subtotal: {
      type: 'decimal',
    },
    tax: {
      type: 'decimal',
      default: 0,
    },
    transaction_id: {
      type: 'text',
      nullable: true,
    },
    is_paid: {
      type: 'boolean',
      default: false,
    },
    paid_at: {
      type: 'timestamp',
      nullable: true,
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
    },
    clientId: {
      type: 'int',
      nullable: true,
    },
  },
  relations: {
    client: {
      type: 'many-to-one',
      target: 'Client',
      joinColumn: { name: 'clientId' },
      inverseSide: 'orders',
      nullable: true,
    },
    items: {
      type: 'one-to-many',
      target: 'OrderItem',
      inverseSide: 'order',
    },
  },
});
