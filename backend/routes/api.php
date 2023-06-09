<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HistoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route; 
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EventoController;
use App\Http\Controllers\SavedHistoryController;
use App\Http\Controllers\FinishedHistoryController;
use App\Http\Controllers\PunctuationController;
use App\Http\Controllers\ParticipantsEventsController;
use App\Http\Controllers\HistoryForYourEventController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\ChapterEventController;

/**
 * Ruta para el registro.
 */

Route::post('register', [RegisterController::class, 'register']);

/**
 * Rutas de los usuarios.
 */

Route::put('updateUser/{id}', [UserController::class, 'updateUser']);
Route::get('getUser/{id}', [UserController::class, 'getUser']);

/**
 * Rutas de los eventos.
 */

Route::post('addEvent', [EventoController::class, 'addEvent']);
Route::get('getEvents', [EventoController::class, 'getEvents']);
Route::get('getEventById/{id}', [EventoController::class, 'getEventById']);
Route::put('closeEvent/{id}', [EventoController::class, 'closeEvent']);

/**
 * Rutas de las historias.
 */

Route::post('addHistory', [HistoryController::class, 'addHistory']);
Route::get('getHistories', [HistoryController::class, 'getHistories']);
Route::get('getHistoriesByUserId/{id}', [HistoryController::class, 'getHistoriesByUserId']);
Route::delete('deleteHistory/{id}', [HistoryController::class, 'deleteHistory']);
Route::put('updateHistory/{id}', [HistoryController::class, 'updateHistory']);
Route::get('getHistory/{id}', [HistoryController::class, 'getHistory']);
Route::put('finishHistory/{user_id}', [HistoryController::class, 'finishHistory']);

/**
 * Rutas de las historias guardadas.
 */

Route::post('addSavedHistory', [SavedHistoryController::class, 'addSavedHistory']);
Route::get('getSavedHistory/{history_id}/{user_id}', [SavedHistoryController::class, 'getSavedHistory']);
Route::get('getSavedHistoriesByUserId/{id}', [SavedHistoryController::class, 'getSavedHistoriesByUserId']);
Route::delete('deleteSavedHistory/{id}', [SavedHistoryController::class, 'deleteSavedHistory']);

/**
 * Rutas de las historias finalizadas.
 */

Route::post('addFinishedHistory', [FinishedHistoryController::class, 'addFinishedHistory']);
Route::get('getFinishedHistoriesByUserId/{id}', [FinishedHistoryController::class, 'getFinishedHistoriesByUserId']);

/**
 * Rutas de la puntuación de las historias.
 */

Route::post('addPunctuation', [PunctuationController::class, 'addPunctuation']);
Route::get('getPunctuation/{history_id}/{user_id}', [PunctuationController::class, 'getPunctuation']);
Route::put('updatePunctuation/{history_id}/{user_id}', [PunctuationController::class, 'updatePunctuation']);

/**
 * Rutas de las historias para los eventos.
 */

Route::post('addHistoryForEvent', [HistoryForYourEventController::class, 'addHistoryForEvent']);
Route::get('getHistoriesForEventById/{event_id}/{user_id}', [HistoryForYourEventController::class, 'getHistoriesForEventById']);
Route::get('getHistoriesForEvent/{event_id}', [HistoryForYourEventController::class, 'getHistoriesForEvent']);
Route::put('updateHistoryForEvent/{event_id}/{user_id}', [HistoryForYourEventController::class, 'updateHistoryForEvent']);
Route::delete('deleteHistoryForEvent/{id}', [HistoryForYourEventController::class, 'deleteHistoryForEvent']);
Route::put('updateSend/{event_id}/{user_id}', [HistoryForYourEventController::class, 'updateSend']);
Route::get('getHistoryEspecialId/{id}', [HistoryForYourEventController::class, 'getHistoryEspecialId']);

/**
 * Rutas de los participantes de los eventos.
 */

Route::post('addParticipantEvent', [ParticipantsEventsController::class, 'addParticipant']);
Route::get('getEventsByParticipant/{user_id}', [ParticipantsEventsController::class, 'getEventsByParticipant']);
Route::delete('deleteParticipant/{id}', [ParticipantsEventsController::class, 'deleteParticipant']);
Route::get('getEventByUserId/{event_id}/{user_id}', [ParticipantsEventsController::class, 'getEventByUserId']);
Route::get('getParticipants/{event_id}', [ParticipantsEventsController::class, 'getParticipants']);
Route::delete('disqualify/{event_id}/{user_id}', [ParticipantsEventsController::class, 'disqualify']);
Route::put('declareWinner/{event_id}/{user_id}', [ParticipantsEventsController::class, 'declareWinner']);

/**
 * Rutas de los capítulos de las historias.
 */

Route::post('addChapter', [ChapterController::class, 'addChapter']);
Route::put('editChapter/{id}', [ChapterController::class, 'editChapter']);
Route::get('getChaptersByHistoryId/{history_id}', [ChapterController::class, 'getChaptersByHistoryId']);
Route::get('getChapter/{id}', [ChapterController::class, 'getChapter']);

/**
 * Rutas de los capítulos de las historias de los eventos.
 */

Route::post('addChapterEvent', [ChapterEventController::class, 'addChapterEvent']);
Route::put('editChapterEvent/{id}', [ChapterEventController::class, 'editChapterEvent']);
Route::get('getChaptersByHistoryIdForEvent/{history_id}', [ChapterEventController::class, 'getChaptersByHistoryIdForEvent']);
Route::get('getChapterEvent/{id}', [ChapterEventController::class, 'getChapterEvent']);

/**
 * Rutas para todo lo relacionado con el login.
 */

Route::group([

    'middleware' => 'api',

], function ($router) {

    Route::post('login', [AuthController::class, 'login']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
