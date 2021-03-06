import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entity/person';

@Injectable()
export class PersonsService {
  constructor(@InjectModel(Person.name) private personModel: Model<Person>) {}

  getPersons() {
    return this.personModel.find().exec();
  }

  async getPersonById(id: string) {
    const person = await this.personModel.findById(id).exec();
    if (!person)
      throw new NotFoundException(`the product with id=${id} not Found`);
    return person;
  }
  getPersonByType(type: string) {
    if (type === 'customer')
      return this.personModel.find({ customer: true }).exec();
    if (type === 'vendor')
      return this.personModel.find({ vendor: true }).exec();
  }

  savePerson(createPersonDto: CreatePersonDto) {
    const person = new this.personModel(createPersonDto);
    return person.save();
  }
  async updatePerson(id: string, updatePersonDto: UpdatePersonDto) {
    const person = await this.personModel
      .findByIdAndUpdate(id, updatePersonDto, { new: true })
      .exec();
    if (!person) throw new NotFoundException('person not found');
    return person;
  }
  async deletePerson(id: string) {
    const person = await this.personModel.findById(id).exec();
    if (!person) throw new NotFoundException('person not found');
    return person.remove();
  }
}
