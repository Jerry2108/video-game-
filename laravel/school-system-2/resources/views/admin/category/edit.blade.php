<x-app-layout>
  <x-slot name="header">
    <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        
    </h2>
  </x-slot>

  <div class="py-12">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <div class="card">
              <div class="card-header">Edit Category</div>
              <div class="card-body">
                <form action="{{ url('/category/saveEdit/'. $editedCategory->id)}}" method="POST">
                  @csrf
                  <div class="form-group">
                    <label for="exampleInputEmail1" class="form-label">Update Category Name</label>
                    <input name="category_name" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value = '{{ $editedCategory->category_name }}'>
                  </div>
                  <button style = "margin-top: 1rem" type="submit" class="btn btn-primary" value = "edit" name = "action">Edit</button>
                  <button style = "margin-top: 1rem" type="submit" class="btn btn-primary" value = "cancel" name = "action">Cancel</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</x-app-layout>