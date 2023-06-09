<?php

namespace App\Http\Controllers;

use App\Models\ParticipantsEvents;
use Illuminate\Http\Request;

class ParticipantsEventsController extends Controller
{

    /**
     * Método para añadir un participante a un evento.
     */

    public function addParticipant(Request $request)
    {
        $participant = new ParticipantsEvents();
        $participant->name_event = $request->input('name_event');
        $participant->user_id = $request->input('user_id');
        $participant->event_id = $request->input('event_id');
        $participant->save();
        
        return response()->json(['message' => 'El participante se ha unido al evento correctamente'], 201);
    }

    /**
     * Método para obtener todos los eventos a los que está apuntado un usuario.
     */

    public function getEventsByParticipant($userId)
    {
        $events = ParticipantsEvents::where('user_id', $userId)->get();

        return response()->json($events);
    }

    /**
     * Método para obtener todos los participantes de un evento.
     */

    public function getParticipants($event_id){
        $participants = ParticipantsEvents::where('event_id', $event_id)->get();
        return response()->json($participants);
    }

    /**
     * Método para desapuntarse de un evento.
     */

    public function deleteParticipant($id)
    {
        ParticipantsEvents::find($id)->delete();

        return response()->json(['message' => 'El participante ha sido eliminado correctamente'], 200);
    }

    /**
     * Método para descalificar a un participante.
     */

    public function disqualify($event_id, $user_id){
        $participant = ParticipantsEvents::where('event_id', $event_id)
        ->where('user_id', $user_id)
        ->delete();

        return response()->json(['message' => 'El participante ha sido descalificado correctamente'], 200);
    }

    /**
     * Método para obtener uno de los participantes del evento.
     */

    public function getEventByUserId($event_id, $user_id)
    {
        $participant = ParticipantsEvents::where('event_id', $event_id)
        ->where('user_id', $user_id)
        ->first();

        if ($participant) {
            return response()->json($participant, 200);
        } else {
            return response()->json(['message' => 'No se encontró ningún participante con ese ID de usuario'], 404);
        }
    }

    /**
     * Método para declarar un ganador del evento.
     */

    public function declareWinner(Request $request, $event_id, $user_id){
        $participant = ParticipantsEvents::where('event_id', $event_id)
        ->where('user_id', $user_id)
        ->first();

        if ($participant) {
            $participant->winner_user = $request->input('winner_user');
            $participant->save();

            return response()->json(['message' => 'El participante ganador ha sido seleccionado'], 200);
        }
    }


}
