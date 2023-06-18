<?php

namespace App\Http\Controllers\Auth;
use Carbon\Carbon;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'email' => 'required|string|email|max:100|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'cpf' => 'required|string|max:15|unique:users',
            'phone' => 'required|string|max:255',
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

        $user = User::create([
            'name' => $request->name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'cpf' => $request->cpf,
            'phone' => $request->phone,
            'cep' => $cepFormatted,
            'birth' => $request->birth,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
