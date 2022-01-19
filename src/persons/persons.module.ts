import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
  providers: [PersonsService],
})
export class PersonsModule {}
