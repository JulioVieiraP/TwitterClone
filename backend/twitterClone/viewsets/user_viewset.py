from rest_framework.viewsets import ModelViewSet
from ..Models import Usuario
from ..serializers import UsuarioSerializer


class UserViewSet(ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()
