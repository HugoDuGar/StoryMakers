<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\savedHistory;

class SavedHistoryController extends Controller
{

    /**
     * Método para añadir una historia a la biblioteca.
     */

    public function addSavedHistory(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'description' => 'required',
            'category' => 'required',
            'audience' => 'required',
            'user_id' => 'required',
            'history_id' => 'required'
        ]);

        $savedHistory = new savedHistory();
        $savedHistory->title = $request->input('title');
        $savedHistory->description = $request->input('description');
        $savedHistory->category = $request->input('category');
        $savedHistory->audience = $request->input('audience');
        $savedHistory->user_id = $request->input('user_id');
        $savedHistory->history_id = $request->input('history_id');

        $savedHistory->save();

        return response()->json(['message' => 'La historia ha sido agregada a tu biblioteca', 'data' => $savedHistory]);
    }

    /**
     * Método para obtener una historia especifica de la biblioteca.
     */

    public function getSavedHistory($history_id, $user_id)
    {
        $savedHistory = savedHistory::where('history_id', $history_id)
            ->where('user_id', $user_id)
            ->get();
        if ($savedHistory) {
            return response()->json($savedHistory);
        } else {
            return response()->json(['message' => 'Historia no encontrada'], 404);
        }
    }

    /**
     * Método para obtener todas las historia guardadas en la biblioteca de un usuario.
     */

    public function getSavedHistoriesByUserId($user_id)
    {
        $savedHistories = savedHistory::where('user_id', $user_id)->get();
        return response()->json($savedHistories);
    }

    /**
     * Método para borrar una historia de la biblioteca.
     */

    public function deleteSavedHistory($id)
    {
        $savedHistory = savedHistory::where('history_id', $id)->delete();
        return response()->json(['message' => 'Historia eliminada correctamente de la biblioteca']);
    }
}
