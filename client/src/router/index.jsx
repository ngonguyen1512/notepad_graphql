import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home'
import Login from '../pages/Login';
import ProtectedRoot from '../router/ProtectedRoot';
import AuthProvider from '../context/AuthProvider';
import ErrorPage from "../pages/ErrorPage";
import NoteList from "../components/NoteList";
import Note from "../components/Note";
import { addNewNote, noteLoader, notesLoader, updateNote } from "../utils/noteUtils";
import { foldersLoader } from "../utils/folderUtils";

const AuthLayout = () => {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    )
};

export default createBrowserRouter([{
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
        {
            path: '/login',
            element: <Login />,
        },
        {
            element: <ProtectedRoot />,
            children: [
                {
                    path: '/',
                    element: <Home />,
                    loader: foldersLoader,
                    children: [
                        {
                            element: <NoteList />,
                            path: `folder/:folderId`,
                            action: addNewNote,
                            loader: notesLoader,
                            children: [
                                {
                                    element: <Note />,
                                    path: `note/:noteId`,
                                    action: updateNote,
                                    loader: noteLoader,
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
}]);