<?php

namespace App\Http\Requests\vehicule;

use Illuminate\Foundation\Http\FormRequest;

class VehiculeUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'type' => ['required', 'string'],
            'title' => ['required', 'string', 'max:200', 'min:4'],
            'options' => ['required', 'string'],
            // 'img' => 'nullable|mimes:jpeg,png,jpg,gif,webp',
            'coefPrice' => ['required', 'numeric'],
            'taxe' => ['required', 'numeric'],
        ];
    }
}
