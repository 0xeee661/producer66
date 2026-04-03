import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ClientEntity } from './entities/Client';
import { BeatEntity } from './entities/Beat';
import { OrderEntity } from './entities/Order';
import { OrderItemEntity } from './entities/OrderItem';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL || 'postgresql://producer66:producer66@localhost:5433/producer66',
  synchronize: true, // Auto-sync schema in dev — disable in production
  logging: process.env.NODE_ENV !== 'production',
  entities: [ClientEntity, BeatEntity, OrderEntity, OrderItemEntity],
});

// Singleton: reuse the same connection across hot reloads in dev
let initialized = false;

export async function getDB() {
  if (!initialized) {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    initialized = true;
  }
  return AppDataSource;
}
