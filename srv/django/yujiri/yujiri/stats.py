from django.http import JsonResponse

from .models import Comment, User

def stats(req):
	users = [str(u) for u in User.objects.all()]
	all_posters = {c.name for c in Comment.objects.all()}
	ips = {}
	for poster in all_posters:
		ips[poster] = list({c.ip for c in Comment.objects.filter(name = poster)})
	return JsonResponse({'users':users, 'ips':ips})
