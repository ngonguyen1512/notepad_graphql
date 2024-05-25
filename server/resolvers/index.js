import { GraphQLScalarType } from 'graphql'
import { AuthorModel, FolderModel, NoteModel } from '../models/index.js';

export const resolvers = {
    Date: new GraphQLScalarType ({
        name: 'Date',
        parseValue(value) {
            return new Date(value);
        },
        serialize(value) {
            return value.toISOString();
        }
    }),
    Query: {
        folders: async (parent, args, context) => { 
            const folders = await FolderModel.find({
                authorId: context.uid,
            }).sort({updatedAt:'desc'});
            console.log({folders, context});
            return folders;
        }, 
        folder: async (parent, args) => {
            const folderId  = args.folderId;
            const foundfolder = await FolderModel.findOne({_id : folderId}); 
            return foundfolder;
        },
        note: async (parent, args) => {
            const noteId = args.noteId;
            const foundNote = await NoteModel.findById(noteId);
            return foundNote;
        }
    },
    Folder: {
        author: async (parent, args) => { 
            const authorId = parent.authorId; 
            const author = await AuthorModel.findOne({uid: authorId})
            return author;
        },
        notes: async (parent, args) => {
            const folderId = parent.id;
            const notes = await NoteModel.find({
                folderId: folderId
            })
            return notes;
            // return fakeData.notes.filter(note => note.folderId === folderId);
        }
    },
    Mutation: {
        addFolder: async (parent, args, context) => {
            const newFolder = new FolderModel({...args, authorId: context.uid});
            console.log({newFolder});
            await newFolder.save();
            return newFolder;
        },
        addNote: async (parent, args) => {
            const newNote = new NoteModel(args);
            await newNote.save();
            return newNote;
        },
        updateNote: async (parent, args) => {
            const noteId = args.id;
            const note = await NoteModel.findById(noteId); 
            await NoteModel.updateOne(args)
            return note;
        },
        deleteNote: async (parent, args) => {
            const noteId = args.id;
            const note = await NoteModel.findByIdAndDelete(noteId);
            if(note) 
                return true;
            else
                return false;
        },
        register: async (parent, args) => {
            const foundAuthor = await AuthorModel.findOne({uid: args.uid});
            if(!foundAuthor) {
                const newAuthor = new AuthorModel(args);
                await newAuthor.save();
                return newAuthor;
            }
            return foundAuthor;
        }
    },
};