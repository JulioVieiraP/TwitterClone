from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from ..Models import Tweet, TweetLike
from ..serializers import TweetSerializer
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied


class TweetViewSet(ModelViewSet):
    queryset = Tweet.objects.all().order_by("-created_at")
    serializer_class = TweetSerializer

    def perform_create(self, serializer):
        usuario = self.request.user

        if not usuario.is_authenticated:
            raise PermissionDenied("Usuário não autenticado.")

        serializer.save(user=usuario)

    @action(detail=True, methods=["post"])
    def like(self, request, pk=None):
        tweet = get_object_or_404(Tweet, pk=pk)
        like, created = TweetLike.objects.get_or_create(user=request.user, tweet=tweet)
        if not created:
            like.delete()
            return Response(
                {"message": "Like removido"}, status=status.HTTP_204_NO_CONTENT
            )
        return Response({"message": "Tweet curtido"}, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["get", "post"])
    def comment(self, request, pk=None):
        tweet = get_object_or_404(Tweet, pk=pk)

        if request.method == "POST":
            content = request.data.get("content")
            image = request.FILES.get("imagem")
            if not content:
                return Response(
                    {"error": "O comentário não pode estar vazio"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Criando um novo tweet que é uma resposta ao tweet original
            comment = Tweet.objects.create(
                user=request.user, content=content, imagem=image, answer_of=tweet
            )
            return Response(
                TweetSerializer(comment).data, status=status.HTTP_201_CREATED
            )

        # Se for um GET, retorna todos os comentários do tweet
        comments = Tweet.objects.filter(answer_of=tweet).order_by("-created_at")
        return Response(
            TweetSerializer(comments, many=True).data, status=status.HTTP_200_OK
        )
