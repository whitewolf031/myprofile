<?php

namespace App\Http\Controllers;
use App\Models\SafeInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ConnectController
{
    public function store(Request $request)
    {
        $data = $request->validate([
            "full_name" => "required|string|max:255",
            "email" => "required|email",
            "phone" => "nullable|string|max:20",
            "subject" => "nullable|string|max:255",
            "message" => "required|string"
        ]);
        $connect = SafeInfo::create($data);

        return response()->json(['success' => true]);
    }
}
