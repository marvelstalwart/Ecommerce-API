import { Injectable } from '@nestjs/common';
import { Prisma, ShoppingCart } from 'generated/prisma';
import { PrismaService } from '../../database/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';

// Define a type that includes cart items and associated products
export type CartWithItems = Prisma.ShoppingCartGetPayload<{
  include: {
    items: {
      include: {
        product: true;
      };
    };
    user: true;
  };
}>;

@Injectable()
export class CartRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new shopping cart with items

  async create(createCartDto: CreateCartDto): Promise<CartWithItems> {
    try {
      return await this.prisma.shoppingCart.create({
        data: {
          userId: createCartDto.userId,
          items: {
            create: createCartDto.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
          user: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  // Find cart by user ID

  async findByUserId(userId: string): Promise<CartWithItems | null> {
    return this.prisma.shoppingCart.findUnique({
      where: { userId: userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });
  }

  // Find cart by cart ID

  async findById(cartId: string): Promise<CartWithItems | null> {
    return this.prisma.shoppingCart.findUnique({
      where: { id: cartId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });
  }

  // Update cart and its items

  async update(
    cartId: string,
    updateCartDto: Partial<CartWithItems>,
  ): Promise<CartWithItems> {
    return this.prisma.$transaction(async (prisma) => {
      const existingItems = await prisma.cartItem.findMany({
        where: { cartId },
      });
      const newItems = updateCartDto.items || [];
      const existingIds = new Set(existingItems.map((item) => item.productId));
      const newIds = new Set(newItems.map((item) => item.productId));

      // Delete items not in new list
      await prisma.cartItem.deleteMany({
        where: { cartId, productId: { notIn: Array.from(newIds) } },
      });
      // Update quantities for already existing items
      for (const item of newItems) {
        if (existingIds.has(item.productId)) {
          await prisma.cartItem.updateMany({
            where: { cartId, productId: item.productId },
            data: { quantity: item.quantity },
          });
        } else {
          // Add new items
          await prisma.cartItem.create({
            data: {
              cartId,
              productId: item.productId,
              quantity: item.quantity,
            },
          });
        }
      }
      // Return updated cart
      return prisma.shoppingCart.findUnique({
        where: { id: cartId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
          user: true,
        },
      }) as Promise<CartWithItems>;
    });
  }

  // Clear all items from cart

  async clearCart(cartId: string): Promise<CartWithItems> {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        await prisma.cartItem.deleteMany({
          where: { cartId },
        });

        // Return updated cart
        return prisma.shoppingCart.findUnique({
          where: { id: cartId },
          include: {
            items: {
              include: {
                product: true,
              },
            },
            user: true,
          },
        }) as Promise<CartWithItems>;
      });
    } catch (error) {
      throw error;
    }
  }

  // Delete cart

  async delete(cartId: string): Promise<ShoppingCart> {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        // Delete all items first (due to foreign key constraint)
        await prisma.cartItem.deleteMany({
          where: { cartId },
        });

        // Delete cart
        return prisma.shoppingCart.delete({
          where: { id: cartId },
        });
      });
    } catch (error) {
      throw error;
    }
  }

  // Check if product exists in cart

  async hasProduct(cartId: string, productId: string): Promise<boolean> {
    const item = await this.prisma.cartItem.findFirst({
      where: {
        cartId,
        productId,
      },
    });

    return !!item;
  }

  // Get cart item count

  async getItemCount(cartId: string): Promise<number> {
    return this.prisma.cartItem.count({
      where: { cartId },
    });
  }

  // Get total quantity of items in cart

  async getTotalQuantity(cartId: string): Promise<number> {
    const items = await this.prisma.cartItem.findMany({
      where: { cartId },
      select: { quantity: true },
    });

    return items.reduce((total, item) => total + item.quantity, 0);
  }

  // Get total price of items in cart

  async getTotalPrice(cartId: string): Promise<number> {
    const cart = await this.prisma.shoppingCart.findUnique({
      where: { id: cartId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return 0;
    }

    return cart.items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }

  // Find or create cart for user

  async findOrCreate(userId: string): Promise<CartWithItems> {
    let cart = await this.findByUserId(userId);

    if (!cart) {
      cart = await this.create({
        userId,
        items: [],
      });
    }

    return cart;
  }
}
