import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import login,authenticate
from django.contrib.auth.hashers import make_password
from blog_generator.models import User # Ensure correct import

@csrf_exempt
def signup(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            print("Received data:", data)
            
            username = data.get('username')
            email = data.get('email')
            password = data.get('password')
            repeatpassword = data.get('repeatPassword')  # Corrected variable name
            
            print(username, email, password, repeatpassword)
            
            if User.objects.filter(username= username).exists():
                return JsonResponse({"User" : "Username already exists"})

            if User.objects.filter(email=email).exists():
                return JsonResponse({"Email": "Email is already in use"}, status=400)

            if password != repeatpassword:
                return JsonResponse({"Password": "Passwords do not match"}, status=400)
            
            user = User.objects.create(username=username, email=email, password=make_password(password))
            user.save()
            return JsonResponse({"Success": "Account created successfully"}, status=201)        
        except json.JSONDecodeError:
            return JsonResponse({"Error": "Invalid JSON format"}, status=400)
        except Exception as e:
            print("Internal server error:", str(e))  # Print detailed error message
            return JsonResponse({"Error": "Internal Server Error"}, status=500)
    return JsonResponse({"Error": "Method not allowed"}, status=405)



@csrf_exempt
def login(request):
    try:
        data = json.loads(request.body)
        
        username = data.get('username')
        password = data.get('password')
        print("Received data:", data)
        print("Username:", username)
        print("Password:", password)
        
        # Check if user exists
        user_exists = User.objects.filter(username=username).exists()
        if not user_exists:
            return JsonResponse({"User": "Username not found"}, status=404)
        
        # Authenticate user
        user = authenticate(request, username=username, password=password)
        if user is not None:
            print(f"User authenticated successfully: {username}")
            return JsonResponse({'Success': "Credentials are valid"}, status=200)
        else:
            print(f"Failed authentication attempt for user: {username}")
            return JsonResponse({'Pass': 'Invalid password'}, status=400)
        
    except Exception as e:
        print(f"Response failed: {e}")
        return JsonResponse({"Error": "Internal Server Error"}, status=500)


