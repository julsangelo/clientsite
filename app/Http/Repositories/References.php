<?php

namespace App\Http\Repositories;

use App\Models\Branch;
use App\Models\ProductCategory;
use Illuminate\Support\Facades\DB;

class References
{
    public function getReferences(){
        $productCategories = ProductCategory::get();

        $branch = Branch::with('contacts')
        ->get();
        

        $contact = DB::table('branch')
            ->join('branchContact', 'branch.branchID', '=', 'branchContact.branchID')
            ->where('branch.isMainBranch', 1)
            ->select('branchContact.branchContactValue','branchContact.branchContactText','branchContact.branchContactType') 
            ->get();

        $socialMedia = DB::table('branch')
            ->join('branchSocialMedia', 'branch.branchID', '=', 'branchSocialMedia.branchID')
            ->where('branch.isMainBranch', 1)
            ->select('branchSocialMedia.branchSocialMediaValue','branchSocialMedia.branchSocialMediaText','branchSocialMedia.branchSocialMediaType') 
            ->get(); 

        return [
            'productCategory' => $productCategories,
            'branch' => $branch,
            'contact' => $contact,
            'socialMedia' => $socialMedia
        ];
    }
}
