<?php

namespace App\Http\Controllers;

use App\Models\product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class productController extends Controller
{
    private function getProducts()
    {
        return product::with('user')->get();
    }

    public function index() {
        $products = $this->getProducts();
        return Inertia::render('products/index', compact('products'));
    }

    public function create() {
        return Inertia::render('products/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'nullable|numeric',
            'stock' => 'nullable|integer',
            'description' => 'nullable|string',
        ]);

        $data = $request->all();
        $data['user_id'] = $request->user()->id;

        product::create($data);
        return Redirect::route('products.index')->with('message', 'Product created.');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return Redirect::back()->with('message', 'Successfully deleted product');
    }
}
