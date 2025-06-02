<?php

namespace App\Http\Controllers;

use App\Models\product;
use Illuminate\Http\Request;
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
}
