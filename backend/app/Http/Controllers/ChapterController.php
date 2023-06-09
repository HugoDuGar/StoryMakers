<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chapter;

class ChapterController extends Controller
{

    /**
     * Método para añadir un capítulo.
     */

    public function addChapter(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'number' => 'required',
            'body' => 'required|max:65000',
            'history_id' => 'required'
        ]);

        $chapter = new Chapter();
        $chapter->title = $request->input('title');
        $chapter->number = $request->input('number');
        $chapter->body = $request->input('body');
        $chapter->history_id = $request->input('history_id');

        $chapter->save();

        return response()->json(['message' => 'Se ha añadido un capítulo a esta historia', 'data' => $chapter]);
    }

    /**
     * Método para editar el capítulo.
     */

    public function editChapter(Request $request, $id)
    {
        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'number' => 'required',
            'body' => 'required|max:65000',
        ]);

        $chapter = Chapter::find($id);

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

    /**
     * Método para obtener todos los capítulos de una historia.
     */

    public function getChaptersByHistoryId($history_id)
    {

        $chapters = Chapter::where('history_id', $history_id)->get();
        return response()->json($chapters);
    }

    /**
     * Método para obtener los datos de un solo capítulo.
     */

    public function getChapter($id)
    {
        $chapter = Chapter::find($id);
        if ($chapter) {
            return response()->json($chapter);
        } else {
            return response()->json(['message' => 'Capítulo no encontrado'], 404);
        }
    }
}
