<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{  
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories); 
    }   
    public function store(Request $request)
    {
        $categories = new Category([
            'name' => $request->input('name'),
        ]);
        $categories->save();
        return response()->json('Category created!');
    }
    public function show($id)
    {
        $contact = Category::find($id);
        return response()->json($contact);
    }
    public function update(Request $request, $id)
    {
       $categories = Category::find($id);
       $categories->update($request->all());
       return response()->json('Category updated');
    }
    public function destroy($id)
    {
        $categories = Category::find($id);
        $categories->delete();
        return response()->json(' deleted!');
    }
}