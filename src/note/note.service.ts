import { Injectable } from '@nestjs/common';
import { NoteDataDTO, UpdateNoteDataDTO } from './dtos/note.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}
  getAllNotes() {
    return 'these are your notes';
  }

  addNewNote(data: NoteDataDTO) {
    return 'new note added';
  }

  getNote(id: string) {
    return 'this is your new note';
  }

  deleteNote(id: string) {
    return 'the note has been deleted';
  }

  updateNote(data: UpdateNoteDataDTO) {
    return 'note data update';
  }
}
