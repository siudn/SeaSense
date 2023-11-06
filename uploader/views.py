from django.http import HttpResponse
from django.shortcuts import render
from .forms import UploadFileForm

# Create your views here.


def uploader(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, requeset.FILES)
        file = request.FILES['file']
        return HttpResponse("The file uploaded is " + str(file))
    else:
        form = UploadFileForm()
    return render(request, "upload_form.html", {'form': form})
