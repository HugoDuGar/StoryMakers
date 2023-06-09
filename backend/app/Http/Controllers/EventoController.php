<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Evento;

class EventoController extends Controller
{

    /**
     * Este método es para añadir un evento.
     */

    public function addEvent(Request $request)
    {
        $event = new Evento;
        $event->name_event = $request->input('name_event');
        $event->description = $request->input('description');
        $event->rules = $request->input('rules');
        $event->awards = $request->input('awards');
        $event->admin_id = $request->input('admin_id');
        $event->save();

        return response()->json(['message' => 'Evento creado con éxito'], 201);
    }

    /**
     * Este método es para obtener todos los eventos.
     */

    public function getEvents()
    {
        $events = Evento::all();
        return response()->json($events);
    }

    /**
     * Este método es para obtener un evento específico.
     */

    public function getEventById($id)
    {
        $event = Evento::find($id);
        if ($event) {
            return response()->json($event);
        } else {
            return response()->json(['message' => 'Evento no encontrado'], 404);
        }
    }

    /**
     * Este método es para cerrar un evento.
     */

    public function closeEvent(Request $request, $id)
    {
        $event = Evento::find($id);

        if ($event) {
            $event->close = $request->input('close');
            $event->save();

            // Verificar si han pasado más de 24 horas desde el cierre del evento
            $closedAt = strtotime($event->close);
            $currentTime = time();

            if (($currentTime - $closedAt) >= (24 * 60 * 60)) { // 24 horas en segundos
                $event->delete();
                return response()->json('Evento cerrado y eliminado', 200);
            } else {
                return response()->json('Evento cerrado', 200);
            }
        } else {
            return response()->json('Evento no encontrado', 404);
        }
    }
}
