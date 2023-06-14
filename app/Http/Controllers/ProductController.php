<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{  
    public function index(Request $request)
    {

        // $validatedData = $request->validate([
        //     'name' => ['required']
        // ]);

        $name = request('name');

        // $products =Product::all();
        // return response()->json($products); 
        return $this->fetchFromDB($name);
    } 
    public function fetchFromDB($name)
    {
        $products = Product::where('name', 'like', "%{$name}%")->get();

        return response()->json([
            'data' => [
                'products' => $products
            ],
        ]);
    }  
    public function store(Request $request)
    {
        $products = new Product([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'image' => $request->input('image'),
            'category' => $request->input('category'),
        ]);
        $products->save();
        return response()->json('Product created!');
    }
    public function show($id)
    {
        $contact = Product::find($id);
        return response()->json($contact);
    }
    public function update(Request $request, $id)
    {
       $products = Product::find($id);
       $products->update($request->all());
       return response()->json('Product updated');
    }
    public function destroy($id)
    {
        $products = Product::find($id);
        $products->delete();
        return response()->json(' deleted!');
    }
}