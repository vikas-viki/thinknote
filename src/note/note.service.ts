import { Injectable, NotFoundException } from '@nestjs/common';
import { NoteDataDTO, UpdateNoteDataDTO } from './dtos/note.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) { }

  NOTES_PER_PAGE = 15;
  NOTES_CONTENT_SLICE = 220;
  NOTES_TITLE_SLICE = 30;

  async getNote(id: string, userId: string) {
    return await this.prisma.notes.findFirst({
      where: {
        userId,
        id
      }
    })
  }

  async getAllNotes(pageNumber: number, userId: string) { // starts from 1
    if (pageNumber < 1) throw new NotFoundException();
    const skip = (pageNumber - 1) * this.NOTES_PER_PAGE;
    const count = await this.prisma.notes.count({
      where: { userId }
    })
    let notes = await this.prisma.notes.findMany({
      where: {
        userId
      },
      orderBy: {
        updatedAt: 'desc'
      },
      skip,
      take: this.NOTES_PER_PAGE,
      select: {
        id: true,
        note: true,
        title: true,
        updatedAt: true
      }
    });

    notes = notes.map(n => {
      return {
        ...n,
        note: `${n.note.slice(0, this.NOTES_CONTENT_SLICE)}${n.note.length > this.NOTES_CONTENT_SLICE ? "..." : ""}`,
        title: `${n.title.slice(0, this.NOTES_TITLE_SLICE)}${n.title.length > this.NOTES_TITLE_SLICE ? "..." : ""}`
      }
    });

    return { notes, pageCount: Math.ceil(count / this.NOTES_PER_PAGE) };
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
