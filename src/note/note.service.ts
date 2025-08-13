import { Injectable } from '@nestjs/common';
import { NoteDataDTO, UpdateNoteDataDTO } from './dtos/note.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) { }
  getAllNotes(req: Request) {
    return req.user!.notes;
  }

  async addNewNote(data: NoteDataDTO, req: Request) {
    const note = await this.prisma.notes.create({
      data: {
        note: data.note,
        title: data.title,
        userId: req.user!.id
      }
    });
    return { message: 'New note added successfully!', noteId: note.id };
  }

  async deleteNote(id: string) {
    await this.prisma.notes.delete({
      where: {
        id
      }
    });
    return 'The note has been deleted';
  }

  async updateNote(data: UpdateNoteDataDTO) {
    await this.prisma.notes.update({
      where: {
        id: data.id
      },
      data: {
        note: data.note,
        title: data.title
      }
    })
    return 'note data update';
  }
}
