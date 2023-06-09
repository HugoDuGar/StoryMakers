<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FinishedHistory;

class FinishedHistoryController extends Controller
{
    /**
     * Método para añadir una historia finalizada a su tabla correspondiente.
     */

    public function addFinishedHistory(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'description' => 'required',
            'category' => 'required',
            'audience' => 'required',
            'user_id' => 'required',
            'history_id' => 'required'
        ]);

        $finishedHistory = new FinishedHistory();
        $finishedHistory->title = $request->input('title');
        $finishedHistory->description = $request->input('description');
        $finishedHistory->category = $request->input('category');
        $finishedHistory->audience = $request->input('audience');
        $finishedHistory->user_id = $request->input('user_id');
        $finishedHistory->history_id = $request->input('history_id');

        $finishedHistory->save();

        return response()->json(['message' => 'Felicidades, tu historia ha finalizado', 'data' => $finishedHistory]);
    }

    /**
     * Método para obtener todas las historias finalizadas de un usuario específico.
     */

    public function getFinishedHistoriesByUserId($user_id)
    {
        $finishedHistory = FinishedHistory::where('user_id', $user_id)->get();
        return response()->json($finishedHistory);
    }
}
