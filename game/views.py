from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from .models import GameSession
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def save_game(request):
    if request.method == "POST":
        data = json.loads(request.body)
        session = GameSession.objects.create(
            player=data.get("player", "guest"),
            discs=data["discs"],
            moves=data["moves"],
            optimal_moves=data["optimal_moves"],
            status="won" if data["won"] else "ongoing"
        )
        return JsonResponse({"id": session.id, "status": session.status})
    return JsonResponse({"error": "Invalid request"}, status=400)

def hanoi(request):
    return render(request, "game/index.html")