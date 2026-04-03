import { EntitySchema } from 'typeorm';

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  created_at: Date;
  orderId: string;
  beatId: string;
  order?: import('./Order').Order;
  beat?: import('./Beat').Beat;
}

export const OrderItemEntity = new EntitySchema<OrderItem>({
  name: 'OrderItem',
  tableName: 'order_items',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    quantity: {
      type: 'int',
      default: 1,
    },
    price: {
      type: 'decimal',
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
    },
    orderId: {
      type: 'uuid',
    },
    beatId: {
      type: 'uuid',
    },
  },
  relations: {
    order: {
      type: 'many-to-one',
      target: 'Order',
      joinColumn: { name: 'orderId' },
      inverseSide: 'items',
    },
    beat: {
      type: 'many-to-one',
      target: 'Beat',
      joinColumn: { name: 'beatId' },
    },
  },
});
