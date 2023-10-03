<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AdminController extends BaseController
{
    //
    public function createSubAdmin(Request $request)
    {
        // Validate the request data
        $request->validate([
            'name' => 'required|string',
            'lastName'=>'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'permissions' => 'required|array', // Array of permission IDs
        ]);

        // Create the sub-admin user
        $subAdmin = User::create([
            'name' => $request->input('name'),
            'lastName' => $request->input('lastName'),
            'email' => $request->input('email'),
            'role' => 'admin',
            'password' => bcrypt($request->input('password')),
        ]);

        // Assign the 'sub-admin' role
        $subAdminRole = Role::where('name', $subAdmin->name)->first(); // Adjust role name as per your setup
        $subAdmin->assignRole($subAdminRole);

        $permissionIds = collect($request->input('permissions'))->flatten()->toArray();
        $permissions = Permission::whereIn('id', $permissionIds)->get();
        $subAdmin->syncPermissions($permissions);
        
        // Return a response indicating success
        return response()->json(['message' => 'Sub-admin created successfully'], 201);
    }

    public function updateSubAdmin(Request $request, $id){
        // Validate the request data
        $request->validate([
            'name' => 'required|string',
            'lastName' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'nullable|min:6', // Allow password to be nullable for updating
            'permissions' => 'required|array', // Array of permission IDs
        ]);

        // Find the sub-admin user by ID
        $subAdmin = User::find($id);

        if (!$subAdmin) {
            return response()->json(['message' => 'Sub-admin not found'], 404);
        }
        // Update the sub-admin user's data
        $subAdmin->name = $request->input('name');
        $subAdmin->lastName = $request->input('lastName');
        $subAdmin->email = $request->input('email');

        // Check if a new password is provided and update it if necessary
        if ($request->filled('password')) {
            $subAdmin->password = bcrypt($request->input('password'));
        }
        $subAdmin->save();

        // Update permissions for the sub-admin
        $permissionIds = collect($request->input('permissions'))->flatten()->toArray();
        $permissions = Permission::whereIn('id', $permissionIds)->get();
        $subAdmin->syncPermissions($permissions);

        // Return a response indicating success
        return response()->json(['message' => 'Sub-admin updated successfully'], 200);
    }

    public function getSubAdmin($id){
        try {
            // Find the sub-admin user by ID
            $subAdmin = User::findOrFail($id);

            // You can customize the data you want to return here
            // For example, you can select specific columns or include related data
            $data = [
                'id' => $subAdmin->id,
                'name' => $subAdmin->name,
                'lastName' => $subAdmin->lastName,
                'email' => $subAdmin->email,
                'permissions' => $subAdmin->permissions, // Assuming you have a permissions relationship defined in your User model
            ];

            return response()->json($data, 200);
        } catch (\Exception $e) {
            // Handle the case where the sub-admin is not found
            return response()->json(['message' => 'Sub-admin not found'], 404);
        }
    }

    public function getPermissions(){
        $adminRole = Role::where('name', 'admin')->first(); // Adjust role name as per your setup
        $permissions = $adminRole->permissions;
        return response()->json($permissions);
    }

    public function getUserPermissions(Request $request){
        try {
            // Attempt to decode the JWT token
            $user = JWTAuth::parseToken()->authenticate();
           
            // Assuming your user model has a 'permissions' relationship
            // that defines the user's permissions
            $permissions = $user->permissions;
            // dd($permissions);
    
            return response()->json(['permissions' => $permissions]);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not retrieve user permissions'], 500);
        }
    }

    public function getUsersWithPermissions(){
        try {
            // Retrieve users with the names of their associated permissions
            $usersWithPermissions = User::where('id', '<>', 1)
            ->where('role', 'admin')
            ->with('permissions:name')
            ->paginate(6);
    
            return response()->json(['users' => $usersWithPermissions]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Could not retrieve users with permissions'], 500);
        }
    }

    public function users(){
        $users = User::where('role','user')->orderBy('id','desc')->paginate(5);
        try{
            return $this->sendResponse($users, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    public function deleteUser($id){
        $user = User::findOrFail($id);
        $user->delete();
        try{
            return $this->sendResponse($user, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }
}
