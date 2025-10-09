import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { IS_PUBLIC_KEY } from "../../../common/decorators/public.decorator";

// Create a public decorator to be used to mark public routes. Overrides the default JwtGuard
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
        constructor(private reflector: Reflector) {
            super()
        }
        // Get the decorators on the controller - Allows @Public routes to pass without validation
        canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
            const isPublic= this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
                context.getHandler(),
                context.getClass()
            ])
            if (isPublic) {
                // Skip validation
                return true
            }
            // Validate
            return super.canActivate(context)
        }
}