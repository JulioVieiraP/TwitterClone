from django.test import TestCase
from .Models import Usuario, Tweet


class TweetTestCase(TestCase):
    def setUp(self):
        # Criar um usuário para associar ao tweet
        self.usuario = Usuario.objects.create_user(
            username="usuario_teste", password="senha123"
        )

    def test_criar_tweet(self):
        # Criar um tweet associado ao usuário
        tweet = Tweet.objects.create(user=self.usuario, content="Meu primeiro tweet!")
        print(f"Tweet criado: {tweet}")

        self.assertEqual(Tweet.objects.count(), 1)
        self.assertEqual(tweet.user, self.usuario)
        self.assertEqual(tweet.content, "Meu primeiro tweet!")
        self.assertIsNotNone(tweet.created_at)
