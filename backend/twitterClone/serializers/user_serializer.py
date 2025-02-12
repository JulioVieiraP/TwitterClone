from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from ..Models import Usuario, Follow, Tweet


class SimpleUsuarioSerializer(serializers.ModelSerializer):

    class Meta:
        model = Usuario
        fields = ["id", "username", "foto_perfil"]


class UsuarioSerializer(serializers.ModelSerializer):
    followers = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()
    tweets = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Usuario
        fields = [
            "id",
            "username",
            "email",
            "foto_perfil",
            "banner",
            "bio",
            "link",
            "followers",
            "following",
            "tweets",
            "password",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def get_followers(self, obj):
        followers = Usuario.objects.filter(following_users__following=obj)
        return SimpleUsuarioSerializer(followers, many=True, context=self.context).data

    def get_following(self, obj):
        following = Usuario.objects.filter(following_users__follower=obj)
        return SimpleUsuarioSerializer(following, many=True, context=self.context).data

    def get_tweets(self, obj):
        from .tweet_serializer import TweetSerializer

        tweets = Tweet.objects.filter(user=obj).order_by("-created_at")
        return TweetSerializer(tweets, many=True, context=self.context).data

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)
