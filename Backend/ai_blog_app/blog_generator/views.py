import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import login
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
            repeat_password = data.get('repeatPassword')  # Corrected variable name
            
            print(username, email, password, repeat_password)
            
            if not username or not email or not password or not repeat_password:
                return JsonResponse({"Error": "All fields are required"}, status=400)

            if User.objects.filter(email=email).exists():
                return JsonResponse({"Error": "Email is already in use"}, status=400)

            if password != repeat_password:
                return JsonResponse({"Error": "Passwords do not match"}, status=400)

            user = User.objects.create(username=username, email=email, password=make_password(password))
            user.save()
            return JsonResponse({"Success": "Account created successfully"}, status=201)
            
        except json.JSONDecodeError:
            return JsonResponse({"Error": "Invalid JSON format"}, status=400)
        except Exception as e:
            print("Internal server error:", str(e))  # Print detailed error message
            return JsonResponse({"Error": "Internal Server Error"}, status=500)
    return JsonResponse({"Error": "Method not allowed"}, status=405)
