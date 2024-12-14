FROM python:3.13-slim-bullseye

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

COPY . .

EXPOSE 8000

ENTRYPOINT ["gunicorn"]
CMD ["--workers=4", "--bind", "0.0.0.0:8000", "app:app"]