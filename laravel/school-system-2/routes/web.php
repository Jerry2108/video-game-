<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB; 
use Illuminate\Http\Request; 
use App\Http\Controllers\CategoryController;
use App\Models\User;
use App\Models\Category;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    //$users = User::all(); 
    $users = DB::table('users')->get();
    return view('dashboard', compact('users'));
})->name('dashboard');

Route::get('/user/{name}', function(Request $request, $name){
    return view('user', ['name'=>$name]);
});

//Display link for category
Route::get('/category/all', [CategoryController::class, 'allCat'])->name('all.category');

//Add a new category
Route::post('/category/add', [CategoryController::class, 'addCategory'])->name('route.category');

//Edit a category
Route::get('/category/edit/{id}', [CategoryController::class, 'editCategory'])->name('edit.category');

//Save updates after editing a category
Route::post('/category/saveEdit/{id}', [CategoryController::class, 'saveEditedCategory'])->name('save.edit.category');

//Delete a category
Route::get('/category/delete/{id}', [CategoryController::class, 'deleteCategory'])->name('delete.category');