<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    /**
     * Método para actualizar el perfil de usuario.
     */

    public function updateUser(Request $request, $id)
    {
        $user = User::find($id);
        if ($user) {
            $user->name = $request->input('name');
            $user->description = $request->input('description');
            $user->age = $request->input('age');
            $user->genders = $request->input('genders');
            $user->nationality = $request->input('nationality');

            $user->save();
            return response()->json(['message' => 'Usuario actualizado correctamente'], 200);
        } else {
            return response()->json(['error' => 'No se encontró al usuario especificado'], 404);
        }
    }

    /**
     * Método para obtener un usuario.
     */

    public function getUser($id)
    {
        $user = User::find($id);

        if ($user) {
            return response()->json($user);
        } else {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
    }
}
