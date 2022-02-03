import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Person, PersonSchema } from './entity/person';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Person.name,
        schema: PersonSchema,
      },
    ]),
  ],
  controllers: [PersonsController],
  providers: [
    PersonsService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class PersonsModule {}
