import Home from '../pages/Home';
import Login from '../pages/Login';
import ErrorPage from "../pages/ErrorPage";
import AuthProvider from '../context/AuthProvider';
import ProtectedRoot from '../router/ProtectedRoot';
import { foldersLoader } from "../utils/folderUtils";
import { Note, NoteList } from '../components/index';
import { Outlet, createBrowserRouter } from "react-router-dom";
import { addNewNote, noteLoader, notesLoader, updateNote } from "../utils/noteUtils";

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