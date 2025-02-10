from django.urls import path, include
from rest_framework import routers

from twitterClone import viewsets

router = routers.DefaultRouter()
router.register(r"usuarios", viewsets.UserViewSet)
router.register(r"tweets", viewsets.TweetViewSet)

urlpatterns = [path("", include(router.urls))]
