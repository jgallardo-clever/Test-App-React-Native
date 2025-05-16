# Dockerfile para contenedorizar la aplicación backend de FastAPI
FROM python:3.10-slim
WORKDIR /app
RUN pip install fastapi uvicorn pydantic
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]