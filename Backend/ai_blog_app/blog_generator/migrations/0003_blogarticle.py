# Generated by Django 5.1 on 2024-08-29 13:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog_generator', '0002_alter_user_email_alter_user_password_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='BlogArticle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('topic', models.CharField(max_length=400)),
                ('tone', models.CharField(max_length=30)),
                ('style', models.CharField(max_length=30)),
                ('complexity', models.CharField(max_length=30)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='blog_generator.user')),
            ],
        ),
    ]
