from rest_framework import serializers
from ..Models import TweetLike


class TweetLikeSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    foto_perfil = serializers.ImageField(source="user.foto_perfil", read_only=True)

    class Meta:
        model = TweetLike
        fields = ["user", "foto_perfil"]
