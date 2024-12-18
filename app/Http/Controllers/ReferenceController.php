<?php

namespace App\Http\Controllers;

use App\Http\Repositories\References;
use Illuminate\Http\Request;

class ReferenceController extends Controller
{
    public $references;
    public function __construct(References $references) {
        $this->references = $references;
    }

    public function getReferences () {
        $data = $this->references->getReferences();

        return response()->json($data);
    }
}
