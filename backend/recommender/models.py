from django.db import models
import uuid

# Create your models here.

class Recomendation(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    recommended_username = models.TextField(
        max_length=250, null=False, default='')

    recommended_opportunity_id = models.TextField(
        max_length=250, null=False, default='')

    recommendation_quality = models.DecimalField(max_digits=10, decimal_places=5)