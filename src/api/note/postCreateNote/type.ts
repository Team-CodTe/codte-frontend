export type PostCreateNoteRequest = {
  problemId: number;
  content: string;
};

export type PostCreateNoteResponse = {
  noteId: number;
};
