<?php

namespace App\Http\Requests;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['string', 'max:100'],
            'last_name' => ['string', 'max:100'],
            'email' => ['email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
            'cpf' => ['string', 'max:15', Rule::unique(User::class)->ignore($this->user()->id)],
            'phone' => ['string', 'max:20'],
            'cep' => ['string', 'max:9'],
            'birth' => [
                'required',
                'string',
                'max:255',
                function ($attribute, $value, $fail) {
                    $birthdate = Carbon::createFromFormat('Y-m-d', $value);
                    $age = $birthdate->age;
                    if ($age < 18) {
                        $fail('Você deve registrar uma data de nascimento valida.');
                    }
                },
            ],
        ];
    }
}
