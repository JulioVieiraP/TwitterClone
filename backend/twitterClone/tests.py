from django.test import TestCase
from twitterClone.models import Usuario


class UsuarioTestCase(TestCase):
    def setUp(self):
        # Criar usuário para os testes
        self.usuario = Usuario.objects.create_user(
            username="usuario_teste", password="senha123"
        )

    def test_listar_usuarios(self):
        # Listar todos os usuários
        usuarios = Usuario.objects.all()
        print(usuarios)  # Apenas para visualização, mas o Django vai tratar o teste
        self.assertEqual(usuarios.count(), 1)  # Verifica se há 1 usuário no banco
