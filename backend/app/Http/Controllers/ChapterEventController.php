<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ChapterEvent;

/**
 * Este controller tiene los mismos métodos que el ChapterController pero funciona para los capítulos de las historias
 * de los eventos.
 */

class ChapterEventController extends Controller
{
    public function addChapterEvent(Request $request){
        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'number' => 'required',
            'body' => 'required|max:65000',
            'history_id' => 'required'
        ]);

        $chapter = new ChapterEvent();
        $chapter->title = $request->input('title');
        $chapter->number = $request->input('number');
        $chapter->body = $request->input('body');
        $chapter->history_id = $request->input('history_id');

        $chapter->save();

        return response()->json(['message' => 'Se ha añadido un capítulo a esta historia', 'data' => $chapter]);
    }

    public function editChapterEvent(Request $request, $id)
    {
        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'number' => 'required',
            'body' => 'required|max:65000',
        ]);

        $chapter = ChapterEvent::find($id);

        if ($chapter) {
            $chapter->title = $request->input('title');
            $chapter->number = $request->input('number');
            $chapter->body = $request->input('body');

            $chapter->save();

            return response()->json(['message' => 'El capítulo se ha actualizado correctamente', 'data' => $chapter]);
        } else {
            return response()->json(['message' => 'Capítulo no encontrado'], 404);
        }
    }

    public function getChaptersByHistoryIdForEvent($history_id){

        $chapters = ChapterEvent::where('history_id', $history_id)->get();
        return response()->json($chapters);

    }

    public function getChapterEvent($id)
    {
        $chapter = ChapterEvent::find($id);
        if ($chapter) {
            return response()->json($chapter);
        } else {
            return response()->json(['message' => 'Capítulo no encontrado'], 404);
        }
    }
}
