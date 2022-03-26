<x-app-layout>
  <x-slot name="header">
    <h2 class="font-semibold text-xl text-gray-800 leading-tight">
      Hi <b>{{Auth::user()->name}}</b>
      <b style = "float:right;">Total users
      </b>
    </h2>
  </x-slot>

  <div class="py-12">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Created At</th>
          </tr>
        </thead>
        <tbody>
          @php(i = 1)@endphp
          @foreach($users as $user)
          <tr>
            <th scope="row">1</th>
            <td>{{ $user->name}}</td>
            <td>{{ $user->email}}</td>
            <td>{{ Carbon\Carbon::parse($user->created_at)->diffForHumans()}}</td>
          </tr>
          @endforeach
        </tbody>
      </table>
    </div>
  </div>
</x-app-layout>