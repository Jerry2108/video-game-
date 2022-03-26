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
            @if(session('status'))
            <div class="alert alert-success">
              <b>{{ session('status') }}</b>
            </div>
            @endif
            <div class="card">
              <div class="card-header">All Category</div>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">SL No</th>
                    <th scope="col">Category Name</th>
                    <th scope="col">User</th>
                    <th scope="col">Created At</th>
                    <th scope ="col">Updates</th>
                  </tr>
                </thead>
                <tbody>
                
                  @foreach($categories as $category)
                  <tr>
                    <th scope="row">{{ $categories->firstItem()+$loop->index}}</th>
                    <td>{{ $category->category_name}}</td>
                    <td>{{ $category->user->name}}</td>
                    <td>{{ Carbon\Carbon::parse($category->created_at)->diffForHumans()}}</td>
                    <td>
                    <a class = "btn btn-info" href = "{{ url('category/edit/'. $category->id) }}"> Edit</a>
                    <a class = "btn btn-danger" href = "{{ url('category/delete/'.  $category->id)}}" style = "margin-left: 0.8rem">Delete</a>
                    </td>
                  </tr>
                  @endforeach
            
                </tbody>
              </table>
              {{$categories->links()}}
            </div>
          </div>
          <div class="col-md-4">
            <div class="card">
              <div class="card-header">Add Category</div>
              <div class="card-body">
                <form action="{{ route('route.category') }}" method="POST">
                  @csrf
                  <div class="form-group">
                    <label for="exampleInputEmail1" class="form-label">Category Name</label>
                    <input name="category_name" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                    @error("category_name")
                    <span class="text-danger">{{ $message }}</span>
                    @enderror
                  </div>
                  <button style = "margin-top: 1rem" type="submit" class="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</x-app-layout>