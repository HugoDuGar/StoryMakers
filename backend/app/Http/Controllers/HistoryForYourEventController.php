<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HistoryForYourEvent;

class HistoryForYourEventController extends Controller
{

    /**
     * Método para enviar una historia a un evento.
     */

    public function addHistoryForEvent(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'description' => 'required',
            'category' => 'required',
            'audience' => 'required',
            'user_id' => 'required',
            'event_id' => 'required'
        ]);


        $history = new HistoryForYourEvent();
        $history->title = $request->input('title');
        $history->description = $request->input('description');
        $history->category = $request->input('category');
        $history->audience = $request->input('audience');
        $history->user_id = $request->input('user_id');
        $history->event_id = $request->input('event_id');

        $history->save();

        $history_id = $history->id;

        return response()->json(['message' => 'Historia creada correctamente', 'data' => $history, 'history_id' => $history_id]);
    }

    /**
     * Método para obtener la historia enviada a un evento.
     */

    public function getHistoriesForEventById($event_id, $user_id){
        $history = HistoryForYourEvent::where('event_id', $event_id)
        ->where('user_id', $user_id)
        ->first();
        return response()->json($history);
    }

    /**
     * Método para obtener las historias enviadas a un evento.
     */


    public function getHistoriesForEvent($event_id){
        $histories = HistoryForYourEvent::where('event_id', $event_id)->get();
        return response()->json($histories);
    }

    /**
     * Método para obtener los datos de la historia del evento de forma más sencilla.
     */

    public function getHistoryEspecialId($id){
        $history = HistoryForYourEvent::find($id);
        return response()->json($history);
    }

    /**
     * Método para actualizar la historia enviada al evento.
     */

    public function updateHistoryForEvent(Request $request, $event_id, $user_id){
        $history = HistoryForYourEvent::where('event_id', $event_id)
        ->where('user_id', $user_id)
        ->first();
        if ($history) {
            $history->title = $request->input('title');
            $history->description = $request->input('description');
            $history->category = $request->input('category');
            $history->audience = $request->input('audience');

            $history->save();
            return response()->json(['message' => 'Historia actualizada correctamente'], 200);
        } else {
            return response()->json(['error' => 'No se encontro la historia especificada'], 200);
        }
    }

    /**
     * Método para actualizar el campo 'enviada' de la historia.
     */

    public function updateSend(Request $request, $event_id, $user_id){
        $history = HistoryForYourEvent::where('event_id', $event_id)
        ->where('user_id', $user_id)
        ->first();
        if ($history) {
            $history->sent = $request->input('sent');

            $history->save();
            return response()->json(['message' => 'Historia actualizada correctamente'], 200);
        }
    }

    /**
     * Método para eliminar la historia enviada al evento.
     */

    public function deleteHistoryForEvent($id)
    {
        $history = HistoryForYourEvent::find($id);
        if ($history) {
            $history->delete();
            return response()->json(['message' => 'Historia eliminada correctamente'], 200);
        } else {
            return response()->json(['error' => 'No se encontró la historia especificada'], 404);
        }
    }
}
