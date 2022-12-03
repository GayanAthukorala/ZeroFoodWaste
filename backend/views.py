from django.http import JsonResponse
from .models import Recipe
from .serializers import RecipeSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import requests
import io
import json

@api_view(['GET', 'POST'])

def recipe_list(request):

    if request.method == 'GET':
        recipes = Recipe.objects.all()
        serializer = RecipeSerializer(recipes, many = True)
        return JsonResponse(serializer.data, safe=False)
    
    if request.method == 'POST':
        print(request.data)
        response = request.data
        desiredCalories = response["desiredCalories"]
        calories = response["calories"]
        if "k" in calories: 
                calories = calories.replace("k","")
        adjustmentRatio = int(desiredCalories)/int(calories)
        for i in request.data["ingredients"]:
            adjustedValue = int(i["amount"]["metric"]["value"])*adjustmentRatio
            adjustedValue = round(adjustedValue,3)
            i["amount"]["metric"]["value"] = str(adjustedValue)
        request.data["calories"]=calories
        serializer = RecipeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    

@api_view(['GET', 'DELETE'])
def recipe_details(request, id):
    recipe = Recipe.objects.get(pk= id)
    if request.method == 'GET':
        serializer = RecipeSerializer(recipe)
        return JsonResponse(serializer.data)
    
    if request.method == 'DELETE':
        recipe.delete()
