"""yujiri URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from . import common, spem, comments, stats

app_name = 'yujiri'

urlpatterns = [
    # For the admin site.
    path('admin/', admin.site.urls),
    path('static/', admin.site.urls),
    # For the main site.
    path('api/spem/words', spem.words_router),
    path('api/spem/tags', spem.get_tags),
    path('api/comments', comments.comment_router),
    path('api/comments/preview', comments.preview_comment),
    path('api/recent_comments', comments.recent_comments),
    path('api/notifs/claim', comments.claim_email),
    path('api/notifs/prove', comments.prove_email),
    path('api/notifs/edit', comments.edit_subs),
    path('api/notifs/see', comments.see_subs),
    path('api/login', comments.login),
    path('api/setpw', comments.setpw),
    path('api/setname', comments.setusername),
    path('api/setpubkey', comments.setpubkey),
    path('api/setautosub', comments.setautosub),
    path('api/stats', stats.stats),
]
