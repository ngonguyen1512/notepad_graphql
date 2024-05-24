export default {
    authors: [
        {
            id: 1,
            name: 'abc',
        },
        {
            id: 2,
            name: 'xyz',
        }
    ],
    folders: [
        {
            id: '1',
            name: 'Plan',
            createdAt: '2024-5-20',
            authorId: 1,
        },
        {
            id: '2',
            name: 'xyz',
            createdAt: '2024-5-20',
            authorId: 2,
        }
    ],
    notes: [
        {
            id: '1',
            content: 'Go Shopping',
            folderId: '1'
        },
        {
            id: '2',
            content: 'Go to gym',
            folderId: '1'
        },
        {
            id: '3',
            content: 'Running',
            folderId: '1'
        },
        {
            id: '4',
            content: 'Learn English',
            folderId: '2'
        },
        {
            id: '5',
            content: 'Buy some food',
            folderId: '2'
        }
    ]
}