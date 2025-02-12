from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from ..Models import Usuario, Follow
from ..serializers import UsuarioSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

from rest_framework.permissions import AllowAny, IsAuthenticated


class UserViewSet(ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()

    def get_permissions(self):
        if self.action == "create":
            return [AllowAny()]
        return [IsAuthenticated()]

    @action(detail=False, methods=["get"])
    def me(self, request):
        usuario = request.user
        serializer = UsuarioSerializer(usuario)
        return Response(serializer.data)

    @action(detail=True, methods=["Post"])
    def follow(self, request, pk=None):
        user_to_follow = get_object_or_404(Usuario, pk=pk)
        user = request.user

        if user == user_to_follow:
            return Response(
                {"error": "Você não pode seguir a si mesmo"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        follow = Follow.objects.filter(follower=user, following=user_to_follow).first()

        if follow:
            follow.delete()
            return Response(
                {"message": f"Você deixou de seguir {user_to_follow.username}."},
                status=status.HTTP_200_OK,
            )
        else:
            Follow.objects.create(follower=user, following=user_to_follow)
            return Response(
                {"message": f"Você agora segue {user_to_follow.username}."},
                status=status.HTTP_201_CREATED,
            )
