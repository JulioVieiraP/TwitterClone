from django.test import TestCase
from rest_framework import status
from django.urls import reverse
from rest_framework.test import APIClient

from .Models import Usuario, Tweet, TweetLike, Follow


class UsuarioTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

        Usuario.objects.all().delete()

        # Criando o primeiro usuário (usuário autenticado)
        self.user_data = {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "testpassword123",
        }
        self.client.post(reverse("usuario-list"), self.user_data, format="json")

        # Obtendo o token do primeiro usuário
        login_data = {
            "username": self.user_data["username"],
            "password": self.user_data["password"],
        }
        url = reverse("token_obtain_pair")
        response = self.client.post(url, login_data, format="json")
        self.token = response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)

        # Criando o segundo usuário (para seguir)
        self.user_data2 = {
            "username": "user2",
            "email": "user2@example.com",
            "password": "password123",
        }
        self.client.post(reverse("usuario-list"), self.user_data2, format="json")
        self.user2 = Usuario.objects.get(username="user2")

    def test_toggle_follow(self):
        """Testa a funcionalidade de seguir e deixar de seguir um usuário"""

        follow_url = reverse("usuario-follow", args=[self.user2.id])

        # Teste: Seguir o usuário
        response = self.client.post(follow_url)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            response.data["message"], f"Você agora segue {self.user2.username}."
        )

        # Verifica se o Follow foi criado no banco
        self.assertTrue(
            Follow.objects.filter(
                follower__username="testuser", following=self.user2
            ).exists()
        )

        # Teste: Deixar de seguir o usuário (unfollow)
        response = self.client.post(follow_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data["message"], f"Você deixou de seguir {self.user2.username}."
        )

        # Verifica se o Follow foi removido do banco
        self.assertFalse(
            Follow.objects.filter(
                follower__username="testuser", following=self.user2
            ).exists()
        )

    def test_get_jwt_token(self):
        # Primeiro, cria um usuário
        self.client.post(reverse("usuario-list"), self.user_data, format="json")

        # Agora, autentica o usuário e obtém o token
        login_data = {
            "username": self.user_data["username"],
            "password": self.user_data["password"],
        }
        url = reverse("token_obtain_pair")  # URL do token JWT
        response = self.client.post(url, login_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.token = response.data["access"]  # Armazenando o token para testes futuros

    def test_get_user_data(self):
        # Criando o usuário e obtendo o token
        self.test_get_jwt_token()

        # Agora, usa o token para pegar os dados do usuário
        url = reverse("usuario-me")  # URL personalizada para pegar os dados do usuário
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["username"], self.user_data["username"])


class TweetTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        # Criando o usuário para usar nos testes
        self.user_data = {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "testpassword123",
        }
        self.client.post(reverse("usuario-list"), self.user_data, format="json")

        # Obtendo o token
        login_data = {
            "username": self.user_data["username"],
            "password": self.user_data["password"],
        }
        url = reverse("token_obtain_pair")  # URL do token JWT
        response = self.client.post(url, login_data, format="json")
        self.token = response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)

    def test_create_tweet(self):
        url = reverse("tweet-list")  # Nome da URL do ViewSet de Tweet
        tweet_data = {"content": "Este é um tweet de teste!"}
        response = self.client.post(url, tweet_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["content"], tweet_data["content"])

    def test_comment_on_tweet(self):
        # Criando o tweet principal
        tweet_url = reverse("tweet-list")
        tweet_data = {"content": "Tweet principal"}
        tweet_response = self.client.post(tweet_url, tweet_data, format="json")
        tweet_id = tweet_response.data["id"]

        # Comentando no tweet principal
        comment_url = reverse("tweet-comment", args=[tweet_id])  # A URL para comentar
        comment_data = {"content": "Comentando sobre o tweet"}
        response = self.client.post(comment_url, comment_data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["content"], comment_data["content"])

    def test_like_tweet(self):
        # Criando o tweet
        tweet_url = reverse("tweet-list")
        tweet_data = {"content": "Tweet para curtir"}
        tweet_response = self.client.post(tweet_url, tweet_data, format="json")
        tweet_id = tweet_response.data["id"]

        # Curtindo o tweet
        like_url = reverse("tweet-like", args=[tweet_id])  # A URL para curtir
        response = self.client.post(like_url)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("message", response.data)
        self.assertEqual(response.data["message"], "Tweet curtido")

        # Removendo o like
        response = self.client.post(like_url)
        self.assertIn(
            response.status_code, [status.HTTP_200_OK, status.HTTP_204_NO_CONTENT]
        )
        self.assertEqual(response.data["message"], "Like removido")

    def test_feed(self):
        # Criando dois usuários
        user_data2 = {
            "username": "user2",
            "email": "user2@example.com",
            "password": "password123",
        }
        self.client.post(reverse("usuario-list"), user_data2, format="json")

        # Seguindo o segundo usuário
        user1 = Usuario.objects.get(username="testuser")
        user2 = Usuario.objects.get(username="user2")
        Follow.objects.create(follower=user1, following=user2)

        # Criando um tweet para o segundo usuário
        tweet_url = reverse("tweet-list")
        tweet_data = {"content": "Tweet do segundo usuário"}
        self.client.post(tweet_url, tweet_data, format="json")

        # Pegando o feed do primeiro usuário
        url = reverse("tweet-feed")  # Rota para o feed
        response = self.client.get(url)

        # Agora, esperamos que o feed do primeiro usuário tenha pelo menos um tweet
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)  # Deve retornar pelo menos um tweet
