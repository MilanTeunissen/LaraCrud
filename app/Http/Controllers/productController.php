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

    public function view(Product $product) {
        return Inertia::render('products/viewSingle', compact('product'));
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

    public function edit(product $product) {
        return Inertia::render('products/edit', compact('product'));
    }

    public function update(Request $request, product $product) {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'nullable|numeric',
            'stock' => 'nullable|integer',
            'description' => 'nullable|string',
        ]);

        $product->update([
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'stock' => $request->input('stock'),
            'description' => $request->input('description'),
        ]);

        return redirect()->route('products.index')->with('message', 'Successfully updated product');
    }

    public function decrementStock(product $product)
    {
        if ($product->stock > 0) {
            $product->decrement('stock');
            $product->refresh();
        }
        return redirect()->back()->with('message', 'Stock updated.');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return Redirect::back()->with('message', 'Successfully deleted product');
    }
}
