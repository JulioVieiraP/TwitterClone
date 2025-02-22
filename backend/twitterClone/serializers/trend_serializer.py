from rest_framework import serializers
from ..Models import Trend


class TrendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trend
        fields = "__all__"
