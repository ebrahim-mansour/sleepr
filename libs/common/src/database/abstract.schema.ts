import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
@ObjectType({ isAbstract: true })
export class AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId })
  @Field(() => String)
  _id: Types.ObjectId;
}

// TODO: replace the class with an interface and check whether everything is working properly or not.
