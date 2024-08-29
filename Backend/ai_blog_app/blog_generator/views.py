import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import login,authenticate
from django.contrib.auth.hashers import make_password
from blog_generator.models import User, BlogArticle
from django.conf import settings
from langchain_core.prompts import PromptTemplate
import google.generativeai as genai


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
    





def create_prompt(tone, topic, style, complexity):
    template = """
    You are a technical copywriter fluent in all subjects. You are developing a blog article about "{topic}" with a "{tone}" tone.
    Create an article that covers the topic in {complexity} detail with a title, headline, engaging introduction, and provide a few interesting 
    facts and statistics with hyperlinks and the formatting to fit medium.com’s editing language in a {style} style.
    """
    
    prompt = PromptTemplate(
        input_variables=["topic", "style", "complexity", "tone"], 
        template=template
    )   
    formatted_prompt = prompt.format(
        topic=topic,
        style=style,
        complexity=complexity,
        tone=tone
    )
    
    print("Succesfully Created Prompt")
    
    return formatted_prompt

@csrf_exempt
def generate_blog(request):
    try:
        data = json.loads(request.body)
        tone = data.get('tone')
        print(tone)
        topic = data.get('topic')
        print(topic)
        style = data.get('style')
        print(style)
        complexity = data.get('complexity')
        print(complexity)
        username  = data.get('username')
        print(username)

        # Validate input
        if not all([tone, topic, style, complexity]):
            return JsonResponse({'missing': 'Missing required fields in request.'}, status=400)
        
        
        prompt = create_prompt(tone, topic, style, complexity)
        print("Successfully Created Prompt")
       
        # Create the model
        
        genai.configure(api_key="")
        generation_config = {
            "temperature": 1,
            "top_p": 0.95,
            "top_k": 64,
            "max_output_tokens": 8192,
            "response_mime_type": "text/plain",
        }
        
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            generation_config=generation_config,
            # safety_settings = Adjust safety settings
            # See https://ai.google.dev/gemini-api/docs/safety-settings
        )

        chat_session = model.start_chat(
            history=[
                # History can be included here if needed
            ]
        )

        response = chat_session.send_message(prompt)
        
        
               
        user = User.objects.get(username = username)
        
        blog_article = BlogArticle.objects.create(  
              user = user,
              topic = topic,
              tone = tone,
              style = style,
              complexity = complexity,
              content = response.text
           )           
           
        return JsonResponse({'article': response.text})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
