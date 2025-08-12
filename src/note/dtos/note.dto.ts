import { IsString } from 'class-validator';

export class NoteDataDTO {
  @IsString()
  title: string;
  @IsString()
  note: string;
}

export class UpdateNoteDataDTO {
  @IsString()
  id: string;
  @IsString()
  title: string;
  @IsString()
  note: string;
}
