from django.db import models

# Create your models here.


class File(models.Model):
    file_uploaded = models.FileField(null=True, upload_to='./uploads/')
