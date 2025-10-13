"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsCartOwner = IsCartOwner;
const common_1 = require("@nestjs/common");
const cart_owner_guard_1 = require("../../modules/auth/guards/cart-owner.guard");
function IsCartOwner() {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(cart_owner_guard_1.CartOwnerGuard));
}
//# sourceMappingURL=cart-owner.decorator.js.map