<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;
use PDO;


class CategoryController extends Controller
{
    public function allCat()
    {
        //get all records from the database
        $categories = Category::latest()->paginate(5);
        //$categories  = DB::table('categories')->latest()->paginate(5);
        //echo(get_class($categories));
   
        //echo(gettype($c));
   
        //send them to the category page to display
        return view('admin.category.index', ['categories'=>$categories]);
    }

    public function addCategory(Request $request)
    {
        //validate a new added category
        $validatedCategory = $request->validate([
            'category_name' => 'required|unique:categories|max:255'
        ]);
        Category::insert([
            'user_id' => Auth::user()->id,
            'created_at' => Carbon::now(),
            'category_name' => $request->category_name
        ]);
        return redirect('/category/all')->with('status', 'A new Category has been successfully added');
    }

    public function editCategory($id)
    {
        $editedCategory = Category::find($id);
        return view('admin.category.edit', ['editedCategory'=>$editedCategory]);
    }

    public function saveEditedCategory(Request $request, $id){
        switch ($request->input(['action'])){
            case 'cancel':
                break;
             case 'edit':
                $editedCategory = Category::find($id);
                $editedCategory->category_name = $request->category_name; 
                $editedCategory->save();
                break;
        }
        return redirect('/category/all')->with('status', 'A Category has been successfully updated');
    }

    public function deleteCategory($id){
        $deletedCategory = Category::find($id);
        $deletedCategory->delete();
        return redirect('/category/all')->with('status', 'A Category has been successfully deleted');
    }
    
}
