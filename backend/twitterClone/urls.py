from django.urls import path, include
from rest_framework import routers
from twitterClone import viewsets

router = routers.DefaultRouter()
router.register(r"usuarios", viewsets.UserViewSet)
router.register(r"tweets", viewsets.TweetViewSet, basename="tweet")
router.register(r"feeds", viewsets.FeedViewSet, basename="feed")
router.register(r"trends", viewsets.TrendViewSet, basename="trend")

urlpatterns = [
    path("", include(router.urls)),
]
