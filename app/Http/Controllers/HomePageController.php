<?php

namespace App\Http\Controllers;
use App\Models\Contact;
use App\Models\MyProfileInfo;
use Illuminate\Support\Facades\DB;

class HomePageController
{
    public function my_profile_info()
    {
        $user = DB::table("dev_info")->first();
        return view('profile', compact("user"));
    }
}
