from django.http import HttpResponse
from django.shortcuts import render
from .forms import UploadFileForm
from .models import File

# Create your views here.


def uploader(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        file = request.FILES['file']
        file_uploaded = File.objects.create(file_uploaded=file)
        file_uploaded.save('./uploads')
        return HttpResponse("The file uploaded is " + str(file))
    else:
        form = UploadFileForm()
    return render(request, "upload_form.html", {'form': form})
