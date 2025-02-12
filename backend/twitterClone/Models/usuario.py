from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models


class Usuario(AbstractUser):
    email = models.EmailField(unique=True)
    foto_perfil = models.ImageField(
        upload_to="avatars/", blank=True, null=True, default="avatars/default.png"
    )
    banner = models.ImageField(
        upload_to="banner/", blank=True, null=True, default="banner/default.png"
    )
    bio = models.TextField(blank=True, null=True)
    link = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    groups = models.ManyToManyField(Group, related_name="usuario_groups", blank=True)
    user_permissions = models.ManyToManyField(
        Permission, related_name="usuario_permissions", blank=True
    )

    def __str__(self):
        return self.username
