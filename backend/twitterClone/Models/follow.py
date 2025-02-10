from django.db import models

from twitterClone.Models import Usuario


class Follow(models.Model):
    follower = models.ForeignKey(
        Usuario, related_name="followers", on_delete=models.CASCADE
    )
    following = models.ForeignKey(
        Usuario, related_name="following_users", on_delete=models.CASCADE
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["follower", "following"], name="unique_follow"
            )
        ]
