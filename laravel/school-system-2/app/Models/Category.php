<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use SoftDeletes;
  
    protected $fillable = [
        'user_id',
        'category_name'
    ];

     //Define a one to one relationship where one user can only have one category
     public function user(){
            //$this->hasOne(Foregin class, foregin key, owner key)
            return $this->hasOne(User::class, 'id', 'user_id');
     }

}
