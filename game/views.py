from django.shortcuts import render, redirect, HttpResponse
from .models import GameSettings
from django.http import JsonResponse

def game_view(request):
    settings = GameSettings.objects.first()

    if not settings:
        # Create the singleton if it doesn't exist
        settings = GameSettings.objects.create(available_uses=1, special_message="")

    if settings.available_uses <= 0:
        return redirect('no_uses_left')

    # Decrease by 1 use
    settings.available_uses -= 1

    if settings.available_uses == 6:
        settings.save()
        return redirect('rizz_master')

    settings.save()

    return render(request, 'game/index.html')

def rizz_master(request):
    """
    Page that shows a looping video. Initially paused at 0:00
    and plays with sound when user clicks the play button.
    """
    settings = GameSettings.objects.first()
    if not settings or settings.available_uses < 5 :
        return redirect('no_uses_left')
    
    settings.available_uses -= 1
    settings.save()
    return render(request, 'game/rizz_master.html')

def set_uses(request, value):
    try:
        settings, _ = GameSettings.objects.get_or_create(id=1)  # singleton
        settings.available_uses = value
        settings.save()
        return HttpResponse(f"<h2>Available uses set to {value}</h2>")
    except ValueError:
        return HttpResponse("<h2>Invalid literal for available_uses</h2>")
    
def view_uses(request):
    settings, _ = GameSettings.objects.get_or_create(id=1)  # singleton
    return HttpResponse(f"<h2>Currently {settings.available_uses} uses Available</h2>")
 
def set_special(request):
    message = request.GET.get("message", "")  # safe: spaces, emojis, newlines
    settings, _ = GameSettings.objects.get_or_create(id=1)
    settings.special_message = message
    settings.fresh = True
    settings.save()
    return HttpResponse(f"<h2>Special message set to:</h2><pre>{message}</pre>")



def view_special(request):
    settings, _ = GameSettings.objects.get_or_create(id=1)
    status = "fresh" if settings.fresh else "already used"
    return HttpResponse(f"<h2>Special message: {settings.special_message} ({status})</h2>")



def get_special_message(request):
    settings, _ = GameSettings.objects.get_or_create(id=1)
    if settings.fresh:
        msg = settings.special_message
        # mark as used
        settings.fresh = False
        settings.save()
        return JsonResponse({'message': msg})
    else:
        return JsonResponse({'message': ''})



def no_uses_left(request):
    return render(request, 'game/no_uses_left.html')
