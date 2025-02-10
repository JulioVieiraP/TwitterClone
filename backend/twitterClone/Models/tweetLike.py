from django.db import models

from twitterClone.Models import Tweet, Usuario


class TweetLike(models.Model):
    user = models.ForeignKey(Usuario, related_name="likes", on_delete=models.CASCADE)
    tweet = models.ForeignKey(Tweet, related_name="likes", on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["user", "tweet"], name="unique_like")
        ]
