<?php

namespace App\Http\Requests\Service;

use Illuminate\Foundation\Http\FormRequest;

class ServiceStoreRequest extends FormRequest
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
            //
            'title' => ['required', 'string', 'max:200', 'min:4'],
            // 'titleEn' => ['required', 'string', 'max:200', 'min:4'],
            // 'titleHl' => ['required', 'string', 'max:200', 'min:4'],
            'desc' => ['required', 'string', 'min:4'],
            // 'descEn' => ['required', 'string', 'min:4'],
            // 'descHl' => ['required', 'string', 'min:4'],
            'img' => ['required'],
        ];
    }
}
