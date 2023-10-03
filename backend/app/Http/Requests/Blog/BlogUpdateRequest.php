<?php

namespace App\Http\Requests\Blog;

use Illuminate\Foundation\Http\FormRequest;

class BlogUpdateRequest extends FormRequest
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
            // 'user_id' => ['required', 'numeric'],
            'title' => ['required', 'string', 'max:200', 'min:4'],
            'article' => ['required', 'string', 'min:4'],
            'img' => 'nullable',
        ];
    }
}
