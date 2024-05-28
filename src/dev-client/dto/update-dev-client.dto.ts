import { PartialType } from '@nestjs/swagger';
import { CreateDevClientDto } from './create-dev-client.dto';

export class UpdateDevClientDto extends PartialType(CreateDevClientDto) {}
