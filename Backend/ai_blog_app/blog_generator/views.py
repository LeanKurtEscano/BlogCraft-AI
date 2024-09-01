import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import login,authenticate,logout
from django.contrib.auth.models import User 
from django.contrib.auth.hashers import make_password
from blog_generator.models import BlogArticle
from django.conf import settings
from langchain_core.prompts import PromptTemplate
import google.generativeai as genai
from django.contrib.auth.decorators import login_required


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
                return JsonResponse({"User" : "Username already exists"},status = 400)

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
        
        if not username or not password:
            return JsonResponse({"Invalid": "Username and password are required"}, status=400)

        # Authenticate user
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            get_user_id = User.objects.get(username=username)
            user_id = get_user_id.id
            return JsonResponse({'Success': "Credentials are valid", "UserID": user_id}, status=200)
        else:
            user_exists = User.objects.filter(username = username).exists()
            if user_exists:
                return JsonResponse({"Pass": "Incorrect Password"}, status = 400)
            else:
                return JsonResponse({"User": "Username not found"},status = 400)
            
        
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


@csrf_exempt
def blog_details(request):
    if request.method != 'POST':
        return JsonResponse({"error": "Invalid request method"}, status=405)

    try:
        data = json.loads(request.body)
        userid = data.get('userid')
        
        if not userid:
            return JsonResponse({"error": "User ID is required"}, status=400)
        
        try:
            int_id = int(userid)
        except ValueError:
            return JsonResponse({"error": "Invalid User ID format"}, status=400)
        
        blog_details = BlogArticle.objects.filter(user_id=int_id)
        
        if not blog_details.exists():
            return JsonResponse({"error": "No blog posts found for this user"}, status=404)
        blog_list = []
        for blog in blog_details:
            content = {
                "id" : blog.id,
                "topic": blog.topic,
                "tone": blog.tone,
                "style": blog.style,
                "complexity": blog.complexity,
                "content": blog.content
            }
            blog_list.append(content)
        
        return JsonResponse(blog_list, safe=False)

    except Exception as e:
        print(f"Error: {e}")
        return JsonResponse({"error": "Internal Server Error"}, status=500)

@csrf_exempt
def log_out(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'Success': 'Logged out successfully'})
    return JsonResponse({'Error': 'Invalid request method'}, status=405)

@csrf_exempt
def delete_blog(request):
    if request.method == "POST":
        data = json.loads(request.body)
        blog_id = data.get('blogid')
        user_id = data.get('userid')
        print(blog_id)

      
        try:
            int_blog = int(blog_id)
            int_user = int(user_id)
        except (ValueError, TypeError):
            return JsonResponse({'error': 'Invalid blog ID or user ID'}, status=400)

    
        if not int_blog or not user_id:
            return JsonResponse({'error': 'Missing blog ID or user ID'}, status=400)

        try:
          
            blog_post = BlogArticle.objects.get(id=int_blog, user_id=int_user)
            blog_post.delete()
            return JsonResponse({'Success': 'Successfully deleted content'}, status=200)

        except:
            
            return JsonResponse({'error': 'Blog post not found or not authorized'}, status=404)

    else:
    
        return JsonResponse({'error': 'Invalid request method'}, status=405)