from rest_framework import serializers
from ..Models import Tweet, Usuario


class TweetSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    imagem = serializers.ImageField(required=False)

    class Meta:
        model = Tweet
        fields = "__all__"
