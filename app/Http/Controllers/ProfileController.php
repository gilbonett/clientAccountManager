<?php

namespace App\Http\Controllers;
use Carbon\Carbon;
use Illuminate\Validation\Rule;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'email' => [
                'required',
                'string',
                'email',
                'max:100',
                Rule::unique('users')->ignore($request->user()->id),
            ],
            'cpf' => [
                'required',
                'string',
                'max:15',
                Rule::unique('users')->ignore($request->user()->id),
            ],
            'phone' => 'required|string|max:20',
            'cep' => 'required|string|max:9',
            'birth' => [
                'required',
                'string',
                'max:255',
                function ($attribute, $value, $fail) {
                    $birthdate = Carbon::createFromFormat('Y-m-d', $value);
                    $age = $birthdate->age;
                    if ($age < 18) {
                        $fail('Você deve ter pelo menos 18 anos para se registrar.');
                    }
                },
            ],
        ]);

        $cep = str_replace('-', '', $request->cep);
        $cepFormatted = substr($cep, 0, 5) . '-' . substr($cep, 5);
        $response = Http::get("https://viacep.com.br/ws/$cepFormatted/json/");

        if ($response->failed()) {
            return redirect()->back()->withErrors(['cep' => 'Falha ao consultar o CEP.']);
        }

        $data = $response->json();

        if (isset($data['erro']) && $data['erro']) {
            return redirect()->back()->withErrors(['cep' => 'CEP não encontrado.']);
        }

        if (!isset($data['uf']) || strtoupper($data['uf']) !== 'AM') {
            return redirect()->back()->withErrors(['cep' => 'Apenas CEPs do estado do Amazonas são permitidos.']);
        }

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $user = $request->user();
        $user->fill($validatedData);
        

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
