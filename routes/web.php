<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Home\HomeController;

// Route::get('/', function () {
//     return Inertia::render('Welcome');
// })->name('home');
// Route::middleware([config('jetstream.auth_session'),])->group(function () {
    Route::get('/', [HomeController::class,'index'])->name('home');
// });

Route::get('dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::post('submit/answer',[HomeController::class,'storeAnswer'])->name('submit.answer');
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
