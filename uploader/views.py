from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from .forms import UploadFileForm
from .models import File

# Create your views here.


def uploader(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        file = request.FILES['file']
        file_uploaded = File.objects.create(file_uploaded=file)
        file_uploaded.save()
        return render(request, "success.html")
    else:
        form = UploadFileForm()
    return render(request, "upload_form.html", {'form': form})
