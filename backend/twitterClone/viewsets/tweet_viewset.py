from rest_framework.viewsets import ModelViewSet
from ..Models import Tweet, Usuario
from ..serializers import TweetSerializer


class TweetViewSet(ModelViewSet):
    queryset = Tweet.objects.all().order_by("-created_at")
    serializer_class = TweetSerializer

    def perform_create(self, serializer):
        usuario = Usuario.objects.get(id=self.request.user.id)
        serializer.save(user=usuario)
