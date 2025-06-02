
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import { Button } from '@headlessui/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/product',
    },
];
interface user {
    id: number;
    name: string;
    email: string;
}
interface product {
    id: number;
    name: string;
    price: number;
    stock: number;
    description: string;
    user: user;
}

interface PageProps {
    products: product[];
}

export default function Dashboard() {
    const { products } = usePage().props as PageProps;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="m-4">
                    {products.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Name</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Author</TableHead>
                                    <TableHead className="text-center">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map((products) => (
                                <TableRow key={products.id}>
                                    <TableCell className="font-medium">{products.name}</TableCell>
                                    <TableCell>{products.price}</TableCell>
                                    <TableCell>{products.stock}</TableCell>
                                    <TableCell className="truncate max-w-[150px]">{products.description}</TableCell>
                                    <TableCell>{products.user.name}</TableCell>
                                    <TableCell className="text-center space-x-2">
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center">
                            <p>No products available.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
