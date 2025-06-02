import { Head, usePage, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    description: string;
}

interface PageProps {
    product: Product;
    flash?: { message?: string };
}

export default function ViewSingle() {
    const { product, flash = {} } = usePage().props as PageProps;
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (flash.message) {
            setShowPopup(true);
            const timer = setTimeout(() => setShowPopup(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [flash.message]);

    const handleDecrementStock = () => {
        router.post(route('products.decrementStock', product.id));
    };

    return (
        <>
            <Head title={product.name} />
            <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
                <div className="w-full max-w-2xl flex justify-end gap-2 mx-auto mt-8">
                    <Link href="/dashboard">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Dashboard</button>
                    </Link>
                    <Link href="/login">
                        <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Login</button>
                    </Link>
                    <Link href="/register">
                        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Register</button>
                    </Link>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="w-full max-w-2xl">
                        <h1 className="text-3xl font-bold mb-2 text-center">{product.name}</h1>
                        <div className="text-xl text-gray-700 dark:text-gray-200 mb-2 text-center">
                            ${product.price}
                        </div>
                        <div className="text-xl text-gray-700 dark:text-gray-200 mb-2 text-center">
                            current stock: {product.stock ? product.stock : 'Out of Stock'}
                        </div>
                        <div className="text-gray-600 dark:text-gray-300 text-center">
                            {product.description}
                        </div>
                        {showPopup && (
                            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow z-50">
                                {flash.message}
                            </div>
                        )}
                        <div className="flex justify-center m-4">
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                                onClick={handleDecrementStock}
                                disabled={product.stock <= 0 || showPopup}
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
