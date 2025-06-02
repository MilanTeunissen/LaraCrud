import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TriangleAlert } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    description: string;
}

interface Props {
    product: Product;
}

export default function Edit({ product }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        price: product.price,
        stock: product.stock,
        description: product.description,
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('products.update', product.id));
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Edit a product', href: `/products/${product.id}/edit` }]}>
            <Head title="Update a product" />
            <div className="w-8/12 p-4">
                <form onSubmit={handleUpdate} className="space-y-4">
                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <TriangleAlert />
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
                    <div className="gap-1.5">
                        <Label htmlFor="name" className="mb-2 block">Name</Label>
                        <Input id="name" placeholder="Product name" value={data.name} onChange={e => setData('name', e.target.value)} />
                    </div>
                    <div className="gap-1.5">
                        <Label htmlFor="price" className="mb-2 block">Price</Label>
                        <Input id="price" type="number" step="0.01" placeholder="Price" value={data.price} onChange={e => setData('price', e.target.value)} />
                    </div>
                    <div className="gap-1.5">
                        <Label htmlFor="stock" className="mb-2 block">Stock</Label>
                        <Input id="stock" type="number" placeholder="Stock" value={data.stock} onChange={e => setData('stock', e.target.value)} />
                    </div>
                    <div className="gap-1.5">
                        <Label htmlFor="description" className="mb-2 block">Description</Label>
                        <Textarea id="description" placeholder="Description" value={data.description} onChange={e => setData('description', e.target.value)} />
                    </div>
                    <Button disabled={processing} type="submit">Update Product</Button>
                </form>
            </div>
        </AppLayout>
    );
}
