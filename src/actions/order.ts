'use server';

import { getDB } from '@/db/data-source';
import { OrderEntity, type Order } from '@/db/entities/Order';

interface CreateOrderParams {
  orderId: string;
  amount: number;
}

interface CompleteOrderParams {
  orderId: string;
  transactionId: string;
}

// Creada cuando el usuario INICIA el pago (recibe OrderID de PayPal)
export async function createOrderInDB({ orderId, amount }: CreateOrderParams) {
  try {
    const db = await getDB();
    const repo = db.getRepository<Order>(OrderEntity);

    const order = await repo.save(
      repo.create({
        order_id: orderId,
        platform_type: 'paypal',
        subtotal: amount,
        transaction_id: null,
        tax: 0,
        is_paid: false,
      })
    );

    return { success: true, order };
  } catch (error) {
    console.error('Server Action Error (createOrderInDB):', error);
    return { success: false, error: 'Internal Server Error' };
  }
}

// Creada cuando el usuario FINALIZA el pago (recibe TransactionID de PayPal/Capture)
export async function updateOrderAsPaid({ orderId, transactionId }: CompleteOrderParams) {
  try {
    const db = await getDB();
    const repo = db.getRepository<Order>(OrderEntity);

    await repo.update(
      { order_id: orderId },
      {
        transaction_id: transactionId,
        is_paid: true,
        paid_at: new Date(),
      }
    );

    const order = await repo.findOneBy({ order_id: orderId });

    return { success: true, order };
  } catch (error) {
    console.error('Server Action Error (updateOrderAsPaid):', error);
    return { success: false, error: 'Internal Server Error' };
  }
}
