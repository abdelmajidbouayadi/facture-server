import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonsService } from './persons.service';

@Controller('api/persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}
  @Get()
  getPersons() {
    return this.personsService.getPersons();
  }

  @Get(':id')
  getPersonById(@Param('id') id: string) {
    return this.personsService.getPersonById(id);
  }
  @Get('type/:type')
  getPersonByType(@Param('type') type: string) {
    return this.personsService.getPersonByType(type);
  }
  @Post()
  savePerson(@Body() createPersonDto: CreatePersonDto) {
    return this.personsService.savePerson(createPersonDto);
  }

  @Patch(':id')
  updatePerson(
    @Param('id') id: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ) {
    return this.personsService.updatePerson(id, updatePersonDto);
  }

  @Delete(':id')
  deletePerson(@Param('id') id: string) {
    return this.personsService.deletePerson(id);
  }
}
