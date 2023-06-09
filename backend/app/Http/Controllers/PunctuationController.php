<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Punctuation;
use App\Models\History;

class PunctuationController extends Controller
{

    /**
     * Método para puntuar una historia.
     */

    public function addPunctuation(Request $request)
    {
        $validatedData = $request->validate([
            'punctuation' => 'required|',
            'user_id' => 'required',
            'history_id' => 'required'
        ]);


        $punctuation = new Punctuation();
        $punctuation->punctuation = $request->input('punctuation');
        $punctuation->user_id = $request->input('user_id');
        $punctuation->history_id = $request->input('history_id');

        $punctuation->save();
        $this->updatePunctuationTotals();

        return response()->json(['message' => 'La historia ha sido puntuada correctamente', 'data' => $punctuation]);
    }

    /**
     * Método para obtener la puntuación de una historia.
     */

    public function getPunctuation($history_id, $user_id)
    {
        $punctuation = Punctuation::where('history_id', $history_id)
            ->where('user_id', $user_id)
            ->get();
        if ($punctuation->isNotEmpty()) {
            return response()->json($punctuation);
        } else {
            return response()->json(['message' => 'Puntuacion no encontrada'], 404);
        }
    }

    /**
     * Método para actualizar la puntuación de una historia.
     */

    public function updatePunctuation(Request $request, $history_id, $user_id)
    {
        $validatedData = $request->validate([
            'punctuation' => 'required',
        ]);

        $punctuation = Punctuation::where('history_id', $history_id)
            ->where('user_id', $user_id)
            ->first();

        if ($punctuation) {
            $punctuation->punctuation = $request->input('punctuation');
            $punctuation->save();
            $this->updatePunctuationTotals();

            return response()->json(['message' => 'Puntuación actualizada correctamente', 'data' => $punctuation]);
        } else {
            return response()->json(['message' => 'Puntuación no encontrada'], 404);
        }
    }

    /**
     * Método para actualizar la puntuación total de una historia.
     */

    public function updatePunctuationTotals()
    {
        $histories = History::all();

        foreach ($histories as $history) {
            $totalPunctuation = Punctuation::where('history_id', $history->id)->sum('punctuation');
            $history->punctuation = $totalPunctuation;
            $history->save();
        }

        return 'Puntuaciones actualizadas correctamente.';
    }
}
