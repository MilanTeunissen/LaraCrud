import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react'
import React from 'react';
import { TriangleAlert } from 'lucide-react';
import error from 'eslint-plugin-react/lib/util/error';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a product',
        href: '/products/create',
    },
];

export default function Dashboard() {

    const {data, setData, post, processing, errors} = useForm({
        name: '',
        price: '',
        stock: '',
        description: '',

    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.store'))
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form onSubmit={handleSubmit}>
                    {/*Error handeling*/}
                    {Object.keys(errors).length > 0 &&(
                        <Alert>
                            <TriangleAlert className='h-4 w-4' />
                            <AlertTitle>Errors!</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Product Name"
                            className="mt-1 mb-2"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                        <div>
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                min="0"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                placeholder="Price"
                                className="mt-1 mb-2"
                            />
                        </div>
                        <div>
                            <Label htmlFor="stock">Stock</Label>
                            <Input
                                id="stock"
                                type="number"
                                value={data.stock}
                                onChange={(e) => setData('stock', e.target.value)}
                                placeholder="Stock"
                                className="mt-1 mb-2"
                            />
                        </div>
                    </div>
                    <div className="gap-1.5">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            placeholder="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 mb-2 resize-none h-64"
                        />
                    </div>
                    <div className="flex justify-center mt-4">
                        <Button disabled={processing} type="submit" className='transition duration-300 ease-in-out bg-slate-600 hover:bg-slate-700 ' > Add products</Button>
                    </div>
                </form>

            </div>
        </AppLayout>
    );
}
