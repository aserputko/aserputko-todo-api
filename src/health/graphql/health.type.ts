import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Health')
export class HealthType {
  @Field()
  status: string;
}
