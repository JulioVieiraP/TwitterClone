from rest_framework import serializers
from ..Models import Usuario, Follow, Tweet


class UsuarioSerializer(serializers.ModelSerializer):
    followers = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()
    tweets = serializers.SerializerMethodField()

    class Meta:
        model = Usuario
        fields = [
            "id",
            "username",
            "slug",
            "foto_perfil",
            "banner",
            "bio",
            "link",
            "followers",
            "following",
            "tweets",
        ]

    def get_followers(self, obj):
        followers = Usuario.objects.filter(following_users__following=obj)
        return UsuarioSerializer(followers, many=True, context=self.context).data

    def get_following(self, obj):
        following = Usuario.objects.filter(followers__follower=obj)
        return UsuarioSerializer(following, many=True, context=self.context).data

    def get_tweets(self, obj):
        from .tweet_serializer import TweetSerializer

        tweets = Tweet.objects.filter(user=obj).order_by("-created_at")
        return TweetSerializer(tweets, many=True, context=self.context).data
