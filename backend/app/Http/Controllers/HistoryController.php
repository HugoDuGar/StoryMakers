<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\history;

class HistoryController extends Controller
{

    /**
     * Método para añadir una historia.
     */

    public function addHistory(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'description_history' => 'required',
            'category' => 'required',
            'audience' => 'required',
            'user_id' => 'required',
        ]);

        $history = new History();
        $history->title = $request->input('title');
        $history->description = $request->input('description_history');
        $history->category = $request->input('category');
        $history->audience = $request->input('audience');
        $history->user_id = $request->input('user_id');
        $history->save();

        $history_id = $history->id;

        return response()->json(['message' => 'Historia creada correctamente', 'data' => $history, 'history_id' => $history_id]);
    }


    /**
     * Método para obtener todas las historias.
     */

    public function getHistories()
    {
        $histories = History::all();
        return response()->json($histories);
    }

    /**
     * Método para obtener todas las historias de un usuario.
     */

    public function getHistoriesByUserId($user_id)
    {
        $histories = History::where('user_id', $user_id)->get();
        return response()->json($histories);
    }

    /**
     * Método para obtener una historia específica.
     */

    public function getHistory($id)
    {
        $history = history::find($id);
        if ($history) {
            return response()->json($history);
        } else {
            return response()->json(['message' => 'Historia no encontrada'], 404);
        }
    }

    /**
     * Método para actualizar una historia.
     */

    public function updateHistory(Request $request, $id)
    {
        $history = history::find($id);
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
     * Método para borrar una historia.
     */

    public function deleteHistory($id)
    {
        $history = history::find($id);
        if ($history) {
            $history->delete();
            return response()->json(['message' => 'Historia eliminada correctamente'], 200);
        } else {
            return response()->json(['error' => 'No se encontró la historia especificada'], 404);
        }
    }

    /**
     * Método para finalizar una historia.
     */

    public function finishHistory(Request $request, $id)
    {
        $history = history::find($id);
        if ($history) {
            $history->finished = $request->input('finished');

            $history->save();
            return response()->json('Historia finalizada', 200);
        } else {
            return response()->json('Historia no encontrada', 404);
        }
    }
}
