<?php

use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\HomePageController;
use \App\Http\Controllers\ConnectController;

//Route::get('/home', function () {
//    return view('welcome');
//});

Route::get("/", [HomePageController::class, "my_profile_info"]);
Route::post("/connect", [ConnectController::class, "store"])->name("connect.store");
