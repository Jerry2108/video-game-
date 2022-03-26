<?php

namespace App\View\Components;

use Illuminate\View\Component;

class ending extends Component
{
    public string $endingMessage;
    public string $name; 
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($endingMessage, $name)
    {
        $this->endingMessage = $endingMessage;
        $this->name = $name;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.ending');
    }
}
