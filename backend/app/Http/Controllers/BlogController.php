<?php

namespace App\Http\Controllers;

use App\Http\Requests\Blog\BlogStoreRequest;
use App\Http\Requests\Blog\BlogUpdateRequest;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class BlogController extends BaseController
{
    //
    public function index()
    {
        $articles = Blog::OrderBy('id', 'desc')->paginate('3');
        $articles1 = Blog::OrderBy('id', 'desc')->paginate('6');
        $admin = Blog::OrderBy('id', 'desc')->paginate('4');
        try{
            return $this->sendResponse(['ar1'=>$articles, 'ar2'=>$articles1, 'admin'=>$admin], 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    public function show($id)
    {
        $article = Blog::findOrFail($id);
        try{
            return $this->sendResponse($article, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }


    public function store(BlogStoreRequest $request){
        $Image = null;
        if ($request->hasFile('img')) {
            $file = $request->file('img');
            if ($file != null) {
                $Image = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('images/blog'), $Image);
            }
        }
        try{
            $post = new Blog();
            $post->title = $request->input('title');
            $post->article = $request->input('article');
            $post->img = $Image ;
            $post->user_id = 1;

            $post->save();
            return $this->sendResponse($post, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
       
    }

    public function delete($id){
        $post = Blog::findOrFail($id);
        $post->delete();
        try{
            return $this->sendResponse($post, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    public function search_post(Request $request){
        $query = $request->get('query');
        $posts = Blog::where('title', 'like', '%' . $query . '%')->get();
        try{
            return $this->sendResponse($posts, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    public function update(BlogUpdateRequest $request, $id){
        try {
            $post = Blog::findOrFail($id);
            $oldImage = $post->img; // Store the old image name before potential updates

            if ($request->hasFile('img')) {
                // Upload the new image
                $file = $request->file('img');
                $newImage = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('images/blog'), $newImage);
    
                // Delete the previous image if it exists
                if ($oldImage && File::exists(public_path('images/blog/' . $oldImage))) {
                    unlink(public_path('images/blog/' . $oldImage));
                }
                $post->img = $newImage;
            }
    
            // Update the post fields with the new data
            $post->title = $request->input('title');
            $post->article = $request->input('article');
            $post->save();
            return $this->sendResponse($post, 'post offer updated successfully', 200);
        } catch (\Exception $e) {
            return $this->sendError($e);
        }
    }
}
