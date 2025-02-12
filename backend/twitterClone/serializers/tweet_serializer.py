from rest_framework import serializers
from ..Models import Tweet, Trend
import re


class TweetSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    imagem = serializers.ImageField(required=False)
    likes = serializers.SerializerMethodField()

    class Meta:
        model = Tweet
        fields = "__all__"

    def get_likes(self, obj):
        from ..serializers import TweetLikeSerializer

        likes = obj.likes.all()
        return TweetLikeSerializer(likes, many=True).data

    def create(self, validated_data):
        # Criação do tweet
        tweet = super().create(validated_data)

        # Detectar hashtags no conteúdo do tweet
        hashtags = re.findall(r"#(\w+)", tweet.content)

        # Para cada hashtag, criar ou atualizar o Trend
        for hashtag in hashtags:
            trend, created = Trend.objects.get_or_create(nome=hashtag)
            if not created:
                trend.increment_counter()

        return tweet
