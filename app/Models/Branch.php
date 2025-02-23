<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    protected $table = 'branch';

    public function contacts()
    {
        return $this->hasMany(BranchContact::class, 'branchID', 'branchID');
    }
}
