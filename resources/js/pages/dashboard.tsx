import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface User {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
}

interface PageProps {
    users?: User[];
}

export default function Index() {
    const { users } = usePage().props as PageProps;
    const [updatingId, setUpdatingId] = useState<number | null>(null);

    const handleRankChange = (userId: number, isAdmin: boolean) => {
        setUpdatingId(userId);
        router.put(
            route('users.updateRank', userId),
            { is_admin: isAdmin ? 1 : 0 },
            {
                onFinish: () => setUpdatingId(null),
            }
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            {users && users.length > 0 ? (
                <div className="m-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>E-mail</TableHead>
                                <TableHead>User rank</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <select
                                            value={user.is_admin ? 'admin' : 'user'}
                                            onChange={e => handleRankChange(user.id, e.target.value === 'admin')}
                                            disabled={updatingId === user.id}
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="m-4">
                    <p className="text-gray-500">No users found.</p>
                </div>
            )}
        </AppLayout>
    );
}
