import { EntitySchema } from 'typeorm';

export interface Beat {
  id: string;
  title: string;
  bpm: number;
  key: string;
  price: number;
  tag: string;
  audioUrl: string | null;
  created_at: Date;
  updated_at: Date;
  orderItems?: OrderItem[];
}

import type { OrderItem } from './OrderItem';

export const BeatEntity = new EntitySchema<Beat>({
  name: 'Beat',
  tableName: 'beats',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    title: {
      type: 'text',
    },
    bpm: {
      type: 'int',
    },
    key: {
      type: 'text',
    },
    price: {
      type: 'decimal',
    },
    tag: {
      type: 'text',
    },
    audioUrl: {
      type: 'text',
      nullable: true,
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
    },
    updated_at: {
      type: 'timestamp',
      updateDate: true,
    },
  },
  relations: {
    orderItems: {
      type: 'one-to-many',
      target: 'OrderItem',
      inverseSide: 'beat',
    },
  },
});
