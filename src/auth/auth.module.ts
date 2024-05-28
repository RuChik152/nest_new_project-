import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminPanelUser, AdminPanelUserSchema } from "./auth.schema";
import { verifyToken } from "../common/middleware/auth.middleware";

@Module({
  imports: [
    MongooseModule.forFeature([{name: AdminPanelUser.name, schema: AdminPanelUserSchema}]),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(verifyToken)
      .forRoutes({path: 'auth', method: RequestMethod.PUT})
  }
}
